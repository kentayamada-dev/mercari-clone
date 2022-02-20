from uuid import UUID

from app.model.item import Item
from app.model.user import User
from app.model.order import Order
from app.schema.common import GetAllItem, Base
from app.schema.item import CreateItem, GetItemById, AddItem
from fastapi import HTTPException, status
from sqlalchemy import desc
from sqlalchemy.orm import Session, load_only, joinedload, contains_eager

item_not_found_exception = HTTPException(
    status_code=status.HTTP_404_NOT_FOUND, detail="item not found"
)

price_not_valid_exception = HTTPException(
    status_code=status.HTTP_400_BAD_REQUEST, detail="price not valid"
)


def validate_price(price: int) -> None:
    if not 300 <= price <= 9999999:
        raise price_not_valid_exception


def add_item(db: Session, dto: CreateItem, user_id: UUID) -> AddItem:
    validate_price(dto.price)
    data = Item(**dto.dict(), user_id=user_id)
    db.add(data)
    db.commit()
    db.refresh(data)

    # print("\033[32m" + str(data) + "\033[0m")
    return AddItem(
        id=data.id,
        price=data.price,
        image_url=data.image_url,
        name=data.name,
    )


def get_all_items(
    skip: int, limit: int, db: Session, query: str | None
) -> list[GetAllItem]:
    db_data: list[GetAllItem] = (
        db.query(Item)
        .filter(Item.name.like(f"%{query}%") if query else True)
        .outerjoin(Item.order)
        .options(
            load_only(Item.id, Item.price, Item.image_url, Item.name),
            contains_eager(Item.order).load_only(Order.id),
        )
        .order_by(desc(Item.created_at))
        .offset(skip)
        .limit(limit)
        .all()
    )

    # print("\033[32m" + str(db_data) + "\033[0m")
    return db_data


def get_item_by_id(db: Session, item_id: UUID) -> GetItemById:
    db_data: GetItemById = (
        db.query(Item)
        .filter(Item.id == item_id)
        .options(
            load_only(
                Item.id, Item.price, Item.image_url, Item.name, Item.description
            ),
            joinedload(Item.user).options(
                load_only(User.id, User.name, User.image_url)
            ),
            joinedload(Item.liked_users).options(load_only(User.id)),
            joinedload(Item.order).options(load_only(Order.id)),
        )
        .one_or_none()
    )
    if db_data is None:
        raise item_not_found_exception

    # print("\033[32m" + str(db_data) + "\033[0m")
    return db_data


def remove_item(db: Session, item_id: UUID, user_id: UUID) -> Base:
    if (
        db.query(Item)
        .filter(Item.id == item_id, Item.user_id == user_id)
        .delete()
        == 0
    ):
        raise item_not_found_exception
    db.commit()

    return Base(id=item_id)


def check_item_existence(db: Session, item_id: UUID) -> bool:

    return bool(db.query(Item.id).filter(Item.id == item_id).one_or_none())
