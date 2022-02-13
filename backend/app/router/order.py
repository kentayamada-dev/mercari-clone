from app.core.schema.message import Message
from app.crud.order import add_order
from app.crud.user import get_current_user
from app.db.database import get_db
from app.schema.order import AddOrder, OrderCreate
from app.schema.user import GetUserByEmail
from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session

# router = APIRouter(route_class=LoggingContextRoute)
router = APIRouter()


@router.post(
    "/orders",
    response_model=AddOrder,
    status_code=status.HTTP_201_CREATED,
    responses={
        status.HTTP_401_UNAUTHORIZED: {"model": Message},
        status.HTTP_400_BAD_REQUEST: {"model": Message},
    },
)
def create_order(
    dto: OrderCreate,
    db: Session = Depends(get_db),
    current_user: GetUserByEmail = Depends(get_current_user),
) -> AddOrder:
    db_like = add_order(db, dto, current_user.id)
    db_like_model = AddOrder.from_orm(db_like)

    return db_like_model
