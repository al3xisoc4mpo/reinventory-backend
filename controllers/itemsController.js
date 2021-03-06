// INTERNAL IMPORTS
const Item = require("../models/Item");
const Location = require("../models/Location");
const User = require("../models/User");

// CREATING ITEM
exports.createItem = async (req, res) => {
  const { user, name, description, image, quantity, locations } = req.body;
  console.log(user)

  try {
    const newItem = await Item.create({
      name,
      description,
      image,
      quantity,
      locations,
      user
    });

    const updateLocation = await Location.findByIdAndUpdate(locations, {
      $push: { items: newItem._id },
    });

    const updateUser = await User.findByIdAndUpdate(user, {
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
  const {user} = req.body
  console.log(user)
  try {
    const allItems = await Item.find({user})
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

    deletedItem.locations.forEach(async(location) => {
      console.log(location)
      const deletedLocationRelation = await Location.findByIdAndUpdate(
        location,
        {
          $pull: { items: deletedItem._id },
        }
      );
    });

    const deletedUserRelation = await User.findByIdAndUpdate(
      deletedItem.user,
      {
        $pull: { items: deletedItem._id },
      }
    );

    res.json({
      msg: "Item deletion successful",
      data: deletedItem,
    });
  } catch (error) {
    console.log(error);
  }
};
