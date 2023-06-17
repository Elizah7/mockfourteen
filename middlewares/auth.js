const jwt = require("jsonwebtoken")

const auth = ((req,res,next)=>{

     const token = req.headers.authorization
     console.log("auth",token)
     if(token){
        jwt.verify(token, 'masai', (err, decoded)=> {
            if(err){
                res.status(400).send({msg:"login first"})
            }
            else{
                console.log(decoded)
                req.body.userId = decoded.userId
                next()
            }
         
          });
     }
     else{
        res.status(404).send({mse:"Login first"})
     }
})

module.exports = {auth}