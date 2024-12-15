import { z } from "zod";

export const productSchema = z.object({
  title: z.string().min(1, "Title is required").max(100),
  price: z
    .number({
      required_error: "Price is required",
      invalid_type_error: "Price must be a number",
    })
    .nonnegative("Price cannot be negative")
    .min(0.01, "Price must be greater than 0"),
  description: z.string().min(1, "Description is required"),
  category: z.string().min(1, "Category is required"),
});

export type ProductFormType = z.infer<typeof productSchema>;
