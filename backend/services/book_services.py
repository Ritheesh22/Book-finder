import requests
import os
import json
import google.generativeai as genai
from dotenv import load_dotenv

# Load .env file
load_dotenv()

# Open Library API
OPENLIBRARY_API = "https://openlibrary.org/search.json"

# Get Gemini API key from .env
api_key = os.getenv("GOOGLE_API_KEY")

genai.configure(api_key=api_key)

def interpret_query(user_query: str):
    """Use Gemini to convert natural language query into structured JSON"""
    prompt = f"""
    You are a book search assistant. 
    if you get the books with same title ,author and year return only one book.
    Convert the following natural language query into JSON with fields: title, author, subject, year.
    Return ONLY valid JSON, no markdown, no explanation.

    Query: "{user_query}"

    Example Output:
    {{
        "title": "The Hobbit",
        "author": "J.R.R. Tolkien",
        "subject": "Fantasy",
        "year": "1937"
    }}
    """
    model = genai.GenerativeModel("gemini-2.5-flash")
    response = model.generate_content(prompt)
    try:
        raw_text = response.candidates[0].content.parts[0].text.strip()
        if raw_text.startswith("```"):
            raw_text = raw_text.strip("`")
            raw_text = raw_text.replace("json", "").strip()
        return json.loads(raw_text)
    except Exception as e:
        print("⚠️ Error parsing Gemini output:", e)
        print("Raw output:", response)
        return {"title": None, "author": None, "subject": None, "year": None}

def search_books_service(title=None, author=None, subject=None, year=None):
    params = {}
    if title:
        params["title"] = title
    if author:
        params["author"] = author
    if subject:
        params["subject"] = subject
    if year:
        params["first_publish_year"] = year
    response = requests.get(OPENLIBRARY_API, params=params)
    data = response.json()
    books = []
    for book in data.get("docs", [])[:10]:
        books.append({
            "title": book.get("title"),
            "author": ", ".join(book.get("author_name", [])),
            "year": book.get("first_publish_year"),
            "cover": f"https://covers.openlibrary.org/b/id/{book.get('cover_i')}-M.jpg" if book.get("cover_i") else None
        })
    return books

def search_books_nl_service(query):
    fields = interpret_query(query)
    params = {}
    if fields.get("title"):
        params["title"] = fields["title"]
    if fields.get("author"):
        params["author"] = fields["author"]
    if fields.get("subject"):
        params["subject"] = fields["subject"]
    if fields.get("year"):
        params["first_publish_year"] = fields["year"]
    if not params:
        params["q"] = query
    response = requests.get(OPENLIBRARY_API, params=params)
    data = response.json()
    books = []
    for book in data.get("docs", [])[:10]:
        books.append({
            "title": book.get("title"),
            "author": ", ".join(book.get("author_name", [])),
            "year": book.get("first_publish_year"),
            "cover": f"https://covers.openlibrary.org/b/id/{book.get('cover_i')}-M.jpg" if book.get("cover_i") else None
        })
    return {"query_original": query, "query_interpreted": fields, "results": books}
