const { StatusCodes } = require("http-status-codes");
const logger = require("./logger");

exports.createAppError = function createAppError(message, statusCode) {
  const error = new Error(message);
  error.statusCode = statusCode;
  error.status = `${statusCode}`.startsWith("4") ? "failed" : "error";
  error.isOperational = true;
  return error;
};

// eslint-disable-next-line no-unused-vars
exports.globalErrorHandler = (err, req, res, next) => {
  logger.error(err.message);
  err.statusCode = err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;
  err.status = err.status || "error";

  // Handle specific Firebase ID token expiration error
  if (err.message.includes("Firebase ID token has expired")) {
    err.statusCode = StatusCodes.UNAUTHORIZED;
    err.status = "failed";
    err.message = "Your session has expired. Please log in again.";
  }

  // A) API
  if (req.originalUrl.startsWith("/api")) {
    return res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  }

  // B) RENDERED WEBSITE
  console.error("ERROR 💥", err);
  return res.status(err.statusCode).json({
    title: "Something went wrong!",
    msg: err.message,
  });
};
