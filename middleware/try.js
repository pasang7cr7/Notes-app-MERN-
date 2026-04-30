// const express = require("express");
// const jwt = require("jsonwebtoken");
// const path = require("path");
// const rootDir = require("../utils/main");

// const User = require("../models/user");

// const router = express.Router();

// router.get("/register", (req, res) => {
//   try {
//     res.send(path.join(rootDir, "views", "registe.html"));
//   } catch (err) {
//     return res.status(500).json({ error: req.err });
//   }
// });

// router.get("/login", (req, res) => {
//   try {
//     res.send(path.join(rootDir, "views", "login.html"));
//   } catch (err) {
//     return res.status(500).json({ error: req.err });
//   }
// });

// router.post("/register", async (req, res) => {
//   try {
//     const email = req.body.email.trim();
//     const password = req.body.password.trim();

//     if (email === "" || password === "") {
//       return res.status(400).json({ error: "bad request" });
//     }

//     const existEmail = await User.findOne({ email });
//     if (existEmail)
//       return res.status(400).json({ error: "Email already existed" });

//     const hashedPass = await bcrypt.hash(password);
//     const newUser = await User.create({ email, password: hashedPass });
//     const token = jwt.sign({ userId: newUser._id }, "secretKey", {
//       expiresIn: "1h",
//     });

//     return res.status(201).json({ message: "New user created Successfully" });
//   } catch (err) {
//     return res.status(500).json({ error: req.err });
//   }
// });

// router.post("/login", async (req, res) => {
//   try {
//     const email = req.body.email.trim();
//     const password = req.body.password.trim();

//     console.log(password);
//     if (email === "" || password === "") {
//       return res.status(400).json({ error: "bad request" });
//     }

//     const existEmail = await User.findOne({ email });
//     if (!existEmail) return res.status(404).json({ err: "email not found" });

//     const pwMatch = await bcrypt.compare(password, existEmail.password);
//     if (!pwMatch) {
//       return res
//         .status(400)
//         .json({ error: "password not matched, Unauthorized" });
//     }

//     const token = jwt.sign({ userId: existEmail._id }, "secretKey", {
//       expiresIn: "1h",
//     });

//     return res.status(200).json(token);
//   } catch (err) {
//     return res.status(500).json({ error: req.err });
//   }
// });

// module.exports = router;
