const mongoose = require("mongoose");

const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Database connected");
  } catch (error) {
    console.log("DB connection error!");
    console.log(error);
    process.exit();
  }
};

module.exports = connectDb;
