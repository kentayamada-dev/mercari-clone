from datetime import datetime
from typing import List
from uuid import UUID

from app.schema.item import Item
from pydantic import BaseModel, EmailStr, Extra, SecretStr, HttpUrl


class SellerBase(BaseModel):
    name: str
    email: EmailStr
    image_url: HttpUrl

    class Config:
        extra = Extra.forbid
        orm_mode = True


class SellerCreate(SellerBase):
    password: SecretStr

    class Config:
        extra = Extra.forbid
        orm_mode = True


class Seller(SellerBase):
    id: UUID
    items: List[Item] = []
    is_active: bool
    created_at: datetime
    updated_at: datetime

    class Config:
        extra = Extra.forbid
        orm_mode = True


class SellerInDatabase(Seller):
    password: SecretStr

    class Config:
        extra = Extra.forbid
        orm_mode = True
