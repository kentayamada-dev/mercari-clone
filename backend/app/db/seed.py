from app.core.utils.auth import auth
from app.db.database import SessionLocal, init_db
from app.model.item import Item
from app.model.seller import Seller

db = SessionLocal()


def seed() -> None:
    init_db()
    for i in range(1, 5):
        hashed_password = auth.generate_hashed_password(f"seller_{i}_password")
        seller = Seller(
            name=f"seller_{i}_name",
            email=f"seller_{i}_email@gmail.com",
            password=hashed_password,
        )
        seller.items = [
            Item(
                name=f"seller_{i}_item_{j}_name",
                price=f"{i+j}",
                description=f"seller_{i}_item_{j}_description",
                seller_id=seller.id,
                image_url="http://res.cloudinary.com/kentayamada/image/upload/v1637835327/ua444mvckcs0ohjpuavr.jpg",
            )
            for j in range(1, 3)
        ]
        db.add(seller)
        db.commit()
        db.refresh(seller)
    print("seeding done!")
