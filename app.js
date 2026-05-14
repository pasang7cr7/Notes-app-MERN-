require("dotenv").config();
//external module
const express = require("express");

//core modules
const path = require("path");
const cors = require("cors");
//local module
const userHandler = require("./routes/user");
const rootDir = require("./utils/main");
const connectDB = require("./config/db");
const noteRoute = require("./routes/notes");
const userAuth = require("./routes/auth");
const authMiddleware = require("./middleware/auth");

const app = express();
connectDB();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  console.log(req.method, req.url);
  //console.log(req.body);
  next();
});

app.use(userHandler);
app.use(noteRoute);
app.use(userAuth);

app.use((req, res, next) => {
  res.status(404).json({ message: "404 page not found" });
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`);
});
