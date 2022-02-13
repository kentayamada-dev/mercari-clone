from app.test.client import client, temp_db
from app.test.common_functions import create_item_1, create_user_1, create_user_1_token
from app.test.like.functions import create_like, delete_like
from fastapi import status


@temp_db
def test_create_like_with_already_liked() -> None:
    create_user_1()
    _, secret = create_user_1_token()
    _, created_item_1 = create_item_1(secret)
    create_like(f"{created_item_1.id}", secret)
    response = client.post(
        "/likes",
        json={
            "item_id": f"{created_item_1.id}",
        },
        headers={"Authorization": f"{secret.token_type} {secret.access_token}"},
    )

    assert response.status_code == status.HTTP_400_BAD_REQUEST
    assert response.json() == {"message": "item already liked"}


@temp_db
def test_create_like_with_not_found_item() -> None:
    create_user_1()
    _, secret = create_user_1_token()
    response = client.post(
        "/likes",
        json={
            "item_id": "6e9a4d65-dea1-47d6-aa9d-40686486be09",
        },
        headers={"Authorization": f"{secret.token_type} {secret.access_token}"},
    )

    assert response.status_code == status.HTTP_400_BAD_REQUEST
    assert response.json() == {"message": "item not exists"}


@temp_db
def test_create_like() -> None:
    create_user_1()
    _, secret = create_user_1_token()
    _, created_item_1 = create_item_1(secret)
    response, _ = create_like(f"{created_item_1.id}", secret)

    assert response.status_code == status.HTTP_201_CREATED


@temp_db
def test_delete_like() -> None:
    create_user_1()
    _, secret = create_user_1_token()
    _, created_item_1 = create_item_1(secret)
    create_like(f"{created_item_1.id}", secret)
    response, _ = delete_like(f"{created_item_1.id}", secret)

    assert response.status_code == status.HTTP_200_OK


@temp_db
def test_delete_like_with_not_found() -> None:
    create_user_1()
    _, secret = create_user_1_token()
    _, created_item_1 = create_item_1(secret)
    response = client.delete(
        f"/likes/{created_item_1.id}",
        headers={"Authorization": f"{secret.token_type} {secret.access_token}"},
    )

    assert response.status_code == status.HTTP_404_NOT_FOUND
    assert response.json() == {"message": "like not found"}
