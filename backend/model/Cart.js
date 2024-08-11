import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
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
  size: {
    type: String,
   
  },
  color: {
    type: String,
    
  },
});

const Cart = mongoose.model("cart", cartSchema);

export default Cart;
