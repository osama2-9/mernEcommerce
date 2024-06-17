import express from "express";
import { protectRoute } from "../middleware/protectRoute.js";
import { isAdmin } from "../middleware/isAdmin.js";
import {
  deleteOrder,
  deleteOrderByUser,
  getOrders,
  getTopSellProducts,
  getUserOrders,
  makeAnOrder,
  updateOrderStatus,
  searchByEmail
} from "../controller/orderController.js";
const orderRouter = express.Router();
orderRouter.post("/order", protectRoute, makeAnOrder);
orderRouter.get("/userOrder/:uid", protectRoute, getUserOrders);
orderRouter.get("/order", isAdmin, protectRoute, getOrders);
orderRouter.put("/updateStatus", isAdmin, protectRoute, updateOrderStatus);
orderRouter.get("/topSell", getTopSellProducts);
orderRouter.delete("/delete", isAdmin, protectRoute, deleteOrder);
orderRouter.post("/searchByEmail/:email", isAdmin, protectRoute, searchByEmail);
orderRouter.delete("/deleteUserOrder", protectRoute, deleteOrderByUser);

export default orderRouter;
