// Import mongoose to connect with MongoDB
const mongoose = require('mongoose');

// This function connects your backend to the MongoDB database
const connectDB = async () => {
    try {
        // Connect to MongoDB using the URI stored in the .env file
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,      // Optional: Uses the new MongoDB connection string parser
            useUnifiedTopology: true,   // Optional: Uses the new server discovery and monitoring engine
        });

        // If connection is successful, print the host name to the console
        console.log(`MongoDB connected: ${conn.connection.host}`);
    } 
    catch (error) {
        // If there's an error during connection, print the error message
        console.log(`Error: ${error.message}`);

        // Exit the process with failure (1 = unsuccessful)
        process.exit(1);
    }
}

// Export the function so it can be used in other files like server.js
module.exports = connectDB;
