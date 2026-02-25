import User from "../models/userSchema.js";
import JWT from "jsonwebtoken";
import config from "../config/config.js";

export const cookieOptions = {
  expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
  httpOnly: true,
};

export const signup = async (req, res) => {
  try {
    // Get info from Frontend
    const { name, email, password, phone, address, role } = req.body;

    // Validation and Response
    if (!name || !email || !password || !phone || !address || !role) {
      return res.status(400).json({
        success: false,
        message: "Please fill all the fields",
      });
    }

    // Check if the user already exists in the database
    const existingUser = await User.findOne({ email });

    // Send response if the user exists
    if (user) {
      res.status(200).json({
        success: false,
        message: "User already exists , Please login",
      });
    }

    // If the user dosent exist, Create new user
    const user = await User.create({
      name,
      email,
      password,
      phone,
      address,
      role,
    });

    // Create Token
    let token = JWT.sign(
      { _id: user._id, role: user.role },
      config.JWT_SECRET,
      { expiresIn: config.JWT_EXPIRY },
    );

    //Password Safety
    user.password = undefined;

    // Set up cookies
    res.cookie("token", token, cookieOptions);

    // If everythink OK, Send success response to the frontend
    res.status(201).json({
      success: true,
      message: "Successfully Signed Up",
      user,
    });
    
  } catch (error) {
    console.log(error);
    res.send(500).json({
      success: false,
      message: "Error in signing up",
      error,
    });
  }
};
