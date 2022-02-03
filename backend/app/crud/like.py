from uuid import UUID

from app.crud.item import check_item_existence
from app.model.like import Like
from app.schema.like import AddLike
from fastapi import HTTPException, status
from sqlalchemy.orm import Session


def check_like_existence(db: Session, item_id: UUID, seller_id: UUID) -> bool:

    return bool(
        db.query(Like.id)
        .filter(Like.item_id == item_id, Like.seller_id == seller_id)
        .one_or_none()
    )


def add_like(db: Session, item_id: UUID, seller_id: UUID) -> AddLike:
    if check_item_existence(db, item_id) is False:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="item does not exists",
        )
    if check_like_existence(db, item_id, seller_id) is True:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="item already liked",
        )
    data = Like(seller_id, item_id)
    db.add(data)
    db.commit()
    db.refresh(data)

    # print("\033[32m" + str(data) + "\033[0m")
    return AddLike(item_id=item_id, seller_id=seller_id)
