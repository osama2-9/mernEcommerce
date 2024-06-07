import express from "express";
import {
  createCategory,
  getAllCategory,
} from "../controller/categoryController.js";
import { isAdmin } from "../middleware/isAdmin.js";

const categoryRoute = express.Router();

categoryRoute.post("/create", isAdmin, createCategory);
categoryRoute.get("/", isAdmin, getAllCategory);

export default categoryRoute;
