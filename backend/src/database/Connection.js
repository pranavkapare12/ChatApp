const mongoose = require('mongoose')
const url = "mongodb://localhost:27017/chatapp";
mongoose.connect(url)

module.exports = mongoose;