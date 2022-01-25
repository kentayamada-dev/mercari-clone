from uuid import UUID

from app.model.item import Item
from app.schema.item import ItemCreate, ItemInDatabase, ItemRead
from fastapi import HTTPException, status
from sqlalchemy import desc
from sqlalchemy.orm import Session, lazyload, load_only


def add_item(db: Session, dto: ItemCreate, seller_id: UUID) -> ItemInDatabase:
    if not 300 <= dto.price <= 9999999:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, detail="price not valid"
        )
    data = Item(**dto.dict(), seller_id=seller_id)
    db.add(data)
    db.commit()
    db.refresh(data)
    # print("\033[32m" + str(data) + "\033[0m")
    return data


def get_all_items(
    skip: int, limit: int, db: Session, query: str | None
) -> list[ItemRead]:
    db_data: list[ItemRead] = []
    if query:
        db_data = (
            db.query(Item)
            .filter(Item.name.like(f"%{query}%"))
            .options(
                load_only(Item.id, Item.price, Item.image_url, Item.name),
                lazyload(Item.seller),
            )
            .order_by(desc(Item.created_at))
            .offset(skip)
            .limit(limit)
            .all()
        )

    else:
        db_data = (
            db.query(Item)
            .options(
                load_only(Item.id, Item.price, Item.image_url, Item.name),
                lazyload(Item.seller),
            )
            .order_by(desc(Item.created_at))
            .offset(skip)
            .limit(limit)
            .all()
        )

    # print("\033[32m" + str(db_data) + "\033[0m")
    return db_data


def get_item_by_id(db: Session, item_id: UUID) -> ItemInDatabase:
    db_data: ItemInDatabase | None = (
        db.query(Item).filter(Item.id == item_id).one_or_none()
    )
    if db_data is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="item not found"
        )
    # print("\033[32m" + str(db_data) + "\033[0m")
    return db_data


def remove_item(db: Session, data: ItemInDatabase) -> ItemInDatabase:
    db.delete(data)
    db.commit()
    # print("\033[32m" + str(data) + "\033[0m")
    return data
