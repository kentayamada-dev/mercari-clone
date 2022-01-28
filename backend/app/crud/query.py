from uuid import UUID

from app.model.query import Query
from app.schema.query import QueryCreate, QueryInDatabase, ReadQuery
from fastapi import HTTPException, status
from sqlalchemy import desc
from sqlalchemy.orm import Session, lazyload, load_only


def add_query(
    db: Session, dto: QueryCreate, seller_id: UUID
) -> QueryInDatabase:
    data = Query(dto.query, seller_id)
    db.add(data)
    db.commit()
    db.refresh(data)
    # print("\033[32m" + str(data) + "\033[0m")
    return data


def get_query_by_id(db: Session, query_id: UUID) -> QueryInDatabase:
    db_data: QueryInDatabase | None = (
        db.query(Query).filter(Query.id == query_id).one_or_none()
    )
    if db_data is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="query not found"
        )
    # print("\033[32m" + str(db_data) + "\033[0m")
    return db_data


def get_all_queries(
    skip: int, limit: int, db: Session, seller_id: UUID, query: str | None
) -> list[ReadQuery]:
    db_data: list[ReadQuery] = []
    if query:
        db_data = (
            db.query(Query)
            .filter(Query.seller_id == seller_id, Query.query == query)
            .options(
                load_only(Query.id, Query.query),
                lazyload(Query.seller),
            )
            .order_by(desc(Query.created_at))
            .offset(skip)
            .limit(limit)
            .all()
        )
    else:
        db_data = (
            db.query(Query)
            .filter(Query.seller_id == seller_id)
            .options(
                load_only(Query.id, Query.query),
                lazyload(Query.seller),
            )
            .order_by(desc(Query.created_at))
            .offset(skip)
            .limit(limit)
            .all()
        )

    # print("\033[32m" + str(db_data) + "\033[0m")
    return db_data


def remove_query(db: Session, data: QueryInDatabase) -> QueryInDatabase:
    db.delete(data)
    db.commit()
    # print("\033[32m" + str(data) + "\033[0m")
    return data
