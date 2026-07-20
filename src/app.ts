import express from "express";
import connectDb from "./db/index.ts";
import {
  categoryRoutes,
  orderRoutes,
  productRoutes,
  userRoutes,
  docsRoutes,
} from "./routes/index.ts";
import cors from "cors";

const app = express();
connectDb();
const port = process.env.PORT || 8080;

app.use(express.json());
app.use(cors());
app.use("/docs", docsRoutes);

app.get("/", (req, res) => {
  res.send("hello world");
});

app.use("/api/users", userRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
  console.log(
    `OpenAPI JSON served at  http://localhost:${port}/docs/openapi.json`,
  );
  console.log(`Swagger UI served at http://localhost:${port}/docs`);
});
