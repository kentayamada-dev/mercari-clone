from fastapi import Request, encoders, exceptions, responses, status
from fastapi.openapi.utils import validation_error_response_definition


async def custom_validation_exception_handler(
    _: Request, exc: exceptions.RequestValidationError
) -> responses.JSONResponse:
    error = exc.errors()[0]
    error_message = error["msg"]
    error_location = error["loc"]
    return responses.JSONResponse(
        status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
        content=encoders.jsonable_encoder(
            {"message": f"{error_location[1]} {error_message}"}
        ),
    )


validation_error_response_definition["properties"] = {
    "message": {"title": "Message", "type": "string"},
}
