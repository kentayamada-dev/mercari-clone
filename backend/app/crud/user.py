from uuid import UUID

from app.core.schema.config import settings
from app.core.schema.jwt import TokenData
from app.core.utils.auth import auth
from app.db.database import get_db
from app.model.item import Item
from app.model.user import User
from app.schema.user import (
    BaseUser,
    CreateUser,
    GetUserByEmail,
    GetUserById,
    InactivateUser,
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
    detail="cannot read inactivated user",
)

user_not_found_exception = HTTPException(
    status_code=status.HTTP_404_NOT_FOUND, detail="user not found"
)

email_already_exists_exception = HTTPException(
    status_code=status.HTTP_400_BAD_REQUEST, detail="email already exists"
)


def get_all_users(skip: int, limit: int, db: Session) -> list[BaseUser]:
    db_data: list[BaseUser] = (
        db.query(User)
        .options(load_only(User.id, User.name, User.image_url))
        .order_by(desc(User.created_at))
        .offset(skip)
        .limit(limit)
        .all()
    )

    # print("\033[34m" + str(db_data) + "\033[0m")
    return db_data


def get_user_by_id(db: Session, user_id: UUID) -> GetUserById:
    db_data: GetUserById = (
        db.query(User)
        .filter(User.id == user_id)
        .outerjoin(User.items)
        .options(
            load_only(User.id, User.name, User.image_url),
            contains_eager(User.items).load_only(
                Item.id, Item.name, Item.price, Item.image_url
            ),
        )
        .order_by(desc(Item.created_at))
        .one_or_none()
    )
    if db_data is None:
        raise user_not_found_exception

    # print("\033[34m" + str(db_data) + "\033[0m")
    return db_data


def get_user_by_email(db: Session, email: str) -> GetUserByEmail:
    db_data: GetUserByEmail = (
        db.query(User)
        .filter(User.email == email)
        .options(
            load_only(User.id, User.email, User.password, User.is_active),
        )
        .one_or_none()
    )
    if db_data is None:
        raise user_not_found_exception

    # print("\033[34m" + str(db_data) + "\033[0m")
    return db_data


def check_email_existence(db: Session, email: str) -> bool:

    return bool(db.query(User.id).filter(User.email == email).one_or_none())


def add_user(db: Session, dto: CreateUser) -> None:
    if check_email_existence(db, dto.email) is True:
        raise email_already_exists_exception

    hashed_password = auth.generate_hashed_password(
        dto.password.get_secret_value()
    )
    data = User(
        name=dto.name,
        email=dto.email,
        password=hashed_password,
        image_url=dto.image_url,
    )
    db.add(data)
    db.commit()
    db.refresh(data)

    # print("\033[34m" + str(data) + "\033[0m")
    return


def inactivate_user(
    db: Session, current_user: GetUserByEmail
) -> InactivateUser:
    current_user.is_active = False
    db.commit()

    # print("\033[34m" + str(current_user) + "\033[0m")
    return InactivateUser(id=current_user.id, is_active=current_user.is_active)


def get_current_user(
    token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)
) -> GetUserByEmail:
    try:
        payload = jwt.decode(token, settings.SECRET_KEY, [auth.ALGORITHM])
        email = payload.get("email")
        token_data = TokenData(email=email)
        current_user = get_user_by_email(db, token_data.email)
        if current_user.is_active is False:
            raise inactivated_exception
    except JWTError as jwt_error:
        raise credentials_exception from jwt_error

    return current_user


def authenticate_user(db: Session, email: str, password: str) -> GetUserByEmail:
    data = get_user_by_email(db, email)
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
