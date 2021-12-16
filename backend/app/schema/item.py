from datetime import datetime
from uuid import UUID

from pydantic import BaseModel, Extra


class ItemBase(BaseModel):
    name: str
    price: int
    description: str
    image_url: str

    class Config:
        extra = Extra.forbid
        orm_mode = True


class ItemCreate(ItemBase):
    pass


class Item(ItemBase):
    id: UUID
    seller_id: UUID
    created_at: datetime
    updated_at: datetime

    class Config:
        extra = Extra.forbid
        orm_mode = True


class ItemRead(BaseModel):
    id: UUID
    price: int
    image_url: str

    class Config:
        extra = Extra.forbid
        orm_mode = True