// INTERNAL IMPORTS
const Item = require("../models/Location");

// CREATING LOCATIONS
exports.createItem = async (req, res) => {
  const { name, description } = req.body;

  try {
    const createdLocation = await Item.create({ name, description });

    res.json({
      msg: "Location creation successful",
      data: createdLocation,
    });
  } catch (error) {
    console.log(error);
  }
};

// OBTAINING ALL LOCATIONS
exports.allItems = async (req, res) => {
  try {
    const allLocations = await Item.find({});

    res.json({
      msg: "Locations query successfully",
      data: allLocations,
    });
  } catch (error) {
    console.log(error);
  }
};

// UPDATE LOCATION DETAILS
exports.updateItems = async (req, res) => {
  const { id, name, description, admin, items } = req.body;

  try {
    const updatedLocation = await Item.findByIdAndUpdate(id, {
      name,
      description,
      admin,
      items,
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
exports.deleteItems = async (req, res) => {
  const { id } = req.body;

  try {
    const deletedLocation = await Item.findByIdAndDelete(id);

    res.json({
      msg: "Location deletion successful",
      data: deletedLocation,
    });
  } catch (error) {
    console.log(error);
  }
};
