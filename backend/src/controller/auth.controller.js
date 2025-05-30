const User = require("../database/Users");
const bcrypt = require("bcrypt");
const generateTokan = require("../lib/utils");
const cloudinary = require("../lib/cloudinary");

const signup = async (req, res) => {
  //  console.log(req.body);
  try {
    const { name, email, pass, pro } = req.body;

    console.log(name, email, pass);
    if (name === null || email === null || pass === null) {
      return res.status(400).json({ message: "All fileds Require" });
    }

    const salt = 10;

    if (pass.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 character" });
    }

    const user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ message: "Email already Exist" });
    }

    const password = await bcrypt.hash(pass, salt);

    const ack = new User({
      name,
      email,
      password,
      profilePic: pro,
    });

    await ack.save();

    const id = await User.findOne({ password });
    // return res.json(id._id);

    generateTokan(id._id, res);
    res.status(201).json({
      message: "NEW USER CREATED",
    });
  } catch (e) {
    res.send({
      message: `Cannot insert Data ${e}`,
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, pass } = req.body;
    if (email === null || pass === null) {
      return res.status(400).json({ message: "All fileds Require" });
    }

    const salt = 10;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "Invalid Credintaile" + email });
    }

    const isMatch = await bcrypt.compare(pass, user.password);
    const id = user._id;
    if (isMatch) {
      generateTokan(id._id, res);
      res.send("LoginIn Successfully ");
    } else {
      res.send({
        message: `Invalid Credintaile`,
      });
    }
  } catch (e) {
    res.send({
      message: `Cannot insert Data ${e}`,
    });
  }
};

const logout = async (req, res) => {
  try {
    res.clearCookie("jwt");
    res.send("logout");
  } catch (e) {
    res.send({
      message: `Cannot insert Data ${e}`,
    });
  }
};

const updateProfile = async (req, resp) => {
  try {
    // check pro if is not correct replace with req.body
    const profilePic = req.body.pro;
    const userId = req.user._id;

    // console.log("Execute from auth Crontroller");
    // console.log("Profile Pic: ", profilePic);

    const uploadResponse = await cloudinary.uploader.upload(profilePic);

    const updateUser = await User.findByIdAndUpdate(
      userId,
      {
        profilePic: uploadResponse.secure_url,
      },
      {
        new: true,
      }
    );

    if (!updateUser) {
      return resp.status(404).json({ message: "User not found" });
    }

    // console.log("User updated successfully");
    return resp.status(200).json({
      message: "User updated successfully",
      user: updateUser,
    });
  } catch (e) {
    resp.send(e);
  }
};

const checkAuth = (req, resp) => {
  try {
    return resp.status(200).json(req.user);
  } catch (error) {
    console.log("Error in checkAuth controller", error.message);
    return resp.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = { signup, login, logout, updateProfile, checkAuth };
