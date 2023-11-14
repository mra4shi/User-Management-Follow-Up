const express = require("express");
const router = express.Router();
const Controller = require("../Controller/AdminController");
const auth = require("../Middlewares/Adminauth");

const multer = require("multer");
const path = require("path");
const storage = multer.diskStorage({
  destination: (req, res, cb) => {
    cb(null, "public/uploads");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "_" + Date.now() + path.extname(file.originalname)
    );
  },
});
const uploads = multer({
  storage: storage,
});

router.post("/login", Controller.adminLogin);

router.post('/register',uploads.single("data"), Controller.registeruser)

router.get("/userlist", auth, Controller.GetUserData);

router.get("/user/:id", auth, Controller.GetSingleuser);

router.post("/follow-up/:id", uploads.single("data"), Controller.CreateFollowup);

router.get("/followup-status/:id", auth, Controller.GetFollowUp);

router.get("/notification", auth, Controller.GetNotification);

router.get("/getuserwithfollowup", auth, Controller.GetUserwithFollowup);

router.get("/dashboard", auth, Controller.GetDataDashboard);

router.put("/updatenotification/:id", auth, Controller.UpdateNotification);


router.get('/fetchfollowup/:id',auth,Controller.GetFollowUps)

router.post('/search' ,uploads.single("data"),Controller.UserSearch )



router.get("/");

module.exports = router;
