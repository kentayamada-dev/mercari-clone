from app.core.schema.jwt import Secret
from app.core.schema.message import Message
from app.core.utils.auth import auth
from app.crud.seller import authenticate_seller
from app.db.database import get_db
from fastapi import APIRouter, Depends, status
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session

router = APIRouter()


@router.post(
    "/token",
    response_model=Secret,
    responses={status.HTTP_401_UNAUTHORIZED: {"model": Message}},
)
def create_token(
    form_data: OAuth2PasswordRequestForm = Depends(),
    db: Session = Depends(get_db),
) -> dict[str, str]:
    user = authenticate_seller(db, form_data.username, form_data.password)
    token = auth.create_jwt_token(user.email)
    return {"access_token": token, "token_type": "Bearer"}
