import { useState, useEffect } from "react";
import BookCardSkeleton from "./BookCardSkeleton";
import { Link } from "react-router-dom";
import BookHelmet from "./BookHelmet";
import toast from "react-hot-toast";
import useBooks from "./useBooks";

const Home = () => {
  const [search, setSearch] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("");
  const [wishlist, setWishlist] = useState(
    JSON.parse(localStorage.getItem("wishlist")) || []
  );
  const [currentPage, setCurrentPage] = useState(1);
  const booksPerPage = 9;
  const { books, isLoading } = useBooks();
  console.log(books);

  const handleToggleWishlist = (bookId) => {
    const updatedWishlist = wishlist.includes(bookId)
      ? wishlist.filter((id) => id !== bookId)
      : [...wishlist, bookId];
    setWishlist(updatedWishlist);
    localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
    if (wishlist.includes(bookId)) {
      // console.log(wishlist);
      toast.success("Removed from wishlist!");
    } else {
      toast.success("Added to wishlist!");
    }
  };

  const filteredBooks = books?.filter((book) => {
    const matchesTitle = book.title
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchesGenre =
      !selectedGenre ||
      book.bookshelves.some((genre) =>
        genre.toLowerCase().includes(selectedGenre.toLowerCase())
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

  if (isLoading) return (
    <div className="container mx-auto p-4 mb-7">
      <BookHelmet title="Home" />
      <div className="bg-white p-6 rounded-xl shadow-lg mb-8 border border-gray-100">
        <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
          <div className="h-12 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded-lg w-full max-w-md animate-shimmer"></div>
          <div className="h-12 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded-lg w-48 animate-shimmer"></div>
          <div className="h-8 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded-lg w-32 animate-shimmer"></div>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 2xl:grid-cols-4 gap-6">
        {Array.from({ length: 8 }).map((_, index) => (
          <BookCardSkeleton key={index} />
        ))}
      </div>
    </div>
  );
  // console.log(totalBooksByFilter);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50">
      <div className="container mx-auto p-4 mb-7">`
        <BookHelmet title="Home" />
      <div className="bg-white p-6 rounded-xl shadow-lg mb-8 border border-gray-100">
        <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
          {/* Search Input */}
          <div className="relative flex-1 max-w-md">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="text"
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200 placeholder-gray-500"
              placeholder="Search books by title..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>

          {/* Genre Filter */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.414A1 1 0 013 6.707V4z" />
              </svg>
            </div>
            <select
              className="appearance-none bg-white pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200 text-gray-700 min-w-[200px]"
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
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>

          {/* Results Count */}
          <div className="flex items-center space-x-2 text-sm text-gray-600 bg-gray-50 px-4 py-2 rounded-lg">
            <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C20.832 18.477 19.246 18 17.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
            <span className="font-medium">{totalBooksByFilter}</span>
            <span>books found</span>
          </div>
        </div>
      </div>

      {totalBooksByFilter === 0 ? (
        <div className="text-center py-16">
          <div className="text-6xl mb-4">📚</div>
          <p className="text-gray-500 text-lg">No books found</p>
          <p className="text-gray-400 text-sm mt-2">Try adjusting your search or filter criteria</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 2xl:grid-cols-4 gap-6">
          {currentBooks?.map((book, idx) => (
            <div
              data-aos="zoom-in"
              data-aos-duration={idx * 200}
              key={book.id}
              className="group relative flex flex-col bg-white border-0 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden"
            >
              {/* Book Image Container */}
              <div className="relative overflow-hidden">
                <img
                  src={book?.formats["image/jpeg"]}
                  alt={book.title}
                  className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                {/* Wishlist Button - Positioned over image */}
                <button
                  onClick={() => handleToggleWishlist(book.id)}
                  className={`absolute top-3 right-3 p-2 rounded-full transition-all duration-200 transform hover:scale-110 ${
                    wishlist?.includes(book.id)
                      ? "bg-red-50 text-red-500 border-2 border-red-200"
                      : "bg-white/90 text-gray-500 border-2 border-gray-200 hover:bg-red-50 hover:text-red-500 hover:border-red-200"
                  }`}
                >
                  {wishlist.includes(book.id) ? "❤️" : "🤍"}
                </button>
              </div>

              {/* Book Content */}
              <div className="flex-grow p-5">
                <h3 className="font-bold text-lg text-gray-800 mb-3 line-clamp-2 leading-tight group-hover:text-blue-600 transition-colors duration-200">
                  {book?.title}
                </h3>
                
                <div className="space-y-2 mb-4">
                  <p className="text-gray-600 text-sm">
                    <span className="inline-flex items-center text-xs font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded-full mb-1">
                      👤 Author
                    </span>
                    <br />
                    <span className="font-medium text-gray-700">
                      {book?.authors?.length > 0
                        ? `${book?.authors[0]?.name}`
                        : "Unknown Author"}
                    </span>
                    {book?.authors?.length > 0 && (
                      <span className="text-gray-500 text-xs ml-1">
                        ({book?.authors[0]?.birth_year} - {book.authors[0].death_year || "present"})
                      </span>
                    )}
                  </p>
                  
                  {book?.bookshelves?.length > 0 && (
                    <div>
                      <span className="inline-flex items-center text-xs font-medium text-purple-500 bg-purple-50 px-2 py-1 rounded-full mb-2">
                        🏷️ Genres
                      </span>
                      <div className="flex flex-wrap gap-1">
                        {book?.bookshelves?.slice(0, 2).map((genre, index) => (
                          <span 
                            key={index}
                            className="text-xs bg-gradient-to-r from-blue-50 to-purple-50 text-blue-700 px-2 py-1 rounded-full border border-blue-200"
                          >
                            {genre}
                          </span>
                        ))}
                        {book?.bookshelves?.length > 2 && (
                          <span className="text-xs text-gray-500 px-2 py-1">
                            +{book.bookshelves.length - 2} more
                          </span>
                        )}
                      </div>
                    </div>
                  )}
                </div>

                <div className="text-xs text-gray-400 mb-4">
                  <span className="bg-gray-50 px-2 py-1 rounded">ID: {book?.id}</span>
                </div>
              </div>

              {/* Action Button */}
              <div className="p-5 pt-0">
                <Link
                  to={`/book-details/${book.id}`}
                  className="w-full inline-flex items-center justify-center bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-105 group-hover:shadow-lg"
                >
                  <span>View Details</span>
                  <svg className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
      <div className="flex justify-center mt-12">
        <nav className="flex items-center space-x-2" aria-label="Pagination">
          {Math.ceil(totalBooksByFilter / booksPerPage) > 1 && (
            <>
              {/* Previous Button */}
              <button
                onClick={() => setCurrentPage(currentPage - 1)}
                disabled={currentPage === 1}
                className={`flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                  currentPage === 1
                    ? "text-gray-400 cursor-not-allowed"
                    : "text-gray-700 hover:text-blue-600 hover:bg-blue-50"
                }`}
              >
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Previous
              </button>

              {/* Page Numbers */}
              <div className="flex items-center space-x-1">
                {Array.from({
                  length: Math.ceil(totalBooksByFilter / booksPerPage),
                }).map((_, index) => {
                  const pageNumber = index + 1;
                  const isCurrentPage = currentPage === pageNumber;
                  
                  return (
                    <button
                      key={pageNumber}
                      onClick={() => setCurrentPage(pageNumber)}
                      className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 transform hover:scale-105 ${
                        isCurrentPage
                          ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg"
                          : "text-gray-700 hover:text-blue-600 hover:bg-blue-50 border border-gray-200"
                      }`}
                    >
                      {pageNumber}
                    </button>
                  );
                })}
              </div>

              {/* Next Button */}
              <button
                onClick={() => setCurrentPage(currentPage + 1)}
                disabled={currentPage === Math.ceil(totalBooksByFilter / booksPerPage)}
                className={`flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                  currentPage === Math.ceil(totalBooksByFilter / booksPerPage)
                    ? "text-gray-400 cursor-not-allowed"
                    : "text-gray-700 hover:text-blue-600 hover:bg-blue-50"
                }`}
              >
                Next
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </>
          )}
        </nav>
      </div>
      </div>
    </div>
  );
};

export default Home;
