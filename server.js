const express = require("express");
const server = express();

const helmet = require("helmet");
const morgan = require("morgan");
const cors = require("cors");

server.use(helmet());
server.use(morgan("dev"));
server.use(cors());

// server.use("/", (req, res) => res.send("API up and running!"));

server.get("/api", (req, res) => {
  res.status(200).json({
    message: "API works"
  });
});

module.exports = server;
