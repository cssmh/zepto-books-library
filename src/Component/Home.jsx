// src/pages/HomePage.js
import { useState, useEffect } from "react";
import axios from "axios";

const HomePage = () => {
  const [books, setBooks] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    axios
      .get("https://gutendex.com/books")
      .then((response) => {
        setBooks(response.data.results);
      })
      .catch((error) => console.error(error));
  }, []);

  const filteredBooks = books.filter((book) =>
    book.title.toLowerCase().includes(searchQuery.toLowerCase())
  );
  console.log(books);

  return (
    <div className="homepage">
      <input
        type="text"
        placeholder="Search by title..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      {/* TODO: Add Genre Filter */}
      <div className="book-list">
        {filteredBooks?.map((book) => (
          <div key={book.id} className="book-item">
            <img src={book.cover_image || "fallback.jpg"} alt={book.title} />
            <h3>{book?.title}</h3>
            <p>{book?.authors[0].name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
