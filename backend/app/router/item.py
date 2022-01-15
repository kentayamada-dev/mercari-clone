from uuid import UUID

from app.core.schema.message import Message
from app.crud.item import add_item, get_all_items, get_item_by_id, remove_item
from app.crud.seller import get_seller_by_id
from app.db.database import get_db
from app.schema.item import ItemCreate, ItemInDatabase, ItemRead, ReadItems
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

# router = APIRouter(route_class=LoggingContextRoute)
router = APIRouter()


@router.post(
    "/sellers/{seller_id}/items",
    response_model=ItemInDatabase,
    status_code=status.HTTP_201_CREATED,
    responses={status.HTTP_400_BAD_REQUEST: {"model": Message}},
)
def create_item(
    seller_id: UUID, item: ItemCreate, db: Session = Depends(get_db)
) -> ItemInDatabase:
    if not get_seller_by_id(db, seller_id=seller_id):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, detail="user not exists"
        )
    if not 300 <= item.price <= 9999999:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, detail="price not valid"
        )
    db_item_orm = add_item(db=db, dto=item, seller_id=seller_id)
    db_item_model = ItemInDatabase.from_orm(db_item_orm)
    return db_item_model


@router.get("/items", response_model=ReadItems)
def read_items(
    skip: int, limit: int, db: Session = Depends(get_db)
) -> ReadItems:
    db_items_orm = get_all_items(skip, limit, db)
    db_items_model = [ItemRead.from_orm(db_item) for db_item in db_items_orm]
    if len(db_items_model) < limit:
        return ReadItems(data=db_items_model, skip=None)
    return ReadItems(data=db_items_model, skip=skip + limit)


@router.get(
    "/items/{item_id}",
    response_model=ItemInDatabase,
    responses={status.HTTP_404_NOT_FOUND: {"model": Message}},
)
def read_item(item_id: UUID, db: Session = Depends(get_db)) -> ItemInDatabase:
    db_item_orm = get_item_by_id(db, item_id=item_id)
    if db_item_orm is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="item not found"
        )
    db_item_model = ItemInDatabase.from_orm(db_item_orm)
    return db_item_model


@router.delete(
    "/items/{item_id}",
    response_model=ItemInDatabase,
    responses={status.HTTP_404_NOT_FOUND: {"model": Message}},
)
def delete_item(item_id: UUID, db: Session = Depends(get_db)) -> ItemInDatabase:
    db_item_orm = get_item_by_id(db, item_id=item_id)
    if db_item_orm is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="item not found"
        )
    db_item_orm_deleted = remove_item(db, data=db_item_orm)
    db_item_model_deleted = ItemInDatabase.from_orm(db_item_orm_deleted)
    return db_item_model_deleted
