import express from "express";
import { protectRoute } from "../middleware/protectRoute.js";
import { isAdmin } from "../middleware/isAdmin.js";
import {
  getOrders,
  getTopSellProducts,
  getUserOrders,
  makeAnOrder,
  updateOrderStatus,
} from "../controller/orderController.js";
const orderRouter = express.Router();
orderRouter.post("/order", protectRoute, makeAnOrder);
orderRouter.get("/userOrder/:uid", protectRoute, getUserOrders);
orderRouter.get("/order", isAdmin, protectRoute, getOrders);
orderRouter.put("/updateStatus", isAdmin, protectRoute, updateOrderStatus);
orderRouter.get("/topSell", getTopSellProducts);

export default orderRouter;
