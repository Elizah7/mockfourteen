
const express = require("express")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const {userModel} = require("../models/user.models")
const { auth } = require("../middlewares/auth")

const userRoutes = express.Router()

userRoutes.post("/register",async(req,res)=>{
    
    const {email,password,name,avatar} = req.body

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
                    const newuser = new userModel({name,email,password:hashed,avatar})
                    await newuser.save()
                    const userdata = await userModel.find({email})
                    res.send({msg:"account created succesfully",data:userdata})
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
                        res.status(200).send({msg:"login succesfully",token:token,singledata:singleuser})
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
        else{
            res.send({msg:"wrong credentials"})
        }

    } catch (error) {
        res.status(404).send({msg:error.message})
    }
})

userRoutes.get("/",auth,async(req,res)=>{
    const id = req.body.userId
    console.log(id)
    try {
        const singleuser = await userModel.findById(id)
        console.log(singleuser)
        if(singleuser){
            res.send({msg:"succesfull",data:singleuser})
        }
        else{
            res.send({msg:"please login again"})
        }
    } catch (error) {
        res.status(404).send({msg:error.message})
    }
})


module.exports = userRoutes
