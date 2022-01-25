from datetime import datetime
from uuid import UUID

from app.schema.common import Seller
from pydantic import BaseModel, Extra


class QueryInDatabase(BaseModel):
    id: UUID
    query: str
    seller: Seller
    created_at: datetime
    updated_at: datetime

    class Config:
        extra = Extra.forbid
        orm_mode = True


class ReadQuery(BaseModel):
    id: UUID
    query: str

    class Config:
        extra = Extra.forbid
        orm_mode = True


class ReadQueries(BaseModel):
    data: list[ReadQuery]
    skip: int | None

    class Config:
        extra = Extra.forbid
        orm_mode = True
