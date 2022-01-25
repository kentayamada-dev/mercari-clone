from uuid import UUID

from app.core.schema.message import Message
from app.crud.query import (
    add_query,
    get_all_queries,
    get_query_by_id,
    remove_query,
)
from app.crud.seller import get_current_seller
from app.db.database import get_db
from app.schema.query import QueryInDatabase, ReadQueries, ReadQuery
from app.schema.seller import GetSellerByEmail
from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session

# router = APIRouter(route_class=LoggingContextRoute)
router = APIRouter()


@router.post(
    "/queries",
    response_model=QueryInDatabase,
    status_code=status.HTTP_201_CREATED,
    responses={
        status.HTTP_401_UNAUTHORIZED: {"model": Message},
        status.HTTP_400_BAD_REQUEST: {"model": Message},
    },
)
def create_query(
    query: str,
    db: Session = Depends(get_db),
    current_seller: GetSellerByEmail = Depends(get_current_seller),
) -> QueryInDatabase:
    db_query_orm = add_query(db, query, current_seller.id)
    db_query_model = QueryInDatabase.from_orm(db_query_orm)
    return db_query_model


@router.delete(
    "/queries/{query_id}",
    response_model=QueryInDatabase,
    responses={
        status.HTTP_404_NOT_FOUND: {"model": Message},
        status.HTTP_401_UNAUTHORIZED: {"model": Message},
        status.HTTP_400_BAD_REQUEST: {"model": Message},
    },
)
def delete_query(
    query_id: UUID,
    db: Session = Depends(get_db),
    _: GetSellerByEmail = Depends(get_current_seller),
) -> QueryInDatabase:
    db_query_orm = get_query_by_id(db, query_id)
    db_query_orm_deleted = remove_query(db, db_query_orm)
    db_query_model_deleted = QueryInDatabase.from_orm(db_query_orm_deleted)
    return db_query_model_deleted


@router.get(
    "/queries",
    response_model=ReadQueries,
    responses={
        status.HTTP_401_UNAUTHORIZED: {"model": Message},
        status.HTTP_400_BAD_REQUEST: {"model": Message},
    },
)
def read_queries(
    skip: int,
    limit: int,
    db: Session = Depends(get_db),
    current_seller: GetSellerByEmail = Depends(get_current_seller),
) -> ReadQueries:
    db_queries_orm = get_all_queries(skip, limit, db, current_seller.id)
    db_queries_model = [
        ReadQuery.from_orm(db_query) for db_query in db_queries_orm
    ]
    if len(db_queries_model) < limit:
        return ReadQueries(data=db_queries_model, skip=None)
    return ReadQueries(data=db_queries_model, skip=skip + limit)
