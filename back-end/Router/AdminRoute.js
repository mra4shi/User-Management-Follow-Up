const express = require("express")
const router = express.Router()
const Controller = require("../Controller/AdminController")
const auth = require("../Middlewares/Adminauth")

router.post('/login',Controller.adminLogin)

router.get('/userlist' ,auth,Controller.GetUserData)

router.get('/user/:id', auth , Controller.GetSingleuser)


module.exports = router