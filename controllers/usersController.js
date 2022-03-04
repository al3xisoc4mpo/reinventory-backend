// EXTERNAL PACKAGE IMPORTS

const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

// INTERNAL IMPORTS

const User = require("./../models/User");

// USER GENERATING FUNCTION

exports.create = async (req, res) => {
  // DESTRUCTURING OF REQ.BODY
  const { name, lastName, email, password, role } = req.body;

  try {
    // PASSWORD HASHING
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    console.log(hashedPassword);

    // USER CREATION
    const newUser = await User.create({
      name,
      lastName,
      email,
      password: hashedPassword,
      role
    });

    console.log(newUser);

    // JWT HANDLE - AUTHENTICATION
    // WHEN USERS JUST SIGN UP LOGIN WILL NOT BE NECESSARY

    // PAYLOAD CREATION
    const payload = {
      user: {
        id: newUser._id,
      },
    };

    // JSON WEB TOKEN CREATION
    jwt.sign(
      payload, // DATOS QUE ACOMPAÑAN
      process.env.SECRET,
      {
        expiresIn: 3600000,
      },
      (error, token) => {
        if (error) throw error;

        res.json({
          msg: "User created successfully",
          data: token,
        });
      }
    );
  } catch (error) {
    console.log(error);

    res.json({
      msg: "There was an error in the user creation process",
    });
  }
};

// LOGIN AUTHENTICATION FUNCTION

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const foundUser = await User.findOne({ email });

    if (!foundUser) {
      return res.json({
        msg: "User was not found",
      });
    }

    const verifiedPass = await bcryptjs.compare(password, foundUser.password);

    if (!verifiedPass) {
      return await res.json({
        msg: "Username or password are incorrect",
      });
    }

    // JSON WEB TOKEN CREATION

    // PAYLOAD CREATION

    const payload = {
      user: {
        id: foundUser._id,
      },
    };

    jwt.sign(
      payload,
      process.env.SECRET,
      {
        expiresIn: 3600000,
      },
      (error, token) => {
        if (error) throw error;

        res.json({
          msg: "Login successful",
          data: token,
        });
      }
    );

    return;
  } catch (error) {
    console.log(error);

    res.json({
      msg: "No problem with authentication",
    });
  }
};

// TOKEN VERIFYING FUNCTION

exports.verifyToken = async (req, res) => {
	
  console.log(req.user);

  try {
    const foundUser = await User.findById(req.user.id).select("-password");

    return res.json({
      msg: "User data was found",
      data: foundUser,
    });
  } catch (error) {
    console.log(error);

    res.json({
      msg: "Error during the user update",
    });
  }
};
