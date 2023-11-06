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
   
    // Get the user ID from the request parameters.
    const id = req.params.id;

    // Prepare the SQL query.
    const sqlGet = `SELECT * FROM userdata WHERE id = $1`;

    // Execute the query using a parameterized query.
    const result = await db.query(sqlGet, [id]);

    // If the query was successful, send the results to the client.
    if (result) {
      res.send(result);
    } else {
      // If the query failed, log the error and send a generic error message to the client.
      console.log(err);
      res.status(500).send("Error in Backend");
    }
  } catch (error) {
    // Log the error and send a generic error message to the client.
    console.log(error);
    res.status(500).send("Error in Backend");
  }
};



module.exports = {
  adminLogin,
  GetUserData,
  GetSingleuser,
};
