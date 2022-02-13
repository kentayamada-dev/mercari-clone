from uuid import UUID

from app.core.schema.message import Message
from app.crud.item import add_item, get_all_items, get_item_by_id, remove_item
from app.crud.user import get_current_user
from app.db.database import get_db
from app.schema.common import GetAllItem, Base
from app.schema.item import AddItem, GetItemById, CreateItem, ReadItems
from app.schema.user import GetUserByEmail
from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session

# router = APIRouter(route_class=LoggingContextRoute)
router = APIRouter()


@router.post(
    "/items",
    response_model=AddItem,
    status_code=status.HTTP_201_CREATED,
    responses={
        status.HTTP_400_BAD_REQUEST: {"model": Message},
        status.HTTP_401_UNAUTHORIZED: {"model": Message},
    },
)
def create_item(
    item_dto: CreateItem,
    db: Session = Depends(get_db),
    current_user: GetUserByEmail = Depends(get_current_user),
) -> AddItem:
    item = add_item(db, item_dto, current_user.id)
    item_model = AddItem.from_orm(item)

    return item_model


@router.get("/items", response_model=ReadItems)
def read_items(
    skip: int,
    limit: int,
    db: Session = Depends(get_db),
    query: str | None = None,
) -> ReadItems:
    db_items = get_all_items(skip, limit, db, query)
    db_items_model = [GetAllItem.from_orm(db_item) for db_item in db_items]

    return ReadItems(
        data=db_items_model,
        skip=None if len(db_items_model) < limit else skip + limit,
    )


@router.get(
    "/items/{item_id}",
    response_model=GetItemById,
    responses={status.HTTP_404_NOT_FOUND: {"model": Message}},
)
def read_item(item_id: UUID, db: Session = Depends(get_db)) -> GetItemById:
    db_item = get_item_by_id(db, item_id)
    db_item_model = GetItemById.from_orm(db_item)

    return db_item_model


@router.delete(
    "/items/{item_id}",
    response_model=Base,
    responses={
        status.HTTP_404_NOT_FOUND: {"model": Message},
        status.HTTP_401_UNAUTHORIZED: {"model": Message},
        status.HTTP_400_BAD_REQUEST: {"model": Message},
    },
)
def delete_item(
    item_id: UUID,
    db: Session = Depends(get_db),
    current_user: GetUserByEmail = Depends(get_current_user),
) -> Base:
    db_item = remove_item(db, item_id, current_user.id)
    db_item_model = Base.from_orm(db_item)

    return db_item_model
