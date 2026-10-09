"""Deny-by-default authentication for every /api route.

Any path under /api requires a valid Bearer token, except the paths
listed in PUBLIC_PATHS. New endpoints are therefore protected automatically.
"""

import jwt
from fastapi import Request
from fastapi.responses import JSONResponse
from starlette.concurrency import run_in_threadpool

from .security import decode_access_token
from .store import get_user_by_id


PUBLIC_PATHS = {
    "/api/health",
    "/api/auth/login",
}


def _unauthorized(detail: str = "Not authenticated") -> JSONResponse:
    return JSONResponse(
        status_code=401,
        content={"detail": detail},
        headers={"WWW-Authenticate": "Bearer"},
    )


async def authentication_middleware(request: Request, call_next):
    path = request.url.path.rstrip("/") or "/"

    # CORS preflight requests carry no credentials.
    if request.method == "OPTIONS":
        return await call_next(request)

    if not path.startswith("/api") or path in PUBLIC_PATHS:
        return await call_next(request)

    authorization = request.headers.get("Authorization", "")
    scheme, _, token = authorization.partition(" ")

    if scheme.lower() != "bearer" or not token.strip():
        return _unauthorized()

    try:
        claims = decode_access_token(token.strip())
        user_id = int(claims["sub"])
    except (jwt.PyJWTError, ValueError, KeyError):
        return _unauthorized("Invalid or expired token")

    try:
        user = await run_in_threadpool(get_user_by_id, user_id)
    except Exception:
        return JSONResponse(
            status_code=503,
            content={"detail": "Authentication service unavailable"},
        )

    # Re-checked on every request so a disabled account loses access at once.
    if not user or not user["is_active"]:
        return _unauthorized("Invalid or expired token")

    request.state.user = user

    return await call_next(request)
