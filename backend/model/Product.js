import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  productName: {
    type: String,
    requried: true,
    trim: true,
  },
  productImg: {
    type: String,
    default: "",
  },
  productDesc: {
    type: String,
    required: true,

    maxLength: 500,
  },
  productPrice: {
    type: Number,
    requried: true,
    min: 1,
  },
  productQuntity: {
    type: Number,
    min: 0,
  },
  prodcutSize: {
    type: [String],
  },
  productColors: {
    type: [String],
  },
  categoryID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
  sells: {
    type: Number,
    default: 0,
  },
});

const Product = mongoose.model("product", productSchema);

export default Product;
