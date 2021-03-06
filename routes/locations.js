// ./routes/location.js

// EXTERNAL PACKAGE IMPORTS
const express = require("express");
const router = express.Router();

const locationsController = require("../controllers/locationsController")

// --- ROUTER ---

// CREATE A LOCATION
router.post("/create", locationsController.createlocation);

// OBTAIN ALL LOCATIONS
router.post("/all", locationsController.allLocations);

// OBTAIN A LOCATION
router.get("/:id", locationsController.selectedLocation);

// UPDATE ALL LOCATIONS
router.post("/:id/update", locationsController.updateLocation);

// DELETE LOCATION
router.post("/:id/delete", locationsController.deleteLocation);

// MODULE EXPORT
module.exports = router;