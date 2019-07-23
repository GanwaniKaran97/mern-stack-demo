const express = require('express');
const cors = require('cors');
const moongoose = require('mongoose')
const excersiceRouter = require('./routes/excersice')
const userRouter = require('./routes/users')

require('dotenv').config();
const app = express();
const port = process.env.PORT || 8000;

//middlewares
app.use(cors())
app.use(express.json())

const uri = process.env.ATLAS_URI
moongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true });
const connection = moongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database eastablished succesfully !!")
})

app.use('/excersice',excersiceRouter);
app.use('/users',userRouter);

app.listen(port, ()=> {
    console.log("server is running on port ",port)
})