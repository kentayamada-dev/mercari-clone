from typing import Any, Generator

import cloudinary
from app.core.schema.config import settings
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker


class RepresentableBase:
    def __repr__(self) -> str:
        columns = "".join(
            [f"\n\t{k} = {v}" for k, v in self.__dict__.items() if k[0] != "_"]
        )

        return f"\n<{self.__class__.__name__}({columns}\n)>\n"


cloudinary.config(
    cloud_name=settings.CLOUDINARY_CLOUD_NAME,
    api_key=settings.CLOUDINARY_API_KEY,
    api_secret=settings.CLOUDINARY_API_SECRET,
)

engine = create_engine(
    settings.SQLALCHEMY_DATABASE_URI, pool_pre_ping=True, echo=True
)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base(cls=RepresentableBase)


def get_db() -> Generator[Any, None, None]:
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


def create_table() -> None:
    Base.metadata.create_all(bind=engine)


def delete_table() -> None:
    Base.metadata.drop_all(bind=engine)


def init_db() -> None:
    delete_table()
    create_table()
