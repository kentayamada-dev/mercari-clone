from datetime import datetime
from uuid import UUID

from app.schema.common import Seller
from pydantic import BaseModel, Extra, HttpUrl


class ItemBase(BaseModel):
    name: str
    price: int
    image_url: HttpUrl

    class Config:
        extra = Extra.forbid
        orm_mode = True


class ItemCreate(ItemBase):
    description: str


class ItemRead(ItemBase):
    id: UUID


class ItemInDatabase(ItemBase):
    id: UUID
    description: str
    seller: Seller
    created_at: datetime
    updated_at: datetime


class ReadItems(BaseModel):
    data: list[ItemRead]
    skip: int | None

    class Config:
        extra = Extra.forbid
        orm_mode = True
