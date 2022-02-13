from uuid import UUID

from app.crud.item import check_item_existence
from app.model.order import Order
from app.schema.order import AddOrder, OrderCreate
from fastapi import HTTPException, status
from sqlalchemy.orm import Session

item_not_exists_exception = HTTPException(
    status_code=status.HTTP_400_BAD_REQUEST,
    detail="item not exists",
)

item_already_ordered_exception = HTTPException(
    status_code=status.HTTP_400_BAD_REQUEST,
    detail="item already ordered",
)


def check_order_existence(db: Session, item_id: UUID, user_id: UUID) -> bool:

    return bool(
        db.query(Order.id)
        .filter(Order.item_id == item_id, Order.user_id == user_id)
        .one_or_none()
    )


def add_order(db: Session, dto: OrderCreate, user_id: UUID) -> AddOrder:
    if check_item_existence(db, dto.item_id) is False:
        raise item_not_exists_exception
    if check_order_existence(db, dto.item_id, user_id) is True:
        raise item_already_ordered_exception
    data = Order(dto.item_id, user_id)
    db.add(data)
    db.commit()
    db.refresh(data)

    # print("\033[32m" + str(data) + "\033[0m")
    return AddOrder(item_id=dto.item_id, user_id=user_id)
