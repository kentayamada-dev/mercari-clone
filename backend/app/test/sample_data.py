from app.schema.item import CreateItem
from app.schema.seller import CreateSeller

seller_1_raw_get = {
    "name": "name_1",
    "email": "email_1@gmail.com",
    "image_url": "http://image.com/seller_1.jpg",
}

seller_1_raw = {
    **seller_1_raw_get,
    "password": "password_1",
}

seller_1_typed = CreateSeller(**seller_1_raw)

seller_2_raw_get = {
    "name": "name_2",
    "email": "email_2@gmail.com",
}

seller_2_raw = {
    **seller_2_raw_get,
    "password": "password_2",
    "image_url": "http://image.com/seller_2.jpg",
}

seller_2_typed = CreateSeller(**seller_2_raw)

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
