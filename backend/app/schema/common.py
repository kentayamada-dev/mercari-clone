from pydantic import BaseModel, EmailStr, HttpUrl, SecretStr, Extra
from uuid import UUID
from datetime import datetime


class Seller(BaseModel):
    name: str
    email: EmailStr
    image_url: HttpUrl
    id: UUID
    password: SecretStr
    is_active: bool
    created_at: datetime
    updated_at: datetime

    class Config:
        extra = Extra.forbid
        orm_mode = True
