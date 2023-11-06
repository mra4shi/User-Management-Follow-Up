    const { Client } = require('pg')

const db = new Client({
    host : "localhost",
    port: 5432,
    user : "postgres",
    password: "12345",
    database: "follow-up system"

}) 

db.connect()



const GetData = async (req, res) => {
    try {
        
    const sqlGet = "SELECT * FROM userdata";
    db.query(sqlGet , ( err, result ) => {
     if (err) {
        console.log("error" , err) 
     }
        res.send(result)
    })

    } catch (error) {
        res.status(500).send(" Error in Backend " ,error)
    }
}


const registeruser = async (req, res) => {
    try {
    const { name,graduation,email,mobile,age,gender } = req.body;
    const image = req.file.filename
    const sqlInsert = "INSERT INTO userdata (name,graduation,email,mobile,age,gender,image) VALUES (? , ? , ? , ? , ? , ? , ?)";
    db.query(sqlInsert,[name,graduation,email,mobile,age,gender,image ] , (error , result ) => {
        if (error) {
            console.log("error" , error)
        }
      res.send(result)
    })

    } catch (error) {
         res.status(500).send(" Error in Backend " ,error)
    }
}




module.exports = {
GetData,
registeruser
}

