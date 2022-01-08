from typing import List, Optional
from uuid import UUID

from app.model.item import Item
from app.schema.item import ItemCreate, ItemInDatabase, ItemRead
from sqlalchemy.orm import Session, lazyload, load_only


def add_item(db: Session, dto: ItemCreate, seller_id: UUID) -> ItemInDatabase:
    data = Item(**dto.dict(), seller_id=seller_id)
    db.add(data)
    db.commit()
    db.refresh(data)
    # print("\033[32m" + str(data) + "\033[0m")
    return data


def get_all_items(db: Session) -> List[ItemRead]:
    db_data: List[ItemRead] = (
        db.query(Item)
        .options(
            load_only(Item.id, Item.price, Item.image_url, Item.name),
            lazyload(Item.seller),
        )
        .all()
    )

    # print("\033[32m" + str(db_data) + "\033[0m")
    return db_data


def get_item_by_id(db: Session, item_id: UUID) -> Optional[ItemInDatabase]:
    db_data: Optional[ItemInDatabase] = (
        db.query(Item).filter(Item.id == item_id).one_or_none()
    )
    # print("\033[32m" + str(db_data) + "\033[0m")
    return db_data


def remove_item(db: Session, data: ItemInDatabase) -> ItemInDatabase:
    db.delete(data)
    db.commit()
    # print("\033[32m" + str(data) + "\033[0m")
    return data
