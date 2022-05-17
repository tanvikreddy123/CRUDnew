const express = require('express')
const jwt = require('jsonwebtoken')
const cors = require('cors')
const verifyToken = require('./verifyToken')
const { ObjectId } = require('mongodb')

const mongodbClient = require('mongodb').MongoClient
const app = express()
app.use(cors())
const url = "mongodb://localhost:27017"
let db
mongodbClient.connect(url,(err,client)=>
{
    if(err)
    {
        console.log(err)
    }
    else
    {
         db = client.db('student')
        console.log("Connected to DB")
    }
})
app.use(express.json())
app.get('/students',(req,res)=>
{
    db.collection('stu').find().toArray((err,items)=>
    {
        res.status(200).json(items)
    })
    
})
app.post('/students',(req,res)=>
{
    const newStudent = req.body
    db.collection('stu').insertOne(newStudent)
    res.status(200).json(newStudent)
})
app.patch('/students/:id',(req,res)=>
{

    const {id} = req.params
    const {name,age,address} = req.body
    db.collection('stu').updateOne({_id:ObjectId(id)},{$set:{age:age,name:name,address:address}})
    res.status(200).json(req.body)                      

})
app.delete('/students/:id',(req,res)=>{
    const {id} = req.params
    db.collection('stu').deleteOne({_id:ObjectId(id)})
    res.status(200).json("Deleted Successfully")
})
app.get('/students/:id',(req,res)=>
{
   
    const {id} = req.params
    db.collection('stu').find({_id:id}).toArray((err,item)=>
    {
        res.status(200).json(item)
    })
})
app.post('/login',(req,res)=>
{
    const {username} = req.body
    const {password} = req.body
    db.collection('users').insertOne({username:username,password:password})
    const token = jwt.sign({username},"test1234")
    res.json({
        token,
        username,
        password
    })
})
app.get('/getdata',verifyToken,(req,res)=>
{
    db.collection('stu').find().toArray((err,item)=>
    {
        if(err)
        {
           return res.json(err)
        }
        else
        {
            return res.json(item)
        }
    })
})
app.listen(5000,()=>
{
    console.log("Server Listening to port 5000")
})