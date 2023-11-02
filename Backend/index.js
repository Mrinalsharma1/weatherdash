const connectDb = require('./db')
const express = require('express')
var cors = require('cors')
const app = express()
app.use(express.json())
app.use(cors())
connectDb()

const dotenv = require('dotenv'); 
dotenv.config();


app.use('/user', require('./routes/users'))
app.use('/weather', require('./routes/checkweather'))


app.listen(process.env.PORT, () => {
    console.log(`running app on ${process.env.PORT}`)
})