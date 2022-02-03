from pydantic import BaseModel, Extra
from uuid import UUID


class AddLike(BaseModel):
    item_id: UUID
    seller_id: UUID

    class Config:
        extra = Extra.forbid
        orm_mode = True
