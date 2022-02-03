from app.schema.item import AddItem
from app.schema.seller import AddSeller
from app.test.client import client
from app.test.sample_data import (
    item_1_typed,
    item_2_typed,
    seller_1_raw,
    seller_2_raw,
)
from requests import Response


def create_seller_1() -> tuple[Response, AddSeller]:
    response = client.post("/sellers", json=seller_1_raw)
    return response, AddSeller(**response.json())


def create_seller_2() -> tuple[Response, AddSeller]:
    response = client.post("/sellers", json=seller_2_raw)
    return response, AddSeller(**response.json())


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
