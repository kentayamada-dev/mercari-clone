from app.test.client import client, temp_db
from app.test.common_functions import create_item_1, create_user_1
from app.test.order.functions import create_order
from fastapi import status


@temp_db
def test_create_order_with_ordered_item() -> None:
    _, secret = create_user_1()
    _, created_item_1 = create_item_1(secret)
    create_order(f"{created_item_1.id}", secret)
    response = client.post(
        "/orders",
        json={
            "item_id": f"{created_item_1.id}",
        },
        headers={"Authorization": f"{secret.token_type} {secret.access_token}"},
    )

    assert response.status_code == status.HTTP_400_BAD_REQUEST
    assert response.json() == {"message": "item already ordered"}


@temp_db
def test_create_like_with_not_found_item() -> None:
    _, secret = create_user_1()
    response = client.post(
        "/orders",
        json={
            "item_id": "6e9a4d65-dea1-47d6-aa9d-40686486be09",
        },
        headers={"Authorization": f"{secret.token_type} {secret.access_token}"},
    )

    assert response.status_code == status.HTTP_400_BAD_REQUEST
    assert response.json() == {"message": "item not exists"}


@temp_db
def test_create_order() -> None:
    _, secret = create_user_1()
    _, created_item_1 = create_item_1(secret)
    response, _ = create_order(f"{created_item_1.id}", secret)

    assert response.status_code == status.HTTP_201_CREATED
