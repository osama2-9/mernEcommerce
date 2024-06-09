import express from "express";
import {
  createProduct,
  getAllProducts,
  filterProducts,
  getProductById,
  search,
} from "../controller/productController.js";
import { isAdmin } from "../middleware/isAdmin.js";

const productRoute = express.Router();

productRoute.post("/create", isAdmin, createProduct);
productRoute.get("/get", getAllProducts);
productRoute.get("/:type", filterProducts);
productRoute.get("/target/:pid", getProductById);
productRoute.get("/search/:query", search);

export default productRoute;
