const admin = require("../config/firebase");
const User = require("../models/userModel");
const { createAppError } = require("../utils/errorMiddleware");
const { StatusCodes } = require("http-status-codes");

exports.verifyToken = async (req, res, next) => {
  const idToken = req.headers.authorization?.split("Bearer ")[1];

  if (!idToken) {
    return next(createAppError("Invalid token", StatusCodes.BAD_REQUEST));
  }

  try {
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    const { email } = decodedToken;

    // Check if user exists in the database
    let user = await User.findOne({ email });

    if (!user) {
      return next(
        createAppError(
          "The use belongs this token no longer exist!",
          StatusCodes.UNAUTHORIZED
        )
      );
    }

    req.user = user;
    next();
  } catch (error) {
    console.log(error);
    next(error);
  }
};
