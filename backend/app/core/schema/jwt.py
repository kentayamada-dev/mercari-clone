from pydantic import BaseModel


class Secret(BaseModel):
    access_token: str
    token_type: str


class TokenData(BaseModel):
    email: str
