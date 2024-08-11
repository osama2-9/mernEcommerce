import mongoose from "mongoose";

const ratingSchema = new mongoose.Schema({
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
  rating: {
    type: Number,
    required: true,
  },
  userComment: {
    type: String,
    maxLength: 200,
    default: "",
  },
});

const Rating = mongoose.model("Rate", ratingSchema);
export { Rating, ratingSchema };
