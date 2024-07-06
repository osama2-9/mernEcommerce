import express from "express";
import { isAdmin } from "../middleware/isAdmin.js";
import {
  createBrand,
  deleteBrand,
  getBrands,
  updateBrand,
} from "../controller/brandController.js";
const brandRouter = express.Router();

brandRouter.post("/create", isAdmin, createBrand);
brandRouter.put("/update", isAdmin, updateBrand);
brandRouter.delete("/delete", isAdmin, deleteBrand);
brandRouter.get("/", getBrands);

export default brandRouter;
