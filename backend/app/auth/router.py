"""Authentication and user-management endpoints."""

import logging
from typing import Literal

from fastapi import APIRouter, Depends, HTTPException, Request
from pydantic import BaseModel, Field

from . import store
from .security import (
    clear_login_failures,
    create_access_token,
    hash_password,
    login_retry_after,
    register_login_failure,
    validate_password_strength,
    verify_password,
)


logger = logging.getLogger("uvicorn.error")

router = APIRouter(tags=["Authentication"])


# ------------------------------------------------------------------
# Dependencies
# ------------------------------------------------------------------

def get_current_user(request: Request) -> dict:
    """The authenticated user, loaded by the authentication middleware."""

    user = getattr(request.state, "user", None)

    if not user:
        raise HTTPException(
            status_code=401,
            detail="Not authenticated",
            headers={"WWW-Authenticate": "Bearer"},
        )

    return user


def require_admin(user: dict = Depends(get_current_user)) -> dict:
    if user["role"] != "admin":
        raise HTTPException(status_code=403, detail="Admin access required")

    return user


# ------------------------------------------------------------------
# Schemas
# ------------------------------------------------------------------

class LoginRequest(BaseModel):
    username: str = Field(min_length=1, max_length=50)
    password: str = Field(min_length=1, max_length=128)


class CreateUserRequest(BaseModel):
    username: str = Field(
        min_length=3,
        max_length=50,
        pattern=r"^[A-Za-z0-9_.-]+$",
    )
    password: str = Field(max_length=128)
    full_name: str | None = Field(default=None, max_length=150)
    role: Literal["admin", "user"] = "user"


class SetActiveRequest(BaseModel):
    is_active: bool


class ChangePasswordRequest(BaseModel):
    current_password: str = Field(min_length=1, max_length=128)
    new_password: str = Field(max_length=128)


def _public_user(user: dict) -> dict:
    return {
        "user_id": user["user_id"],
        "username": user["username"],
        "full_name": user["full_name"],
        "role": user["role"],
        "is_active": user["is_active"],
        "created_at": user["created_at"],
        "last_login_at": user["last_login_at"],
    }


# ------------------------------------------------------------------
# Login / current user
# ------------------------------------------------------------------

@router.post("/api/auth/login")
def login(payload: LoginRequest, request: Request):
    ip = request.client.host if request.client else "unknown"
    username = payload.username.strip().lower()

    retry_after = login_retry_after(ip, username)

    if retry_after:
        raise HTTPException(
            status_code=429,
            detail="Too many failed login attempts. Try again later.",
            headers={"Retry-After": str(retry_after)},
        )

    user = store.get_user_by_username(username)

    password_ok = verify_password(
        payload.password,
        user["password_hash"] if user else None,
    )

    if not user or not password_ok or not user["is_active"]:
        register_login_failure(ip, username)

        raise HTTPException(
            status_code=401,
            detail="Invalid username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )

    clear_login_failures(ip, username)
    store.touch_last_login(user["user_id"])

    token, expires_in = create_access_token(
        user["user_id"],
        user["username"],
        user["role"],
    )

    return {
        "access_token": token,
        "token_type": "bearer",
        "expires_in": expires_in,
        "user": _public_user(user),
    }


@router.get("/api/auth/me")
def me(user: dict = Depends(get_current_user)):
    return _public_user(user)


@router.post("/api/auth/change-password")
def change_password(
    payload: ChangePasswordRequest,
    user: dict = Depends(get_current_user),
):
    current_hash = store.get_password_hash(user["user_id"])

    if not verify_password(payload.current_password, current_hash):
        raise HTTPException(
            status_code=400,
            detail="Current password is incorrect",
        )

    problem = validate_password_strength(payload.new_password)

    if problem:
        raise HTTPException(status_code=422, detail=problem)

    store.set_user_password(
        user["user_id"],
        hash_password(payload.new_password),
    )

    return {"status": "ok"}


# ------------------------------------------------------------------
# User management (admin only)
# ------------------------------------------------------------------

@router.get("/api/users")
def list_users(_: dict = Depends(require_admin)):
    return [_public_user(user) for user in store.list_users()]


@router.post("/api/users", status_code=201)
def create_user(
    payload: CreateUserRequest,
    _: dict = Depends(require_admin),
):
    problem = validate_password_strength(payload.password)

    if problem:
        raise HTTPException(status_code=422, detail=problem)

    username = payload.username.strip().lower()

    if store.get_user_by_username(username):
        raise HTTPException(
            status_code=409,
            detail="Username already exists",
        )

    created = store.create_user(
        username=username,
        password_hash=hash_password(payload.password),
        role=payload.role,
        full_name=payload.full_name,
    )

    return _public_user(created)


@router.patch("/api/users/{user_id}/active")
def set_active(
    user_id: int,
    payload: SetActiveRequest,
    admin: dict = Depends(require_admin),
):
    if user_id == admin["user_id"] and not payload.is_active:
        raise HTTPException(
            status_code=400,
            detail="You cannot deactivate your own account",
        )

    updated = store.set_user_active(user_id, payload.is_active)

    if not updated:
        raise HTTPException(status_code=404, detail="User not found")

    return _public_user(updated)
