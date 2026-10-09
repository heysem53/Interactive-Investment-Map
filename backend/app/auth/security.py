"""Password hashing, JWT creation/validation and login throttling."""

import os
import threading
import time
from pathlib import Path

import bcrypt
import jwt
from dotenv import load_dotenv


# backend/app/auth/security.py -> backend/.env
load_dotenv(Path(__file__).resolve().parents[2] / ".env")


JWT_ALGORITHM = "HS256"
MIN_SECRET_LENGTH = 32
MAX_PASSWORD_BYTES = 72  # bcrypt limit
MIN_PASSWORD_LENGTH = 10


def _load_secret() -> str:
    secret = os.getenv("JWT_SECRET", "")

    if len(secret) < MIN_SECRET_LENGTH:
        raise RuntimeError(
            "JWT_SECRET is missing or too short "
            f"(minimum {MIN_SECRET_LENGTH} characters). "
            "Generate one with: "
            'python -c "import secrets; print(secrets.token_urlsafe(48))" '
            "and add it to backend/.env as JWT_SECRET=..."
        )

    return secret


def _load_expire_minutes() -> int:
    raw = os.getenv("JWT_EXPIRE_MINUTES", "480")

    try:
        value = int(raw)
    except ValueError as error:
        raise RuntimeError(
            "JWT_EXPIRE_MINUTES must be an integer"
        ) from error

    if value < 1:
        raise RuntimeError("JWT_EXPIRE_MINUTES must be at least 1")

    return value


JWT_SECRET = _load_secret()
JWT_EXPIRE_MINUTES = _load_expire_minutes()


# ------------------------------------------------------------------
# Passwords
# ------------------------------------------------------------------

def validate_password_strength(password: str) -> str | None:
    """Return an error message, or None when the password is acceptable."""

    if len(password) < MIN_PASSWORD_LENGTH:
        return (
            f"Password must be at least {MIN_PASSWORD_LENGTH} characters"
        )

    if len(password.encode("utf-8")) > MAX_PASSWORD_BYTES:
        return (
            f"Password must be at most {MAX_PASSWORD_BYTES} bytes"
        )

    return None


def hash_password(password: str) -> str:
    return bcrypt.hashpw(
        password.encode("utf-8"),
        bcrypt.gensalt(rounds=12),
    ).decode("utf-8")


# Used to spend the same time when the username does not exist,
# so response time does not reveal which usernames are valid.
_DUMMY_HASH = hash_password("dummy-password-for-timing")


def verify_password(password: str, password_hash: str | None) -> bool:
    candidate = password.encode("utf-8")[:MAX_PASSWORD_BYTES]
    target = (password_hash or _DUMMY_HASH).encode("utf-8")

    try:
        matches = bcrypt.checkpw(candidate, target)
    except ValueError:
        return False

    return matches and password_hash is not None


# ------------------------------------------------------------------
# Tokens
# ------------------------------------------------------------------

def create_access_token(
    user_id: int,
    username: str,
    role: str,
) -> tuple[str, int]:
    """Return (token, lifetime_in_seconds)."""

    now = int(time.time())
    lifetime = JWT_EXPIRE_MINUTES * 60

    payload = {
        "sub": str(user_id),
        "username": username,
        "role": role,
        "iat": now,
        "exp": now + lifetime,
    }

    token = jwt.encode(payload, JWT_SECRET, algorithm=JWT_ALGORITHM)

    return token, lifetime


def decode_access_token(token: str) -> dict:
    """Validate signature and expiry. Raises jwt.PyJWTError on failure."""

    return jwt.decode(
        token,
        JWT_SECRET,
        algorithms=[JWT_ALGORITHM],
        options={"require": ["exp", "sub"]},
    )


# ------------------------------------------------------------------
# Login throttling (in-memory, per process)
# ------------------------------------------------------------------

LOGIN_WINDOW_SECONDS = 15 * 60
MAX_FAILURES_PER_ACCOUNT = 5   # per (ip, username)
MAX_FAILURES_PER_IP = 30       # per ip, any username

_failures: dict[str, list[float]] = {}
_lock = threading.Lock()


def _prune(key: str, now: float) -> list[float]:
    recent = [
        stamp
        for stamp in _failures.get(key, [])
        if now - stamp < LOGIN_WINDOW_SECONDS
    ]

    if recent:
        _failures[key] = recent
    else:
        _failures.pop(key, None)

    return recent


def login_retry_after(ip: str, username: str) -> int:
    """Seconds the caller must wait, or 0 when the attempt is allowed."""

    now = time.time()

    with _lock:
        waits = []

        for key, limit in (
            (f"acct:{ip}|{username}", MAX_FAILURES_PER_ACCOUNT),
            (f"ip:{ip}", MAX_FAILURES_PER_IP),
        ):
            recent = _prune(key, now)

            if len(recent) >= limit:
                waits.append(
                    int(LOGIN_WINDOW_SECONDS - (now - recent[0])) + 1
                )

        return max(waits) if waits else 0


def register_login_failure(ip: str, username: str) -> None:
    now = time.time()

    with _lock:
        for key in (f"acct:{ip}|{username}", f"ip:{ip}"):
            _prune(key, now)
            _failures.setdefault(key, []).append(now)


def clear_login_failures(ip: str, username: str) -> None:
    with _lock:
        _failures.pop(f"acct:{ip}|{username}", None)
