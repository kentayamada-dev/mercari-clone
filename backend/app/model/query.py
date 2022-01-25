import uuid

from app.db.database import Base
from sqlalchemy import Column, DateTime, ForeignKey, String, func
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship


class Query(Base):  # type: ignore
    __tablename__ = "queries"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    query = Column(String)
    seller_id = Column(UUID(as_uuid=True), ForeignKey("sellers.id"))
    seller = relationship(
        "Seller", back_populates="saved_queries", lazy="joined"
    )
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
        query: str,
        seller_id: uuid.UUID,
    ):
        self.query = query
        self.seller_id = seller_id
