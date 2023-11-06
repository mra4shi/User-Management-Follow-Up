const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const UserRoute = require("./Router/UserRoute")
const AdminRoute = require("./Router/AdminRoute")

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
 

app.use(express.static('public'))


app.use('/api/user', UserRoute)
app.use('/api/admin',AdminRoute)


app.get("/",(req,res) => {
    res.send("Hello Welcome To The Server")
}) 


app.listen(5000 , ()=> {
    console.log("Server Started on PORT 5000")
})