from typing import Any

from app.schema.common import Base, GetAllItem
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


class InactivateUser(Base):
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


class BaseUser(Base):
    name: str
    image_url: HttpUrl

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
