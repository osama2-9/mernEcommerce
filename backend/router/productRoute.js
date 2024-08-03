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
  ProductRating,
  getTopRatedProducts,
  recommendedProducts,
  getUsersReviewForProduct,
} from "../controller/productController.js";
import { isAdmin } from "../middleware/isAdmin.js";
import { protectRoute } from "../middleware/protectRoute.js";

const productRoute = express.Router();

productRoute.post("/create", isAdmin, createProduct);
productRoute.get("/recommended/:uid", recommendedProducts);
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
productRoute.put("/removeSale", isAdmin, protectRoute, removeSale);
productRoute.post("/rate", protectRoute, ProductRating);
productRoute.get("/getProducts/topRated", getTopRatedProducts);
productRoute.get("/productReviews/:pid" ,getUsersReviewForProduct)

export default productRoute;
