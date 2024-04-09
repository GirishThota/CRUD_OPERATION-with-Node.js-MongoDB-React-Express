const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const app = express()
app.use(cors())
app.use(express.json())

const PORT = process.env.PORT || 8080

//schema
const schemaData = mongoose.Schema({
    name : String,
    email : String,
    mobile : Number,
},{
    timeStamps : true
})

//Model
const userModel = mongoose.model("user",schemaData)

//Read
app.get("/",async(req,res)=>{
    const data = await userModel.find({})
    res.json({success : true, data : data})
})

//Create data || save data in mongodb
app.post('/create',async(req,res)=>{
    console.log(req.body)
    const data = new userModel(req.body)
    await data.save()
    res.send({success : true, message : "data save successfully", data : data})
})

//update data
app.put("/update",async(req,res)=>{
    console.log(req.body)
    const { id,...rest} = req.body
    console.log(rest)
    const data = await userModel.updateOne({_id : id},rest)
    res.send({success : true, message : "data update successfully", data : data})
})

//delete api
app.delete("/delete/:id",async(req,res)=>{
    const id = req.params.id
    console.log(id)
    const data = await userModel.deleteOne({_id : id})
    res.send({success : true, message : "data update successfully", data : data})
})

mongoose.connect("mongodb+srv://girishthota2004:V4IaekI4fZGm0nJK@cluster0.yogxeuj.mongodb.net/")
.then(()=>{
    console.log("connect to DB")
})
.catch((err)=>console.log(err))

app.listen(PORT,()=>console.log("Server is running"))





