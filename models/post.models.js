const mongoose = require("mongoose")



postShema = mongoose.Schema({
    emi:Number,
    interest :Number,
    total:Number,
    userId:String
})

let postModel = mongoose.model("post",postShema)

module.exports = {postModel}