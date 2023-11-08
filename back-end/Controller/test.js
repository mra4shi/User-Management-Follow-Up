const registeruser = async (req, res) => {
  try {
    const { name, graduation, email, mobile, age, gender } = req.body;
    const sqlInsert = `INSERT INTO userdata (name, graduation, email, mobile, age, gender) VALUES ($1, $2, $3, $4, $5, $6)`;

    db.query(
      sqlInsert,
      [name, graduation, email, mobile, age, gender],
      (error, result) => {
        if (error) {
          console.log({ message: "error", error, success: false });
          res.status(500).send({ message: "SQL Error", error, success: false });
        } else {
          // SQL query was successful, insert into MongoDB
          const NotificationData = new Notification({
            username: name,
            email: email,
          });

          NotificationData.save()
            .then(() => {
              console.log("Notification data added successfully.");
            })
            .catch((mongoError) => {
              console.error("Error adding data to MongoDB:", mongoError);
            });

          res
            .status(200)
            .send({ message: "Register Successful", result, success: true });
        }
      }
    );
  } catch (error) {
    res
      .status(500)
      .send({ message: "Error in Backend", error, success: false });
  }
};
