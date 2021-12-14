from app.core.schema.config import settings
from datetime import datetime, timedelta
from jose import jwt
from passlib.context import CryptContext


class Auth:
    password_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
    ALGORITHM = "HS256"

    def generate_hashed_password(self, password: str) -> str:
        hashed_password: str = self.password_context.hash(password)
        return hashed_password

    def verify_password(
        self, plain_password: str, hashed_password: str
    ) -> bool:
        is_valid: bool = self.password_context.verify(
            plain_password, hashed_password
        )
        return is_valid

    def create_jwt_token(self, email: str) -> str:
        payload = {
            "exp": datetime.utcnow() + timedelta(minutes=60),
            "email": email,
        }
        encoded_jwt: str = jwt.encode(
            payload, settings.SECRET_KEY, algorithm=self.ALGORITHM
        )
        return encoded_jwt


auth = Auth()
