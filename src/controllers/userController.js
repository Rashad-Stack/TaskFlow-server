const { StatusCodes } = require("http-status-codes");
const User = require("../models/userModel");

// Create or update user
exports.createOrUpdateUser = async (req, res, next) => {
  try {
    const { userId, email, displayName } = req.body;
    // Debugging: Log the user ID

    let user = await User.findOne({
      email,
    });

    // Debugging: Log the user ID

    if (user) {
      // Update user details if user already exists
      user.email = email;
      user.displayName = displayName;
      user = await user.save();
    } else {
      // Create a new user if user does not exist
      user = new User({ userId, email, displayName });
      await user.save();
    }

    res.status(StatusCodes.OK).json(user);
  } catch (error) {
    next(error);
  }
};

// Get user details
exports.getUser = async (req, res, next) => {
  try {
    const user = await User.findOne({ userId: req.params.userId });

    if (!user) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "User not found" });
    }

    res.status(StatusCodes.OK).json(user);
  } catch (error) {
    next(error);
  }
};
