// ./models/User.js

// EXTERNAL PACKAGE IMPORTS

const mongoose = require("mongoose");

// DEFINING USER SCHEMA

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
  },
  lastName: {
    type: String,
    required: [true, "Last name is required"],
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["Manager", "Operator"],
    default: "Operator",
    required: true,
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
