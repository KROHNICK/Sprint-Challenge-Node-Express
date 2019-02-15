const express = require("express");
const server = express();

const helmet = require("helmet");
const morgan = require("morgan");
const cors = require("cors");

const projectRoutes = require("./routes/projectRoutes");

server.use(express.json());
server.use(helmet());
server.use(morgan("dev"));
server.use(cors());
server.use("/api/projects", projectRoutes);
// server.use("/", (req, res) => res.send("API up and running!"));

server.get("/api", (req, res) => {
  res.status(200).json({
    message: "API works"
  });
});

module.exports = server;
