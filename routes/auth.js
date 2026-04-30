const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const path = require("path");

//local module
const User = require("../models/user");
const rootDir = require("../utils/main");

const router = express.Router();

router.get("/register", (req, res) => {
  res.sendFile(path.join(rootDir, "views", "registe.html"));
});

router.post("/register", async (req, res) => {
  try {
    const email = req.body.email.toLowerCase().trim();
    const password = req.body.password.toLowerCase().trim();

    if (email === "" || password === "") {
      return res.status(400).json({ error: "your input is incorrect" });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser)
      return res.status(400).json({ message: "email already exist" });

    const hashedPw = await bcrypt.hash(password, 10);

    const detail = await User.create({ email, password: hashedPw });
    const token = jwt.sign(
      { userId: detail._id }, // payload — token bhitra k store garnu
      process.env.JWT_SECRET, // secret — environment variable ma rakhnu parchha
      { expiresIn: "1h" }, // options
    );
    return res.status(201).json({
      message: "successfully created token and saved emial and hashed password",
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

router.get("/login", (req, res) => {
  res.sendFile(path.join(rootDir, "views", "login.html"));
});

router.post("/login", async (req, res) => {
  try {
    const email = req.body.email.toLowerCase().trim();
    const password = req.body.password.toLowerCase().trim();

    if (email === "" || password === "") {
      return res.status(400).json({ error: "your input is incorrect" });
    }

    const emailExist = await User.findOne({ email });
    if (!emailExist) return res.status(404).json({ error: "404 not found" });

    const isMatch = await bcrypt.compare(password, emailExist.password);

    if (!isMatch) {
      return res
        .status(401)
        .json({ error: "unauthorized access, wrong password" });
    }

    const token = jwt.sign(
      { userId: emailExist._id }, // payload — token bhitra k store garnu
      process.env.JWT_SECRET, // secret — environment variable ma rakhnu parchha
      { expiresIn: "1h" },
    );
    return res.status(200).json({ token });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

module.exports = router;
