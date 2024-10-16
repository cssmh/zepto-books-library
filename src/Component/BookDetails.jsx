import { useParams } from "react-router-dom";
import SmallLoader from "./SmallLoader";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import BookHelmet from "./BookHelmet";

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
    <div className="container mx-auto p-2 md:p-4 mb-7">
      <BookHelmet title={book?.title} />
      <div className="max-w-6xl mx-auto border p-3 md:p-6 rounded-lg shadow-lg">
        <div className="flex flex-col sm:flex-row">
          <img
            src={book?.formats?.["image/jpeg"] || "fallback.jpg"}
            alt={book?.title}
            className="w-1/2 mx-auto md:h-96 object-cover mb-4 sm:mb-0 sm:mr-6"
          />
          <div>
            <h1 className="text-xl md:text-3xl font-semibold mb-2">
              {book?.title}
            </h1>
            <p className="text-xm md:text-lg mb-2">
              <span className="font-bold">Author:</span>{" "}
              {book?.authors?.[0]?.name} ({book?.authors?.[0]?.birth_year} -{" "}
              {book?.authors?.[0]?.death_year})
            </p>
            <p className="text-gray-700 mb-2">
              <span className="font-bold">Subjects:</span>{" "}
              {book?.subjects?.join(", ")}
            </p>
            <p className="text-gray-700 mb-2">
              <span className="font-bold">Bookshelves:</span>{" "}
              {book?.bookshelves?.join(", ")}
            </p>
            <p className="text-gray-700 mb-2">
              <span className="font-bold">Language:</span>{" "}
              {book?.languages?.join(", ")}
            </p>
            <p className="text-gray-700 mb-2">
              <span className="font-bold">Download Count:</span>{" "}
              {book?.download_count || 0}
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
        <div className="mt-4">
          <h2 className="text-2xl font-bold mb-4">More Information</h2>
          <p>
            <span className="font-bold">Media Type:</span> {book?.media_type}
          </p>
          <p>
            <span className="font-bold">Copyright:</span>{" "}
            {book?.copyright ? "Yes" : "No"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default BookDetails;
