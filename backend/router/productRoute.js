import express from "express";
import {
  createProduct,
  getAllProducts,
  filterProducts,
  getProductById,
  search,
  getRelatedProducts,
  createSale,
  getProductsOnSale,
  deleteProduct,
  updateProductData,
  getFilterdProducts,
  removeSale,
} from "../controller/productController.js";
import { isAdmin } from "../middleware/isAdmin.js";
import { protectRoute } from "../middleware/protectRoute.js";

const productRoute = express.Router();

productRoute.post("/create", isAdmin, createProduct);
productRoute.post("/createSale", isAdmin, protectRoute, createSale);
productRoute.get("/on-sale", getProductsOnSale);
productRoute.get("/get", getAllProducts);
productRoute.get("/:type", filterProducts);
productRoute.get("/target/:pid", getProductById);
productRoute.get("/search/:query", search);
productRoute.get("/related/:categoryID/:pid", getRelatedProducts);
productRoute.delete("/delete", isAdmin, protectRoute, deleteProduct);
productRoute.put("/update", isAdmin, protectRoute, updateProductData);
productRoute.get("/filter/products/:cid", getFilterdProducts);
productRoute.put('/removeSale' , isAdmin ,protectRoute ,removeSale)

export default productRoute;
