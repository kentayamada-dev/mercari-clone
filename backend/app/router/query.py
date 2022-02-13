from uuid import UUID

from app.core.schema.message import Message
from app.crud.query import add_query, get_all_queries, remove_query
from app.crud.user import get_current_user
from app.db.database import get_db
from app.schema.common import Base
from app.schema.query import GetAllQuery, QueryCreate, ReadQueries
from app.schema.user import GetUserByEmail
from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session

# router = APIRouter(route_class=LoggingContextRoute)
router = APIRouter()


@router.post(
    "/queries",
    response_model=GetAllQuery,
    status_code=status.HTTP_201_CREATED,
    responses={
        status.HTTP_401_UNAUTHORIZED: {"model": Message},
        status.HTTP_400_BAD_REQUEST: {"model": Message},
    },
)
def create_query(
    dto: QueryCreate,
    db: Session = Depends(get_db),
    current_user: GetUserByEmail = Depends(get_current_user),
) -> GetAllQuery:
    db_query_orm = add_query(db, dto, current_user.id)
    db_query_model = GetAllQuery.from_orm(db_query_orm)

    return db_query_model


@router.delete(
    "/queries/{query_id}",
    response_model=Base,
    responses={
        status.HTTP_404_NOT_FOUND: {"model": Message},
        status.HTTP_401_UNAUTHORIZED: {"model": Message},
        status.HTTP_400_BAD_REQUEST: {"model": Message},
    },
)
def delete_query(
    query_id: UUID,
    db: Session = Depends(get_db),
    current_user: GetUserByEmail = Depends(get_current_user),
) -> Base:
    query = remove_query(db, query_id, current_user.id)
    query_model = Base.from_orm(query)

    return query_model


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
    current_user: GetUserByEmail = Depends(get_current_user),
    query: str | None = None,
) -> ReadQueries:
    db_queries_orm = get_all_queries(skip, limit, db, current_user.id, query)
    db_queries_model = [
        GetAllQuery.from_orm(db_query) for db_query in db_queries_orm
    ]

    return ReadQueries(
        data=db_queries_model,
        skip=None if len(db_queries_model) < limit else skip + limit,
    )
