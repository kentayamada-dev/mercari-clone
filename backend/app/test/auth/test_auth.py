from app.test.client import client, temp_db
from app.test.common_functions import create_user_1, create_user_1_token
from app.test.sample_data import user_1_typed, user_2_typed
from fastapi import status


@temp_db
def test_generate_token() -> None:
    create_user_1()
    response, _ = create_user_1_token()

    assert response.status_code == status.HTTP_201_CREATED


@temp_db
def test_generate_token_with_invalid_password() -> None:
    create_user_1()
    response = client.post(
        "/token",
        data={
            "username": user_1_typed.email,
            "password": user_2_typed.password.get_secret_value(),
        },
    )

    assert response.status_code == status.HTTP_401_UNAUTHORIZED
    assert response.json() == {"message": "incorrect email or password"}
