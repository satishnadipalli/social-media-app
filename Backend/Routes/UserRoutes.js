const express = require("express");
const { signup, login, getAllUsers } = require("../Controllers/userControllers/userControllers");
const { authunticationToken } = require("../MiddlleWares/AuthuncationToken");
require("express-async-errors");
const userRoutes = express.Router();

userRoutes.post("/user/signup",signup);
userRoutes.post("/user/login",login);
userRoutes.get("/user/allusers",authunticationToken,getAllUsers);

module.exports = userRoutes;