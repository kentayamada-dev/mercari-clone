from uuid import UUID

from app.model.query import Query
from app.model.user import User
from app.schema.query import GetAllQuery, QueryCreate, RemoveQuery
from fastapi import HTTPException, status
from sqlalchemy import desc
from sqlalchemy.orm import Session, load_only


query_already_exists_exception = HTTPException(
    status_code=status.HTTP_400_BAD_REQUEST, detail="query already exists"
)

query_not_found_exception = HTTPException(
    status_code=status.HTTP_404_NOT_FOUND, detail="query not found"
)


def check_query_existence(db: Session, query: str, user_id: UUID) -> bool:

    return bool(
        db.query(Query.id)
        .filter(Query.query == query, User.id == user_id)
        .one_or_none()
    )


def add_query(db: Session, dto: QueryCreate, user_id: UUID) -> GetAllQuery:
    if check_query_existence(db, dto.query, user_id) is True:
        raise query_already_exists_exception
    data = Query(dto.query, user_id)
    db.add(data)
    db.commit()
    db.refresh(data)

    # print("\033[32m" + str(data) + "\033[0m")
    return GetAllQuery(id=data.id, query=data.query)


def get_all_queries(
    skip: int, limit: int, db: Session, user_id: UUID, query: str | None
) -> list[GetAllQuery]:
    db_data: list[GetAllQuery] = (
        db.query(Query)
        .filter(
            Query.user_id == user_id,
            Query.query == query if query else True,
        )
        .options(load_only(Query.id, Query.query))
        .order_by(desc(Query.created_at))
        .offset(skip)
        .limit(limit)
        .all()
    )

    # print("\033[32m" + str(db_data) + "\033[0m")
    return db_data


def remove_query(db: Session, query_id: UUID, user_id: UUID) -> RemoveQuery:
    if (
        db.query(Query)
        .filter(Query.id == query_id, Query.user_id == user_id)
        .delete()
        == 0
    ):
        raise query_not_found_exception
    db.commit()

    return RemoveQuery(id=query_id)
