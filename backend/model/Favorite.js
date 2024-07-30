import mongoose from "mongoose";
const favoriteSchema = new mongoose.Schema({
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
});

const Favorite = mongoose.model("Favorite" ,favoriteSchema)
export default Favorite