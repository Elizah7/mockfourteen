
const express = require("express")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const {userModel} = require("../models/user.models")
const { auth } = require("../middlewares/auth")

const userRoutes = express.Router()

userRoutes.post("/register",async(req,res)=>{
    
    const {email,password,name} = req.body
    console.log(req.body)
    try {
        const singleuser = await userModel.find({email})
        console.log(singleuser)
        if(singleuser.length>0){
            res.status(200).send({msg:"user already exists try login"})
        }
        else{
            bcrypt.hash(password,5,async(err,hashed)=>{
                if(err){
                    res.status(404).send(err)
                }
                else{
                    const newuser = new userModel({name,email,password:hashed})
                    await newuser.save()
                    res.send({msg:"account created succesfully",data:newuser})
                }
          
            })
        }
    } catch (error) {
        res.status(404).send({msg:error.message})
    }
})

userRoutes.post("/login",async(req,res)=>{
    const {email,password} = req.body;
 
    try {
        const singleuser = await userModel.find({email})
        if(singleuser.length>0){
            bcrypt.compare(password, singleuser[0].password, (err, result)=> {
               if(result){
                jwt.sign({ userId: singleuser[0]._id }, "masai",(err, token)=> {
                     if(token){
                        res.status(200).send({msg:"login succesfully",token:token})
                     }
                     else{
                        res.status(404).send({msg:err,e:"error from jwt"})
                     }
                  });
               }
               else{
                res.status(404).send({msg:err,e:"error from bcr"})
               }
            });
        }

    } catch (error) {
        res.status(404).send({msg:error.message})
    }
})
userRoutes.get("/",auth,async(req,res)=>{
   const userid = req.body.userId
    try {
        const singleuser = await userModel.findById(userid)
        console.log(singleuser)
        if(singleuser){
            res.status(200).send({msg:"succesfull" ,data:singleuser})
        }
        else{
           res.status(200).send({msg:"error"})
        }
    } catch (error) {
        res.status(404).send({msg:error.message})
    }
})


module.exports = userRoutes
