const express = require("express")
const router = express.Router()
const signupCopy = require("../models/signup")
const newPost = require("../models/AddPost")
const bcrypt = require("bcrypt")
const User =  require("../models/signup")
const contact = require("../models/message")
// const getPostData = require("../models/GetPost")
const nodemailer = require("nodemailer")
router.post("/signup", async (request, response) => {

    const saltPassword = await bcrypt.genSalt(10)
    const securePassword = await bcrypt.hash(request.body.password, saltPassword)

    const signedUpUser = new signupCopy({
        fullName:request.body.fullName,
        userName:request.body.userName,
        email:request.body.email,
        password:securePassword
    })
    signedUpUser.save()
    .then(data => {
        response.json(data)
    })
    .catch(error => {
        response.json(error)
    })
})
router.post("/login", (req, res)=> {
    const { email, password} = req.body
    User.findOne({ email: email}, (err, user) => {
        if(user){
            if(password === user.password ) {
                res.send({message: "Login Successfull", user: user})
            } else {
                res.send({ message: "Password didn't match"})
            }
        } else {
            res.send({message: "User not registered"})
        }
    })
}) 
//  router.route("/addpost")
 router.post("/addpost", function (request, response) {
    const addedPost = new newPost({
        category:request.body.category,
        title:request.body.title,
        description:request.body.description,
        image:request.body.image
    })
    addedPost.save()
    .then(data => {
        response.json(data)
    })
    .catch(error => {
        response.json(error)
    })
 })

 router.get("/addpost", function (req, res) {
    newPost.find(function(error, posts){
        if(error){
            res.send(error)
        }else{
            res.json(posts)
        }
    })
 })
//  send email
router.post("/contact", function (req, res) {
    const newMessage = new contact({
        lname: req.body.lname,
        fname: req.body.fname,
        email: req.body.email,
        text: req.body.text
    })
    newMessage.save()
    .then(data => {
        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
             user:process.env.EMAIL,
             pass:process.env.PASSWORD
            }
          })
          var message = {
            from: process.env.EMAIL,
            to: email,
            subject: "NodeMailer",
            text: text
          }
          transporter.sendMail(message,  (err, info) =>{
            if(err){
                console.log("error in sending the message", err);
                return res.status(400).json({
                    message: `error in sending the message`
                })
            }else{
                console.log("The email was sent successfully", info)
                return res.json({
                    message: info
                })
            }
          })
          return res.json(data)
    })
    .catch(error => {
        res.json(error)
    })
})
module.exports = router;