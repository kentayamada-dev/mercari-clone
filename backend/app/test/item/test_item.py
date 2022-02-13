from app.test.client import client, temp_db
from app.test.common_functions import (
    create_item_1,
    create_item_2,
    create_user_1,
    create_user_1_token,
)
from app.test.item.functions import delete_item, read_item, read_items
from app.test.sample_data import item_1_typed, item_2_typed
from fastapi import status


@temp_db
def test_create_item() -> None:
    create_user_1()
    _, secret = create_user_1_token()
    response, created_item_1 = create_item_1(secret)

    assert response.status_code == status.HTTP_201_CREATED
    assert created_item_1.price == item_1_typed.price
    assert created_item_1.image_url == item_1_typed.image_url
    assert created_item_1.name == item_1_typed.name
    assert created_item_1.description == item_1_typed.description


@temp_db
def test_create_item_with_invalid_price() -> None:
    create_user_1()
    _, secret = create_user_1_token()
    response = client.post(
        "/items",
        json={
            "name": "name_1",
            "price": 200,
            "description": "desc_1",
            "image_url": "http://image.com/item_1.jpg",
        },
        headers={"Authorization": f"{secret.token_type} {secret.access_token}"},
    )

    assert response.status_code == status.HTTP_400_BAD_REQUEST
    assert response.json() == {"message": "price not valid"}


@temp_db
def test_read_items() -> None:
    create_user_1()
    _, secret = create_user_1_token()
    create_item_1(secret)
    create_item_2(secret)
    response, created_items = read_items()
    item_a = created_items.data[0]
    item_b = created_items.data[1]

    assert response.status_code == status.HTTP_200_OK
    assert not created_items.skip
    assert item_2_typed.name == item_a.name
    assert item_2_typed.image_url == item_a.image_url
    assert not item_a.order
    assert item_1_typed.name == item_b.name
    assert item_1_typed.image_url == item_b.image_url
    assert not item_b.order


@temp_db
def test_read_item() -> None:
    _, user = create_user_1()
    _, secret = create_user_1_token()
    _, created_item_1 = create_item_1(secret)
    response, item = read_item(f"{created_item_1.id}")

    assert response.status_code == status.HTTP_200_OK
    assert item.price == item_1_typed.price
    assert item.image_url == item_1_typed.image_url
    assert item.name == item_1_typed.name
    assert item.description == item_1_typed.description
    assert item.user.id == user.id
    assert item.user.name == user.name
    assert item.user.image_url == user.image_url
    assert not item.liked_users
    assert not item.order


@temp_db
def test_read_not_existing_item() -> None:
    response = client.get("/items/6e9a4d65-dea1-47d6-aa9d-40686486be09")

    assert response.status_code == status.HTTP_404_NOT_FOUND
    assert response.json() == {"message": "item not found"}


@temp_db
def test_delete_item() -> None:
    create_user_1()
    _, secret = create_user_1_token()
    _, created_item_1 = create_item_1(secret)
    response, _ = delete_item(f"{created_item_1.id}", secret)

    assert response.status_code == status.HTTP_200_OK


@temp_db
def test_delete_not_existing_item() -> None:
    create_user_1()
    _, secret = create_user_1_token()
    response = client.delete(
        "/items/67fc14fa-b152-47dc-8872-3054d539a811",
        headers={"Authorization": f"{secret.token_type} {secret.access_token}"},
    )

    assert response.status_code == status.HTTP_404_NOT_FOUND
    assert response.json() == {"message": "item not found"}
