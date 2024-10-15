import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";
import SmallLoader from "./SmallLoader";
import { Link } from "react-router-dom";
import BookHelmet from "./BookHelmet";

const Wishlist = () => {
  const [wishlist, setWishlist] = useState(() => {
    return JSON.parse(localStorage.getItem("wishlist")) || [];
  });

  const { data: books = [], isLoading } = useQuery({
    queryKey: ["allBooks"],
    queryFn: async () => {
      const res = await axios.get("https://gutendex.com/books");
      return res?.data?.results;
    },
  });

  const handleRemoveFromWishlist = (bookId) => {
    try {
      const updatedWishlist = wishlist.filter((id) => id !== bookId);
      setWishlist(updatedWishlist);
      localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
      toast.success("Removed from wishlist!");
    } catch (error) {
      console.log(error);
    }
  };

  const wishListedBooks = books?.filter((book) => wishlist.includes(book.id));

  if (isLoading) return <SmallLoader size={82} />;

  return (
    <div className="container mx-auto p-4">
      <BookHelmet title="Wishlist" />
      <h1 className="text-2xl font-bold mb-4">Your Wishlist</h1>
      {wishListedBooks.length === 0 ? (
        <p>Your wishlist is empty.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
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
              <div className="flex justify-between">
                <button
                  onClick={() => handleRemoveFromWishlist(book.id)}
                  className="text-red-500"
                >
                  Remove from Wishlist
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
    </div>
  );
};

export default Wishlist;
