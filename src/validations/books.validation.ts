import z from "zod";

export const bookSchema = z.object({
  image: z.string(),
  name: z.string(),
  status: z.boolean(),
  description: z.string(),
  author: z.string(),
  subject: z.string(),
  year: z.number(),
  star: z.boolean(),
});

export const bookFormSchema = z.object({
  name: z.string().min(1, "Book Name is required"),
  status: z.boolean(),
  image: z.string().min(1, "Image URL is required"),
  description: z.string().optional(),
  author: z.string().min(1, "Author is required"),
  subject: z.string().min(1, "Subject is required"),
  year: z.number().min(1, "Year is required"),
  star: z.boolean().optional(),
});

export type BookForm = z.infer<typeof bookFormSchema>;
export type Book = z.infer<typeof bookSchema> & { id: string };
