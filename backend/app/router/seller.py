from uuid import UUID

from app.core.schema.message import Message
from app.crud.seller import (
    add_seller,
    get_all_sellers,
    get_current_seller,
    get_seller_by_id,
    inactivate_seller,
)
from app.db.database import get_db
from app.schema.seller import (
    AddSeller,
    BaseSeller,
    GetSellerByEmail,
    GetSellerById,
    ReadSellers,
    CreateSeller,
    InactivateSeller,
)
from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session

# router = APIRouter(route_class=LoggingContextRoute)
router = APIRouter()


@router.post(
    "/sellers",
    response_model=AddSeller,
    status_code=status.HTTP_201_CREATED,
    responses={status.HTTP_400_BAD_REQUEST: {"model": Message}},
)
def create_seller(
    seller_dto: CreateSeller, db: Session = Depends(get_db)
) -> AddSeller:
    seller = add_seller(db, seller_dto)
    seller_model = AddSeller.from_orm(seller)

    return seller_model


@router.get("/sellers", response_model=ReadSellers)
def read_sellers(
    skip: int, limit: int, db: Session = Depends(get_db)
) -> ReadSellers:
    db_sellers = get_all_sellers(skip, limit, db)
    db_sellers_model = [
        BaseSeller.from_orm(db_seller) for db_seller in db_sellers
    ]

    return ReadSellers(
        data=db_sellers_model,
        skip=None if len(db_sellers_model) < limit else skip + limit,
    )


@router.get(
    "/sellers/{seller_id}",
    response_model=GetSellerById,
    responses={status.HTTP_404_NOT_FOUND: {"model": Message}},
)
def read_seller(
    seller_id: UUID, db: Session = Depends(get_db)
) -> GetSellerById:
    db_seller = get_seller_by_id(db, seller_id)
    db_seller_model = GetSellerById.from_orm(db_seller)

    return db_seller_model


@router.patch(
    "/sellers/me/inactivate",
    response_model=InactivateSeller,
    responses={
        status.HTTP_401_UNAUTHORIZED: {"model": Message},
        status.HTTP_400_BAD_REQUEST: {"model": Message},
    },
)
def inactivate_current_seller(
    current_seller: GetSellerByEmail = Depends(get_current_seller),
    db: Session = Depends(get_db),
) -> InactivateSeller:
    db_seller = inactivate_seller(db, current_seller)
    db_seller_model = InactivateSeller.from_orm(db_seller)

    return db_seller_model


@router.get(
    "/sellers/me/",
    response_model=GetSellerById,
    responses={
        status.HTTP_404_NOT_FOUND: {"model": Message},
        status.HTTP_401_UNAUTHORIZED: {"model": Message},
        status.HTTP_400_BAD_REQUEST: {"model": Message},
    },
)
def read_current_seller(
    current_seller: GetSellerByEmail = Depends(get_current_seller),
    db: Session = Depends(get_db),
) -> GetSellerById:
    db_seller = get_seller_by_id(db, current_seller.id)
    db_seller_model = GetSellerById.from_orm(db_seller)

    return db_seller_model
