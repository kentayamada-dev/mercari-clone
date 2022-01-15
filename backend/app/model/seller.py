import uuid

from app.db.database import Base
from pydantic import EmailStr, HttpUrl
from sqlalchemy import Boolean, Column, DateTime, String, func
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship


class Seller(Base):  # type: ignore
    __tablename__ = "seller"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    email = Column(String, unique=True)
    name = Column(String)
    password = Column(String)
    image_url = Column(String)
    items = relationship("Item", back_populates="seller", lazy="joined")
    is_active = Column(Boolean, default=True)
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
        email: EmailStr,
        password: str,
        image_url: HttpUrl,
    ):
        self.name = name
        self.email = email
        self.password = password
        self.image_url = image_url
