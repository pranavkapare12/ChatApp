const Conn = require("./Connection");
const userSchema =new Conn.Schema({
    name:String,
    email:String,
    password:String,
    profilePic:String,
},
{timestamps:true}
)

const user = Conn.model("users",userSchema,"Users");

module.exports = user;