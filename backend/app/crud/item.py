from typing import List, Optional
from uuid import UUID

from app.model.item import Item
from app.schema.item import ItemCreate, ItemRead
from sqlalchemy.orm import Session


def add_item(db: Session, dto: ItemCreate, seller_id: UUID) -> Item:
    data = Item(**dto.dict(), seller_id=seller_id)
    db.add(data)
    db.commit()
    db.refresh(data)
    return data


def get_all_items(db: Session) -> List[ItemRead]:
    db_data: List[ItemRead] = (
        db.query(Item).with_entities(Item.id, Item.price, Item.image_url).all()
    )
    return db_data


def get_item_by_id(db: Session, item_id: UUID) -> Optional[Item]:
    db_data: Optional[Item] = db.query(Item).filter(Item.id == item_id).first()
    return db_data


def remove_item(db: Session, data: Item) -> Item:
    db.delete(data)
    db.commit()
    return data
