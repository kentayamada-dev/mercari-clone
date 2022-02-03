import random

from app.core.utils.auth import auth
from app.db.database import SessionLocal, init_db
from app.model.item import Item
from app.model.like import Like
from app.model.query import Query
from app.model.seller import Seller
from faker import Faker
from sqlalchemy.orm import contains_eager, load_only

db = SessionLocal()
fake = Faker(["ja_JP"])


def seed() -> None:
    init_db()
    objects = []
    for _ in range(5):
        email = fake.email()
        name = fake.name()
        hashed_password = auth.generate_hashed_password(email)
        seller = Seller(
            name=name,
            email=email,
            password=hashed_password,
            image_url=f"https://i.pravatar.cc/150?img={random.randint(1, 5)}",  # type: ignore
        )
        seller.items = [
            Item(
                name=name + fake.text(max_nb_chars=10),
                price=random.randint(500, 99999),
                description=fake.sentence(nb_words=10),
                seller_id=seller.id,
                image_url=f"https://i.pravatar.cc/150?img={random.randint(1, 4)}",  # type: ignore
            )
            for _ in range(4)
        ]
        seller.saved_queries = [
            Query(query=fake.word(), seller_id=seller.id) for _ in range(3)
        ]
        objects.append(seller)
    db.add_all(objects)
    db.commit()
    objects = []
    sellers = (
        db.query(Seller)
        .join(Seller.items)
        .options(
            load_only(Seller.id),
            contains_eager(Seller.items).load_only(Item.id),
        )
        .all()
    )

    for seller in sellers:
        for item in seller.items:
            for i in range(random.randint(0, 5)):
                objects.append(Like(sellers[i].id, item.id))
    db.add_all(objects)
    db.commit()
    print("Seeding done!")
