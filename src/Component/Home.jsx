import { useState, useEffect } from "react";
import axios from "axios";
import SmallLoader from "./SmallLoader";

const HomePage = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("");
  const [wishlist, setWishlist] = useState(() => {
    return JSON.parse(localStorage.getItem("wishlist")) || [];
  });
  const [currentPage, setCurrentPage] = useState(1);
  const booksPerPage = 10;

  useEffect(() => {
    const fetchBooks = async () => {
      setLoading(true);
      try {
        const response = await axios.get("https://gutendex.com/books");
        setBooks(response?.data.results);
      } catch (error) {
        console.error("Error fetching books:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  // Add/remove book from wishlist
  const toggleWishlist = (book) => {
    const updatedWishlist = wishlist.includes(book.id)
      ? wishlist.filter((id) => id !== book.id)
      : [...wishlist, book.id];
    setWishlist(updatedWishlist);
    localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
  };

  // Filter books by title and genre (using bookshelves)
  const filteredBooks = books.filter((book) => {
    const matchesTitle = book.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesGenre =
      selectedGenre === "" ||
      book.bookshelves.some((shelf) =>
        shelf.toLowerCase().includes(selectedGenre.toLowerCase())
      );
    return matchesTitle && matchesGenre;
  });

  // Pagination logic
  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = filteredBooks.slice(indexOfFirstBook, indexOfLastBook);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (loading) return <SmallLoader size={83} />;

  return (
    <div className="container mx-auto p-4 mb-7">
      <div className="flex justify-between items-center mb-4">
        <input
          type="text"
          className="border p-2 rounded w-full max-w-md outline-none"
          placeholder="Search by title..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <select
          className="border p-2 ml-4 rounded outline-none"
          value={selectedGenre}
          onChange={(e) => setSelectedGenre(e.target.value)}
        >
          <option value="">All Genres</option>
          <option value="science-fiction">Science Fiction & Fantasy</option>
          <option value="gothic fiction">Gothic Fiction</option>
          <option value="horror">Horror</option>
          <option value="movie books">Movie Books</option>
          <option value="mystery fiction">Mystery Fiction</option>
        </select>
      </div>
      {filteredBooks.length === 0 ? (
        <p>No books found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {currentBooks.map((book) => (
            <div key={book.id} className="border p-4 rounded-lg shadow-md">
              <img
                src={book.formats["image/jpeg"] || "fallback.jpg"}
                alt={book.title}
                className="w-full h-40 object-cover mb-2"
              />
              <h3 className="font-semibold text-lg">{book.title}</h3>
              <p className="text-gray-600 mb-2">
                <span className="text-gray-500 font-medium">Author: </span>{" "}
                {book.authors.length > 0
                  ? `${book.authors[0].name} ${
                      book.authors[0].birth_year
                        ? `(${book.authors[0].birth_year} - ${
                            book.authors[0].death_year || "present"
                          })`
                        : ""
                    }`
                  : "Unknown Author"}
              </p>
              <p className="text-gray-500 text-sm mb-2">
                {book.subjects.length > 0 ? book.subjects[0] : "Unknown Genre"}
              </p>
              <p className="text-gray-500 text-sm mb-2">
                <strong>ID:</strong> {book.id}
              </p>
              <button
                onClick={() => toggleWishlist(book)}
                className={`${
                  wishlist.includes(book.id) ? "text-red-500" : "text-gray-500"
                }`}
              >
                {wishlist.includes(book.id) ? "❤️" : "🤍"}
              </button>
            </div>
          ))}
        </div>
      )}
      <div className="flex justify-center mt-6">
        {[...Array(Math.ceil(filteredBooks.length / booksPerPage)).keys()].map(
          (number) => (
            <button
              key={number + 1}
              onClick={() => paginate(number + 1)}
              className={`mx-2 px-4 py-2 border ${
                currentPage === number + 1 ? "bg-blue-500 text-white" : ""
              }`}
            >
              {number + 1}
            </button>
          )
        )}
      </div>
    </div>
  );
};

export default HomePage;
