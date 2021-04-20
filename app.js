const express = require('express')
var app = new express()
app.use(express.json())
app.use(express.urlencoded({extended:true}))
const mongoose = require('mongoose')
mongoose.connect("mongodb+srv://user1234:user1234@cluster0.7evxp.mongodb.net/details?retryWrites=true&w=majority",{
  useCreateIndex: true,
  useFindAndModify:true,
  useNewUrlParser:true,
  useUnifiedTopology:true
}).then(()=>{
    console.log("DB connected")
})
var studentModel = mongoose.model("student",{
    Rno:Number,
    Name:String,
    place:String
})
var markModel = mongoose.model("mark",{
    sId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'student'
    },
    total:Number,
    grade:String
})
app.post("/register",(req,res)=>{
    var details = new studentModel(req.body)
    details.save((error,data)=>{
        if(error) {
            throw error
        } else {
            res.send(data)
        }
    })
})
app.post("/addMarks",(req,res)=>{
    var details = new markModel(req.body)
    details.save((error,data)=>{
        if(error){
            throw error
        }else {
            res.send(data)
        }
    })
})
app.get("/readData",async(req,res)=>{
    var result = await markModel.findOne({total:98}).populate("sId")
    console.log(result.sId.Name);
    res.send(result)
})
app.listen(3000,(req,res)=>{
    console.log("Server is running on port 3000")
})