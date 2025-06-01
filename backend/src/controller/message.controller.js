const User = require('../database/Users')
const Message = require("../models/message.model")
const cloudinary = require("../lib/cloudinary")
const { getReciverSocketId, io } = require("../lib/socket");


const getUserForSidebar = async (req,resp) =>{

    try{
        const loggedInUserId = req.user._id;
        const filteredUsers = await User.find({_id : {$ne : loggedInUserId}}).select("-password")
        // resp.send(filteredUsers)

        resp.status(200).json(filteredUsers);

    }catch(e){
        resp.send(500).json({ error: "Internal Server error"})

    }
}

const getMessages = async(req,resp) =>{
    try {
        const {id:userToChatId} = req.params
        const myId = req.user._id;

        const message = await Message.find({
            $or:[
                {senderId:myId , receiverId:userToChatId},
                {senderId:userToChatId , receiverId:myId}
            ]
        }) 

        resp.status(200).json(message);
    } catch (error) {
        resp.status(500).json({error: "Internal Server error"})
    }
}


const sendMessage = async(req,resp) =>{
    try {
        const {text , image} = req.body;
        // console.log(req.body.image)
        const {id : receiverId} = req.params;
        const senderId = req.user._id;

        let imageUrl;
        if(image){
            // console.log("Executing from message Controller")
            const uploadResponse = await cloudinary.uploader.upload(image);
            imageUrl = uploadResponse.secure_url;
        }

        const newMessage = new Message({
            senderId,
            receiverId,
            text,
            image:imageUrl,
        })

        await newMessage.save();

        const receiverSocketId = getReciverSocketId(receiverId)
        if(receiverSocketId){
            io.to(receiverSocketId).emit("newMessage",newMessage);
        }

        resp.status(200).json(newMessage)

    } catch (error) {
        resp.status(500).json({error:"Internal Server Error"+error})
    }
}


module.exports = {getUserForSidebar,getMessages,sendMessage};

// timing :: 1:16:35