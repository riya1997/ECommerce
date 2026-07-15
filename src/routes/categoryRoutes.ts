import {
  createCategory,
  deleteCategory,
  getCategories,
  getCategoryById,
  updateCategory,
} from "../controllers/index.ts";
import express from "express";

const categoryRoutes = express.Router();

categoryRoutes.get("/", getCategories);
categoryRoutes.post("/", createCategory);
categoryRoutes.get("/:id", getCategoryById);
categoryRoutes.put("/:id", updateCategory);
categoryRoutes.delete("/:id", deleteCategory);
export default categoryRoutes;
