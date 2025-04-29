const express = require('express');  // Importing Express module
const { registerUser, authUser, allUsers } = require('../controllers/userControllers');  // Importing the controller functions for user registration and authentication
const {protect} = require('../middleware/authMiddleware');
const router = express.Router();  // Creating a new instance of an Express Router to define routes for the user

// Define the route for user registration (POST request)
router.route('/').post(registerUser).get(protect,allUsers);  // When a POST request is made to "/api/user", it will call the registerUser controller

// Define the route for user login (POST request)
router.post('/login', authUser);  // When a POST request is made to "/api/user/login", it will call the authUser controller


module.exports = router;  // Export the router to be used in other files
