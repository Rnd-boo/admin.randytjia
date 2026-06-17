"use client";

import { useForm } from "react-hook-form";
import FormCardBook from "../_components/form-card-book";
import { BookForm, bookFormSchema } from "@/validations/books.validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { INITIAL_BOOK_FORM } from "@/constants/book-constant";

export default function CreateBook() {
  const form = useForm<BookForm>({
    resolver: zodResolver(bookFormSchema),
    defaultValues: INITIAL_BOOK_FORM,
  });
  return <FormCardBook form={form} />;
}
