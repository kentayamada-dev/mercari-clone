from app.core.schema.jwt import Secret
from app.schema.user import GetUserById, InactivateUser, ReadUsers
from app.test.client import client, temp_db
from app.test.functions import create_item_1, create_user_1, create_user_2
from app.test.sample_data import (
    item_1_typed,
    user_1_raw_get,
    user_1_typed,
    user_2_typed,
)
from fastapi import status


@temp_db
def test_create_user() -> None:
    response, _ = create_user_1()

    assert response.status_code == status.HTTP_201_CREATED
    assert user_1_raw_get.items() <= response.json().items()


@temp_db
def test_create_user_missed_password() -> None:
    response = client.post(
        "/users",
        json={
            "name": "name_1",
            "email": "email_1@gmail.com",
            "image_url": "http://image.com/user_1.jpg",
        },
    )

    assert response.status_code == status.HTTP_422_UNPROCESSABLE_ENTITY
    assert response.json() == {"message": "password field required"}


@temp_db
def test_create_user_invalid_url() -> None:
    response = client.post(
        "/users",
        json={
            "name": "name_1",
            "email": "email_1@gmail.com",
            "password": "password_1",
            "image_url": "invalid_url",
        },
    )

    assert response.status_code == status.HTTP_422_UNPROCESSABLE_ENTITY
    assert response.json() == {
        "message": "image_url invalid or missing URL scheme"
    }


@temp_db
def test_create_existing_user() -> None:
    create_user_1()
    response = client.post(
        "/users",
        json={
            "name": "name_2",
            "email": "email_1@gmail.com",
            "password": "password_2",
            "image_url": "http://image.com/user_1.jpg",
        },
    )

    assert response.status_code == status.HTTP_400_BAD_REQUEST
    assert response.json() == {"message": "email already exists"}


@temp_db
def test_read_users() -> None:
    create_user_1()
    create_user_2()
    response = client.get("/users?skip=0&limit=3")
    response_data = response.json()
    users = ReadUsers(**response_data)
    user_a = users.data[0]
    user_b = users.data[1]

    assert response.status_code == status.HTTP_200_OK
    assert users.skip is None
    assert user_2_typed.name == user_a.name
    assert user_2_typed.image_url == user_a.image_url
    assert user_1_typed.name == user_b.name
    assert user_1_typed.image_url == user_b.image_url


@temp_db
def test_read_user() -> None:
    _, created_user_1 = create_user_1()
    created_user_1_id = created_user_1.id
    response_token = client.post(
        "/token",
        data={
            "username": user_1_typed.email,
            "password": user_1_typed.password.get_secret_value(),
        },
    )
    secret = Secret(**response_token.json())
    create_item_1(secret.access_token)
    response = client.get(f"/users/{created_user_1_id}")
    response_data = response.json()
    created_user = GetUserById(**response_data)

    assert response.status_code == status.HTTP_200_OK
    assert created_user.name == user_1_typed.name
    assert created_user.image_url == user_1_typed.image_url
    assert created_user.items[0].price == item_1_typed.price
    assert created_user.items[0].image_url == item_1_typed.image_url
    assert created_user.items[0].name == item_1_typed.name


@temp_db
def test_read_not_existing_user() -> None:
    response = client.get("/users/6e9a4d65-dea1-47d6-aa9d-40686486be09")

    assert response.status_code == status.HTTP_404_NOT_FOUND
    assert response.json() == {"message": "user not found"}


@temp_db
def test_inactivate_user() -> None:
    create_user_1()
    response_token = client.post(
        "/token",
        data={
            "username": user_1_typed.email,
            "password": user_1_typed.password.get_secret_value(),
        },
    )
    secret = Secret(**response_token.json())
    response = client.patch(
        "/users/me/inactivate",
        headers={"Authorization": f"Bearer {secret.access_token}"},
    )
    user = InactivateUser(**response.json())

    assert response.status_code == status.HTTP_200_OK
    assert user.is_active is False


@temp_db
def test_inactivate_inactivated_user() -> None:
    create_user_1()
    response_token = client.post(
        "/token",
        data={
            "username": user_1_typed.email,
            "password": user_1_typed.password.get_secret_value(),
        },
    )
    secret = Secret(**response_token.json())
    client.patch(
        "/users/me/inactivate",
        headers={"Authorization": f"Bearer {secret.access_token}"},
    )
    response = client.patch(
        "/users/me/inactivate",
        headers={"Authorization": f"Bearer {secret.access_token}"},
    )

    assert response.status_code == status.HTTP_400_BAD_REQUEST
    assert response.json() == {"message": "cannot read inactivated user"}


@temp_db
def test_read_inactivate_me() -> None:
    create_user_1()
    response_token = client.post(
        "/token",
        data={
            "username": user_1_typed.email,
            "password": user_1_typed.password.get_secret_value(),
        },
    )
    secret = Secret(**response_token.json())
    client.patch(
        "/users/me/inactivate",
        headers={"Authorization": f"Bearer {secret.access_token}"},
    )
    response = client.get(
        "/users/me/",
        headers={"Authorization": f"Bearer {secret.access_token}"},
    )

    assert response.status_code == status.HTTP_400_BAD_REQUEST
    assert response.json() == {"message": "cannot read inactivated user"}


@temp_db
def test_read_me() -> None:
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
    response = client.get(
        "/users/me/",
        headers={"Authorization": f"Bearer {secret.access_token}"},
    )
    response_data = response.json()
    created_user = GetUserById(**response_data)

    assert response.status_code == status.HTTP_200_OK
    assert created_user.name == user_1_typed.name
    assert created_user.image_url == user_1_typed.image_url
    assert created_user.items[0].price == item_1_typed.price
    assert created_user.items[0].image_url == item_1_typed.image_url
    assert created_user.items[0].name == item_1_typed.name
