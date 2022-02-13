from app.core.schema.jwt import Secret
from app.schema.common import Base
from app.schema.like import AddLike
from app.test.client import client
from requests import Response


def delete_like(item_id: str, secret: Secret) -> tuple[Response, Base]:
    response = client.delete(
        f"/likes/{item_id}",
        headers={"Authorization": f"{secret.token_type} {secret.access_token}"},
    )

    return response, Base(**response.json())


def create_like(item_id: str, secret: Secret) -> tuple[Response, AddLike]:
    response = client.post(
        "/likes",
        json={
            "item_id": item_id,
        },
        headers={"Authorization": f"{secret.token_type} {secret.access_token}"},
    )

    return response, AddLike(**response.json())
