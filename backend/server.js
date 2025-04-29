// Importing required packages
const express = require('express'); // Core framework to create server and routes
const app = express(); // Initialize express app
const dotenv = require('dotenv'); // To load environment variables from .env file
const { chats } = require('./data/data'); // Sample chat data (if needed for testing)
const cors = require('cors'); // Enable Cross-Origin Resource Sharing
const connectDB = require('./config/db'); // MongoDB connection function
const userRoutes = require('./routes/userRoutes'); // User-related API routes
const { notFound, errorHandler } = require('./middleware/errorMiddleware'); // Custom error handlers
const chatRoutes = require('./routes/chatRoutes');
// Load environment variables from .env file
dotenv.config();

// Port configuration (either from .env or fallback to 3000)
const port = process.env.PORT || 3000;

// Connect to MongoDB database
connectDB();

// --------------------- MIDDLEWARES ---------------------

// Middleware functions are functions that have access to the request (req) object, the response (res) object, and the next() function in the Express app’s request-response cycle.
// They are used to:
// Execute any code , Modify req and res objects , End the request-response cycle, Call the next middleware in the stack using next()


// Enable CORS to allow frontend apps on different domains (like localhost:5173) to access the backend
app.use(cors());  // Cross-Origin Resource Sharing

// Built-in middleware to parse incoming requests with JSON payloads (like POST request bodies)
app.use(express.json());

// Built-in middleware to parse URL-encoded form data (like form submissions from frontend)
app.use(express.urlencoded({ extended: true }));



// --------------------- ROUTES ---------------------

// Root route for testing whether the server is running
app.get('/', (req, res) => {
    res.send('API is running...');
});

// Example routes for accessing sample chats (can be removed in production)
/*
app.get('/api/chats', (req, res) => {
    res.send(chats); // Sends all chats
});

app.get('/api/chats/:id', (req, res) => {
    const singleChat = chats.find((c) => c._id === req.params.id);
    if (!singleChat) {
        return res.status(404).send({ message: 'Chat not found' });
    }
    res.send(singleChat);
});
*/

// Route for handling user registration and login endpoints
app.use('/api/user', userRoutes);
app.use('/api/chat', chatRoutes);


// --------------------- ERROR HANDLING MIDDLEWARE ---------------------

// Middleware for handling 404 Not Found errors (when no route matches)
app.use(notFound);

// Global error handler middleware (catches any errors thrown in async functions)
app.use(errorHandler);


// --------------------- START SERVER ---------------------

// Start the Express server on defined port
app.listen(port, () => {
    console.log(`✅ Server is running on http://localhost:${port}`);
});
