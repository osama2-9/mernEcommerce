import express from "express";
import path from "path";

import dotenv from "dotenv";
import { dbConnect } from "./config/db.js";
import cookieParser from "cookie-parser";
import userRouter from "./router/userRouter.js";
import categoryRoute from "./router/categoryRoute.js";
import productRoute from "./router/productRoute.js";
import { v2 as cloudinary } from "cloudinary";
import orderRouter from "./router/orderRouter.js";
import cartRouter from "./router/cartRouter.js";
import brandRouter from "./router/brandRouter.js";
import favoriteRoute from "./router/favoriteRouter.js";
import saleRouter from "./router/SaleRouter.js";
import cors from "cors";

dotenv.config();
dbConnect();

const app = express();

app.use(
  cors({
    origin: "https://ecommerce-oxewru4m4-osama2-9s-projects.vercel.app",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: [
      "content-type",
      "Authorization",
      "X-Requested-With",
      "Accept",
      "Origin",
    ],
    credentials: true,
  })
);

const PORT = process.env.PORT || 4000;
const __dirname = path.resolve();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});
app.use(express.json({ limit: "20mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/users", userRouter);
app.use("/api/category", categoryRoute);
app.use("/api/product", productRoute);
app.use("/api/order", orderRouter);
app.use("/api/cart", cartRouter);
app.use("/api/brand", brandRouter);
app.use("/api/favorite", favoriteRoute);
app.use("/api/sale", saleRouter);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/dist")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
  });
}

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
