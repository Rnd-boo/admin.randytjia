import instance from "@/lib/instance";

const bookServices = {
  getBooks: (params?: object) => instance.get("/books", { params }),
};

export { bookServices };
