// ./models/Item.js

// EXTERNAL PACKAGE IMPORTS

const { Schema, model, SchemaType } = require("mongoose");

// DEFINING USER SCHEMA

const itemSchema = new Schema({
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

const Item = model("Item", itemSchema);

module.exports = Item;
