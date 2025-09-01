import React from "react";
import useBookStore from "./store";


const Favorites = () => {
  const favorites = useBookStore((state) => state.favorites);
  if (!favorites.length) {
    return <div className="book-list-empty">No favorites yet. Add some books!</div>;
  }
  return (
    <div className="favorites">
      <h2>❤️ Favorites</h2>
      <div className="book-list-grid">
        {favorites.map((book, idx) => (
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
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Favorites;
