import mongoose from "mongoose";

const brandSchema = new mongoose.Schema({
  brandName: {
    type: String,
    required: true,
  },
  brandFor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
  brandImg: {
    type: String,
    required: true,
  },
  brandDesc: {
    type: String,
  },
});
const Brand = mongoose.model("Brand", brandSchema);

export default Brand;
