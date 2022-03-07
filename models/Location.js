// ./models/Location.js

// EXTERNAL PACKAGE IMPORTS

const { Schema, model, SchemaType } = require("mongoose");

// DEFINING USER SCHEMA

const locationSchema = new Schema({
  name: {
    type: String,
    required: [true, "Name is required"]
  },
  description: {
    type: String,
    required: [true, "Description is required"]
  },
  image: {
    type: String,
    required: [true, "Image is required"]
  },
  admin: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  items: [
    {
      type: Schema.Types.ObjectId,
      ref: "Item",
    },
  ],
});

const Location = model("Location", locationSchema);

module.exports = Location;
