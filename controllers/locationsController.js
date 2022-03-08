// INTERNAL IMPORTS
const Location = require("../models/Location");

// CREATING LOCATIONS
exports.createlocation = async (req, res) => {
  const { name, description, image, admin } = req.body;

  try {
    const createdLocation = await Location.create({ name, description, image, admin });

    res.json({
      msg: "Location creation successful",
      data: createdLocation,
    });
  } catch (error) {
    console.log(error);
  }
};

// OBTAINING ALL LOCATIONS
exports.allLocations = async (req, res) => {
  try {
    const allLocations = await Location.find({});

    res.json({
      msg: "Locations query successfully",
      data: allLocations,
    });
  } catch (error) {
    console.log(error);
  }
};

// OBTAINING A SINGLE LOCATION
exports.selectedLocation = async (req, res) => {

const {id} = req.params

  try {
    const selectedLocation = await Location.findById(id);

    res.json({
      msg: "Location query successfully",
      data: selectedLocation,
    });
  } catch (error) {
    console.log(error);
  }
};

// UPDATE LOCATION DETAILS
exports.updateLocation = async (req, res) => {

  const {id} = req.params
  console.log(id)
  const { name, description, image } = req.body;

  try {
    const updatedLocation = await Location.findByIdAndUpdate(id, {
      name,
      description,
      image
    },
    { new: true }
    );

    res.json({
      msg: "Location update successful",
      data: updatedLocation,
    });
  } catch (error) {
    console.log(error);
  }
};

// DELETE LOCATION
exports.deleteLocation = async (req, res) => {
  const { id } = req.params;
  console.log(id)
  try {
    const deletedLocation = await Location.findByIdAndDelete(id);

    res.json({
      msg: "Location deletion successful",
      data: deletedLocation,
    });
  } catch (error) {
    console.log(error);
  }
};
