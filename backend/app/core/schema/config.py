from pydantic import BaseSettings, PostgresDsn


class Settings(BaseSettings):
    SECRET_KEY: str
    SQLALCHEMY_DATABASE_URI: PostgresDsn
    CLOUDINARY_CLOUD_NAME: str
    CLOUDINARY_API_KEY: str
    CLOUDINARY_API_SECRET: str

    class Config:
        case_sensitive = True
        env_file = ".env"


settings = Settings()
