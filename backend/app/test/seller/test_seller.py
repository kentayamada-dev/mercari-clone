from app.core.schema.jwt import Secret
from app.schema.seller import InactivateSeller, ReadSellers, GetSellerById
from app.test.client import client, temp_db
from app.test.functions import create_item_1, create_seller_1, create_seller_2
from app.test.sample_data import (
    seller_1_raw_get,
    seller_1_typed,
    seller_2_typed,
    item_1_typed,
)
from fastapi import status


@temp_db
def test_create_seller() -> None:
    response, _ = create_seller_1()

    assert response.status_code == status.HTTP_201_CREATED
    assert seller_1_raw_get.items() <= response.json().items()


@temp_db
def test_create_seller_missed_password() -> None:
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
def test_create_seller_invalid_url() -> None:
    response = client.post(
        "/sellers",
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
    response = client.get("/sellers?skip=0&limit=3")
    response_data = response.json()
    sellers = ReadSellers(**response_data)
    seller_a = sellers.data[0]
    seller_b = sellers.data[1]

    assert response.status_code == status.HTTP_200_OK
    assert sellers.skip is None
    assert seller_2_typed.name == seller_a.name
    assert seller_2_typed.image_url == seller_a.image_url
    assert seller_1_typed.name == seller_b.name
    assert seller_1_typed.image_url == seller_b.image_url


@temp_db
def test_read_seller() -> None:
    _, created_seller_1 = create_seller_1()
    created_seller_1_id = created_seller_1.id
    response_token = client.post(
        "/token",
        data={
            "username": seller_1_typed.email,
            "password": seller_1_typed.password.get_secret_value(),
        },
    )
    secret = Secret(**response_token.json())
    create_item_1(secret.access_token)
    response = client.get(f"/sellers/{created_seller_1_id}")
    response_data = response.json()
    created_seller = GetSellerById(**response_data)

    assert response.status_code == status.HTTP_200_OK
    assert created_seller.name == seller_1_typed.name
    assert created_seller.image_url == seller_1_typed.image_url
    assert created_seller.items[0].price == item_1_typed.price
    assert created_seller.items[0].image_url == item_1_typed.image_url
    assert created_seller.items[0].name == item_1_typed.name


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
    seller = InactivateSeller(**response.json())

    assert response.status_code == status.HTTP_200_OK
    assert seller.is_active is False


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
    create_item_1(secret.access_token)
    response = client.get(
        "/sellers/me/",
        headers={"Authorization": f"Bearer {secret.access_token}"},
    )
    response_data = response.json()
    created_seller = GetSellerById(**response_data)

    assert response.status_code == status.HTTP_200_OK
    assert created_seller.name == seller_1_typed.name
    assert created_seller.image_url == seller_1_typed.image_url
    assert created_seller.items[0].price == item_1_typed.price
    assert created_seller.items[0].image_url == item_1_typed.image_url
    assert created_seller.items[0].name == item_1_typed.name
