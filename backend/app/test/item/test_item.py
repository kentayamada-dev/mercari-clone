from app.core.schema.jwt import Secret
from app.schema.item import GetItemById, ReadItems
from app.test.client import client, temp_db
from app.test.functions import create_item_1, create_item_2, create_user_1
from app.test.sample_data import item_1_typed, item_2_typed, user_1_typed
from fastapi import status


@temp_db
def test_create_item() -> None:
    create_user_1()
    response_token = client.post(
        "/token",
        data={
            "username": user_1_typed.email,
            "password": user_1_typed.password.get_secret_value(),
        },
    )
    secret = Secret(**response_token.json())
    response, _ = create_item_1(secret.access_token)

    assert response.status_code == status.HTTP_201_CREATED
    assert item_1_typed.dict().items() <= response.json().items()


@temp_db
def test_create_item_bad_request() -> None:
    response = client.post(
        "/items",
        json=item_1_typed.dict(),
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
    create_user_1()
    response_token = client.post(
        "/token",
        data={
            "username": user_1_typed.email,
            "password": user_1_typed.password.get_secret_value(),
        },
    )
    secret = Secret(**response_token.json())
    create_item_1(secret.access_token)
    create_item_2(secret.access_token)
    response = client.get("/items?skip=0&limit=3")
    response_data = response.json()
    created_items = ReadItems(**response_data)
    item_a = created_items.data[0]
    item_b = created_items.data[1]

    assert response.status_code == status.HTTP_200_OK
    assert created_items.skip is None
    assert item_2_typed.name == item_a.name
    assert item_2_typed.image_url == item_a.image_url
    assert item_1_typed.name == item_b.name
    assert item_1_typed.image_url == item_b.image_url


@temp_db
def test_read_item() -> None:
    _, user = create_user_1()
    response_token = client.post(
        "/token",
        data={
            "username": user_1_typed.email,
            "password": user_1_typed.password.get_secret_value(),
        },
    )
    secret = Secret(**response_token.json())
    _, created_item_1 = create_item_1(secret.access_token)
    response = client.get(f"/items/{created_item_1.id}")
    item = GetItemById(**response.json())

    assert response.status_code == status.HTTP_200_OK
    assert item.price == item_1_typed.price
    assert item.image_url == item_1_typed.image_url
    assert item.name == item_1_typed.name
    assert item.description == item_1_typed.description
    assert item.user.id == user.id
    assert item.user.name == user.name
    assert item.user.image_url == user.image_url
    assert not item.liked_users


@temp_db
def test_read_not_existing_item() -> None:
    response = client.get("/items/6e9a4d65-dea1-47d6-aa9d-40686486be09")

    assert response.status_code == status.HTTP_404_NOT_FOUND
    assert response.json() == {"message": "item not found"}


@temp_db
def test_delete_item() -> None:
    create_user_1()
    response_token = client.post(
        "/token",
        data={
            "username": user_1_typed.email,
            "password": user_1_typed.password.get_secret_value(),
        },
    )
    secret = Secret(**response_token.json())
    _, created_item_1 = create_item_1(secret.access_token)
    response = client.delete(
        f"/items/{created_item_1.id}",
        headers={"Authorization": f"Bearer {secret.access_token}"},
    )

    assert response.status_code == status.HTTP_200_OK


@temp_db
def test_delete_not_existing_item() -> None:
    create_user_1()
    response_token = client.post(
        "/token",
        data={
            "username": user_1_typed.email,
            "password": user_1_typed.password.get_secret_value(),
        },
    )
    secret = Secret(**response_token.json())
    response = client.delete(
        "/items/67fc14fa-b152-47dc-8872-3054d539a811",
        headers={"Authorization": f"Bearer {secret.access_token}"},
    )

    assert response.status_code == status.HTTP_404_NOT_FOUND
    assert response.json() == {"message": "item not found"}
