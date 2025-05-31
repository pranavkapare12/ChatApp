const User = require("../database/Users");
const bcrypt = require("bcrypt");
const generateTokan = require("../lib/utils");  // your JWT token generator

const signup = async (req, res) => {
  try {
    let { name, email, pass, pro } = req.body;

    if (!name || !email || !pass) {
      return res.status(400).json({ message: "All fields required" });
    }

    if (!pro) {
      pro = "Hello From the user";
    }

    if (pass.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(pass, saltRounds);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      profilePic: pro,
    });

    await newUser.save();

    // Use your generateTokan util to create a JWT and set cookie
    generateTokan(newUser._id, res);

    res.status(201).json({
      message: "New user created",
      userId: newUser._id,
    });
  } catch (e) {
    res.status(500).json({
      message: `Cannot insert data: ${e.message}`,
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, pass } = req.body;

    if (!email || !pass) {
      return res.status(400).json({ message: "All fields required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(pass, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    generateTokan(user._id, res);

    res.status(200).json({
      message: "Logged in successfully",
      userId: user._id,
    });
  } catch (e) {
    res.status(500).json({
      message: `Cannot login: ${e.message}`,
    });
  }
};

const logout = async (req, res) => {
  try {
    res.clearCookie("jwt");
    res.status(200).send("Logged out");
  } catch (e) {
    res.status(500).json({
      message: `Cannot logout: ${e.message}`,
    });
  }
};

module.exports = { signup, login, logout };
