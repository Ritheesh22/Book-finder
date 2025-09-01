import React, { useState } from "react";
import axios from "axios";
import useBookStore from "./store";


const NLSearchBar = () => {
  const [nlQuery, setNlQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const setBooks = useBookStore((state) => state.setBooks);
  const setRecommendations = useBookStore((state) => state.setRecommendations);

  const handleNLSearch = async () => {
    if (!nlQuery.trim()) return;
    setLoading(true);
    setError("");
    try {
      const res = await axios.get("http://127.0.0.1:8000/search_nl", {
        params: { query: nlQuery },
      });
  setBooks(res.data.results || []);
  setRecommendations([]); // Do not show interpreted query
    } catch (err) {
      setError("Failed to fetch results. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        value={nlQuery}
        onChange={(e) => setNlQuery(e.target.value)}
        placeholder="Search in natural language..."
      />
      <button onClick={handleNLSearch} disabled={loading}>{loading ? "Asking..." : "Ask AI"}</button>
      {error && <div style={{ color: 'red', marginTop: 8 }}>{error}</div>}
    </div>
  );
};

export default NLSearchBar;
