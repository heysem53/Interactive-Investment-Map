"""Create the app_users table and an administrator account.

Run once from the backend folder (with the virtual environment active):

    python create_admin.py

It asks for a username and password; nothing is stored in plain text.
Running it again can add further administrators.
"""

import getpass
import re
import sys

from app.auth.security import hash_password, validate_password_strength
from app.auth.store import (
    create_user,
    ensure_users_table,
    get_user_by_username,
)


def main() -> int:
    ensure_users_table()
    print("Table app_users is ready.")

    username = input("Admin username: ").strip().lower()

    if not re.fullmatch(r"[a-z0-9_.-]{3,50}", username):
        print("Username must be 3-50 characters: letters, digits, _ . -")
        return 1

    if get_user_by_username(username):
        print(f"User '{username}' already exists.")
        return 1

    full_name = input("Full name (optional): ").strip() or None

    password = getpass.getpass("Password: ")
    confirm = getpass.getpass("Repeat password: ")

    if password != confirm:
        print("Passwords do not match.")
        return 1

    problem = validate_password_strength(password)

    if problem:
        print(problem)
        return 1

    create_user(
        username=username,
        password_hash=hash_password(password),
        role="admin",
        full_name=full_name,
    )

    print(f"Admin '{username}' created.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
