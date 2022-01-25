from uuid import UUID

from app.model.query import Query
from app.schema.query import QueryInDatabase, ReadQuery
from sqlalchemy import desc
from sqlalchemy.orm import Session, lazyload, load_only


def add_query(db: Session, query: str, seller_id: UUID) -> QueryInDatabase:
    data = Query(query, seller_id)
    db.add(data)
    db.commit()
    db.refresh(data)
    # print("\033[32m" + str(data) + "\033[0m")
    return data


def get_query_by_id(db: Session, query_id: UUID) -> QueryInDatabase | None:
    db_data: QueryInDatabase | None = (
        db.query(Query).filter(Query.id == query_id).one_or_none()
    )
    # print("\033[32m" + str(db_data) + "\033[0m")
    return db_data


def get_all_queries(
    skip: int, limit: int, db: Session, seller_id: UUID
) -> list[ReadQuery]:
    db_data: list[ReadQuery] = (
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
