from uuid import UUID

from app.crud.item import check_item_existence
from app.model.like import Like
from app.schema.common import Base
from app.schema.like import AddLike, LikeCreate
from fastapi import HTTPException, status
from sqlalchemy.orm import Session

item_not_exists_exception = HTTPException(
    status_code=status.HTTP_400_BAD_REQUEST,
    detail="item not exists",
)

item_already_liked_exception = HTTPException(
    status_code=status.HTTP_400_BAD_REQUEST,
    detail="item already liked",
)

like_not_found_exception = HTTPException(
    status_code=status.HTTP_404_NOT_FOUND, detail="like not found"
)


def check_like_existence(db: Session, item_id: UUID, user_id: UUID) -> bool:

    return bool(
        db.query(Like.id)
        .filter(Like.item_id == item_id, Like.user_id == user_id)
        .one_or_none()
    )


def add_like(db: Session, dto: LikeCreate, user_id: UUID) -> AddLike:
    if check_item_existence(db, dto.item_id) is False:
        raise item_not_exists_exception
    if check_like_existence(db, dto.item_id, user_id) is True:
        raise item_already_liked_exception
    data = Like(user_id, dto.item_id)
    db.add(data)
    db.commit()
    db.refresh(data)

    # print("\033[32m" + str(data) + "\033[0m")
    return AddLike(item_id=dto.item_id, user_id=user_id)


def remove_like(db: Session, item_id: UUID, user_id: UUID) -> Base:
    if (
        db.query(Like)
        .filter(Like.item_id == item_id, Like.user_id == user_id)
        .delete()
        == 0
    ):
        raise like_not_found_exception
    db.commit()

    return Base(id=item_id)
