from typing import List, Optional
from uuid import UUID

from app.core.schema.config import settings
from app.core.schema.jwt import TokenData
from app.core.utils.auth import auth
from app.db.database import get_db
from app.model.item import Item
from app.model.seller import Seller
from app.schema.seller import (
    GetAuthenticateSellerByEmail,
    GetSellerByEmail,
    SellerCreate,
    SellerInDatabase,
    SellerRead,
)
from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from jose import JWTError, jwt
from sqlalchemy.orm import Session, load_only, joinedload, lazyload

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")


def get_all_sellers(db: Session) -> List[SellerRead]:
    db_data: List[SellerRead] = (
        db.query(Seller)
        .options(
            load_only(
                Seller.id,
                Seller.name,
                Seller.email,
                Seller.image_url,
            ),
            joinedload(Seller.items).load_only(
                Item.id,
                Item.name,
                Item.price,
                Item.image_url,
            ),
        )
        .all()
    )
    # print("\033[34m" + str(db_data) + "\033[0m")
    return db_data


def get_seller_by_id(db: Session, seller_id: UUID) -> Optional[SellerRead]:
    db_data: Optional[SellerRead] = (
        db.query(Seller)
        .filter(Seller.id == seller_id)
        .options(
            load_only(
                Seller.id,
                Seller.name,
                Seller.email,
                Seller.image_url,
            ),
            joinedload(Seller.items).load_only(
                Item.id,
                Item.name,
                Item.price,
                Item.image_url,
            ),
        )
        .one_or_none()
    )
    # print("\033[34m" + str(db_data) + "\033[0m")
    return db_data


def get_seller_by_email(db: Session, email: str) -> Optional[GetSellerByEmail]:
    db_data: Optional[GetSellerByEmail] = (
        db.query(Seller)
        .filter(Seller.email == email)
        .options(
            load_only(
                Seller.id,
                Seller.is_active,
                Seller.password,
                Seller.name,
                Seller.email,
                Seller.image_url,
            ),
            joinedload(Seller.items).load_only(
                Item.id,
                Item.name,
                Item.price,
                Item.image_url,
            ),
        )
        .one_or_none()
    )
    # print("\033[34m" + str(db_data) + "\033[0m")
    return db_data


def get_authenticate_seller_by_email(
    db: Session, email: str
) -> Optional[GetAuthenticateSellerByEmail]:
    db_data: Optional[GetAuthenticateSellerByEmail] = (
        db.query(Seller)
        .filter(Seller.email == email)
        .options(
            load_only(
                Seller.password,
                Seller.email,
            ),
            lazyload(Seller.items),
        )
    ).one_or_none()

    # print("\033[34m" + str(db_data) + "\033[0m")
    return db_data


def add_seller(db: Session, dto: SellerCreate) -> SellerInDatabase:
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
    return data


def inactivate_seller(
    db: Session, current_seller: GetSellerByEmail
) -> GetSellerByEmail:
    current_seller.is_active = False
    db.commit()
    # print("\033[34m" + str(current_seller) + "\033[0m")
    return current_seller


def get_current_seller(
    token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)
) -> Optional[GetSellerByEmail]:
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="invalid token",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(
            token, settings.SECRET_KEY, algorithms=[auth.ALGORITHM]
        )
        email = payload.get("email")
        token_data = TokenData(email=email)
        current_seller = get_seller_by_email(db, email=token_data.email)
        if current_seller is None:
            raise credentials_exception
    except JWTError as jwt_error:
        raise credentials_exception from jwt_error
    return current_seller


def authenticate_seller(
    db: Session, email: str, password: str
) -> (Optional[GetAuthenticateSellerByEmail]):
    data = get_authenticate_seller_by_email(db, email=email)
    if data is None:
        return None
    if not auth.verify_password(password, data.password):
        return None
    return data
