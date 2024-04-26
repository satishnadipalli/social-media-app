const { Timestamp } = require("mongodb");
const mongoose = require("mongoose");


const messageModel = mongoose.Schema({
    sender:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    content :{
        type: String,
        trim : true
    },
    chat : {
        type:mongoose.Schema.Types.ObjectId,
        ref:"CHATS"
    }
},{ timestamps: true });


module.exports = mongoose.model("Message",messageModel);