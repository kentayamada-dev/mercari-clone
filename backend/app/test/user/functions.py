from app.core.schema.jwt import Secret
from app.schema.user import GetUserById, InactivateUser, ReadUsers
from app.test.client import client
from requests import Response


def read_me(secret: Secret) -> tuple[Response, GetUserById]:
    response = client.get(
        "/users/me/",
        headers={"Authorization": f"{secret.token_type} {secret.access_token}"},
    )

    return response, GetUserById(**response.json())


def inactivate_user(secret: Secret) -> tuple[Response, InactivateUser]:
    response = client.patch(
        "/users/me/inactivate",
        headers={"Authorization": f"{secret.token_type} {secret.access_token}"},
    )

    return response, InactivateUser(**response.json())


def read_users() -> tuple[Response, ReadUsers]:
    response = client.get("/users?skip=0&limit=3")

    return response, ReadUsers(**response.json())


def read_user(user_id: str) -> tuple[Response, GetUserById]:
    response = client.get(f"/users/{user_id}")
    return response, GetUserById(**response.json())
