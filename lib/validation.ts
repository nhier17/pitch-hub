import { z } from "zod";

export const formSchema = z.object({
  title: z.string()
  .min(3, "Title must be at least 3 characters long").
  max(100, "Title must be at most 100 characters long"),
  description: z.string()
  .min(20, "Description must be at least 10 characters long")
  .max(500, "Description must be at most 500 characters long"),
  category: z.string()
  .min(3, "Category must be at least 3 characters long")
  .max(20, "Category must be at most 20 characters long"),
  link: z
    .string()
    .url("Please enter a valid URL")
    .refine(async (url) => {
      try {
        const res = await fetch(url, { method: "HEAD" });
        const contentType = res.headers.get("content-type");

        return contentType?.startsWith("image/");
      } catch {
        return false;
      }
    }),
  pitch: z.string().min(10, "Pitch should be at least 20 characters long"),
});