from uuid import UUID

from app.core.schema.config import settings
from app.core.schema.jwt import TokenData
from app.core.utils.auth import auth
from app.db.database import get_db
from app.model.item import Item
from app.model.seller import Seller
from app.schema.seller import (
    AddSeller,
    BaseSeller,
    CreateSeller,
    GetSellerByEmail,
    GetSellerById,
    InactivateSeller,
)
from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from jose import JWTError, jwt
from sqlalchemy import desc
from sqlalchemy.orm import Session, contains_eager, load_only

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

credentials_exception = HTTPException(
    status_code=status.HTTP_401_UNAUTHORIZED,
    detail="invalid token",
    headers={"WWW-Authenticate": "Bearer"},
)

inactivated_exception = HTTPException(
    status_code=status.HTTP_400_BAD_REQUEST,
    detail="cannot read inactivated seller",
)


def get_all_sellers(skip: int, limit: int, db: Session) -> list[BaseSeller]:
    db_data: list[BaseSeller] = (
        db.query(Seller)
        .options(load_only(Seller.id, Seller.name, Seller.image_url))
        .order_by(desc(Seller.created_at))
        .offset(skip)
        .limit(limit)
        .all()
    )

    # print("\033[34m" + str(db_data) + "\033[0m")
    return db_data


def get_seller_by_id(db: Session, seller_id: UUID) -> GetSellerById:
    db_data: GetSellerById = (
        db.query(Seller)
        .filter(Seller.id == seller_id)
        .outerjoin(Seller.items)
        .options(
            load_only(Seller.id, Seller.name, Seller.image_url),
            contains_eager(Seller.items).load_only(
                Item.id, Item.name, Item.price, Item.image_url
            ),
        )
        .order_by(desc(Item.created_at))
        .one_or_none()
    )
    if db_data is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="seller not found"
        )

    # print("\033[34m" + str(db_data) + "\033[0m")
    return db_data


def get_seller_by_email(db: Session, email: str) -> GetSellerByEmail:
    db_data: GetSellerByEmail = (
        db.query(Seller)
        .filter(Seller.email == email)
        .options(
            load_only(
                Seller.id, Seller.email, Seller.password, Seller.is_active
            ),
        )
        .one_or_none()
    )
    if db_data is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="seller not found"
        )

    # print("\033[34m" + str(db_data) + "\033[0m")
    return db_data


def check_email_existence(db: Session, email: str) -> bool:

    return bool(db.query(Seller.id).filter(Seller.email == email).one_or_none())


def add_seller(db: Session, dto: CreateSeller) -> AddSeller:
    if check_email_existence(db, dto.email) is True:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="email already exists",
        )

    hashed_password = auth.generate_hashed_password(
        dto.password.get_secret_value()
    )
    data = Seller(
        name=dto.name,
        email=dto.email,
        password=hashed_password,
        image_url=dto.image_url,
    )
    db.add(data)
    db.commit()
    db.refresh(data)

    # print("\033[34m" + str(data) + "\033[0m")
    return AddSeller(
        id=data.id,
        name=data.name,
        image_url=data.image_url,
        email=data.email,
    )


def inactivate_seller(
    db: Session, current_seller: GetSellerByEmail
) -> InactivateSeller:
    current_seller.is_active = False
    db.commit()

    # print("\033[34m" + str(current_seller) + "\033[0m")
    return InactivateSeller(
        id=current_seller.id, is_active=current_seller.is_active
    )


def get_current_seller(
    token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)
) -> GetSellerByEmail:
    try:
        payload = jwt.decode(token, settings.SECRET_KEY, [auth.ALGORITHM])
        email = payload.get("email")
        token_data = TokenData(email=email)
        current_seller = get_seller_by_email(db, token_data.email)
        if current_seller.is_active is False:
            raise inactivated_exception
    except JWTError as jwt_error:
        raise credentials_exception from jwt_error

    return current_seller


def authenticate_seller(
    db: Session, email: str, password: str
) -> GetSellerByEmail:
    data = get_seller_by_email(db, email)
    if not auth.verify_password(
        password,
        data.password,
    ):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )

    return data
