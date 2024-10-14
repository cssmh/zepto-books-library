import { useState, useEffect } from "react";
import SmallLoader from "./SmallLoader";

const Wishlist = () => {
  const [wishlist, setWishlist] = useState(() => {
    return JSON.parse(localStorage.getItem("wishlist")) || [];
  });
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch books from the API
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch("https://gutendex.com/books");
        const data = await response.json();
        setBooks(data.results);
      } catch (error) {
        console.error("Error fetching books:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  // Filter the books to only show wishlisted ones
  const wishListedBooks = books.filter((book) => wishlist.includes(book.id));

  if (loading) return <SmallLoader size={76} />;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Your Wishlist</h1>
      {wishListedBooks.length === 0 ? (
        <p>Your wishlist is empty.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {wishListedBooks.map((book) => (
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
                onClick={() => {
                  const updatedWishlist = wishlist.filter(
                    (id) => id !== book.id
                  );
                  setWishlist(updatedWishlist);
                  localStorage.setItem(
                    "wishlist",
                    JSON.stringify(updatedWishlist)
                  );
                }}
                className="text-red-500"
              >
                Remove from Wishlist
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;
