
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes.book_routes import router as book_router


app = FastAPI()

# CORS for frontend (React at port 3000)
app.add_middleware(
	CORSMiddleware,
	allow_origins=["http://localhost:3000"],
	allow_credentials=True,
	allow_methods=["*"],
	allow_headers=["*"],
)
# Register book routes
app.include_router(book_router)

# CORS for frontend (React at port 3000)
