import express from "express";
import {
  createCategory,
  deleteCategory,
  getAllCategory,
  getCategoriesWithProducts,
  getSpecificProduct,
  updateCategory,
} from "../controller/categoryController.js";
import { isAdmin } from "../middleware/isAdmin.js";
import { protectRoute } from "../middleware/protectRoute.js";

const categoryRoute = express.Router();

categoryRoute.post("/create", isAdmin, createCategory);
categoryRoute.get("/", isAdmin, getAllCategory);
categoryRoute.get("/getCategories", getCategoriesWithProducts);
categoryRoute.get("/products/:categoryName/:categoryId", getSpecificProduct);
categoryRoute.delete("/delete", isAdmin, protectRoute, deleteCategory);
categoryRoute.put("/update", isAdmin, protectRoute, updateCategory);

export default categoryRoute;
