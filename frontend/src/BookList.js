
import React from "react";
import useBookStore from "./store";

const BookList = () => {
  const books = useBookStore((state) => state.books);
  const addFavorite = useBookStore((state) => state.addFavorite);

  if (!books.length) {
    return <div className="book-list-empty">No books found. Try searching for something!</div>;
  }

  return (
    <div className="book-list-grid">
      {books.map((book, idx) => (
        <div key={idx} className="book-card-modern">
          {book.cover ? (
            <img className="book-cover" src={book.cover} alt="cover" />
          ) : (
            <div className="book-cover-placeholder">No Image</div>
          )}
          <div className="book-info">
            <h3 className="book-title">{book.title}</h3>
            <p className="book-author">{book.author}</p>
            <p className="book-year">{book.year}</p>
            <button className="favorite-btn" onClick={() => addFavorite(book)}>
              ❤️ Add to Favorites
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BookList;
