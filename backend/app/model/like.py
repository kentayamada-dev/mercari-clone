import uuid

from app.db.database import Base
from sqlalchemy import Column, DateTime, ForeignKey, func
from sqlalchemy.dialects.postgresql import UUID


class Like(Base):  # type: ignore
    __tablename__ = "likes"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    seller_id = Column(UUID(as_uuid=True), ForeignKey("sellers.id"))
    item_id = Column(
        UUID(as_uuid=True), ForeignKey("items.id", ondelete="CASCADE")
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
        seller_id: uuid.UUID,
        item_id: uuid.UUID,
    ):
        self.item_id = item_id
        self.seller_id = seller_id
