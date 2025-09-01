from fastapi import APIRouter, Query
from services.book_services import search_books_service, search_books_nl_service

router = APIRouter()

@router.get("/search")
def search_books(title: str = None, author: str = None, subject: str = None, year: str = None):
    """Search by structured filters"""
    books = search_books_service(title, author, subject, year)
    return {"results": books}

@router.get("/search_nl")
def search_books_nl(query: str = Query(..., description="Natural language query")):
    """Search by natural language query using Gemini"""
    return search_books_nl_service(query)
