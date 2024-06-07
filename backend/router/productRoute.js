import express from "express";
import {
  createProduct,
  getAllProducts,
  filterProducts,
  getProductById,
} from "../controller/productController.js";
import { isAdmin } from "../middleware/isAdmin.js";

const productRoute = express.Router();

productRoute.post("/create", isAdmin, createProduct);
productRoute.get("/get", getAllProducts);
productRoute.get("/:type", filterProducts);
productRoute.get("/target/:pid", getProductById);

export default productRoute;
