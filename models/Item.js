// ./models/Item.js

// EXTERNAL PACKAGE IMPORTS

const mongoose = require("mongoose");

// DEFINING USER SCHEMA

const itemSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
  },
  description: {
    type: String,
    required: [true, "Description is required"],
  },
  quantity: {
    type: Number,
    required: true,
    default: 0,
    min: 0,
  },
  locations: [
    {
      type: Schema.Types.ObjectId,
      ref: "Location",
    }
  ]
});

const Item = mongoose.model("Item", itemSchema);

module.exports = Item;
