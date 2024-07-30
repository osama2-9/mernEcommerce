import express from "express";
import { addProductToFavorite, getUserFavoriteList } from "../controller/favoriteController.js";
const favoriteRoute = express.Router();
import { protectRoute } from "../middleware/protectRoute.js";

favoriteRoute.post("/add", protectRoute, addProductToFavorite);
favoriteRoute.get('/get/:uid' ,protectRoute ,getUserFavoriteList)

export default favoriteRoute;
