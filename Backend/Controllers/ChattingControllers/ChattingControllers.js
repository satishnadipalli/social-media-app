require("express-async-errors");
const CHATS = require("../../Models/ChatModel");
const User = require("../../Models/UserSchema");

const accessChats = async(req,res)=>{
    const {userId} = req.body;

    console.log(userId,req.body)
    if(!userId){
        return res.status(400).json({msg:"the user id was not given"});
    }

    let currentChat = await CHATS.find({
        isGroupChat:false,
        $and:[
            {users:{$elemMatch :{$eq : req.user._id}}},
            {users:{$elemMatch : {$eq : userId}}}
        ]
    }).populate("users","-password").populate("latestMessages");

    currentChat = await User.populate(currentChat,{
        path: "latestMessages.sender",
        select : "username email pic"
    });

    if(currentChat.length > 0){
        return res.send(currentChat[0]);
    }
    else{
        currentChat = {
            chatName :"sender",
            isGroupChat:false,
            users:[req.user._id,userId]
        }
        
        try {
            const createdChat = await CHATS.create(currentChat);
            const fullChat = await CHATS.findOne({_id : createdChat._id})
            .populate("users","-populate");

            return res.status(200).json(fullChat);
        } catch (error) {
            res.status(400).json({msg:"some thing was there an error"});
        }
    }

}


const getAllChats = async (req, res) => {
    try {
        const results = await CHATS.find({ users: { $elemMatch: { $eq: req.user._id } } })
            .populate("users", "-password")
            .populate("latestMessages")
            .populate("groupAdmin", "-password")
            .sort({ updatedAt: -1 });

        const populatedResults = await User.populate(results, {
            path: "latestMessages.sender",
            select: "name pic email"
        });

        res.status(200).json(populatedResults);
    } catch (error) { 
        console.error(error);
        res.status(400).send("There was an error retrieving chats.");
    }
}

const createGroupChat = async(req,res) =>{
    if(!req.body.users || !req.body.chatName){
        res.status(400).json({msg:"please fill the provien"})
    }


    if(req.body.users.length <=2 ){
        return res.status(400).json({msg:"the users must be greater than 2"});
    }
    try {
        const createdChat = await CHATS.create({
            chatName: req.body.chatName,
            isGroupChat: true,
            users: req.body.users,
            groupAdmin: req.user
        });
    
        const fullChat = await CHATS.findOne({ _id: createdChat._id })
            .populate("users", "-password")
            .populate("groupAdmin", "-password")
            .lean(); 
    
        return res.status(200).json(fullChat);
    } catch (error) {
        console.log(error);
        return res.status(400).json({ msg: "Something went wrong while creating the group chat" });
    }
    
}

const renameGroupChat = async(req,res) =>{
    const {groupId,chatName} = req.body;

    const updatedChat = await CHATS.findByIdAndUpdate(groupId,{chatName},{new:true})
    .populate("users","-password")
    .populate("groupAdmin","-password")

    if(!updatedChat){
        return res.status(400).send("the gropu is not found");
    }

    return res.status(200).json({updatedChat});
}

const addToGroup = async(req,res) =>{
    const {groupId,userId} = req.body;

    const updatedChat = await CHATS.findByIdAndUpdate(groupId,{
        $push : {users:userId}
    },{new:true})
    .populate("users","-password")
    .populate("groupAdmin","-password")

    if(!updatedChat){
        return res.status(400).send({msg:"the group chat is not exist"});
    }
    return res.status(200).json({updatedChat});
}

const removeToGroup = async(req,res) =>{
    const {groupId,userId} = req.body;

    console.log(groupId,userId);
    
    const removedUser= await CHATS.findByIdAndUpdate(groupId,{$pull:{users:userId}},{new:true})
    .populate("users","-password")
    .populate("groupAdmin","-password")

    if(!removedUser){
        return res.status(400).json({msg:"the requeted user to remove wasn't exist here"});
    }

    return res.status(200).json({removedUser});
}
module.exports = {accessChats,getAllChats,createGroupChat,renameGroupChat,addToGroup,removeToGroup}