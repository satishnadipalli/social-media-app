require("express-async-errors");
const jwt = require("jsonwebtoken");
const User = require("../Models/UserSchema")
require("dotenv").config();

const authunticationToken = async(req,res,next)=>{

    const authHeader = req.header("Authorization");

    if(!authHeader){
        return res.status(400).json({msg:"the authuntication token was not found"});
    }

    const token = authHeader.split(" ")[1];
    
    if(!token){
        return res.status(400).json({msg:"the Bearer doesnot exist"});
    }

    const decode = jwt.verify(token,process.env.JWT_SECRET);

    const currentUser = await User.findOne({email:decode.email});

    req.user = currentUser;

    next();

}

module.exports = {authunticationToken};