from pydantic import BaseModel, Extra


class Message(BaseModel):
    message: str

    class Config:
        extra = Extra.forbid
        orm_mode = True
