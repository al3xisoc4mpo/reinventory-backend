// ./controllers/locationsControllers.js

// INTERNAL IMPORTS
const Location = require("../models/Location");
const User = require("../models/User");
const Item = require("../models/Item");

// CREATING LOCATIONS
exports.createlocation = async (req, res) => {
  const { name, description, image, admin } = req.body;

  try {
    const newLocation = await Location.create({
      name,
      description,
      image,
      admin,
    });

    const updateUser = await User.findByIdAndUpdate(admin, {
      $push: { locations: newLocation._id },
    });

    res.json({
      msg: "Location creation successful",
      data: newLocation,
    });
  } catch (error) {
    console.log(error);
  }
};

// OBTAINING ALL LOCATIONS
exports.allLocations = async (req, res) => {
  const { user } = req.body;
  console.log(user);
  try {
    const allLocations = await Location.find({ admin: user });

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
  const { id } = req.params;

  try {
    const selectedLocation = await Location.findById(id).populate({
      path: "items",
      model: "Item",
    });

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
  const { _id, name, description, image } = req.body;

  try {
    const updatedLocation = await Location.findByIdAndUpdate(
      _id,
      {
        name,
        description,
        image,
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
  const { _id } = req.body;

  try {
    const deletedLocation = await Location.findByIdAndDelete(_id)
    .populate({
      path: "items",
      model: "Item"
    });

    const deletedUserRelation = await User.findByIdAndUpdate(
      deletedLocation.admin,
      {
        $pull: { locations: deletedLocation._id },
      }
    );

    deletedLocation.items.forEach(async (item) => {

      console.log("Item:",item);

      const deletedItemUserRelation = await User.findByIdAndUpdate(item.user, {
        $pull: { items: item._id },
      });

      const deletedItemRelation = await Item.findByIdAndDelete(item._id, {
        $pull: { items: deletedLocation._id },
      });



    });

    res.json({
      msg: "Location deletion successful",
      data: deletedLocation,
    });
  } catch (error) {
    console.log(error);
  }
};
