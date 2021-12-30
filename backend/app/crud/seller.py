from typing import List, Optional
from uuid import UUID

from app.core.schema.config import settings
from app.core.schema.jwt import TokenData
from app.core.utils.auth import auth
from app.db.database import get_db
from app.model.seller import Seller
from app.schema.seller import SellerCreate
from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from jose import JWTError, jwt
from sqlalchemy.orm import Session

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")


def get_all_sellers(db: Session) -> List[Seller]:
    db_data: List[Seller] = db.query(Seller).all()
    return db_data


def get_seller_by_id(db: Session, seller_id: UUID) -> Optional[Seller]:
    db_data: Optional[Seller] = (
        db.query(Seller).filter(Seller.id == seller_id).first()
    )
    return db_data


def get_seller_by_email(db: Session, email: str) -> Optional[Seller]:
    db_data: Optional[Seller] = (
        db.query(Seller).filter(Seller.email == email).first()
    )
    return db_data


def add_seller(db: Session, dto: SellerCreate) -> Seller:
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
    return data


def inactivate_seller(db: Session, current_seller: Seller) -> Seller:
    current_seller.is_active = False
    db.commit()
    return current_seller


def get_current_seller(
    token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)
) -> Optional[Seller]:
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
) -> (Optional[Seller]):
    data = get_seller_by_email(db, email=email)
    if data is None:
        return None
    if not auth.verify_password(password, data.password):
        return None
    return data
