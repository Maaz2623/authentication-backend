import express from 'express'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'
import cors from 'cors'

import usersRoute from './routes/usersRoute.js'
import productsRoute from './routes/productsRoute.js'

const app = express()

app.use(cors())
app.use(bodyParser.json({limit: "30mb", extended: true}))
app.use(bodyParser.urlencoded({limit: "30mb", extended: true}))

mongoose.connect('mongodb://127.0.0.1:27017/auth')
.then(() => console.log("Connected To MongoDB"))
.catch((err) => console.log(err))

app.use('/users', usersRoute)
app.use('/products', productsRoute)

app.listen(5000, () => console.log('Listening to server on port 5000'))
