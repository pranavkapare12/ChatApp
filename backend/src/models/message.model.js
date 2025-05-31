const connection = require("../database/Connection");

const messageSchema = new connection.Schema(
  {
    senderId: {
      type: connection.Schema.Types.ObjectId,
      ref: "users", // The collection name, should be consistent with your user model
      required: true,
    },
    receiverId: {
      type: connection.Schema.Types.ObjectId,
      ref: "users",
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

const Message = connection.model("message", messageSchema, "message");

module.exports = Message;
