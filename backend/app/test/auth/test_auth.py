from app.test.client import client, temp_db
from app.test.functions import create_seller_1
from app.test.sample_data import seller_1_typed, seller_2_typed
from fastapi import status


@temp_db
def test_read_token() -> None:
    create_seller_1()
    response = client.post(
        "/token",
        data={
            "username": seller_1_typed.email,
            "password": seller_1_typed.password.get_secret_value(),
        },
    )

    assert response.status_code == status.HTTP_200_OK
    assert set(response.json()) >= {"access_token", "token_type"}


@temp_db
def test_read_token_invalid_email() -> None:
    create_seller_1()
    response = client.post(
        "/token",
        data={
            "username": seller_2_typed.email,
            "password": seller_1_typed.password.get_secret_value(),
        },
    )

    assert response.status_code == status.HTTP_401_UNAUTHORIZED
    assert response.json() == {"message": "incorrect email or password"}


@temp_db
def test_read_token_invalid_password() -> None:
    create_seller_1()
    response = client.post(
        "/token",
        data={
            "username": seller_1_typed.email,
            "password": seller_2_typed.password.get_secret_value(),
        },
    )

    assert response.status_code == status.HTTP_401_UNAUTHORIZED
    assert response.json() == {"message": "incorrect email or password"}


@temp_db
def test_invalid_token() -> None:
    response = client.get(
        "/sellers/me/",
        headers={"Authorization": "Bearer invalidToken"},
    )

    assert response.status_code == status.HTTP_401_UNAUTHORIZED
    assert "message" in response.json()
