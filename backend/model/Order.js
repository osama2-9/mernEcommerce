import mongoose from "mongoose";
import { addressSchema } from "./Address.js";

const OrderStatus = {
  PENDING: "Pending",
  PROCESSING: "Processing",
  SHIPPED: "Shipped",
  DELIVERED: "Delivered",
  CANCELLED: "Cancelled",
};

const OrderSchema = new mongoose.Schema(
  {
    uid: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    
    pid: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    prodcutImg: {
      type: String,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: Number,
      required: true,
    },
    productName: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      require: true,
    },
    paymentMethod: {
      type: String,
      required: true,
    },
    address: {
      type: addressSchema,
      required: true,
    },
    orderStatus: {
      type: String,
      default: OrderStatus.PENDING,
      enum: Object.values(OrderStatus),
    },
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model("order", OrderSchema);
export default Order;
