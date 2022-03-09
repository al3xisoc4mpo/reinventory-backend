// INTERNAL IMPORTS
const Item = require("../models/Item");
const Location = require("../models/Location");

// CREATING ITEM
exports.createItem = async (req, res) => {
  const { name, description, image, quantity, locations } = req.body;

  try {
    const newItem = await Item.create({
      name,
      description,
      image,
      quantity,
      locations,
    });

    const updateLocation = await Location.findByIdAndUpdate(locations, {
      $push: { items: newItem._id },
    });

    res.json({
      msg: "Item creation successful",
      data: newItem,
    });
  } catch (error) {
    console.log(error);
  }
};

// OBTAINING ALL ITEMS
exports.allItems = async (req, res) => {
  try {
    const allItems = await Item.find({})
    .populate({
      path: "locations",
      model: "Location",
    });

    res.json({
      msg: "Item query successfully",
      data: allItems,
    });
  } catch (error) {
    console.log(error);
  }
};

// OBTAINING A SINGLE ITEM
exports.selectedItem = async (req, res) => {

  const { id } = req.params;

  try {
    const selectedLocation = await Item.findById(id);

    res.json({
      msg: "Location query successfully",
      data: selectedLocation,
    });

  } catch (error) {
    console.log(error);
  }
};

// UPDATE ITEM DETAILS
exports.updateItem = async (req, res) => {


  const { _id, name, description, image, quantity } = req.body;

  try {
    const updatedItem = await Item.findByIdAndUpdate(
      _id,
      {
        name,
        description,
        image,
        quantity,
      },
      { new: true }
    );

    res.json({
      msg: "Item update successful",
      data: updatedItem,
    });
  } catch (error) {
    console.log(error);
  }
};

// DELETE ITEM
exports.deleteItem = async (req, res) => {
  const { id } = req.body;

  try {
    const deletedItem = await Item.findByIdAndDelete(id);

    res.json({
      msg: "Item deletion successful",
      data: deletedItem,
    });
  } catch (error) {
    console.log(error);
  }
};
