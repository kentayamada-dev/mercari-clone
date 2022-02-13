from app.core.schema.jwt import Secret
from app.schema.order import AddOrder
from app.test.client import client
from requests import Response


def create_order(item_id: str, secret: Secret) -> tuple[Response, AddOrder]:
    response = client.post(
        "/orders",
        json={
            "item_id": item_id,
        },
        headers={"Authorization": f"{secret.token_type} {secret.access_token}"},
    )

    return response, AddOrder(**response.json())
