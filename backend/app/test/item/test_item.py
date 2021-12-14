from app.schema.item import ItemRead
from app.test.client import client, temp_db
from app.test.functions import create_item_1, create_item_2, create_seller_1
from app.test.sample_data import item_1_raw, item_2_raw
from fastapi import status


@temp_db
def test_create_item() -> None:
    _, created_seller_1 = create_seller_1()
    response, _ = create_item_1(str(created_seller_1.id))

    assert response.status_code == status.HTTP_201_CREATED
    assert item_1_raw.dict().items() <= response.json().items()


@temp_db
def test_create_item_bad_request() -> None:
    response = client.post(
        "/sellers/328484c0-71ed-41e5-9113-82a0b0e08db8/items",
        json=item_1_raw.dict(),
    )
    assert response.status_code == status.HTTP_400_BAD_REQUEST
    assert response.json() == {"message": "user not exists"}


@temp_db
def test_read_items() -> None:
    _, created_seller_1 = create_seller_1()
    create_item_1(str(created_seller_1.id))
    create_item_2(str(created_seller_1.id))
    response = client.get("/items")
    response_data = response.json()
    created_item_1 = ItemRead(**response_data[0])
    created_item_2 = ItemRead(**response_data[1])

    assert response.status_code == status.HTTP_200_OK
    assert item_1_raw.image_url == created_item_1.image_url
    assert item_1_raw.price == created_item_1.price
    assert item_2_raw.image_url == created_item_2.image_url
    assert item_2_raw.price == created_item_2.price


@temp_db
def test_read_item() -> None:
    _, created_seller_1 = create_seller_1()
    _, created_item_1 = create_item_1(str(created_seller_1.id))
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
    _, created_seller_1 = create_seller_1()
    _, created_item_1 = create_item_1(str(created_seller_1.id))
    response = client.delete(f"/items/{created_item_1.id}")

    assert response.status_code == status.HTTP_200_OK
    assert item_1_raw.dict().items() <= response.json().items()


@temp_db
def test_delete_not_existing_item() -> None:
    response = client.delete("/items/6e9a4d65-dea1-47d6-aa9d-40686486be09")

    assert response.status_code == status.HTTP_404_NOT_FOUND
    assert response.json() == {"message": "item not found"}
