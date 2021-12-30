import cloudinary.uploader
from fastapi import APIRouter, File, UploadFile
from app.schema.image import Image
from app.core.schema.image import ImageModel

router = APIRouter()


@router.post(
    "/image/upload",
    response_model=ImageModel,
)
def create_upload_image(file: UploadFile = File(...)) -> Image:
    cloudinary_response = cloudinary.uploader.upload(file.file)
    image_url = cloudinary_response.get("url")
    data = Image(url=image_url)
    return data
