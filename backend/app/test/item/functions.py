from app.core.schema.jwt import Secret
from app.schema.common import Base
from app.schema.item import GetItemById, ReadItems
from app.test.client import client
from requests import Response


def delete_item(item_id: str, secret: Secret) -> tuple[Response, Base]:
    response = client.delete(
        f"/items/{item_id}",
        headers={"Authorization": f"{secret.token_type} {secret.access_token}"},
    )

    return response, Base(**response.json())


def read_item(item_id: str) -> tuple[Response, GetItemById]:
    response = client.get(f"/items/{item_id}")

    return response, GetItemById(**response.json())


def read_items() -> tuple[Response, ReadItems]:
    response = client.get("/items?skip=0&limit=3")

    return response, ReadItems(**response.json())
