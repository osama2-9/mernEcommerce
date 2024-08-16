import express from "express";
import { isAdmin } from "../middleware/isAdmin.js";
import {
  activationStatus,
  
  createTimedSaleProduct,
  deleteTimedSaleProduct,
  getTimedSaleProduct,
} from "../controller/SaleController.js";
const saleRouter = express.Router();

saleRouter.post("/create", isAdmin, createTimedSaleProduct);
saleRouter.get("/timedSale", getTimedSaleProduct);
saleRouter.post("/activationStatus", isAdmin, activationStatus);
saleRouter.delete('/delete' ,isAdmin ,deleteTimedSaleProduct)

export default saleRouter;
