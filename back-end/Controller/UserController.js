    const { Client } = require('pg')

const db = new Client({
    host : "localhost",
    port: 5432,
    user : "postgres",
    password: "12345",
    database: "follow-up system"

}) 

db.connect()




const registeruser = async (req, res) => {
    try {
        console.log(req.file.filename)
        const image = req.file.filename
    const { name,graduation,email,mobile,age,gender } = req.body;
    const sqlInsert = "INSERT INTO userdata (name,graduation,email,mobile,age,gender,image) VALUES (? , ? , ? , ? , ? , ? , ?)";
    console.log(sqlInsert)
    db.query(sqlInsert,[name,graduation,email,mobile,age,gender,image ] , (error , result ) => {
        if (error) {
            console.log("error" , error)
        }
      res.status(200).send(result)
    })

    } catch (error) {
         res.status(500).send(" Error in Backend " ,error)
    }
}




module.exports = {

registeruser
}

