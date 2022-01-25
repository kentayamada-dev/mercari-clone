from app.core.schema.jwt import Secret
from app.schema.item import ReadItems
from app.test.client import client, temp_db
from app.test.functions import create_item_1, create_item_2, create_seller_1
from app.test.sample_data import item_1_raw, item_2_raw
from fastapi import status
from app.test.sample_data import (
    seller_1_typed,
)


@temp_db
def test_create_item() -> None:
    create_seller_1()
    response_token = client.post(
        "/token",
        data={
            "username": seller_1_typed.email,
            "password": seller_1_typed.password.get_secret_value(),
        },
    )
    secret = Secret(**response_token.json())
    response, _ = create_item_1(secret.access_token)

    assert response.status_code == status.HTTP_201_CREATED
    assert item_1_raw.dict().items() <= response.json().items()


@temp_db
def test_create_item_bad_request() -> None:
    response = client.post(
        "/items",
        json=item_1_raw.dict(),
        headers={
            "Authorization": (
                "Bearer"
                "random_token_zI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2NDMxMTUyNDksImVtYWlsIjoic2F0b3NvdGFyb0BleGFtcGxlLm9yZyJ9.sUSsxEDFEqkuwEnldguvbJLx5u45PrwdzLqhTCLuMvY"
            )
        },
    )
    assert response.status_code == status.HTTP_401_UNAUTHORIZED
    assert response.json() == {"message": "Not authenticated"}


@temp_db
def test_read_items() -> None:
    create_seller_1()
    response_token = client.post(
        "/token",
        data={
            "username": seller_1_typed.email,
            "password": seller_1_typed.password.get_secret_value(),
        },
    )
    secret = Secret(**response_token.json())
    create_item_1(secret.access_token)
    create_item_2(secret.access_token)
    response = client.get("/items?skip=0&limit=3")
    response_data = response.json()
    created_items = ReadItems(**response_data)

    assert response.status_code == status.HTTP_200_OK
    assert item_1_raw.image_url == created_items.data[1].image_url
    assert item_1_raw.price == created_items.data[1].price
    assert item_1_raw.name == created_items.data[1].name
    assert item_2_raw.image_url == created_items.data[0].image_url
    assert item_2_raw.price == created_items.data[0].price
    assert item_2_raw.name == created_items.data[0].name
    assert created_items.skip is None


@temp_db
def test_read_item() -> None:
    create_seller_1()
    response_token = client.post(
        "/token",
        data={
            "username": seller_1_typed.email,
            "password": seller_1_typed.password.get_secret_value(),
        },
    )
    secret = Secret(**response_token.json())
    _, created_item_1 = create_item_1(secret.access_token)
    response = client.get(f"/items/{created_item_1.id}")

    assert response.status_code == status.HTTP_200_OK
    assert item_1_raw.dict().items() <= response.json().items()


@temp_db
def test_read_not_existing_item() -> None:
    response = client.get("/items/6e9a4d65-dea1-47d6-aa9d-40686486be09")

    assert response.status_code == status.HTTP_404_NOT_FOUND
    assert response.json() == {"message": "item not found"}


@temp_db
def test_delete_item() -> None:
    create_seller_1()
    response_token = client.post(
        "/token",
        data={
            "username": seller_1_typed.email,
            "password": seller_1_typed.password.get_secret_value(),
        },
    )
    secret = Secret(**response_token.json())
    _, created_item_1 = create_item_1(secret.access_token)
    response = client.delete(
        f"/items/{created_item_1.id}",
        headers={"Authorization": f"Bearer {secret.access_token}"},
    )

    assert response.status_code == status.HTTP_200_OK
    assert item_1_raw.dict().items() <= response.json().items()


@temp_db
def test_delete_not_existing_item() -> None:
    create_seller_1()
    response_token = client.post(
        "/token",
        data={
            "username": seller_1_typed.email,
            "password": seller_1_typed.password.get_secret_value(),
        },
    )
    secret = Secret(**response_token.json())
    response = client.delete(
        "/items/67fc14fa-b152-47dc-8872-3054d539a811",
        headers={"Authorization": f"Bearer {secret.access_token}"},
    )

    assert response.status_code == status.HTTP_404_NOT_FOUND
    assert response.json() == {"message": "item not found"}
