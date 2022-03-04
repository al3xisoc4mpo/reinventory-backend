// ./config/db.js

// EXTERNAL PACKAGE IMPORTS
const mongoose = require("mongoose");

// CONNECT TO DATABASE FUNCTION DECLARATION
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    return console.log("Database connected");
  } catch (error) {
    console.log(error);
    return process.exit(1);
  }
};

// EXPORTS
module.exports = connectDB;
