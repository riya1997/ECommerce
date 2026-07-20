import type { RequestHandler } from "express";
import { Order, Product, User } from "../models/index.ts";
import { orderSchema } from "../schemas/index.ts";
import type { z } from "zod/v4";
import mongoose from "mongoose";

type orderInput = z.infer<typeof orderSchema>;
export const getorder: RequestHandler = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("userId", "name email")
      .populate("products.productId", "name price");
    res.status(200).json(orders);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: "An unknown error occured" });
    }
  }
};

export const createOrder: RequestHandler = async (req, res) => {
  try {
    const { userId, products } = req.body as orderInput;
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: "user not found" });
    let total = 0;
    for (const item of products) {
      const product = await Product.findById(item.productId);

      if (!product) {
        return res.status(404).json({
          error: `Product ${item.productId} not found`,
        });
      }

      total += product.price * item.quantity;
    }
    const order = await Order.create({
      userId,
      products,
      total,
    });

    return res.status(201).json(order);
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: "An unknown error occurred" });
    }
  }
};

export const getOrderById: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await Order.findById(id)
      .populate("userId", "name email")
      .populate("products.productId", "name price");
    if (!order) return res.status(404).json({ message: "Order not found" });
    return res.status(200).json({ order });
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: "An unknown error occurred" });
    }
  }
};

export const updateOrder: RequestHandler = async (req, res) => {
  try {
    const {
      body,
      params: { id },
    } = req;
    const { userId, products } = body as orderInput;
    if (!userId || !products)
      return res
        .status(400)
        .json({ error: "userid and products are required" });

    const existingOrder = await Order.findById(id);

    if (!existingOrder) {
      return res.status(404).json({ error: "Order not found" });
    }
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: "user not found" });
    let total = 0;
    for (const item of products) {
      const product = await Product.findById(item.productId);

      if (!product) {
        return res.status(404).json({
          error: `Product ${item.productId} not found`,
        });
      }

      total += product.price * item.quantity;
    }
    existingOrder.set({
      userId: new mongoose.Types.ObjectId(userId),
      products: products.map((item) => ({
        productId: new mongoose.Types.ObjectId(item.productId),
        quantity: item.quantity,
      })),
      total,
    });

    await existingOrder.save();
    res.status(200).json(existingOrder);
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: "An unknown error occurred" });
    }
  }
};

export const deleteOrder: RequestHandler = async (req, res) => {
  try {
    const {
      params: { id },
    } = req;
    const order = await Order.findByIdAndDelete(id);
    if (!order) return res.status(404).json({ error: "Order not found" });
    res.status(200).json({ message: "Order deleted" });
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: "An unknown error occurred" });
    }
  }
};
