from typing import Any
from uuid import UUID

from app.schema.common import Seller
from app.schema.item import ItemRead
from pydantic import BaseModel, EmailStr, Extra, HttpUrl, SecretStr, validator


class SellerBase(BaseModel):
    name: str
    email: EmailStr
    image_url: HttpUrl

    @validator("email", pre=True, always=True)
    def username_alphanumeric(cls: Any, v: Any) -> Any:
        assert v.islower(), "must be lowercase"
        return v

    class Config:
        extra = Extra.forbid
        orm_mode = True


class SellerRead(SellerBase):
    id: UUID
    items: list[ItemRead]


class SellerCreate(SellerBase):
    password: SecretStr


class SellerInDatabase(Seller):
    items: list[ItemRead]


class GetSellerByEmail(SellerRead):
    password: SecretStr
    is_active: bool


class GetAuthenticateSellerByEmail(BaseModel):
    email: EmailStr
    password: str
