const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");

const AdminRoute = require("./Router/AdminRoute")
const mongoose =require('mongoose')
const socketio = require('socket.io')
const http = require('http')
const { Server } = require('socket.io');
const adminController = require('../back-end/Controller/AdminController')



app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));


const mongoURL = "mongodb://localhost:27017/Notification";

 mongoose.connect(mongoURL,{
    useNewUrlParser: true,
    useUnifiedTopology :true
 }).then(()=>{
    console.log("mongodb Connected")
 }).catch(()=>{
    console.log(error)
 })

app.use(express.static('public'))



app.use('/api/admin',AdminRoute)


app.get("/",(req,res) => {
    res.send("Hello Welcome To The Server")
}) 


const server = http.createServer(app)

const io = new Server(server,{
   cors :{
      origin: "http://localhost:3000",
   },
})

io.on("conect",(socket)=>{

   console.log(`user just connected`);
   io.on('disconnect', () => {
    console.log('A user disconnected');
  });

  io.on("notification",async (data) => {
   io .emit("Notification recieved",data)

      const {status  , timestamp } = data;

      await adminController.NotificationHistory(status  , timestamp)
   })
})


app.listen(5000 , ()=> {
    console.log("Server Started on PORT 5000")
})