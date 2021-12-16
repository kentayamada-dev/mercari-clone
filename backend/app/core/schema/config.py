from typing import Literal
from pydantic import BaseSettings, PostgresDsn


class Settings(BaseSettings):
    SECRET_KEY: str
    SQLALCHEMY_DATABASE_URI: PostgresDsn
    ENVIRONMENT: Literal["production", "development"]
    CLOUDINARY_CLOUD_NAME: str
    CLOUDINARY_API_KEY: str
    CLOUDINARY_API_SECRET: str

    class Config:
        env_file = ".env"


settings = Settings()