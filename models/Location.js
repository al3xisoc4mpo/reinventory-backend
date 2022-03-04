// ./models/Location.js

// EXTERNAL PACKAGE IMPORTS

const mongoose = require("mongoose");

// DEFINING USER SCHEMA

const locationSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
  },
  description: {
    type: String,
    required: [true, "Description is required"],
  },
  items: [
    {
      type: Schema.Types.ObjectId,
      ref: "Item",
    }
  ]
});

const Location = mongoose.model("Location", locationSchema);

module.exports = Location;
