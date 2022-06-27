const express = require("express")
const app = express()
const mongoose = require("mongoose")
const dotenv = require("dotenv")
const routesUrls = require("./routes/routes")
const cors =  require("cors")
const path = require('path');
const buildPath = path.join(__dirname, '..', 'build');
app.use(express.static(buildPath)); 
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, './.env') });
dotenv.config()

mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
 }).then(()=> {
     console.log("Database connected")
 }) 

//activate body parser
app.use(express.json())

app.use(cors())
app.use("/", routesUrls)
app.listen(process.env.PORT || 5000, () => 
console.log("The server is running"))