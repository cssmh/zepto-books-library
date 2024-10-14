import { useState, useEffect } from "react";
import axios from "axios";
import SmallLoader from "./SmallLoader";

const Home = () => {
  const [books, setBooks] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("");
  const [wishlist, setWishlist] = useState(() => {
    return JSON.parse(localStorage.getItem("wishlist")) || [];
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true); // Add loading state
  const booksPerPage = 10;

  // Fetch books from the API
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        setLoading(true); // Set loading to true before fetching
        const response = await axios.get("https://gutendex.com/books");
        setBooks(response.data.results);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false); // Set loading to false after fetching
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

  // Filter books by title and genre
  const filteredBooks = books.filter((book) => {
    const matchesTitle = book.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesGenre =
      selectedGenre === "" ||
      book.subjects.some((subject) =>
        subject.toLowerCase().includes(selectedGenre.toLowerCase())
      );
    return matchesTitle && matchesGenre;
  });

  // Pagination logic
  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = filteredBooks.slice(indexOfFirstBook, indexOfLastBook);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="container mx-auto p-4">
      {/* Search and Filter */}
      <div className="flex justify-between items-center mb-4">
        <input
          type="text"
          className="border p-2 rounded w-full max-w-md"
          placeholder="Search by title..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <select
          className="border p-2 ml-4 rounded"
          value={selectedGenre}
          onChange={(e) => setSelectedGenre(e.target.value)}
        >
          <option value="">All Genres</option>
          <option value="science fiction">Science Fiction</option>
          <option value="horror">Horror</option>
          <option value="gothic fiction">Gothic Fiction</option>
        </select>
      </div>

      {/* Loader */}
      {loading ? (
        <SmallLoader size={62} />
      ) : (
        // Books List
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {currentBooks.map((book) => (
            <div key={book.id} className="border p-4 rounded-lg shadow-md">
              <img
                src={book.formats["image/jpeg"] || "fallback.jpg"}
                alt={book.title}
                className="w-full h-40 object-cover mb-4"
              />
              <h3 className="font-bold text-lg mb-2">{book.title}</h3>
              <p className="text-gray-600 mb-2">
                {book.authors.length > 0
                  ? book.authors[0].name
                  : "Unknown Author"}
              </p>
              <p className="text-gray-500 text-sm mb-2">
                {book.subjects.length > 0 ? book.subjects[0] : "Unknown Genre"}
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

      {/* Pagination */}
      {!loading && (
        <div className="flex justify-center mt-6">
          {[
            ...Array(Math.ceil(filteredBooks.length / booksPerPage)).keys(),
          ].map((number) => (
            <button
              key={number + 1}
              onClick={() => paginate(number + 1)}
              className={`mx-2 px-4 py-2 border ${
                currentPage === number + 1 ? "bg-blue-500 text-white" : ""
              }`}
            >
              {number + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
