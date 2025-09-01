import React, { useState } from "react";
import useBookStore from "./store";
import axios from "axios";

const SearchBar = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [subject, setSubject] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const setBooks = useBookStore((state) => state.setBooks);

  const handleSearch = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await axios.get("http://127.0.0.1:8000/search", {
        params: { title, author, subject },
      });
      setBooks(res.data.results || []);
    } catch (err) {
      setError("Failed to fetch books. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="search-bar">
      <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" />
      <input value={author} onChange={(e) => setAuthor(e.target.value)} placeholder="Author" />
      <input value={subject} onChange={(e) => setSubject(e.target.value)} placeholder="Subject" />
      <button onClick={handleSearch} disabled={loading}>{loading ? "Searching..." : "Search"}</button>
      {error && <div style={{ color: 'red', marginTop: 8 }}>{error}</div>}
    </div>
  );
};

export default SearchBar;
