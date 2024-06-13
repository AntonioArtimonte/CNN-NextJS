from fastapi import APIRouter
from app.api.endpoints import padrao, linear

api_router = APIRouter()
api_router.include_router(padrao.router, prefix="/padrao", tags=["normal"])
api_router.include_router(linear.router, prefix="/linear", tags=["linear"])
