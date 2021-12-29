from app.core.utils.auth import auth
from app.db.database import SessionLocal, init_db
from app.model.item import Item
from app.model.seller import Seller
from faker import Faker
import random

db = SessionLocal()
fake = Faker(["ja_JP"])


def seed() -> None:
    init_db()
    for _ in range(1, 5):
        email = fake.email()
        hashed_password = auth.generate_hashed_password(email)
        seller = Seller(
            name=fake.name(),
            email=email,
            password=hashed_password,
            image_url=f"https://i.pravatar.cc/150?img={random.randint(1, 20)}",
        )
        seller.items = [
            Item(
                name=fake.text(max_nb_chars=10),
                price=random.randint(500, 99999),
                description=fake.sentence(nb_words=10),
                seller_id=seller.id,
                image_url=(
                    f"https://i.pravatar.cc/150?img={random.randint(1, 20)}"
                ),
            )
            for _ in range(1, 5)
        ]
        db.add(seller)
        db.commit()
        db.refresh(seller)
    print("seeding done!")
