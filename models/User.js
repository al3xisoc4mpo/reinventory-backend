// ./models/User.js

// EXTERNAL PACKAGE IMPORTS

const mongoose = require("mongoose");

// DEFINING USER SCHEMA

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "Name is required"],
  },
  lastName: {
    type: String,
    required: [true, "Last name is required"],
  },
  picture: {
    type: String,
    required: [true, "Picture is required"],
  },
  phoneNumber: {
    type: String,
    maxlength: 10
  },
  email: {
    type: String,
    rrequired: [true, "Email is required"],
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
