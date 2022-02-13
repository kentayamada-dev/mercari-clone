from app.test.client import client, temp_db
from app.test.common_functions import create_user_1, create_user_1_token
from app.test.query.functions import (
    create_query_1,
    delete_query,
    create_query_2,
    read_queries,
)
from app.test.sample_data import query_1_typed, query_2_typed
from fastapi import status


@temp_db
def test_create_query_with_already_exists() -> None:
    create_user_1()
    _, secret = create_user_1_token()
    create_query_1(secret)
    response = client.post(
        "/queries",
        json={"query": query_1_typed.query},
        headers={"Authorization": f"{secret.token_type} {secret.access_token}"},
    )

    assert response.status_code == status.HTTP_400_BAD_REQUEST
    assert response.json() == {"message": "query already exists"}


@temp_db
def test_create_query() -> None:
    create_user_1()
    _, secret = create_user_1_token()
    response, created_query_1 = create_query_1(secret)

    assert response.status_code == status.HTTP_201_CREATED
    assert created_query_1.query == query_1_typed.query


@temp_db
def test_delete_query() -> None:
    create_user_1()
    _, secret = create_user_1_token()
    _, created_query = create_query_1(secret)
    response, _ = delete_query(f"{created_query.id}", secret)

    assert response.status_code == status.HTTP_200_OK


@temp_db
def test_delete_query_with_not_found() -> None:
    create_user_1()
    _, secret = create_user_1_token()
    response = client.delete(
        "/queries/3fa85f64-5717-4562-b3fc-2c963f66afa6",
        headers={"Authorization": f"{secret.token_type} {secret.access_token}"},
    )

    assert response.status_code == status.HTTP_404_NOT_FOUND
    assert response.json() == {"message": "query not found"}


@temp_db
def test_read_queries() -> None:
    create_user_1()
    _, secret = create_user_1_token()
    create_query_1(secret)
    create_query_2(secret)
    response, created_queries = read_queries(secret)
    query_a = created_queries.data[0]
    query_b = created_queries.data[1]

    assert response.status_code == status.HTTP_200_OK
    assert not created_queries.skip
    assert query_2_typed.query == query_a.query
    assert query_1_typed.query == query_b.query
