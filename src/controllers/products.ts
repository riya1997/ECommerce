import { Category, Product } from "../models/index.ts";
import type { productSchema } from "../schemas/index.ts";
import type { RequestHandler } from "express";
import type { z } from "zod/v4";
import mongoose from "mongoose";

type productInput = z.infer<typeof productSchema>;
export const getProducts: RequestHandler = async (req, res) => {
  try {
    const products = await Product.find().populate("categoryId");
    res.status(200).json(products);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: "An unknown error occured" });
    }
  }
};

export const createProduct: RequestHandler = async (req, res) => {
  try {
    const { name, description, price, categoryId } = req.body as productInput;
    if (!name || !description || !price || !categoryId)
      return res
        .status(400)
        .json({ error: "name, description, price,categoryId are required" });
    const category = await Category.findById(categoryId);
    if (!category) return res.status(404).json({ error: "category not found" });
    const product = await Product.create({
      name,
      description,
      price,
      categoryId,
    });
    res.status(201).json(product);
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: "An unknown error occurred" });
    }
  }
};

export const getProductByID: RequestHandler = async (req, res) => {
  try {
    const {
      params: { id },
    } = req;
    const product = await Product.findById(id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    return res.status(200).json({ product });
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: "An unknown error occurred" });
    }
  }
};

export const updateProduct: RequestHandler = async (req, res) => {
  try {
    const {
      body,
      params: { id },
    } = req;
    const { name, description, price, categoryId } = body as productInput;
    if (!name || !description || !price || !categoryId)
      return res
        .status(400)
        .json({ error: "name, description, price,categoryId are required" });
    const category = await Category.findById(categoryId);
    if (!category) return res.status(404).json({ error: "category not found" });
    const product = await Product.findById(id);
    if (!product) return res.status(404).json({ error: "product not found" });
    product.name = name;
    product.description = description;
    product.price = price;
    product.categoryId = new mongoose.Types.ObjectId(categoryId);
    await product.save();
    res.json(product);
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: "An unknown error occurred" });
    }
  }
};

export const deleteProduct: RequestHandler = async (req, res) => {
  try {
    const {
      params: { id },
    } = req;
    const product = await Product.findByIdAndDelete(id);
    if (!product) return res.status(404).json({ error: "Product not found" });
    res.json({ message: "Product deleted" });
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: "An unknown error occurred" });
    }
  }
};
