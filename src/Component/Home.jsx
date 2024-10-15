import { useState, useEffect } from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import SmallLoader from "./SmallLoader";
import { Link } from "react-router-dom";
import BookHelmet from "./BookHelmet";
import toast from "react-hot-toast";

const Home = () => {
  const [search, setSearch] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("");
  const [wishlist, setWishlist] = useState(
    JSON.parse(localStorage.getItem("wishlist")) || []
  );
  const [currentPage, setCurrentPage] = useState(1);
  const booksPerPage = 9;

  const { data: books = [], isLoading } = useQuery({
    queryKey: ["allBooks"],
    queryFn: async () => {
      const res = await axios.get("https://gutendex.com/books");
      return res?.data?.results;
    },
  });

  const handleToggleWishlist = (bookId) => {
    const updatedWishlist = wishlist.includes(bookId)
      ? wishlist.filter((id) => id !== bookId)
      : [...wishlist, bookId];
    setWishlist(updatedWishlist);
    localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
    if (wishlist.includes(bookId)) {
      toast.success("Removed from wishlist!");
    } else {
      toast.success("Added to wishlist!");
    }
  };

  // Filtering books based on search input and selected genre
  const filteredBooks = books.filter((book) => {
    const matchesTitle = book.title
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchesGenre =
      !selectedGenre ||
      book.bookshelves.some((shelf) =>
        shelf.toLowerCase().includes(selectedGenre.toLowerCase())
      );
    return matchesTitle && matchesGenre;
  });

  const totalBooksByFilter = filteredBooks.length;
  const currentBooks = filteredBooks.slice(
    (currentPage - 1) * booksPerPage,
    currentPage * booksPerPage
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedGenre, books, search]);

  if (isLoading) return <SmallLoader size={83} />;
  // console.log(totalBooksByFilter);

  return (
    <div className="container mx-auto p-4 mb-7">
      <BookHelmet title="Home" />
      <div className="flex justify-between items-center mb-4">
        <input
          type="text"
          className="border p-2 rounded w-full max-w-md outline-none"
          placeholder="Search by title..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          className="border p-2 ml-4 rounded outline-none"
          value={selectedGenre}
          onChange={(e) => setSelectedGenre(e.target.value)}
        >
          <option value="">All Genres</option>
          <option value="fiction">Fiction</option>
          <option value="literature">Literature</option>
          <option value="poetry">Poetry</option>
          <option value="politics">Politics</option>
          <option value="science-fiction">Science Fiction & Fantasy</option>
          <option value="gothic fiction">Gothic Fiction</option>
          <option value="horror">Horror</option>
          <option value="movie books">Movie Books</option>
          <option value="mystery fiction">Mystery Fiction</option>
        </select>
      </div>

      {totalBooksByFilter === 0 ? (
        <p>No books found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 2xl:grid-cols-4 gap-6">
          {currentBooks?.map((book, idx) => (
            <div
              data-aos="zoom-in"
              data-aos-duration={idx * 200}
              key={book.id}
              className="flex flex-col border p-3 rounded-lg shadow-md"
            >
              <div className="flex-grow">
                <img
                  src={book.formats["image/jpeg"] || "fallback.jpg"}
                  alt={book.title}
                  className="w-full h-48 object-cover mb-2"
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
                  {book.subjects.length > 0
                    ? book.subjects[0]
                    : "Unknown Genre"}
                </p>
                <p className="text-gray-500 text-sm mb-2">
                  <strong>ID:</strong> {book.id}
                </p>
              </div>
              <div className="flex justify-between">
                <button
                  onClick={() => handleToggleWishlist(book.id)}
                  className={`${
                    wishlist.includes(book.id)
                      ? "text-red-500"
                      : "text-gray-500"
                  }`}
                >
                  {wishlist.includes(book.id) ? "❤️" : "🤍"}
                </button>
                <Link
                  to={`/book-details/${book.id}`}
                  className="mt-2 inline-block bg-blue-500 text-white py-1 px-4 rounded"
                >
                  Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
      <div className="flex justify-center mt-6">
        {Array.from({
          length: Math.ceil(totalBooksByFilter / booksPerPage),
        }).map((_, index) => (
          <button
            key={index + 1}
            onClick={() => setCurrentPage(index + 1)}
            className={`mx-2 px-4 py-2 border ${
              currentPage === index + 1 ? "bg-blue-500 text-white" : ""
            }`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Home;
