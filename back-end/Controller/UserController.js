const { Client } = require("pg");
const Notification = require("../Models/NotificationModel");

const db = new Client({
  host: "localhost",
  port: 5432,
  user: "postgres",
  password: "12345",
  database: "follow-up system",
});

db.connect();

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
          const NotificationData = new Notification({
            username: name,
            email: email,
            mobile: mobile,
          });
          console.log(NotificationData);

          NotificationData.save()
            .then(() => {
              console.log("Notification Data Added successfully");
            })
            .catch((mongoError) => {
              console.error("Error Adding In  MongoDb", mongoError);
            });
        }
      }
    );
  } catch (error) {
    res
      .status(500)
      .send({ message: " Error in Backend ", error, success: false });
  }
};

module.exports = {
  registeruser,
};
