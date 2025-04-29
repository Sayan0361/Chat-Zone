// Controllers in a Node.js/Express application are JavaScript functions that handle the logic for a specific route.They act as the "middlemen" between the routes and the database/models

// Importing express-async-handler to handle errors in async functions without using try-catch
const expressAsyncHandler = require("express-async-handler");

// Import the User model to interact with the users collection in MongoDB
const User = require('../models/userModel');

// Import the token generator function to create JWT tokens
const generateToken = require('../config/generateToken');

// ==========================
// @desc    Register a new user
// @route   POST /api/user/
// @access  Public
// ==========================
const registerUser = expressAsyncHandler(async (req, res) => {
    const { name, email, password, pic } = req.body; // Destructure request body fields

    // Check if any required field is missing
    if (!name || !email || !password) {
        res.status(400); // 400 = Bad Request
        throw new Error("Please Enter all the Fields");
    }

    // Check if a user with the given email already exists
    const userExists = await User.findOne({ email });

    if (userExists) {
        res.status(400); // Conflict - user already exists
        throw new Error("User already exists");
    }

    // Create a new user
    const user = await User.create({
        name,
        email,
        password, // Will be hashed in the user model's pre-save middleware
        pic
    });

    // If user creation is successful, return user details and token
    if (user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            pic: user.pic,
            token: generateToken(user._id), // Generate JWT token using user id
        });
    } else {
        res.status(400); // Bad Request
        throw new Error("Failed to create the user");
    }
});

// ==========================
// @desc    Auth user (Login)
// @route   POST /api/user/login
// @access  Public
// ==========================
const authUser = expressAsyncHandler(async (req, res) => {
    const { email, password } = req.body; // Extract email and password from request

    // Find user by email
    const user = await User.findOne({ email });

    // If user exists and password matches
    if (user && (await user.matchPassword(password))) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            pic: user.pic,
            token: generateToken(user._id), // Generate a new token for session
        });
    } else {
        res.status(401); // Unauthorized
        throw new Error("Invalid Email or Password");
    }
});

// ==========================
// @desc    Get all users
// @route   GET /api/user?search=sayan
// @access  Private
// ==========================
const allUsers = expressAsyncHandler(async(req,res)=>{
    const keyword = req.query.search? {
        $or: [
            {name: { $regex: req.query.search, $options: 'i' }}, // Case-insensitive regex search for name
            {email: { $regex: req.query.search, $options: 'i' }} // Case-insensitive regex search for email
        ]
    } : {};
    // Find all users except the current user
    const users = await User.find(keyword).find({_id: {$ne: req.user._id}});// Exclude the current user   
    res.send(users);
})

// Export the controller functions so they can be used in routes
module.exports = { registerUser, authUser, allUsers };
