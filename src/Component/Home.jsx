import { useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import SmallLoader from "./SmallLoader";

const Home = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [wishlist, setWishlist] = useState(
    JSON.parse(localStorage.getItem("wishlist")) || []
  );

  const fetchBooks = async () => {
    const response = await fetch("https://gutendex.com/books");
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  };

  const { data = [], isLoading } = useQuery({
    queryKey: ["books"], // Unique key for the query
    queryFn: fetchBooks, // Your fetch function
  });

  const books = data?.results || [];
  const totalPages = Math.ceil(data?.count / 32) || 0; // Assuming 32 books per page
  console.log(books);

  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  const handleWishlistToggle = (bookId) => {
    setWishlist((prevWishlist) => {
      const updatedWishlist = prevWishlist.includes(bookId)
        ? prevWishlist.filter((id) => id !== bookId)
        : [...prevWishlist, bookId];
      return updatedWishlist;
    });
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset to the first page when searching
  };

  const handleGenreChange = (e) => {
    setSelectedGenre(e.target.value);
    setCurrentPage(1); // Reset to the first page when changing genre
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  if (isLoading) return <SmallLoader size={85} />;

  return (
    <div className="max-w-7xl mx-auto my-6">
      <div className="search-bar mb-4">
        <input
          type="text"
          placeholder="Search by title..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="p-2 border rounded w-full md:w-1/3"
        />
        <select
          value={selectedGenre}
          onChange={handleGenreChange}
          className="p-2 border rounded"
        >
          <option value="">All Genres</option>
          <option value="children">Children</option>
          <option value="fiction">Fiction</option>
          <option value="history">History</option>
        </select>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {books?.map((book) => (
          <div key={book.id} className="book-card border p-4 rounded">
            <img
              src={book.formats["image/jpeg"] || "placeholder-image-url"}
              alt={book.title}
              className="w-full h-48 object-cover mb-2"
            />
            <h3 className="font-bold">{book.title}</h3>
            <p>
              <span className="text-green-500 font-semibold">Author: </span>
              {book.authors
                .map(
                  (author) =>
                    `${author.name} (${author.birth_year} - ${author.death_year})`
                )
                .join(", ")}
            </p>
            <p>
              <span className="text-green-500 font-semibold">Genres:</span>{" "}
              {book.bookshelves[0]},{" "}
              {book.bookshelves[1]}
            </p>
            <button
              className="wishlist-btn p-1 border rounded"
              onClick={() => handleWishlistToggle(book.id)}
            >
              {wishlist.includes(book.id) ? "❤️" : "🤍"} Wishlist
            </button>
          </div>
        ))}
      </div>
      <div className="pagination flex justify-center my-4">
        <button
          disabled={currentPage === 1}
          onClick={() => handlePageChange(currentPage - 1)}
          className="mx-2 p-1 border rounded"
        >
          Previous
        </button>
        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index}
            onClick={() => handlePageChange(index + 1)}
            className={`mx-1 p-1 border rounded ${
              currentPage === index + 1 ? "bg-blue-500 text-white" : ""
            }`}
          >
            {index + 1}
          </button>
        ))}
        <button
          disabled={currentPage === totalPages}
          onClick={() => handlePageChange(currentPage + 1)}
          className="mx-2 p-1 border rounded"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Home;
