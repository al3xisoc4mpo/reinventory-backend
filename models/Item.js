// ./models/Item.js

// EXTERNAL PACKAGE IMPORTS

const { Schema, model, SchemaType } = require("mongoose");

// DEFINING USER SCHEMA

const itemSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    description: {
      type: String,
      required: [true, "Description is required"],
    },
    image: {
      type: String,
      required: [true, "Image is required"],
    },
    quantity: {
      type: Number,
      required: [true, "Quantity is required"],
      default: 0,
      min: 1,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    locations: [
      {
        type: Schema.Types.ObjectId,
        ref: "Location",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Item = model("Item", itemSchema);

module.exports = Item;
