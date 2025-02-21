const dotenv = require("dotenv");
const http = require("http");
const app = require("./app");
const process = require("process");
const { Server } = require("socket.io");

const logger = require("./utils/logger");

dotenv.config({ path: "./.env" });
const PORT = process.env.PORT || 5000;

// Create a socket server and pass the express
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST", "PATCH", "PUT", "DELETE"],
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
