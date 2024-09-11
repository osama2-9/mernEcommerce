import mongoose from "mongoose";
const productSchema = new mongoose.Schema({
  productName: {
    type: String,
    required: true,
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
    required: true,
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
  brandID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Brands",
  },
  sells: {
    type: Number,
    default: 0,
  },
  sale: {
    type: Number,
    default: 0,
  },
  rating: {
    type: Number,
    default: 0,
  },
  ratingCount: {
    type: Number,
    default: 0,
  },
});
productSchema.statics.getRelatedProducts = async function (
  categoryID,
  excludeProductID,
  returnedProductIDs = [], 
  limit = 4
) {
  try {
    const relatedProducts = await this.find({
      categoryID: categoryID,
      _id: { $ne: excludeProductID, $nin: returnedProductIDs }, 
    }).limit(limit);

    return relatedProducts;
  } catch (error) {
    throw new Error("Error fetching related products");
  }
};
const Product = mongoose.model("product", productSchema);

export default Product;
