from pydantic import BaseModel, Extra


class Secret(BaseModel):
    access_token: str
    token_type: str

    class Config:
        extra = Extra.forbid
        orm_mode = True


class TokenData(BaseModel):
    email: str

    class Config:
        extra = Extra.forbid
        orm_mode = True
