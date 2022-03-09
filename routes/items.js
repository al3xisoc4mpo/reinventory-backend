// ./routes/location.js

// EXTERNAL PACKAGE IMPORTS
const express = require("express");
const router = express.Router();

const itemsController = require("../controllers/itemsController")

// --- ROUTER ---

// CREATE AN ITEM
router.post("/create", itemsController.createItem);

// OBTAIN ALL ITEMS
router.post("/all", itemsController.allItems);

// OBTAIN AN ITEM
router.get("/:id", itemsController.selectedItem);

// UPDATE ALL LOCATIONS
router.post("/:id/update", itemsController.updateItem);

// DELETE LOCATION
router.post("/:id/delete", itemsController.deleteItem);

// MODULE EXPORT
module.exports = router;