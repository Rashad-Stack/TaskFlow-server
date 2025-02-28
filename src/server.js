const dotenv = require("dotenv");
const app = require("./app");
const logger = require("./utils/logger");
const process = require("process");

dotenv.config({ path: "./.env" });
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
});
