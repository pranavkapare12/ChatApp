const express = require("express");
const { signup, login, logout ,updateProfile ,checkAuth} = require("../controller/auth.controller");
const route = express.Router();
const protectRoute = require("../middleware/auth.middleware")


route.post("/signup", signup)

route.post("/login", login)

route.post("/logout", logout)

route.put("/update-profile",protectRoute,updateProfile)

route.get("/check",protectRoute,checkAuth)

module.exports = route;