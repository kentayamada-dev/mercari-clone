from uuid import UUID

from app.model.item import Item
from app.model.seller import Seller
from app.schema.common import GetAllItem, RemoveItem
from app.schema.item import CreateItem, GetItemById, AddItem
from fastapi import HTTPException, status
from sqlalchemy import desc
from sqlalchemy.orm import Session, load_only, joinedload


def validate_price(price: int) -> None:
    if not 300 <= price <= 9999999:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, detail="price not valid"
        )


def add_item(db: Session, dto: CreateItem, seller_id: UUID) -> AddItem:
    validate_price(dto.price)
    data = Item(**dto.dict(), seller_id=seller_id)
    db.add(data)
    db.commit()
    db.refresh(data)

    # print("\033[32m" + str(data) + "\033[0m")
    return AddItem(
        id=data.id,
        price=data.price,
        image_url=data.image_url,
        name=data.name,
        description=data.description,
    )


def get_all_items(
    skip: int, limit: int, db: Session, query: str | None
) -> list[GetAllItem]:
    db_data: list[GetAllItem] = (
        db.query(Item)
        .filter(Item.name.like(f"%{query}%") if query else True)
        .options(load_only(Item.id, Item.price, Item.image_url, Item.name))
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
            joinedload(Item.seller).options(
                load_only(Seller.id, Seller.name, Seller.image_url)
            ),
            joinedload(Item.liked_sellers).options(load_only(Seller.id)),
        )
        .one_or_none()
    )
    if db_data is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="item not found"
        )

    # print("\033[32m" + str(db_data) + "\033[0m")
    return db_data


def remove_item(db: Session, item_id: UUID, seller_id: UUID) -> RemoveItem:
    if (
        db.query(Item)
        .filter(Item.id == item_id, Item.seller_id == seller_id)
        .delete()
        == 0
    ):
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="item not found"
        )
    db.commit()

    return RemoveItem(id=item_id)


def check_item_existence(db: Session, item_id: UUID) -> bool:

    return bool(db.query(Item.id).filter(Item.id == item_id).one_or_none())
