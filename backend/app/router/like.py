from uuid import UUID

from app.core.schema.message import Message
from app.crud.like import add_like
from app.crud.seller import get_current_seller
from app.db.database import get_db
from app.schema.like import AddLike
from app.schema.seller import GetSellerByEmail
from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session

# router = APIRouter(route_class=LoggingContextRoute)
router = APIRouter()


@router.post(
    "/likes",
    response_model=AddLike,
    status_code=status.HTTP_201_CREATED,
    responses={
        status.HTTP_401_UNAUTHORIZED: {"model": Message},
        status.HTTP_400_BAD_REQUEST: {"model": Message},
    },
)
def create_like(
    item_id: UUID,
    db: Session = Depends(get_db),
    current_seller: GetSellerByEmail = Depends(get_current_seller),
) -> AddLike:
    db_like = add_like(db, item_id, current_seller.id)
    db_like_model = AddLike.from_orm(db_like)

    return db_like_model
