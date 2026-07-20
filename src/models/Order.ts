import { model, Schema } from "mongoose";
import { number } from "zod";

const orderSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    products: [
      {
        productId: {
          type: Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
      },
    ],
    total: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true },
);

orderSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: (_, converted) => {
    delete (converted as Partial<typeof converted>)._id;
  },
});

export default model("Order", orderSchema);
