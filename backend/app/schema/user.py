from typing import Any
from uuid import UUID
from app.schema.common import GetAllItem
from pydantic import BaseModel, EmailStr, Extra, HttpUrl, SecretStr, validator


class CreateUser(BaseModel):
    password: SecretStr
    name: str
    email: EmailStr
    image_url: HttpUrl

    @validator("email", pre=True, always=True)
    def username_alphanumeric(cls: Any, v: Any) -> Any:
        assert v.islower(), "must be lowercase"
        return v

    class Config:
        extra = Extra.forbid
        orm_mode = True


class InactivateUser(BaseModel):
    id: UUID
    is_active: bool

    class Config:
        extra = Extra.forbid
        orm_mode = True


class GetUserByEmail(InactivateUser):
    email: EmailStr
    password: str

    class Config:
        extra = Extra.forbid
        orm_mode = True


class BaseUser(BaseModel):
    id: UUID
    name: str
    image_url: HttpUrl

    class Config:
        extra = Extra.forbid
        orm_mode = True


class AddUser(BaseUser):
    email: EmailStr

    class Config:
        extra = Extra.forbid
        orm_mode = True


class ReadUsers(BaseModel):
    data: list[BaseUser]
    skip: int | None

    class Config:
        extra = Extra.forbid
        orm_mode = True


class GetUserById(BaseUser):
    items: list[GetAllItem]

    class Config:
        extra = Extra.forbid
        orm_mode = True
