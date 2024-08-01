import express from "express";
import {
  addProductToFavorite,
  getUserFavoriteList,
  removeFromFavorite,
} from "../controller/favoriteController.js";
const favoriteRoute = express.Router();
import { protectRoute } from "../middleware/protectRoute.js";

favoriteRoute.post("/add", protectRoute, addProductToFavorite);
favoriteRoute.get("/get/:uid", protectRoute, getUserFavoriteList);
favoriteRoute.delete("/remove", protectRoute, removeFromFavorite);

export default favoriteRoute;
