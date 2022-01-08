from fastapi import FastAPI, exceptions
from fastapi.middleware.cors import CORSMiddleware

from app.core.error.http_exception import custom_http_exception_handler
from app.core.error.validation import custom_validation_exception_handler
from app.core.schema.config import settings
from app.db.database import create_table
from app.router import auth, image, item, seller, root

create_table()

app = FastAPI(title="Mercari Clone API")

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
app.include_router(seller.router)
app.include_router(root.router)

app.add_exception_handler(
    exceptions.RequestValidationError, custom_validation_exception_handler
)
app.add_exception_handler(
    exceptions.HTTPException, custom_http_exception_handler
)
