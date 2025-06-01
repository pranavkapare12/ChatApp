const express = require("express");
const {io , app , server } = require("./lib/socket");
const route = require('./Routes/Auth.router')
const messageRoutes = require('./Routes/Message.router')
const cors = require("cors")

const cookieParser = require("cookie-parser")

app.use(express.json({ limit: "100mb"}));
app.use(cookieParser());
app.use(express.urlencoded({ extended: true, limit: "100mb" }));
app.use(cors({
  origin: "http://localhost:5173",
  credentials:true
}))


app.use("/api/auth",route);
app.use("/api/messages",messageRoutes);


server.listen(3000, () => {
  console.log("The site is running on port 3000");
});
