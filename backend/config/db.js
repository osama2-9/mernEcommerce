import mongoose from "mongoose";

const dbConnect = async () => {
  mongoose
    .connect(
      "mongodb+srv://osamaalsrraj3:osama@e-commerce.qrqncvk.mongodb.net/"
    )
    .then(() => {
      console.log("connect");
    })
    .catch((err) => {
      console.log(err);
    });
};

export { dbConnect };
