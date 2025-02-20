const dotenv = require("dotenv");
const mongoose = require("mongoose");
const logger = require("../utils/logger");
const process = require("process");

dotenv.config({ path: "./.env" });

const DB = process.env.MONGODB_DATABASE_URL.replace(
  "<db_password>",
  process.env.MONGODB_DATABASE_PASSWORD
);

const connectDB = async () => {
  try {
    await mongoose.connect(DB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    logger.info("MongoDB connected successfully");
  } catch (error) {
    logger.error("MongoDB connection failed", error);
    process.exit(1);
  }
};

module.exports = connectDB;
