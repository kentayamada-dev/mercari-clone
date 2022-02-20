from uuid import UUID

from app.core.schema.message import Message
from app.crud.like import add_like, remove_like
from app.crud.user import get_current_user
from app.db.database import get_db
from app.schema.like import LikeResponse, LikeCreate
from app.schema.user import GetUserByEmail
from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session

# router = APIRouter(route_class=LoggingContextRoute)
router = APIRouter()


@router.post(
    "/likes",
    response_model=LikeResponse,
    status_code=status.HTTP_201_CREATED,
    responses={
        status.HTTP_401_UNAUTHORIZED: {"model": Message},
        status.HTTP_400_BAD_REQUEST: {"model": Message},
    },
)
def create_like(
    dto: LikeCreate,
    db: Session = Depends(get_db),
    current_user: GetUserByEmail = Depends(get_current_user),
) -> LikeResponse:
    db_like = add_like(db, dto, current_user.id)
    db_like_model = LikeResponse.from_orm(db_like)

    return db_like_model


@router.delete(
    "/likes/{item_id}",
    response_model=LikeResponse,
    responses={
        status.HTTP_404_NOT_FOUND: {"model": Message},
        status.HTTP_401_UNAUTHORIZED: {"model": Message},
        status.HTTP_400_BAD_REQUEST: {"model": Message},
    },
)
def delete_like(
    item_id: UUID,
    db: Session = Depends(get_db),
    current_user: GetUserByEmail = Depends(get_current_user),
) -> LikeResponse:
    like = remove_like(db, item_id, current_user.id)
    like_model = LikeResponse.from_orm(like)

    return like_model
