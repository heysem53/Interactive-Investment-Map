"""Database access for application users (table: app_users)."""

from sqlalchemy import text

from ..database import engine


CREATE_USERS_TABLE_SQL = """
CREATE TABLE IF NOT EXISTS app_users (
    user_id        SERIAL PRIMARY KEY,
    username       VARCHAR(50) NOT NULL UNIQUE,
    full_name      VARCHAR(150),
    password_hash  TEXT NOT NULL,
    role           VARCHAR(20) NOT NULL DEFAULT 'user'
                   CHECK (role IN ('admin', 'user')),
    is_active      BOOLEAN NOT NULL DEFAULT TRUE,
    created_at     TIMESTAMPTZ NOT NULL DEFAULT now(),
    last_login_at  TIMESTAMPTZ
)
"""

PUBLIC_COLUMNS = """
    user_id, username, full_name, role, is_active,
    created_at, last_login_at
"""


def ensure_users_table() -> None:
    with engine.begin() as connection:
        connection.execute(text(CREATE_USERS_TABLE_SQL))


def get_user_by_username(username: str) -> dict | None:
    with engine.connect() as connection:
        row = connection.execute(
            text(
                f"""
                SELECT {PUBLIC_COLUMNS}, password_hash
                FROM app_users
                WHERE username = :username
                """
            ),
            {"username": username},
        ).mappings().first()

    return dict(row) if row else None


def get_user_by_id(user_id: int) -> dict | None:
    with engine.connect() as connection:
        row = connection.execute(
            text(
                f"""
                SELECT {PUBLIC_COLUMNS}
                FROM app_users
                WHERE user_id = :user_id
                """
            ),
            {"user_id": user_id},
        ).mappings().first()

    return dict(row) if row else None


def list_users() -> list[dict]:
    with engine.connect() as connection:
        rows = connection.execute(
            text(
                f"""
                SELECT {PUBLIC_COLUMNS}
                FROM app_users
                ORDER BY user_id
                """
            )
        ).mappings().all()

    return [dict(row) for row in rows]


def create_user(
    username: str,
    password_hash: str,
    role: str,
    full_name: str | None,
) -> dict:
    with engine.begin() as connection:
        row = connection.execute(
            text(
                f"""
                INSERT INTO app_users
                    (username, full_name, password_hash, role)
                VALUES
                    (:username, :full_name, :password_hash, :role)
                RETURNING {PUBLIC_COLUMNS}
                """
            ),
            {
                "username": username,
                "full_name": full_name,
                "password_hash": password_hash,
                "role": role,
            },
        ).mappings().first()

    return dict(row)


def set_user_active(user_id: int, is_active: bool) -> dict | None:
    with engine.begin() as connection:
        row = connection.execute(
            text(
                f"""
                UPDATE app_users
                SET is_active = :is_active
                WHERE user_id = :user_id
                RETURNING {PUBLIC_COLUMNS}
                """
            ),
            {"user_id": user_id, "is_active": is_active},
        ).mappings().first()

    return dict(row) if row else None


def set_user_password(user_id: int, password_hash: str) -> None:
    with engine.begin() as connection:
        connection.execute(
            text(
                """
                UPDATE app_users
                SET password_hash = :password_hash
                WHERE user_id = :user_id
                """
            ),
            {"user_id": user_id, "password_hash": password_hash},
        )


def get_password_hash(user_id: int) -> str | None:
    with engine.connect() as connection:
        return connection.execute(
            text(
                "SELECT password_hash FROM app_users "
                "WHERE user_id = :user_id"
            ),
            {"user_id": user_id},
        ).scalar()


def touch_last_login(user_id: int) -> None:
    with engine.begin() as connection:
        connection.execute(
            text(
                "UPDATE app_users SET last_login_at = now() "
                "WHERE user_id = :user_id"
            ),
            {"user_id": user_id},
        )
