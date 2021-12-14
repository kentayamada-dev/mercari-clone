import uuid
from datetime import datetime

from app.db.database import Base
from sqlalchemy import Boolean, Column, DateTime, String
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship


class Seller(Base):  # type: ignore
    __tablename__ = "seller"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    email = Column(String, unique=True)
    name = Column(String)
    password = Column(String)
    items = relationship("Item", back_populates="seller")
    is_active = Column(Boolean, default=True)
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
