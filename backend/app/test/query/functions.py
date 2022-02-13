from app.core.schema.jwt import Secret
from app.schema.common import Base
from app.schema.query import GetAllQuery, ReadQueries
from app.test.client import client
from app.test.sample_data import query_1_typed, query_2_typed
from requests import Response


def read_queries(secret: Secret) -> tuple[Response, ReadQueries]:
    response = client.get(
        "/queries?skip=0&limit=3",
        headers={"Authorization": f"{secret.token_type} {secret.access_token}"},
    )

    return response, ReadQueries(**response.json())


def delete_query(query_id: str, secret: Secret) -> tuple[Response, Base]:
    response = client.delete(
        f"/queries/{query_id}",
        headers={"Authorization": f"{secret.token_type} {secret.access_token}"},
    )

    return response, Base(**response.json())


def create_query_1(secret: Secret) -> tuple[Response, GetAllQuery]:
    response = client.post(
        "/queries",
        json={"query": query_1_typed.query},
        headers={"Authorization": f"{secret.token_type} {secret.access_token}"},
    )

    return response, GetAllQuery(**response.json())


def create_query_2(secret: Secret) -> tuple[Response, GetAllQuery]:
    response = client.post(
        "/queries",
        json={"query": query_2_typed.query},
        headers={"Authorization": f"{secret.token_type} {secret.access_token}"},
    )

    return response, GetAllQuery(**response.json())
