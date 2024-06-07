import mongoose from "mongoose";
import { addressSchema } from "./Address.js";

const userSchema = new mongoose.Schema({
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
  },
  phone: {
    type: Number,
    unique: true,
  },
  address: addressSchema,

  paymentmethod: {
    type: String,
    default: "",
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  orderCounter: {
    type: Number,
    default: 0,
  },
});

const User = mongoose.model("user", userSchema);

export default User;
