const chats = [
    {
      isGroupChat: false,
      users: [
        { name: "Alice Johnson", email: "alice.johnson@example.com" },
        { name: "Piyush Sharma", email: "piyush.sharma@example.com" },
      ],
      _id: "chat_001",
      chatName: "Alice Johnson",
    },
    {
      isGroupChat: false,
      users: [
        { name: "Rahul Mehta", email: "rahul.mehta@example.com" },
        { name: "Piyush Sharma", email: "piyush.sharma@example.com" },
      ],
      _id: "chat_002",
      chatName: "Rahul Mehta",
    },
    {
      isGroupChat: false,
      users: [
        { name: "Emily Clark", email: "emily.clark@example.com" },
        { name: "Piyush Sharma", email: "piyush.sharma@example.com" },
      ],
      _id: "chat_003",
      chatName: "Emily Clark",
    },
    {
      isGroupChat: true,
      users: [
        { name: "Piyush Sharma", email: "piyush.sharma@example.com" },
        { name: "Alice Johnson", email: "alice.johnson@example.com" },
        { name: "Rahul Mehta", email: "rahul.mehta@example.com" },
        { name: "Zara Khan", email: "zara.khan@example.com" },
      ],
      _id: "chat_004",
      chatName: "Project Alpha",
      groupAdmin: {
        name: "Alice Johnson",
        email: "alice.johnson@example.com",
      },
    },
    {
      isGroupChat: false,
      users: [
        { name: "Zara Khan", email: "zara.khan@example.com" },
        { name: "Piyush Sharma", email: "piyush.sharma@example.com" },
      ],
      _id: "chat_005",
      chatName: "Zara Khan",
    },
    {
      isGroupChat: true,
      users: [
        { name: "Emily Clark", email: "emily.clark@example.com" },
        { name: "Piyush Sharma", email: "piyush.sharma@example.com" },
        { name: "John Smith", email: "john.smith@example.com" },
        { name: "Sneha Roy", email: "sneha.roy@example.com" },
      ],
      _id: "chat_006",
      chatName: "Weekend Plans",
      groupAdmin: {
        name: "Emily Clark",
        email: "emily.clark@example.com",
      },
    },
  ];
  
module.exports = {chats};
// This code exports an array of chat objects, each representing a chat session between users.