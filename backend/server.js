//Modulos
const express = require('express')
const connectDB = require('./config/db')

const app = express()

//Rutas
const user = require('./routes/user')
const auth = require('./routes/auth')

require('dotenv').config()

app.use(express.json())
app.use('/api/user/', user)
app.use('/api/auth/', auth)

app.use(express.static('client/build'))

connectDB()

const port = process.env.PORT || 3000
app.listen(port, () => console.log('Escuchando Puerto: ' + port))
