const connection = require("../database/Connection");

const messageSchema = new connection.Schema(
  {
    senderId: {
      type: connection.Types.ObjectId,
      ref: "User",
      required: true,
    },
    receiverId: {
      type: connection.Types.ObjectId,
      ref: "User",
      required: true,
    },
    text: {
      type: String,
    },
    image: {
      type: String,
    },
  },
  { timestamps: true }
);

const Message = connection.model("Message",messageSchema,"message");

module.exports = Message;