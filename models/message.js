const mongoose = require("mongoose")

const message = new mongoose.Schema({
    fname:{
        type:String,
        required:true,
    },
    lname: {
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    text:{
        type:String,
        required:true
    }
})
module.exports = mongoose.model("messages", message);