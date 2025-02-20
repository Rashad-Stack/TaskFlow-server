const admin = require("../config/firebase");
const User = require("../models/userModel");
const StatusCodes = require("http-status-codes").StatusCodes;

exports.verifyToken = async (req, res, next) => {
  const idToken = req.headers.authorization?.split("Bearer ")[1];

  if (!idToken) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ message: "Unauthorized" });
  }

  try {
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    const { uid, email, name } = decodedToken;

    // Check if user exists in the database
    let user = await User.findOne({ userId: uid });

    if (!user) {
      // Create a new user if not found
      user = new User({ userId: uid, email, displayName: name });
      await user.save();
    }

    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};
