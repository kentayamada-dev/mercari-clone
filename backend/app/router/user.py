from uuid import UUID

from app.core.schema.jwt import Secret
from app.core.schema.message import Message
from app.core.utils.auth import auth
from app.crud.user import (
    add_user,
    authenticate_user,
    get_all_users,
    get_current_user,
    get_user_by_id,
    inactivate_user,
)
from app.db.database import get_db
from app.schema.user import (
    BaseUser,
    CreateUser,
    GetUserByEmail,
    GetUserById,
    InactivateUser,
    ReadUsers,
)
from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session

# router = APIRouter(route_class=LoggingContextRoute)
router = APIRouter()


@router.post(
    "/users",
    response_model=Secret,
    status_code=status.HTTP_201_CREATED,
    responses={status.HTTP_400_BAD_REQUEST: {"model": Message}},
)
def create_user(user_dto: CreateUser, db: Session = Depends(get_db)) -> Secret:
    add_user(db, user_dto)
    user = authenticate_user(
        db, user_dto.email, user_dto.password.get_secret_value()
    )
    token = auth.create_jwt_token(user.email)

    return Secret(access_token=token, token_type="Bearer")


@router.get("/users", response_model=ReadUsers)
def read_users(
    skip: int, limit: int, db: Session = Depends(get_db)
) -> ReadUsers:
    db_users = get_all_users(skip, limit, db)
    db_users_model = [BaseUser.from_orm(db_user) for db_user in db_users]

    return ReadUsers(
        data=db_users_model,
        skip=None if len(db_users_model) < limit else skip + limit,
    )


@router.get(
    "/users/{user_id}",
    response_model=GetUserById,
    responses={status.HTTP_404_NOT_FOUND: {"model": Message}},
)
def read_user(user_id: UUID, db: Session = Depends(get_db)) -> GetUserById:
    db_user = get_user_by_id(db, user_id)
    db_user_model = GetUserById.from_orm(db_user)

    return db_user_model


@router.patch(
    "/users/me/inactivate",
    response_model=InactivateUser,
    responses={
        status.HTTP_401_UNAUTHORIZED: {"model": Message},
        status.HTTP_400_BAD_REQUEST: {"model": Message},
    },
)
def inactivate_current_user(
    current_user: GetUserByEmail = Depends(get_current_user),
    db: Session = Depends(get_db),
) -> InactivateUser:
    db_user = inactivate_user(db, current_user)
    db_user_model = InactivateUser.from_orm(db_user)

    return db_user_model


@router.get(
    "/users/me/",
    response_model=GetUserById,
    responses={
        status.HTTP_404_NOT_FOUND: {"model": Message},
        status.HTTP_401_UNAUTHORIZED: {"model": Message},
        status.HTTP_400_BAD_REQUEST: {"model": Message},
    },
)
def read_current_user(
    current_user: GetUserByEmail = Depends(get_current_user),
    db: Session = Depends(get_db),
) -> GetUserById:
    db_user = get_user_by_id(db, current_user.id)
    db_user_model = GetUserById.from_orm(db_user)

    return db_user_model
