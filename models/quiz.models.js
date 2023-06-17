const mongoose = require("mongoose")


const subshema = mongoose.Schema({
    title:String,
    answerOptions:[String],
    correctOption:Number,
})

quizShema = mongoose.Schema({
    title:String,
    creater:String,
    description:String,
     questions:[subshema],
})

let quizModel = mongoose.model("post",quizShema)

module.exports = {quizModel}