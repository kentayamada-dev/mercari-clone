from pydantic import BaseModel, Extra
from uuid import UUID


class AddOrder(BaseModel):
    item_id: UUID
    user_id: UUID

    class Config:
        extra = Extra.forbid
        orm_mode = True


class OrderCreate(BaseModel):
    item_id: UUID

    class Config:
        extra = Extra.forbid
        orm_mode = True
