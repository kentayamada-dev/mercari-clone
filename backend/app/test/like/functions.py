from app.core.schema.jwt import Secret
from app.schema.like import LikeResponse
from app.test.client import client
from requests import Response


def delete_like(item_id: str, secret: Secret) -> tuple[Response, LikeResponse]:
    response = client.delete(
        f"/likes/{item_id}",
        headers={"Authorization": f"{secret.token_type} {secret.access_token}"},
    )

    return response, LikeResponse(**response.json())


def create_like(item_id: str, secret: Secret) -> tuple[Response, LikeResponse]:
    response = client.post(
        "/likes",
        json={
            "item_id": item_id,
        },
        headers={"Authorization": f"{secret.token_type} {secret.access_token}"},
    )

    return response, LikeResponse(**response.json())
