from pydantic import BaseModel


class ImageModel(BaseModel):
    url: str
