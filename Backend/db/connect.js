const mongoose = require("mongoose");
require("dotenv").config();


const CONNECT_DB = () =>{
    // console.log("connecting function");
    return mongoose.connect(process.env.MONGO_URL);
}

module.exports = CONNECT_DB;