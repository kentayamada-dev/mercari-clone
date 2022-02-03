from app.schema.common import GetAllItem, LikedSeller
from app.schema.seller import BaseSeller
from pydantic import BaseModel, Extra, HttpUrl


class CreateItem(BaseModel):
    description: str
    name: str
    price: int
    image_url: HttpUrl

    class Config:
        extra = Extra.forbid
        orm_mode = True


class AddItem(GetAllItem):
    description: str

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
    seller: BaseSeller
    liked_sellers: list[LikedSeller]

    class Config:
        extra = Extra.forbid
        orm_mode = True
