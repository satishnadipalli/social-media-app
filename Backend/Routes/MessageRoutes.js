const express = require("express");
const { authunticationToken } = require("../MiddlleWares/AuthuncationToken");
const { sendMessages, fetchAllMessages } = require("../Controllers/MessageControllers/MessageControllers");


const MessagingRouter = express.Router();

MessagingRouter.post("/sendMessage",authunticationToken,sendMessages);
MessagingRouter.get("/getMessages/:chatId",authunticationToken,fetchAllMessages);

module.exports = MessagingRouter