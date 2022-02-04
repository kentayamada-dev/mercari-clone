import uuid

from app.db.database import Base
from sqlalchemy import Column, DateTime, ForeignKey, func
from sqlalchemy.dialects.postgresql import UUID


class Like(Base):  # type: ignore
    __tablename__ = "likes"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id"))
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
        user_id: uuid.UUID,
        item_id: uuid.UUID,
    ):
        self.item_id = item_id
        self.user_id = user_id
