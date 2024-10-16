import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const useBooks = () => {
  const { data: books = [], isLoading } = useQuery({
    queryKey: ["allBooks"],
    queryFn: async () => {
      const res = await axios.get("https://gutendex.com/books");
      return res?.data?.results;
    },
  });
  return { books, isLoading };
};

export default useBooks;
