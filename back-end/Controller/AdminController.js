const jwt = require("jsonwebtoken");
const { Client } = require("pg");
const Notification = require("../Models/NotificationModel");
const Followup = require("../Models/FollowupModel");
const FollowUp = require("../Models/FollowupModel");

const db = new Client({
  host: "localhost",
  port: 5432,
  user: "postgres",
  password: "12345",
  database: "follow-up system",
});

db.connect();

const adminEmail = "admin@gmail.com";
const adminPassword = "123";
const adminSecret = "adminToken";

const registeruser = async (req, res) => {
  try {
    const { name, graduation, email, mobile, age, gender } = req.body;
    const sqlInsert = `INSERT INTO userdata (name,graduation,email,mobile,age,gender) VALUES ($1 , $2 , $3 , $4 , $5 , $6 )`;

    db.query(
      sqlInsert,
      [name, graduation, email, mobile, age, gender],
      (error, result) => {
        if (error) {
          res.status(500).send({
            message: "email or mobile already registered",
            error,
            success: false,
          });
        } else {
          res
            .status(200)
            .send({ message: "Register Successfull", result, success: true });
        }
      }
    );
  } catch (error) {
    res
      .status(500)
      .send({ message: "Error in Backend ", error, success: false });
  }
};

const adminLogin = (req, res) => {
  if (req.body.email === adminEmail && req.body.password === adminPassword) {
    const admin_Secret = jwt.sign({ id: "thisIsAdmin" }, adminSecret, {
      expiresIn: "1d",
    });
    res.status(200).send({
      message: "Admin logged in successfully",
      success: true,
      admin_Secret,
    });
  } else {
    res
      .status(500)
      .send({ message: "Username or password is incorrect", success: false });
  }
};

const GetUserData = async (req, res) => {
  try {
    const sqlGet = "SELECT * FROM userdata";
    db.query(sqlGet, (err, result) => {
      if (err) {
        console.log("error", err);
      }
      res.status(200).json({ result, success: true });
    });
  } catch (error) {
    res.status(500).send({ message: " Error in Backend ", error });
  }
};

const GetSingleuser = async (req, res) => {
  try {
    const id = req.params.id;

    const sqlGet = `SELECT * FROM userdata WHERE id = $1`;

    const result = await db.query(sqlGet, [id]);

    if (result) {
      res.send(result);
    } else {
      console.log(err);
      res.status(500).send("Error in Backend");
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("Error in Backend");
  }
};

const CreateFollowup = async (req, res) => {
  try {
    const id = req.params.id;

    const {   followup, status, date } = req.body;
    console.log(req.body)

    const newfollowup = new Followup({
      userid: id,
   
      followup: followup,
      status: status,
      date: date,
    });

    await newfollowup.save();

    

    const newNotification = new Notification({
  
      date: date,
      userid: id,
    });

    await newNotification.save();

    console.log(newNotification);

    res.status(200).json({
      message: "FollowUp Added Successfull",
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

const GetFollowUp = async (req, res) => {
  try {
    const id = req.params.id;

    const followups = await FollowUp.find({ userid: id });
 

    res.status(200).send({
      message: "Fetched followups",
      success: true,
      followups,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send("Error in Backend");
  }
};

const GetNotification = async (req, res) => {
  try {
    const today = new Date().toISOString().split("T")[0];

    const notification = await Notification.find({
      read: "Unread",
      date: today,
    });

    res
      .status(200)
      .send({ message: "Notification fetched", notification, success: true });
  } catch (error) {
    console.log(error);
    res
      .status(200)
      .send({ message: "Error fetching Notification ", success: false });
  }
};

const UpdateNotification = async (req, res) => {
  try {
    const notificationId = req.params.id;

    await Notification.findById({
      _id: notificationId,
    });

    await Notification.updateOne(
      { _id: notificationId },
      {
        $set: {
          read: "Readed",
        },
      }
    );

    res
      .status(200)
      .json({ message: "Notification update suceessfull ", success: true });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Notification update Failed ", success: false });
    console.log(error);
  }
};

const GetUserwithFollowup = async (req, res) => {
  try {
    const query = `
    SELECT * 
    FROM userdata 
    `;
    const result = await db.query(query);

    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching users with follow-ups:", error);
    res.status(500).json({
      message: "Error fetching users with follow-ups",
      success: false,
    });
  }
};

const GetDataDashboard = async (req, res) => {
  try {
    const GetAllUser = "SELECT * FROM userdata";
    const totalusers = await db.query(GetAllUser);

    res.status(200).send({
      message: " Data Fetched ",
      totalusers,
      success: true,
    });
  } catch (error) {
    res.status(500).send({ message: " Error in Backend ", error });
  }
};

const GetFollowUps = async (req, res) => {
  try {
    const id = req.params.id;

 

    const followups = await FollowUp.find({ userid: id });

    res.status(200).send({
      message: "Fecthed Followups",
      success: true,
      followups,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Error In Fetching Followups",
      success: false,
    });
  }
};
 
const UserSearch = async (req, res) => {
  try {
    const { searchTerm } = req.body;

    const result = await db.query("SELECT * FROM userdata WHERE name LIKE $1", [
      `%${searchTerm}%`,
    ]);

    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const EditUser = async (req, res) => {
  try {

    const id = req.params.id;
    const {  name, graduation, age, gender, email, mobile } = req.body;

    const userId = parseInt(id);
    const ages = parseInt(age)

    const updateQuery = `
      UPDATE userdata
      SET name = $1, graduation = $2,age = $3, gender = $4,email = $5,mobile = $6 WHERE id = $7
    `;
 
    const values = [name, graduation, ages, gender, email, mobile, userId];
  

    await db.query(updateQuery, values);

    res.status(200).json({ message: "User updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating user" });
  }
};


const CurrentFollowups = async (req ,res) => {
  try {
    
    const currentDate = new Date();
    const formattedDate = currentDate.toISOString().substring(0, 10);
   
    const FollowUps = await FollowUp.find({ date : formattedDate})
    console.log(FollowUps)
    
    res.status(200).send({ message : "Today FollowUp Fetched" , FollowUps , success : true})

  } catch (error) {
    console.log(error)

    res.status(500).send({
      message : "error in backend",
      success : false
    })
  }
}

module.exports = {
  adminLogin,
  GetUserData,
  GetSingleuser,
  CreateFollowup,
  GetFollowUp,
  GetNotification,
  GetUserwithFollowup,
  GetDataDashboard,
  UpdateNotification,
  registeruser,
  GetFollowUps,
  UserSearch,
  EditUser,
  CurrentFollowups
};
