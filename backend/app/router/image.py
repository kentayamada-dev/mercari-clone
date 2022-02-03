import cloudinary.exceptions
import cloudinary.uploader
from app.core.schema.message import Message
from app.schema.image import Image
from fastapi import APIRouter, File, HTTPException, UploadFile, status

# router = APIRouter(route_class=LoggingContextRoute)
router = APIRouter()


@router.post(
    "/image/upload",
    response_model=Image,
    status_code=status.HTTP_201_CREATED,
    responses={
        status.HTTP_413_REQUEST_ENTITY_TOO_LARGE: {"model": Message},
        status.HTTP_401_UNAUTHORIZED: {"model": Message},
        status.HTTP_400_BAD_REQUEST: {"model": Message},
    },
)
def create_upload_image(file: UploadFile = File(...)) -> Image:
    try:
        cloudinary_response = cloudinary.uploader.upload(
            file=file.file, folder="mercari-clone"
        )
        image_url = cloudinary_response.get("url")
        data = Image(url=image_url)
        return data
    except cloudinary.exceptions.Error as error:
        raise HTTPException(
            status_code=status.HTTP_413_REQUEST_ENTITY_TOO_LARGE,
            detail=f"{error}",
        ) from error
