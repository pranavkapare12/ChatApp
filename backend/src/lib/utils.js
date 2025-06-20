const jwt = require("jsonwebtoken");
const generateTokan = (userId,res) =>{
    const token = jwt.sign({userId}, "TheSecreateKey" ,{
        expiresIn:"7d"
    })

    res.cookie("jwt",token,{
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: "strict",
        secure : process.env.NODE_ENV !== "development"
    })

return token;
}

module.exports = generateTokan;