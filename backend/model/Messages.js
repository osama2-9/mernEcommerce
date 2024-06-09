import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
  messageTitle: {
    type: String,
  },

  messageDescription: {
    type: String,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Message = mongoose.model("message", messageSchema);
export default Message;
