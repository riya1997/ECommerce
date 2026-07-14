import express from "express";
import {
  createUser,
  deleteUser,
  getUserById,
  getUsers,
  updateUser,
} from "../controllers/index.ts";
import { userSchema } from "../schemas/user.ts";
import validateBody from "../middleware/validateBody.ts";

const userRoutes = express.Router();

userRoutes.get("/", getUsers);
userRoutes.post("/", validateBody(userSchema), createUser);
userRoutes.get("/:id", getUserById);
userRoutes.put("/:id", updateUser);
userRoutes.delete("/:id", deleteUser);

export default userRoutes;
