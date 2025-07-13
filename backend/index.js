const express = require('express')

const cors = require('cors')

require('dotenv').config

const saidasRoutes = require('./routes/saidas')

const app = express()
app.use(cors())
app.use(express.json())

app.use('/saidas', saidasRoutes)
app.listen(3001, ()=>{
    console.log('servidor rodando na porta http://localhost:3001/')
})