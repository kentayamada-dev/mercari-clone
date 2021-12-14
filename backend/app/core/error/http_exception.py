from fastapi import Request, exceptions, responses


async def custom_http_exception_handler(
    _: Request, exc: exceptions.HTTPException
) -> responses.JSONResponse:
    return responses.JSONResponse(
        {"message": exc.detail}, status_code=exc.status_code
    )
