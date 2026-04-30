const express = require("express");

const path = require("path");
const rootDir = require("../utils/main");

const userHandler = express.Router();

userHandler.get("/", (req, res, next) => {
  res.sendFile(path.join(rootDir, "views", "homepage.html"));
});

userHandler.get("/noteApp", (req, res, next) => {
  res.sendFile(path.join(rootDir, "views", "notes.html"));
});

module.exports = userHandler;
