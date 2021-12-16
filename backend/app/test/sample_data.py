from app.schema.item import ItemCreate
from app.schema.seller import SellerCreate

seller_1_raw_get = {
    "name": "name_1",
    "email": "email_1@gmail.com",
}

seller_1_raw = {
    **seller_1_raw_get,
    "password": "password_1",
}

seller_1_typed = SellerCreate(**seller_1_raw)

seller_2_raw_get = {
    "name": "name_2",
    "email": "email_2@gmail.com",
}

seller_2_raw = {
    **seller_2_raw_get,
    "password": "password_2",
}

seller_2_typed = SellerCreate(**seller_2_raw)

item_1_raw = ItemCreate(
    **{
        "name": "name_1",
        "price": 100,
        "description": "desc_1",
        "image_url": "http://res.cloudinary.com/asdf.jpg",
    }
)

item_2_raw = ItemCreate(
    **{
        "name": "name_2",
        "price": 200,
        "description": "desc_2",
        "image_url": "http://res.cloudinary.com/zxcv.jpg",
    }
)