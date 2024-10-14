const Wishlist = ({ wishlist, books }) => {
  const wishlistedBooks = books.filter((book) => wishlist.includes(book.id));

  return (
    <div className="wishlist">
      <h2>Your Wishlist</h2>
      {wishlistedBooks.length === 0 ? (
        <p>No books in your wishlist.</p>
      ) : (
        <ul>
          {wishlistedBooks.map((book) => (
            <li key={book.id}>
              {book.title} by {book.authors[0]?.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Wishlist;
