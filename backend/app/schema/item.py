from typing import Any

from app.schema.common import Base, GetAllItem
from app.schema.user import BaseUser
from pydantic import BaseModel, Extra, HttpUrl, validator


class CreateItem(BaseModel):
    description: str
    name: str
    price: int
    image_url: HttpUrl

    @validator("price", pre=True, always=True)
    def price_validator(cls: Any, v: Any) -> Any:
        if not 300 <= v <= 9999999:
            raise ValueError("price must be between 300 and 9999999")
        return v

    class Config:
        extra = Extra.forbid
        orm_mode = True


class AddItem(Base):
    price: int
    image_url: HttpUrl
    name: str

    class Config:
        extra = Extra.forbid
        orm_mode = True


class ReadItems(BaseModel):
    data: list[GetAllItem]
    skip: int | None

    class Config:
        extra = Extra.forbid
        orm_mode = True


class GetItemById(GetAllItem):
    description: str
    user: BaseUser
    liked_users: list[Base]

    class Config:
        extra = Extra.forbid
        orm_mode = True
