// Importing mongoose to define schema and model
const mongoose = require('mongoose');

// Creating the schema (structure) for a Message document
const messageModel = mongoose.Schema(
  {
    // 🔹 sender: the user who sends the message
    sender: {
      type: mongoose.Schema.Types.ObjectId, // references the User who sent the message
      ref: 'User',                          // 'ref' links to the User model (foreign key like in SQL)
    },

    // 🔹 content: actual message text sent by the user
    content: {
      type: String,         // message must be a string (text)
      trim: true,           // removes leading/trailing whitespace from message
    },

    // 🔹 chat: the chat or group in which the message was sent
    chat: {
      type: mongoose.Schema.Types.ObjectId, // refers to the Chat document
      ref: "Chat",                          // link to the Chat model
    }
  },
  {
    // 🔹 timestamps: adds createdAt and updatedAt fields automatically
    timestamps: true,
  }
);

// Creating the Message model using the defined schema
const Message = mongoose.model("Message", messageModel);

// Exporting the model so it can be used in other parts of the app (like controllers/routes)
module.exports = Message;
