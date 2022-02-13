from app.schema.item import CreateItem
from app.schema.query import QueryCreate
from app.schema.user import CreateUser

user_1_raw_get = {
    "name": "name_1",
    "email": "email_1@gmail.com",
    "image_url": "http://image.com/user_1.jpg",
}

user_1_raw = {
    **user_1_raw_get,
    "password": "password_1",
}

user_1_typed = CreateUser(**user_1_raw)

user_2_raw_get = {
    "name": "name_2",
    "email": "email_2@gmail.com",
}

user_2_raw = {
    **user_2_raw_get,
    "password": "password_2",
    "image_url": "http://image.com/user_2.jpg",
}

user_2_typed = CreateUser(**user_2_raw)

item_1_typed = CreateItem(
    **{
        "name": "name_1",
        "price": 900,
        "description": "desc_1",
        "image_url": "http://image.com/item_1.jpg",
    }
)

item_2_typed = CreateItem(
    **{
        "name": "name_2",
        "price": 900,
        "description": "desc_2",
        "image_url": "http://image.com/item_2.jpg",
    }
)


query_1_typed = QueryCreate(
    **{
        "query": "query_1",
    }
)

query_2_typed = QueryCreate(
    **{
        "query": "query_2",
    }
)
