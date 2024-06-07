import mongoose from "mongoose";

const addressSchema = new mongoose.Schema({
  uid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  addressName: {
    type: String,
    required: true,
    enum: ["Home", "Work"],
  },
  country: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  street: {
    type: String,
    required: true,
  },
  buildingName: {
    type: String,
    required: false,
  },
  floor: {
    type: String,
    required: false,
  },
  apartment: {
    type: String,
    required: false,
  },
  apartmentNumber: {
    type: String,
    required: false,
  },
});

const Address = mongoose.model("Address", addressSchema);
export { Address, addressSchema };
