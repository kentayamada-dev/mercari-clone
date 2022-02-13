import sys

from fastapi import FastAPI, exceptions
from fastapi.middleware.cors import CORSMiddleware
from slowapi import Limiter  # type: ignore
from slowapi import _rate_limit_exceeded_handler  # type: ignore
from slowapi.errors import RateLimitExceeded
from slowapi.middleware import SlowAPIMiddleware
from slowapi.util import get_remote_address

from app.core.error.http_exception import custom_http_exception_handler
from app.core.error.validation import custom_validation_exception_handler
from app.db.database import create_table
from app.router import auth, image, item, like, query, root, user, order

create_table()

app = FastAPI(title="Mercari Clone API")


if "pytest" in sys.modules:
    limiter = Limiter(key_func=get_remote_address, enabled=False)
else:
    limiter = Limiter(
        key_func=get_remote_address, default_limits=["10/minute"], enabled=True
    )

app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)

app.add_middleware(SlowAPIMiddleware)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(image.router)
app.include_router(auth.router)
app.include_router(item.router)
app.include_router(user.router)
app.include_router(root.router)
app.include_router(query.router)
app.include_router(like.router)
app.include_router(order.router)

app.add_exception_handler(
    exceptions.RequestValidationError, custom_validation_exception_handler
)
app.add_exception_handler(
    exceptions.HTTPException, custom_http_exception_handler
)
