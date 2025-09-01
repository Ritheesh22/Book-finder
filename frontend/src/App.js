import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import SearchBar from "./SearchBar";
import NLSearchBar from "./NLSearchBar";
import BookList from "./BookList";
import Favorites from "./Favorites";
import Recommendations from "./Recommendations";
import "./App.css";


function App() {
  return (
    <Router>
      <div className="app enhanced-bg">
        <header className="navbar">
          <div className="navbar-logo">
            <span role="img" aria-label="book">📚</span> Book Finder
          </div>
          <nav className="navbar-links">
            <Link to="/" className="nav-link">Search</Link>
            <Link to="/favorites" className="nav-link">Favorites</Link>
          </nav>
        </header>
        <main className="main-content">
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <section className="search-section">
                    <h2 className="section-title">🔎 Structured Search</h2>
                    <SearchBar />
                  </section>
                  <section className="search-section">
                    <h2 className="section-title">🤖 Natural Language Search</h2>
                    <NLSearchBar />
                  </section>
                  <Recommendations />
                  <BookList />
                </>
              }
            />
            <Route path="/favorites" element={<Favorites />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
