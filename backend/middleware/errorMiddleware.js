const notFound = (req, res, next) => {
    // Create a new Error with a custom message indicating that the route was not found
    const error = new Error(`Not Found - ${req.originalUrl}`);

    // Set the status code to 404 (Page Not Found)
    res.status(404);

    // Pass the error to the next middleware (in this case, the errorHandler)
    next(error);
}

const errorHandler = (err, req, res, next) => {
    // If the status code hasn't been set by previous code, default to 500 (Internal Server Error)
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;

    // Set the status code for the response
    res.status(statusCode);

    // Send a JSON response containing the error message and the stack trace (in development mode only)
    res.json({
        message: err.message,  // The error message
        stack: process.env.NODE_ENV === "production" ? null : err.stack  // Only include the stack trace in non-production environments
    });
}


module.exports = {notFound,errorHandler};