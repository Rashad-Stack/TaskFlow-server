const dotenv = require("dotenv");
const http = require("http");
const app = require("./app");
const logger = require("./utils/logger");
const process = require("process");
const { Server } = require("socket.io");

dotenv.config({ path: "./.env" });
const PORT = process.env.PORT || 5000;

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
  },
});

io.on("connection", (socket) => {
  logger.info("New client connected");

  socket.on("disconnect", () => {
    logger.info("Client disconnected");
  });
});

server.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
});
