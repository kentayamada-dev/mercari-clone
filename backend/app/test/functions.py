from app.schema.item import AddItem
from app.schema.user import AddUser
from app.test.client import client
from app.test.sample_data import (
    item_1_typed,
    item_2_typed,
    user_1_raw,
    user_2_raw,
)
from requests import Response


def create_user_1() -> tuple[Response, AddUser]:
    response = client.post("/users", json=user_1_raw)
    return response, AddUser(**response.json())


def create_user_2() -> tuple[Response, AddUser]:
    response = client.post("/users", json=user_2_raw)
    return response, AddUser(**response.json())


def create_item_1(token: str) -> tuple[Response, AddItem]:
    response = client.post(
        "/items",
        json=item_1_typed.dict(),
        headers={"Authorization": f"Bearer {token}"},
    )
    return response, AddItem(**response.json())


def create_item_2(token: str) -> tuple[Response, AddItem]:
    response = client.post(
        "/items",
        json=item_2_typed.dict(),
        headers={"Authorization": f"Bearer {token}"},
    )
    return response, AddItem(**response.json())
