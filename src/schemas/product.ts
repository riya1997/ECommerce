import { z } from "zod/v4";

const productSchema = z.strictObject({
  name: z.string().min(1, "name is required"),
  description: z.string().min(1, "description is required"),
  price: z.number().positive("Price must be greater than 0"),
  categoryId: z.string(),
});

export { productSchema };
