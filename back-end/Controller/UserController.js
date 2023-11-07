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
        
    
    const { name,graduation,email,mobile,age,gender } = req.body;
    const sqlInsert = `INSERT INTO userdata (name,graduation,email,mobile,age,gender) VALUES ($1 , $2 , $3 , $4 , $5 , $6 )`;
        
    db.query(sqlInsert,[name,graduation,email,mobile,age,gender ] , (error , result ) => {
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

