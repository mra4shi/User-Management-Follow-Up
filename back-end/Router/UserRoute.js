const express = require('express');
const Controller = require('../Controller/UserController')
const router = express.Router();


// MULTER SETUP
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



router.post('/register',uploads.single("data"), Controller.registeruser)

module.exports = router;