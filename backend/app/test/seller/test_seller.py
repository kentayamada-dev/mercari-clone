from app.core.schema.jwt import Secret
from app.schema.seller import SellerRead
from app.test.client import client, temp_db
from app.test.functions import create_seller_1, create_seller_2
from app.test.sample_data import (
    seller_1_raw_get,
    seller_1_typed,
    seller_2_raw_get,
)
from fastapi import status


@temp_db
def test_create_seller() -> None:
    response, created_seller_1 = create_seller_1()

    assert response.status_code == status.HTTP_201_CREATED
    assert seller_1_raw_get.items() <= response.json().items()
    assert created_seller_1.is_active is True
    assert not created_seller_1.items


@temp_db
def test_create_seller_bad_body() -> None:
    response = client.post(
        "/sellers",
        json={
            "name": "name_1",
            "email": "email_1@gmail.com",
            "image_url": "http://image.com/seller_1.jpg",
        },
    )

    assert response.status_code == status.HTTP_422_UNPROCESSABLE_ENTITY
    assert response.json() == {"message": "password field required"}


@temp_db
def test_create_existing_seller() -> None:
    create_seller_1()
    response = client.post(
        "/sellers",
        json={
            "name": "name_2",
            "email": "email_1@gmail.com",
            "password": "password_2",
            "image_url": "http://image.com/seller_1.jpg",
        },
    )

    assert response.status_code == status.HTTP_400_BAD_REQUEST
    assert response.json() == {"message": "email already exists"}


@temp_db
def test_read_sellers() -> None:
    create_seller_1()
    create_seller_2()
    response = client.get("/sellers")
    response_data = response.json()
    seller_a = SellerRead(**response_data[0])
    seller_b = SellerRead(**response_data[1])

    assert response.status_code == status.HTTP_200_OK
    assert not seller_a.items
    assert not seller_b.items

    if seller_a.email == "email_1@gmail.com":
        assert seller_1_raw_get.items() <= seller_a.dict().items()
        assert seller_2_raw_get.items() <= seller_b.dict().items()
    else:
        assert seller_1_raw_get.items() <= seller_b.dict().items()
        assert seller_2_raw_get.items() <= seller_a.dict().items()


@temp_db
def test_read_seller() -> None:
    _, created_seller_1 = create_seller_1()
    created_seller_1_id = created_seller_1.id
    response = client.get(f"/sellers/{created_seller_1_id}")
    response_data = response.json()
    created_seller = SellerRead(**response_data)

    assert response.status_code == status.HTTP_200_OK
    assert seller_1_raw_get.items() <= response.json().items()
    assert not created_seller.items


@temp_db
def test_read_not_existing_seller() -> None:
    response = client.get("/sellers/6e9a4d65-dea1-47d6-aa9d-40686486be09")

    assert response.status_code == status.HTTP_404_NOT_FOUND
    assert response.json() == {"message": "seller not found"}


@temp_db
def test_inactivate_seller() -> None:
    create_seller_1()
    response_token = client.post(
        "/token",
        data={
            "username": seller_1_typed.email,
            "password": seller_1_typed.password.get_secret_value(),
        },
    )
    secret = Secret(**response_token.json())
    response = client.patch(
        "/sellers/me/inactivate",
        headers={"Authorization": f"Bearer {secret.access_token}"},
    )
    seller = SellerRead(**response.json())

    assert response.status_code == status.HTTP_200_OK
    assert seller_1_raw_get.items() <= response.json().items()
    assert not seller.items


@temp_db
def test_inactivate_inactivated_seller() -> None:
    create_seller_1()
    response_token = client.post(
        "/token",
        data={
            "username": seller_1_typed.email,
            "password": seller_1_typed.password.get_secret_value(),
        },
    )
    secret = Secret(**response_token.json())
    client.patch(
        "/sellers/me/inactivate",
        headers={"Authorization": f"Bearer {secret.access_token}"},
    )
    response = client.patch(
        "/sellers/me/inactivate",
        headers={"Authorization": f"Bearer {secret.access_token}"},
    )

    assert response.status_code == status.HTTP_400_BAD_REQUEST
    assert response.json() == {"message": "cannot read inactivated seller"}


@temp_db
def test_read_inactivate_me() -> None:
    create_seller_1()
    response_token = client.post(
        "/token",
        data={
            "username": seller_1_typed.email,
            "password": seller_1_typed.password.get_secret_value(),
        },
    )
    secret = Secret(**response_token.json())
    client.patch(
        "/sellers/me/inactivate",
        headers={"Authorization": f"Bearer {secret.access_token}"},
    )
    response = client.get(
        "/sellers/me/",
        headers={"Authorization": f"Bearer {secret.access_token}"},
    )

    assert response.status_code == status.HTTP_400_BAD_REQUEST
    assert response.json() == {"message": "cannot read inactivated seller"}


@temp_db
def test_read_me() -> None:
    create_seller_1()
    response_token = client.post(
        "/token",
        data={
            "username": seller_1_typed.email,
            "password": seller_1_typed.password.get_secret_value(),
        },
    )
    secret = Secret(**response_token.json())
    response = client.get(
        "/sellers/me/",
        headers={"Authorization": f"Bearer {secret.access_token}"},
    )
    seller = SellerRead(**response.json())

    assert response.status_code == status.HTTP_200_OK
    assert seller_1_raw_get.items() <= response.json().items()
    assert not seller.items
