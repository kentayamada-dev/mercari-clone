from app.schema.item import Item
from app.schema.seller import Seller
from app.test.client import client
from app.test.sample_data import (
    item_1_raw,
    item_2_raw,
    seller_1_raw,
    seller_2_raw,
)
from requests import Response


def create_seller_1() -> tuple[Response, Seller]:
    response = client.post("/sellers", json=seller_1_raw)
    return response, Seller(**response.json())


def create_seller_2() -> tuple[Response, Seller]:
    response = client.post("/sellers", json=seller_2_raw)
    return response, Seller(**response.json())


def create_item_1(created_seller_id: str) -> tuple[Response, Item]:
    response = client.post(
        f"/sellers/{created_seller_id}/items", json=item_1_raw.dict()
    )
    return response, Item(**response.json())


def create_item_2(created_seller_id: str) -> tuple[Response, Item]:
    response = client.post(
        f"/sellers/{created_seller_id}/items", json=item_2_raw.dict()
    )
    return response, Item(**response.json())
