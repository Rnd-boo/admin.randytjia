import { bookServices } from "@/services/books.service";
import { useQuery } from "@tanstack/react-query";
import { Book } from "@/validations/books.validation";

const useBooks = () => {
  const getAllBooks = async (): Promise<Book[]> => {
    const res = await bookServices.getBooks();
    return res.data?.data ?? [];
  };

  const {
    data: dataBooks = [],
    isLoading: isLoadingBooks,
    isRefetching: isRefetchingBooks,
    refetch: refetchBooks,
  } = useQuery<Book[]>({
    queryKey: ["Books"],
    queryFn: () => getAllBooks(),
  });
  const totalData = dataBooks.length;

  return {
    dataBooks,
    isLoadingBooks,
    isRefetchingBooks,
    refetchBooks,
    totalData,
  };
};

export default useBooks;
