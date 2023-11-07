const jwt = require("jsonwebtoken");
const { Client } = require("pg");



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
      .status(200)
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
      res.json(result);
    });
  } catch (error) {
    res.status(500).send(" Error in Backend ", error);
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

    const status = "Accepted";

    const sqlInsert = `INSERT INTO follow_up(user_id,status) VALUES ( $1 , $2)`;

    db.query(sqlInsert, [id, status], (error, result) => {
      if (result) {
        res.send(result);
      } else {
        console.log(error);
      }
    });
  } catch (error) {
    console.log(error);
  }
};

const GetFollowUp = async (req, res) => {
  try {
    const id = req.params.id;

    const sqlGet = `SELECT * FROM follow_up WHERE user_id = $1`;

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

const EditFolloup = async (req, res) => {
  try {
    const id = req.params.id;

    const { status } = req.body;

    const sqlUpdate = `UPDATE follow SET status = $1, WHERE id = $1`;

    const result = await db.query(sqlUpdate, [status,id]);

    if (result) {
      res.send(result);
    } else {
      console.log(error);
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  adminLogin,
  GetUserData,
  GetSingleuser,
  CreateFollowup,
  GetFollowUp,
  EditFolloup,
};
