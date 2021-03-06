import random

from app.core.utils.auth import auth
from app.db.database import SessionLocal, init_db
from app.model.item import Item
from app.model.like import Like
from app.model.order import Order
from app.model.query import Query
from app.model.user import User
from faker import Faker
from sqlalchemy.orm import contains_eager, load_only

db = SessionLocal()
fake = Faker(["ja_JP"])


def seed() -> None:
    init_db()
    objects = []
    for _ in range(10):
        email = fake.email()
        name = fake.name()
        hashed_password = auth.generate_hashed_password(email)
        user = User(
            name=name,
            email=email,
            password=hashed_password,
            image_url=f"https://i.pravatar.cc/150?img={random.randint(0, 30)}",  # type: ignore
        )
        user.items = [
            Item(
                name=name + fake.text(max_nb_chars=10),
                price=random.randint(500, 9999),
                description=fake.sentence(nb_words=10),
                user_id=user.id,
                image_url=f"https://i.pravatar.cc/150?img={random.randint(40, 60)}",  # type: ignore
            )
            for _ in range(random.randint(0, 10))
        ]
        user.saved_queries = [
            Query(query=fake.word(), user_id=user.id)
            for _ in range(random.randint(0, 5))
        ]
        objects.append(user)
    db.add_all(objects)
    db.commit()
    objects = []
    users = (
        db.query(User)
        .join(User.items)
        .options(
            load_only(User.id),
            contains_eager(User.items).load_only(Item.id),
        )
        .all()
    )

    for (j, _) in enumerate(users):
        for item in users[j].items:
            rand_num = random.randint(0, 8)
            if rand_num != j and rand_num % 2 != 0:
                objects.append(Order(item.id, users[rand_num].id))
            for i in range(random.randint(0, 8)):
                objects.append(Like(users[i].id, item.id))

    db.add_all(objects)
    db.commit()
    print("Seeding done!")
