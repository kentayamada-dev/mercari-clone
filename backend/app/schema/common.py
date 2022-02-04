from pydantic import BaseModel, HttpUrl, Extra
from uuid import UUID


class LikedUser(BaseModel):
    id: UUID

    class Config:
        extra = Extra.forbid
        orm_mode = True


class RemoveItem(BaseModel):
    id: UUID

    class Config:
        extra = Extra.forbid
        orm_mode = True


class GetAllItem(RemoveItem):
    id: UUID
    price: int
    image_url: HttpUrl
    name: str

    class Config:
        extra = Extra.forbid
        orm_mode = True
