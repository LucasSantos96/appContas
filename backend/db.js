const mysql = require('mysql2')

const connection =  mysql.createConnection({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
})


connection.connect((err) => {
    if(err) {
        console.error("Erro na conexão com o banco:", err)
        return
    }
    console.log("conectado ao MySQL!")
})


module.exports = connection