const express = require("express")
const cors = require("cors")
const { connection } = require("./config/db")
const userRoutes = require("./routes/user.routes")
const { auth } = require("./middlewares/auth")
const BlogRouter = require("./routes/blog.routes")

require("dotenv").config()
const app = express()

app.use(cors())
app.use(express.json())
app.use("/users",userRoutes)
app.use(auth)
app.use("/post",BlogRouter)

app.listen(process.env.port, async()=>{

    try {
        await connection
        console.log("mongodb")
    } catch (error) {
        console.log(error)
    }
    console.log("server is running")
})