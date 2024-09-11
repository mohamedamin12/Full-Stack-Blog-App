const mongoose = require("mongoose");
const url = process.env.MONGO_URI;
const connectToDB = () => {
  try {
    mongoose.connect(url);
    console.log("Successfully connected to database");
  } catch (error) {
    console.log("Failed to connect to database" , error);
  }
}

module.exports = connectToDB;