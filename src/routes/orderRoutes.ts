import {
  createOrder,
  deleteOrder,
  getorder,
  getOrderById,
  updateOrder,
} from "../controllers/index.ts";
import express from "express";

const orderRoutes = express.Router();

orderRoutes.get("/", getorder);
orderRoutes.post("/", createOrder);
orderRoutes.get("/:id", getOrderById);
orderRoutes.put("/:id", updateOrder);
orderRoutes.delete("/:id", deleteOrder);
export default orderRoutes;
