

const mongoose = require("mongoose")



userShema = mongoose.Schema({
    name:String,
    email:String,
    password:String
})

let userModel = mongoose.model("user",userShema)

module.exports = {userModel}