
const express = require("express")
const { quizModel } = require("../models/quiz.models")


const quizRouter = express.Router()

quizRouter.get("/",async(req,res)=>{
   
   try { 
      const totaldata = await quizModel.find()
      res.status(200).send({msg:"totaldata" , data:totaldata})
   } catch (error) {
      res.send({msg:error})
   }
  
})

quizRouter.get("/page",async(req,res)=>{
   let perPage = 1
  let page = Math.max(0, req.params.page)
  try { 
     const totaldata = await quizModel.find().limit(perPage).skip(perPage * page)
     res.status(200).send({msg:"totaldata" , data:totaldata})
  } catch (error) {
     res.send({msg:error})
  }
 
})


quizRouter.post("/add",async(req,res)=>{
     console.log(req.body)
  try {
       const newdata = new quizModel(req.body)
        await newdata.save()
        res.status(200).send({msg:"data added succesfully",data:newdata})
  } catch (error) {
     res.send({msg:error})
  }

})

quizRouter.patch("/add/:id",async(req,res)=>{
  const id = req.params.id
     
  try {
       const newdata = await quizModel.findByIdAndUpdate(id,req.body)
        res.status(200).send({msg:"data updated succesfully"})
  } catch (error) {
     res.send({msg:error})
  }

})
quizRouter.delete("/add/:id",async(req,res)=>{
  const id = req.params.id
     
  try {
       const newdata = await quizModel.findByIdAndDelete(id)
        res.status(200).send({msg:"data deleted succesfully"})
  } catch (error) {
     res.send({msg:error})
  }

})

module.exports = quizRouter
