from app.test.client import client, temp_db
from app.test.functions import create_user_1
from app.test.sample_data import user_1_typed, user_2_typed
from fastapi import status


@temp_db
def test_read_token() -> None:
    create_user_1()
    response = client.post(
        "/token",
        data={
            "username": user_1_typed.email,
            "password": user_1_typed.password.get_secret_value(),
        },
    )

    assert response.status_code == status.HTTP_201_CREATED
    assert set(response.json()) >= {"access_token", "token_type"}


@temp_db
def test_read_token_invalid_email() -> None:
    create_user_1()
    response = client.post(
        "/token",
        data={
            "username": user_2_typed.email,
            "password": user_1_typed.password.get_secret_value(),
        },
    )

    assert response.status_code == status.HTTP_404_NOT_FOUND
    assert response.json() == {"message": "user not found"}


@temp_db
def test_read_token_invalid_password() -> None:
    create_user_1()
    response = client.post(
        "/token",
        data={
            "username": user_1_typed.email,
            "password": user_2_typed.password.get_secret_value(),
            "image_url": user_1_typed.image_url,
        },
    )

    assert response.status_code == status.HTTP_401_UNAUTHORIZED
    assert response.json() == {"message": "incorrect email or password"}


@temp_db
def test_invalid_token() -> None:
    response = client.get(
        "/users/me/",
        headers={"Authorization": "Bearer invalidToken"},
    )

    assert response.status_code == status.HTTP_401_UNAUTHORIZED
    assert "message" in response.json()
