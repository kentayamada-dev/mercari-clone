from app.schema.common import GetAllItem, Base
from app.schema.user import BaseUser
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
    user: BaseUser
    liked_users: list[Base]

    class Config:
        extra = Extra.forbid
        orm_mode = True
