const express = require('express');
const routes = express.Router();
const protectRoute = require("../middleware/auth.middleware");
const {getUserForSidebar,getMessages,sendMessage} = require('../controller/message.controller')


routes.get("/users",protectRoute,getUserForSidebar)
routes.get("/:id",protectRoute,getMessages)

// routes.post("/send/:id",protectRoute,sendMessage);

module.exports = routes;