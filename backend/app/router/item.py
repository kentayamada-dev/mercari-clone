from uuid import UUID

from app.core.schema.message import Message
from app.crud.item import add_item, get_all_items, get_item_by_id, remove_item
from app.crud.seller import get_current_seller
from app.db.database import get_db
from app.schema.item import ItemCreate, ItemInDatabase, ItemRead, ReadItems
from app.schema.seller import GetSellerByEmail
from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session

# router = APIRouter(route_class=LoggingContextRoute)
router = APIRouter()


@router.post(
    "/items",
    response_model=ItemInDatabase,
    status_code=status.HTTP_201_CREATED,
    responses={
        status.HTTP_400_BAD_REQUEST: {"model": Message},
        status.HTTP_401_UNAUTHORIZED: {"model": Message},
    },
)
def create_item(
    item: ItemCreate,
    db: Session = Depends(get_db),
    current_seller: GetSellerByEmail = Depends(get_current_seller),
) -> ItemInDatabase:
    db_item_orm = add_item(db, item, current_seller.id)
    db_item_model = ItemInDatabase.from_orm(db_item_orm)
    return db_item_model


@router.get("/items", response_model=ReadItems)
def read_items(
    skip: int,
    limit: int,
    db: Session = Depends(get_db),
    query: str | None = None,
) -> ReadItems:
    db_items_orm = get_all_items(skip, limit, db, query)
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
    db_item_orm = get_item_by_id(db, item_id)
    db_item_model = ItemInDatabase.from_orm(db_item_orm)
    return db_item_model


@router.delete(
    "/items/{item_id}",
    response_model=ItemInDatabase,
    responses={
        status.HTTP_404_NOT_FOUND: {"model": Message},
        status.HTTP_401_UNAUTHORIZED: {"model": Message},
        status.HTTP_400_BAD_REQUEST: {"model": Message},
    },
)
def delete_item(
    item_id: UUID,
    db: Session = Depends(get_db),
    _: GetSellerByEmail = Depends(get_current_seller),
) -> ItemInDatabase:
    db_item_orm = get_item_by_id(db, item_id)
    db_item_orm_deleted = remove_item(db, db_item_orm)
    db_item_model_deleted = ItemInDatabase.from_orm(db_item_orm_deleted)
    return db_item_model_deleted
