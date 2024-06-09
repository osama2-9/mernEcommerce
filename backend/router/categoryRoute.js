import express from "express";
import {
  createCategory,
  getAllCategory,
  getCategoriesWithProducts,
} from "../controller/categoryController.js";
import { isAdmin } from "../middleware/isAdmin.js";

const categoryRoute = express.Router();

categoryRoute.post("/create", isAdmin, createCategory);
categoryRoute.get("/", isAdmin, getAllCategory);
categoryRoute.get("/getCategories", getCategoriesWithProducts);

export default categoryRoute;
