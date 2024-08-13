import mongoose from "mongoose";
import { addressSchema } from "./Address.js";

const userSchema = new mongoose.Schema(
  {
    fname: {
      type: String,
      required: true,
      
    },
    lname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minLength: 8,
    },
    phone: {
      type: Number,
      unique: true,
      minLength: 9,
      maxLength: 11,
    },
    address: addressSchema,

    isAdmin: {
      type: Boolean,
      default: false,
    },
    orderCounter: {
      type: Number,
      default: 0,
    },
    lastLogin: {
      type: Date,
      default: Date.now,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    resetPasswordToken: String,
    resetPasswordExpiresAt: Date,
    verificationToken: String,
    verificationTokenExpiresAt: Date,
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("user", userSchema);

export default User;
