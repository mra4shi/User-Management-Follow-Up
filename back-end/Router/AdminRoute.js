const express = require("express")
const router = express.Router()
const Controller = require("../Controller/AdminController")
const auth = require("../Middlewares/Adminauth")



const multer = require("multer");
const path = require("path");
const storage = multer.diskStorage({
    destination : (req , res , cb ) => {
        cb(null , 'public/uploads')
    },
    filename : (req , file , cb ) => {
       cb(null , file.fieldname + "_" + Date.now() + path.extname(file.originalname) )
    }
})
const uploads = multer({
    storage : storage
})




router.post('/login',Controller.adminLogin)

router.get('/userlist' ,auth,Controller.GetUserData)

router.get('/user/:id', auth , Controller.GetSingleuser)

router.post('/follow-up/:id', auth, Controller.CreateFollowup)

router.get('/followup-status/:id',auth,uploads.single, Controller.GetFollowUp)

router.put('/followup-edit/:id',auth, Controller.EditFolloup)


module.exports = router