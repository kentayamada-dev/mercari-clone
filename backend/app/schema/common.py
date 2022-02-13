from pydantic import BaseModel, HttpUrl, Extra
from uuid import UUID


class Base(BaseModel):
    id: UUID

    class Config:
        extra = Extra.forbid
        orm_mode = True


class GetAllItem(Base):
    price: int
    image_url: HttpUrl
    name: str
    order: Base | None

    class Config:
        extra = Extra.forbid
        orm_mode = True
