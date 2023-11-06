

const adminEmail = "admin@gmail.com";
const adminPassword = "123";


const adminLogin = (req, res) => {
    if (req.body.email === adminEmail && req.body.password === adminPassword) {
      const admin_Secret = jwt.sign({ id: "thisIsAdmin" }, process.env.admin_Secret, {
        expiresIn: "1d",
      });
      res.status(200).send({
        message: "Admin logged in successfully",
        success: true,
        admin_Secret,
      });
    } else {
      res.status(200).send({ message: "Username or password is incorrect", success: false });
    }
  };