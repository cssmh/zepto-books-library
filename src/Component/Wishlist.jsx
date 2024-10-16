import { useState } from "react";
import toast from "react-hot-toast";
import SmallLoader from "./SmallLoader";
import { Link } from "react-router-dom";
import BookHelmet from "./BookHelmet";
import useBooks from "./useBooks";

const Wishlist = () => {
  const [wishlist, setWishlist] = useState(() => {
    return JSON.parse(localStorage.getItem("wishlist")) || [];
  });
  const { books, isLoading } = useBooks();
  // console.log(books);

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

  const handleClearWishlist = () => {
    try {
      setWishlist([]);
      localStorage.removeItem("wishlist");
      toast.success("Wishlist cleared!");
    } catch (error) {
      console.log(error);
    }
  };

  const wishListedBooks = books?.filter((book) => wishlist.includes(book.id));

  if (isLoading) return <SmallLoader size={82} />;

  return (
    <div className="container mx-auto p-4">
      <BookHelmet title="Wishlist" />
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl md:text-2xl font-semibold">Your Wishlist</h1>
        {wishListedBooks?.length > 0 && (
          <button
            onClick={handleClearWishlist}
            className="bg-red-500 text-white py-1 px-4 rounded"
          >
            Remove All Wishlist
          </button>
        )}
      </div>
      {wishListedBooks?.length === 0 ? (
        <p>Your wishlist is empty.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 2xl:grid-cols-4 gap-6">
          {wishListedBooks?.map((book) => (
            <div
              data-aos="zoom-in"
              data-aos-duration="600"
              key={book.id}
              className="border p-4 rounded-lg shadow-md"
            >
              <img
                src={book?.formats["image/jpeg"]}
                alt={book.title}
                className="w-full h-60 md:h-48 object-cover mb-4"
              />
              <h3 className="font-bold text-lg mb-2">{book.title}</h3>
              <p className="text-gray-600 mb-2">{book?.authors[0]?.name}</p>
              <p className="text-gray-500 text-sm mb-2">{book?.subjects[0]}</p>
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
