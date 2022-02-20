from app.test.client import client, temp_db
from app.test.common_functions import (
    create_item_1,
    create_user_1,
    create_user_1_token,
    create_user_2,
)
from app.test.sample_data import item_1_typed, user_1_typed, user_2_typed
from app.test.user.functions import (
    inactivate_user,
    read_me,
    read_user,
    read_users,
)
from fastapi import status


@temp_db
def test_create_user_with_existing_email() -> None:
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
    response, users = read_users()
    user_a = users.data[0]
    user_b = users.data[1]

    assert response.status_code == status.HTTP_200_OK
    assert users.skip is None
    assert user_2_typed.name == user_a.name
    assert user_2_typed.image_url == user_a.image_url
    assert user_1_typed.name == user_b.name
    assert user_1_typed.image_url == user_b.image_url


@temp_db
def test_read_user_with_invalid_email() -> None:
    response = client.post(
        "/token",
        data={
            "username": user_1_typed.email,
            "password": user_1_typed.password.get_secret_value(),
        },
    )

    assert response.status_code == status.HTTP_404_NOT_FOUND
    assert response.json() == {"message": "user not found"}


@temp_db
def test_read_user() -> None:
    _, secret = create_user_1()
    create_item_1(secret)
    _, users = read_users()
    user_1 = users.data[0]
    response, created_user = read_user(f"{user_1.id}")

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
    _, secret = create_user_1()
    response, user = inactivate_user(secret)

    assert response.status_code == status.HTTP_200_OK
    assert user.is_active is False


@temp_db
def test_read_inactivate_me() -> None:
    _, secret = create_user_1()
    inactivate_user(secret)
    response = client.get(
        "/users/me/",
        headers={"Authorization": f"{secret.token_type} {secret.access_token}"},
    )

    assert response.status_code == status.HTTP_400_BAD_REQUEST
    assert response.json() == {"message": "cannot read inactivated user"}


@temp_db
def test_read_me() -> None:
    _, secret = create_user_1()
    create_item_1(secret)
    response, created_me = read_me(secret)

    assert response.status_code == status.HTTP_200_OK
    assert created_me.name == user_1_typed.name
    assert created_me.image_url == user_1_typed.image_url
    assert created_me.items[0].price == item_1_typed.price
    assert created_me.items[0].image_url == item_1_typed.image_url
    assert created_me.items[0].name == item_1_typed.name


@temp_db
def test_read_me_with_invalid_token() -> None:
    response = client.get(
        "/users/me/",
        headers={"Authorization": "Bearer invalidToken"},
    )

    assert response.status_code == status.HTTP_401_UNAUTHORIZED
    assert response.json() == {"message": "invalid token"}
