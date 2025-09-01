# Book Finder App

A modern web application to search for books, get AI-powered recommendations, and manage your favorites. Built with React (frontend) and Python FastAPI (backend).

## Features
- Structured and natural language book search
- AI recommendations
- Favorites management
- Modern, responsive UI with animations

## Prerequisites
- Node.js (v16+ recommended)
- Python 3.8+

## Getting Started

### 1. Clone the repository
```
git clone <repo-url>
cd book_finder_app
```


### 2. Start the Backend
```
cd backend
pip install -r requirements.txt
uvicorn main:app --reload
```
The backend will run at `http://127.0.0.1:8000`.

### 3. Start the Frontend
```
cd ../frontend
npm install
npm start
```
The frontend will run at `http://localhost:3000`.

## Folder Structure
```
backend/      # FastAPI backend
frontend/     # React frontend
```

## Notes
- Make sure the backend is running before using the frontend search features.
- You can customize the backend API endpoints as needed.

## License
MIT
