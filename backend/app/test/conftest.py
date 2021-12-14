from typing import Generator

import pytest
from app.db.database import Base
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker


@pytest.fixture(scope="function")
def SessionLocal() -> Generator[sessionmaker, None, None]:
    TEST_SQLALCHEMY_DATABASE_URL = (
        "postgresql://postgres:postgres@localhost:5433/test"
    )
    engine = create_engine(TEST_SQLALCHEMY_DATABASE_URL)

    Base.metadata.drop_all(bind=engine)
    Base.metadata.create_all(bind=engine)
    TestSessionLocal = sessionmaker(
        autocommit=False, autoflush=False, bind=engine
    )

    yield TestSessionLocal
