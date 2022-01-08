from fastapi.responses import HTMLResponse
from fastapi import APIRouter

# router = APIRouter(route_class=LoggingContextRoute)
router = APIRouter()


@router.get("/", response_class=HTMLResponse, include_in_schema=False)
def root() -> str:
    return """
    <head>
        <title>Mercari Clone API</title>
    </head>
    <body>
        <h1>Mercari Clone API Docs</h1>
        <h3><a href="/docs">🔗  /docs</a></h3>
        <h3><a href="/redoc">🔗  /redoc</a></h3>
    </body>
    """
