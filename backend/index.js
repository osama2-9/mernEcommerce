import express from "express";
import dotenv from "dotenv";
import { dbConnect } from "./config/db.js";
import cookieParser from "cookie-parser";
import userRouter from "./router/userRouter.js";
import categoryRoute from "./router/categoryRoute.js";
import productRoute from "./router/productRoute.js";
import { v2 as cloudinary } from "cloudinary";
import orderRouter from "./router/orderRouter.js";
import cartRouter from "./router/cartRouter.js";



dotenv.config();
dbConnect();

const app = express();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

app.use(express.json({ limit: "20mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/", async (req, res) => {
  try {
    const categories = await Category.find();

    const results = [];

    for (const category of categories) {
      const products = await Product.find({ categoryID: category._id });
      if (products.length > 0) {
        const selectedProduct = products[0];

        results.push({
          cid: category._id,
          categoryName: category.categoryName,
          productImg: selectedProduct.productImg,
        });
      }
    }

    res.json(results);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.use("/api/users", userRouter);
app.use("/api/category", categoryRoute);
app.use("/api/product", productRoute);
app.use("/api/order", orderRouter);
app.use("/api/cart", cartRouter);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;
