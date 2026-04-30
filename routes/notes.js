const express = require("express");

const router = express.Router(); // yo router ko use garera hamile app.js ma use garne route banaucha
const Note = require("../models/note"); //schema of note
const authMiddleware = require("../middleware/auth");

const path = require("path"); // core module for path handling
const rootDir = require("../utils/main"); // local module for getting root directory path

router.post("/notes", authMiddleware, async (req, res) => {
  // logic coming next
  // const fullBody = req.body;

  try {
    console.log(req.body);
    const title = req.body.title.trim(); // trim() le string ko suru ra end ma vako whitespace haru hataidincha
    const content = req.body.content.trim();
    if (title === "" || content === "") {
      return res.status(400).json({ error: "your input is incorrect" }); // 400 status code means bad request, client le pathaeko data ma kehi problem cha vanera server le janakari dincha
    }

    const note = await Note.create({ title, content, user: req.user.userId });
    return res.status(201).json({ note });
  } catch (err) {
    return res.status(500).json({ error: "something is wrong in this db" });
  }
});

router.get("/notes", authMiddleware, async (req, res) => {
  try {
    const note = await Note.find({ user: req.user.userId }); // ← sirf aafno notes
    return res.status(200).json({ note });
    console.log(note);
  } catch (error) {
    return res.status(500).json({ error: "can't find data" });
  }
});

router.delete("/notes/:id", authMiddleware, async (req, res) => {
  const id = req.params.id;

  // if (!idParem) {
  //   return res.status(404).json("404 not found");
  // }

  try {
    const toDelete = await Note.findOneAndDelete({
      _id: id,
      user: req.user.userId,
    });
    if (toDelete === null) {
      return res.status(404).json("404 not found");
    }
    return res.status(200).json("successfully deleted");
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

router.put("/notes/:id", authMiddleware, async (req, res) => {
  const id = req.params.id;
  console.log(id);
  const title = req.body.title.trim();
  const content = req.body.content.trim();
  if (title === "" || content === "") {
    return res.status(400).json({ error: "your input is incorrect" });
  }
  const note = { title, content };
  try {
    const update = await Note.findOneAndUpdate(
      { _id: id, user: req.user.userId }, // ← condition
      { title, content },
      { returnDocument: "after" },
    );
    if (update === null) {
      return res.status(404).json("not found");
    }
    return res.status(200).json("successfully");
  } catch (err) {
    return res.status(500).json(err);
  }
});

module.exports = router;
