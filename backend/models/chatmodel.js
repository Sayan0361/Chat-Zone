
// Schema : ChatName, isGroupChat, users, latestMessage, groupAdmin 


// Importing mongoose to define schemas and models for MongoDB
const mongoose = require("mongoose");

// Creating a new Schema (structure) for the Chat collection
const chatSchema = mongoose.Schema(
  {
    // The name of the chat (either user name in private chat or group name in group chat)
    chatName: {
      type: String,
      trim: true, // removes whitespace from beginning and end
      required: true, // this field must be provided
    },

    // Boolean flag to identify if it's a group chat or not
    isGroupChat: {
      type: Boolean,
      default: false, // by default, a chat is not a group chat
    },

    // Array of users participating in the chat
    users: [
      {
        type: mongoose.Schema.Types.ObjectId, // refers to a document ID from another collection
        ref: "User", // references the 'User' model (foreign key relationship)
      },
    ],

    // The most recent message in the chat
    latestMessage: {
      type: mongoose.Schema.Types.ObjectId, // message ID
      ref: "Message", // references the 'Message' model
    },

    // In case of group chat, this holds the group admin's user ID
    groupAdmin: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // also refers to the 'User' model
    },
  },
  {
    // Options object - adds `createdAt` and `updatedAt` timestamps automatically
    timestamps: true,
  }
);

// Creating the Chat model using the defined schema
const Chat = mongoose.model("Chat", chatSchema);

// Exporting the model so it can be used in controllers/routes
module.exports = Chat;



// Term-----Meaning-----Real-Life Example
// Database----Container of collections----chatAppDB
// Collection-----Group of related documents-----users, chats
// Document-----Single data record (JSON object)-----A user profile
// Model-----Mongoose blueprint for documents-----User, Chat model

// A Schema is like a blueprint or structure that defines how your documents should look in a collection.
// It tells:
// What fields will be there in a document
// What data types those fields should have (like String, Number, Boolean, etc.)
// Whether a field is required or optional
// Can also include validators, default values, and relationships (like ref)