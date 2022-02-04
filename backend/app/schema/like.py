from pydantic import BaseModel, Extra
from uuid import UUID


class AddLike(BaseModel):
    item_id: UUID
    user_id: UUID

    class Config:
        extra = Extra.forbid
        orm_mode = True


class RemoveLike(BaseModel):
    id: UUID

    class Config:
        extra = Extra.forbid
        orm_mode = True
