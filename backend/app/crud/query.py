from uuid import UUID

from app.model.query import Query
from app.model.seller import Seller
from app.schema.query import (
    QueryCreate,
    RemoveQuery,
    GetAllQuery,
)
from sqlalchemy import desc
from sqlalchemy.orm import Session, load_only
from fastapi import HTTPException, status


def check_query_existence(db: Session, query: str, seller_id: UUID) -> bool:

    return bool(
        db.query(Query.id)
        .filter(Query.query == query, Seller.id == seller_id)
        .one_or_none()
    )


def add_query(db: Session, dto: QueryCreate, seller_id: UUID) -> GetAllQuery:
    if check_query_existence(db, dto.query, seller_id) is True:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="query already exists",
        )
    data = Query(dto.query, seller_id)
    db.add(data)
    db.commit()
    db.refresh(data)

    # print("\033[32m" + str(data) + "\033[0m")
    return GetAllQuery(id=data.id, query=data.query)


def get_all_queries(
    skip: int, limit: int, db: Session, seller_id: UUID, query: str | None
) -> list[GetAllQuery]:
    db_data: list[GetAllQuery] = (
        db.query(Query)
        .filter(
            Query.seller_id == seller_id,
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


def remove_query(db: Session, query_id: UUID, seller_id: UUID) -> RemoveQuery:
    if (
        db.query(Query)
        .filter(Query.id == query_id, Query.seller_id == seller_id)
        .delete()
        == 0
    ):
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="query not found"
        )
    db.commit()

    return RemoveQuery(id=query_id)
