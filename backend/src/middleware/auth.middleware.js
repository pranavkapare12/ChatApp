const jwt = require("jsonwebtoken");
const User = require("../database/Users");

const protectRoute = async (req, resp, next) => {
  try {
    const token = req.cookies.jwt;

    if (!token) {
      return resp.status(401).json({
        message: "Unauthorized - No Token Provided",
      });
    }

    const decoded = jwt.verify(token, "TheSecreateKey");

    if (!decoded) {
      return resp.status(401).json({
        message: "Unauthorized - Invalid Token",
      });
    }

    const user = await User.findById(decoded.userId).select("-password"); ////===============

    if (!user) {
        return resp.status(404).json({
            message: "User Not Found",
        });
    }
    // console.log(user+"\n")
    // console.log(decoded);
    req.user = await user;
    next()

  } catch (e) {
    return resp.status(500).json({message:` ${e} `})
  }
};

module.exports = protectRoute;
