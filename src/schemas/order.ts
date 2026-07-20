import { z } from "zod/v4";

const orderSchema = z.strictObject({
  userId: z.string(),
  products: z
    .array(
      z.object({
        productId: z.string(),
        quantity: z.number().int().positive(),
      }),
    )
    .min(1, "Order must contain at least one product"),
});

export { orderSchema };
