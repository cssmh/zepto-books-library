import { useParams } from "react-router-dom";
import SmallLoader from "./SmallLoader";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

const BookDetails = () => {
  const { id } = useParams();

  const { data: book = [], isLoading } = useQuery({
    queryKey: ["bookDetails", id],
    queryFn: async () => {
      const res = await axios.get(`https://gutendex.com/books/${id}`);
      return res?.data;
    },
  });
  console.log(book);

  if (isLoading) return <SmallLoader size={83} />;

  return (
    <div className="container mx-auto p-4 mb-7">
      <div className="max-w-6xl mx-auto border p-6 rounded-lg shadow-lg">
        <div className="flex flex-col sm:flex-row">
          <img
            src={book?.formats?.["image/jpeg"] || "fallback.jpg"}
            alt={book?.title}
            className="w-full sm:w-64 h-64 object-cover mb-4 sm:mb-0 sm:mr-6"
          />
          <div>
            <h1 className="text-3xl font-semibold mb-2">{book?.title}</h1>
            <p className="text-lg mb-2">
              <strong>Author:</strong>{" "}
              {book?.authors?.[0]?.name || "Unknown Author"} (
              {book?.authors?.[0]?.birth_year || "N/A"} -{" "}
              {book?.authors?.[0]?.death_year || "present"})
            </p>
            <p className="text-gray-700 mb-2">
              <strong>Subjects:</strong>{" "}
              {book?.subjects?.length
                ? book.subjects.join(", ")
                : "No subjects available"}
            </p>
            <p className="text-gray-700 mb-2">
              <strong>Bookshelves:</strong>{" "}
              {book?.bookshelves?.length
                ? book.bookshelves.join(", ")
                : "No bookshelves available"}
            </p>
            <p className="text-gray-700 mb-2">
              <strong>Language:</strong> {book?.languages?.join(", ") || "N/A"}
            </p>
            <p className="text-gray-700 mb-2">
              <strong>Download Count:</strong> {book?.download_count || 0}
            </p>
            <div className="mt-4">
              <h3 className="text-lg font-bold">Available Formats:</h3>
              <ul className="list-disc ml-6">
                <li>
                  <a
                    href={book?.formats?.["text/html"]}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 underline"
                  >
                    Read online (HTML)
                  </a>
                </li>
                <li>
                  <a
                    href={book?.formats?.["application/epub+zip"]}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 underline"
                  >
                    Download EPUB
                  </a>
                </li>
                <li>
                  <a
                    href={book?.formats?.["application/x-mobipocket-ebook"]}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 underline"
                  >
                    Download Kindle (MOBI)
                  </a>
                </li>
                <li>
                  <a
                    href={book?.formats?.["text/plain; charset=us-ascii"]}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 underline"
                  >
                    Read Plain Text
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="mt-6">
          <h2 className="text-2xl font-bold mb-4">More Information</h2>
          <p>
            <strong>Media Type:</strong> {book?.media_type || "N/A"}
          </p>
          <p>
            <strong>Copyright:</strong> {book?.copyright ? "Yes" : "No"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default BookDetails;
