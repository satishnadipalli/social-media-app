
require("express-async-errors");
const express = require("express");
const { authunticationToken } = require("../MiddlleWares/AuthuncationToken");
const { accessChats, getAllChats, createGroupChat, renameGroupChat, removeToGroup, addToGroup } = require("../Controllers/ChattingControllers/ChattingControllers");
const ChattingRoutes = express.Router();

ChattingRoutes.post("/api/access-chat",authunticationToken,accessChats);
ChattingRoutes.get("/api/getall-chats",authunticationToken,getAllChats);
ChattingRoutes.post("/api/create-group-chat",authunticationToken,createGroupChat);
ChattingRoutes.put("/api/rename-group-chat",authunticationToken,renameGroupChat);
ChattingRoutes.put("/api/addto-group-chat",authunticationToken,addToGroup);
ChattingRoutes.put("/api/removefrom-group-chat",authunticationToken,removeToGroup);

module.exports = ChattingRoutes;