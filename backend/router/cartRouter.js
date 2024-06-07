import express from "express";
import { protectRoute } from "../middleware/protectRoute.js";
import { addToCart, getCartItems } from "../controller/cartController.js";
const cartRouter = express.Router();
cartRouter.get("/cart/:uid", protectRoute, getCartItems);
cartRouter.post("/cart/:pid", protectRoute, addToCart);

export default cartRouter;
