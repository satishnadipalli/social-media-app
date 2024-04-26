const express = require("express");
require("express-async-errors");
const Message = require("../../Models/MessageModel");
const User = require("../../Models/UserSchema")
const CHATS = require("../../Models/ChatModel")


const sendMessages = async(req,res)=>{
    const {content,chatId} = req.body;
    try {
    if(!content || !chatId){
        return res.status(400).send("please provide the content and the chatId of the chat");
    }
    let newMessage = {
        sender:req.user._id,
        content,
        chat:chatId
    }
        let message = await Message.create(newMessage);

        message = await message.populate("sender","username pic")
        message = await message.populate("chat")
        message = await User.populate(message,{
            path:"chat.users",
            select:"username pic email"
        })

        await CHATS.findByIdAndUpdate(req.body.chatId,{
            latestMessage:message
        })

        return res.status(200).json({message});
    } catch (error) {
        console.log(error)
        return res.status(400).send(error);
    }
} 


const fetchAllMessages = async (req, res) => {
    
    try {
        const messages = await Message.find({ chat: req.params.chatId })
            .populate("sender", "username pic email")
            .populate("chat");

        return res.json(messages);
    } catch (error) {
        console.error("Error fetching messages:", error);
        res.status(500).send("Something went wrong"); // Sending an error response to the client
    }
}

module.exports = {sendMessages,fetchAllMessages}