import mongoose from "mongoose";

const dbConnect = async () => {
  mongoose
    .connect(
      "mongodb+srv://osamaalsrraj3:osama@e-commerce.qrqncvk.mongodb.net/",
      {
        serverSelectionTimeoutMS: 15000,
        socketTimeoutMS: 45000,
      }
    )
    .then(() => {
      console.log("connect");
    })
    .catch((err) => {
      console.log(err);
    });
};

export { dbConnect };
