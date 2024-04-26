const express = require("express");
require("express-async-errors");
const User = require("../../Models/UserSchema");
const jwt = require("jsonwebtoken");
// const { options } = require("../../Routes/UserRoutes");


const signup = async(req,res) =>{

    const {username,email,password,pic} = req.body;

    if(!username || !email || !password){
        return res.status(400).json({msg:"please provide valid credentials"});
    }

    const userExist = await User.findOne({email});

    if(userExist){
        return res.status(409).json({msg:"user already exist"});
    }

    const createdUser = await User.create({username,password,email,pic});
    const token = jwt.sign({email,username},process.env.JWT_SECRET,{expiresIn:"30d"});

    return res.status(201).json({_id:createdUser._id,username:createdUser.username,email:createdUser.email,password:createdUser.password,pic:createdUser.pic,token});
}

const login = async(req,res) =>{
    const {email,password} = req.body;

    const isUserExist = await User.findOne({email});

    if(!isUserExist){
        return res.status(400).json({msg:"Invalid user credentials"});
    }

    if(password != isUserExist.password){
        return res.status(400).json({msg:"the password missmatched"});
    }

    const token = jwt.sign({email},process.env.JWT_SECRET,{expiresIn:"30d"});

    return res.status(200).json({_id:isUserExist._id,username:isUserExist.username,email:isUserExist.email,password:isUserExist.password,pic:isUserExist.pic,token});
    
}

const getAllUsers = async(req,res) =>{
    console.log(req.query.searchData);
    const searchKey = req.query.searchData ? {
        $or : [
            {username : {$regex : req.query.searchData, $options:"i"}},
            {email    : {$regex : req.query.searchData, $options:"i"}}
        ]
    }:{}

    const Users = await User.find(searchKey).find({_id:{$ne:req.user._id}});

    return res.status(200).json({Users});
}

module.exports = {signup,login,getAllUsers};

// Kannathalli --->661b823206683b4e8a1573af
// satish ---->661aa9f6dd6230ea072345d1
// satishna----->661a6a1feb527cfacca68da3