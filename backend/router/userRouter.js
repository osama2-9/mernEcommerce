import {
  addAddress,
  addPayment,
  deleteUser,
  getAllUsers,
  getUserAddress,
  getUserById,
  login,
  logout,
  signup,
} from "../controller/userController.js";
import { isAdmin } from "../middleware/isAdmin.js";
import { protectRoute } from "../middleware/protectRoute.js";
import express from "express";

const userRouter = express.Router();

userRouter.post("/signup", signup);
userRouter.post("/login", login);
userRouter.post("/logout", logout);
userRouter.post("/addAddress", protectRoute, addAddress);
userRouter.put("/addpayment", protectRoute, addPayment);
userRouter.get("/getAddress", protectRoute, getUserAddress);
userRouter.get("/user/", getUserById);
userRouter.get("/get", isAdmin, protectRoute, getAllUsers);
userRouter.delete("/delete", protectRoute, deleteUser);

export default userRouter;
