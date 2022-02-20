from pydantic import BaseModel, Extra
from uuid import UUID


class LikeResponse(BaseModel):
    item_id: UUID
    user_id: UUID

    class Config:
        extra = Extra.forbid
        orm_mode = True


class LikeCreate(BaseModel):
    item_id: UUID

    class Config:
        extra = Extra.forbid
        orm_mode = True
