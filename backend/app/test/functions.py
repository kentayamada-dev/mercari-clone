from app.schema.item import ItemInDatabase
from app.schema.seller import SellerInDatabase
from app.test.client import client
from app.test.sample_data import (
    item_1_raw,
    item_2_raw,
    seller_1_raw,
    seller_2_raw,
)
from requests import Response


def create_seller_1() -> tuple[Response, SellerInDatabase]:
    response = client.post("/sellers", json=seller_1_raw)
    return response, SellerInDatabase(**response.json())


def create_seller_2() -> tuple[Response, SellerInDatabase]:
    response = client.post("/sellers", json=seller_2_raw)
    return response, SellerInDatabase(**response.json())


def create_item_1(created_seller_id: str) -> tuple[Response, ItemInDatabase]:
    response = client.post(
        f"/sellers/{created_seller_id}/items", json=item_1_raw.dict()
    )
    return response, ItemInDatabase(**response.json())


def create_item_2(created_seller_id: str) -> tuple[Response, ItemInDatabase]:
    response = client.post(
        f"/sellers/{created_seller_id}/items", json=item_2_raw.dict()
    )
    return response, ItemInDatabase(**response.json())
