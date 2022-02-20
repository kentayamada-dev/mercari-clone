from pydantic import BaseModel, Extra
from uuid import UUID


class AddOrder(BaseModel):
    id: UUID
    item_id: UUID

    class Config:
        extra = Extra.forbid
        orm_mode = True


class OrderCreate(BaseModel):
    item_id: UUID

    class Config:
        extra = Extra.forbid
        orm_mode = True
