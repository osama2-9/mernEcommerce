import { getAllMessages } from "../controller/messageController.js";
import {
  addAddress,
  addPayment,
  deleteUser,
  deleteUserByAdmin,
  forgetPassword,
  getAllUsers,
  getUserAddress,
  getUserById,
  login,
  logout,
  resetPassword,

  signup,
  updateUserData,
} from "../controller/userController.js";
import { isAdmin } from "../middleware/isAdmin.js";
import { protectRoute } from "../middleware/protectRoute.js";
import express from "express";

const userRouter = express.Router();

userRouter.post("/signup", signup);
userRouter.post("/login", login);
userRouter.post("/logout", logout);
userRouter.get("/messages", isAdmin, getAllMessages);
userRouter.post("/forget-password", forgetPassword);
userRouter.post("/reset-password/:uid/:token", resetPassword);
userRouter.post("/addAddress", protectRoute, addAddress);
userRouter.put("/addpayment", protectRoute, addPayment);
userRouter.put("/updateUserData", protectRoute, updateUserData);
userRouter.get("/getAddress", protectRoute, getUserAddress);
userRouter.get("/user/", getUserById);
userRouter.get("/get", isAdmin, protectRoute, getAllUsers);
userRouter.delete("/delete", protectRoute, deleteUser);
userRouter.delete("/deleteByAdmin", isAdmin, protectRoute, deleteUserByAdmin);


export default userRouter;
