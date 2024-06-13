import express from "express";
import { protectRoute } from "../middleware/protectRoute.js";
import { addToCart, getCartItems, removeFromCart } from "../controller/cartController.js";
const cartRouter = express.Router();
cartRouter.get("/cart/:uid", protectRoute, getCartItems);
cartRouter.post("/cart/:pid", protectRoute, addToCart);
cartRouter.delete('/cart/delete' ,protectRoute ,removeFromCart)

export default cartRouter;
