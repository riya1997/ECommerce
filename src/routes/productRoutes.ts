import {
  createProduct,
  deleteProduct,
  getProductByID,
  getProducts,
  updateProduct,
} from "../controllers/index.ts";
import express from "express";

const productRoutes = express.Router();

productRoutes.get("/", getProducts);
productRoutes.post("/", createProduct);
productRoutes.get("/:id", getProductByID);
productRoutes.put("/:id", updateProduct);
productRoutes.delete("/:id", deleteProduct);
export default productRoutes;
