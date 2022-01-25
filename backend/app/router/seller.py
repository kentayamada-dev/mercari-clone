from uuid import UUID

from app.core.schema.message import Message
from app.crud.seller import (
    add_seller,
    get_all_sellers,
    get_current_seller,
    get_seller_by_email,
    get_seller_by_id,
    inactivate_seller,
)
from app.db.database import get_db
from app.schema.seller import (
    GetSellerByEmail,
    SellerCreate,
    SellerInDatabase,
    SellerRead,
)
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

# router = APIRouter(route_class=LoggingContextRoute)
router = APIRouter()


@router.post(
    "/sellers",
    response_model=SellerInDatabase,
    status_code=status.HTTP_201_CREATED,
    responses={status.HTTP_400_BAD_REQUEST: {"model": Message}},
)
def create_seller(
    seller: SellerCreate, db: Session = Depends(get_db)
) -> SellerInDatabase:
    if get_seller_by_email(db, seller.email):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="email already exists",
        )
    db_seller = add_seller(db, seller)
    db_seller_without_password = SellerInDatabase.from_orm(db_seller)
    return db_seller_without_password


@router.get("/sellers", response_model=list[SellerRead])
def read_sellers(db: Session = Depends(get_db)) -> list[SellerRead]:
    db_sellers_orm = get_all_sellers(db)
    db_sellers_model: list[SellerRead] = [
        SellerRead.from_orm(db_seller) for db_seller in db_sellers_orm
    ]
    return db_sellers_model


@router.get(
    "/sellers/{seller_id}",
    response_model=SellerRead,
    responses={status.HTTP_404_NOT_FOUND: {"model": Message}},
)
def read_seller(seller_id: UUID, db: Session = Depends(get_db)) -> SellerRead:
    db_seller = get_seller_by_id(db, seller_id)
    db_seller_without_password = SellerRead.from_orm(db_seller)
    return db_seller_without_password


@router.patch(
    "/sellers/me/inactivate",
    response_model=SellerRead,
    responses={
        status.HTTP_401_UNAUTHORIZED: {"model": Message},
        status.HTTP_400_BAD_REQUEST: {"model": Message},
    },
)
def update_current_seller_status(
    current_seller: GetSellerByEmail = Depends(get_current_seller),
    db: Session = Depends(get_db),
) -> SellerRead:
    db_seller = inactivate_seller(db, current_seller)
    db_seller_without_password: SellerRead = GetSellerByEmail.from_orm(
        db_seller
    ).copy(exclude={"password", "is_active"})
    return db_seller_without_password


@router.get(
    "/sellers/me/",
    response_model=SellerRead,
    responses={
        status.HTTP_401_UNAUTHORIZED: {"model": Message},
        status.HTTP_400_BAD_REQUEST: {"model": Message},
    },
)
def read_current_seller(
    current_seller: GetSellerByEmail = Depends(get_current_seller),
) -> SellerRead:
    db_seller_without_password: SellerRead = GetSellerByEmail.from_orm(
        current_seller
    ).copy(exclude={"password", "is_active"})
    return db_seller_without_password
