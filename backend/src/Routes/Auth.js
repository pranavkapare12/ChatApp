const User = require("../database/Users");
const bcrypt = require("bcrypt");

const signup = async (req, res) => {
  try {
    const { name, email, pass, pro } = req.body;

    if (name === null || email === null || pass === null) {
      return res.status(400).json({ message: "All fileds Require" });
    }

    if (!pro) {
      pro = "Hello From the user";
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

    ack.save();

    const id = await User.findOne({ password });

    res.cookie("jwt",id._id, {
      httpOnly: true,
      secure: false, // set to true if using HTTPS
      maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
    });
    res.send({
      message: `${id._id}`,
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
      res.cookie("jwt",user._id, {
        httpOnly: true,
        secure: false, // set to true if using HTTPS
        maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
      });
      res.send({
        message: `${user._id}`,
      });
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

module.exports = { signup, login, logout };
