from uuid import UUID

from pydantic import BaseModel, Extra


class QueryCreate(BaseModel):
    query: str

    class Config:
        extra = Extra.forbid
        orm_mode = True


class GetAllQuery(QueryCreate):
    id: UUID

    class Config:
        extra = Extra.forbid
        orm_mode = True


class ReadQueries(BaseModel):
    data: list[GetAllQuery]
    skip: int | None

    class Config:
        extra = Extra.forbid
        orm_mode = True


class RemoveQuery(BaseModel):
    id: UUID

    class Config:
        extra = Extra.forbid
        orm_mode = True
