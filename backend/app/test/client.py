from typing import Any, Callable, Generator

from app.db.database import get_db
from app.main import app
from fastapi.testclient import TestClient

client = TestClient(app)


def temp_db(f: Any) -> Callable[[Any, Any, Any], None]:
    def func(SessionLocal: Any, *args: Any, **kwargs: Any) -> None:
        def override_get_db() -> Generator[Any, None, None]:
            try:
                db = SessionLocal()
                yield db
            finally:
                db.close()

        app.dependency_overrides[get_db] = override_get_db
        f(*args, **kwargs)
        app.dependency_overrides[get_db] = get_db

    return func
