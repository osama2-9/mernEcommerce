import express from "express";
import {
  createCategory,
  getAllCategory,
  getCategoriesWithProducts,
  getSpecificProduct,
} from "../controller/categoryController.js";
import { isAdmin } from "../middleware/isAdmin.js";

const categoryRoute = express.Router();

categoryRoute.post("/create", isAdmin, createCategory);
categoryRoute.get("/", isAdmin, getAllCategory);
categoryRoute.get("/getCategories", getCategoriesWithProducts);
categoryRoute.get("/products/:categoryName", getSpecificProduct);

export default categoryRoute;
