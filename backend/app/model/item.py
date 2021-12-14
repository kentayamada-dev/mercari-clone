import uuid
from datetime import datetime

from app.db.database import Base
from sqlalchemy import Column, DateTime, ForeignKey, Integer, String
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship


class Item(Base):  # type: ignore
    __tablename__ = "items"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    name = Column(String)
    price = Column(Integer)
    description = Column(String)
    image_url = Column(String)
    seller_id = Column(UUID(as_uuid=True), ForeignKey("seller.id"))
    seller = relationship("Seller", back_populates="items")
    created_at = Column(
        "created_at", DateTime, default=datetime.now(), nullable=False
    )
    updated_at = Column(
        "updated_at",
        DateTime,
        default=datetime.now(),
        onupdate=datetime.now(),
        nullable=False,
    )
