// Import the jsonwebtoken package
const jwt = require('jsonwebtoken');

// Function to generate a JWT token for a given user ID
const generateToken = (id) => {
    return jwt.sign(
        { id },                            // Payload: data to include in the token (in this case, user ID)
        process.env.JWT_SECRET,           // Secret key used to sign the token (stored in .env for security)
        { expiresIn: "365d" }             // Token expiry duration (here it's set to 365 days)
    );
};

// Export the function so it can be used elsewhere (e.g., during user login or registration)
module.exports = generateToken;
