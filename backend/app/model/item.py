import uuid

from app.db.database import Base
from pydantic import HttpUrl
from sqlalchemy import Column, DateTime, ForeignKey, Integer, String, func
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship


class Item(Base):  # type: ignore
    __tablename__ = "items"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    name = Column(String)
    price = Column(Integer)
    description = Column(String)
    image_url = Column(String)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id"))
    user = relationship("User", back_populates="items")
    liked_users = relationship("User", secondary="likes")
    created_at = Column(
        "created_at", DateTime, default=func.now(), nullable=False
    )
    updated_at = Column(
        "updated_at",
        DateTime,
        default=func.now(),
        onupdate=func.now(),
        nullable=False,
    )

    def __init__(
        self,
        name: str,
        price: int,
        image_url: HttpUrl,
        description: str,
        user_id: uuid.UUID,
    ):
        self.name = name
        self.price = price
        self.description = description
        self.image_url = image_url
        self.user_id = user_id
