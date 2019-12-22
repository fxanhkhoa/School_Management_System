const express = require('express')
const jwt = require('jwt')
const router = express.Router()
const User = require('../models/user')
const mongoose = require('mongoose')
const db = "mongodb://myAdmin:myAdmin@localhost:27017/school-management-system"

mongoose.connect(db, 
                  { 
                     useNewUrlParser: true,
                     useUnifiedTopology: true
                  }, 
                  err =>{
   if (err){
      console.error('Error!' + err)
   } else {
      console.log('Connected to mongodb')
      // var query = User.find({email:'asdasd', password:'asdasd'})
      // console.log(query)
   }
})

router.get('/', (req, res) => {
   res.send('From API Route')
})

router.post('/register', (req, res) =>{
   let userData = req.body
   let user = new User(userData)

   user.save((error, registeredUser) => {
      if (error){
         console.log(error)
      } else {
         let payload = { subject: registeredUser._id }
         let token = jwt.sign(payload, 'secretKey')
         res.status(200).send(token)
      }
   })
})

router.post('/login', (req, res) =>{
   let userData = req.body

   User.findOne({email: userData.email}, (error, user) =>{
      if (error){
         console.log(error)
      } else {
         if (!user){
            res.status(401).send("Invalid email")
         }
         else if (user.password != userData.password){
            res.status(401).send('Invalid password');
         } else {
            res.status(200).send(user)
         }
      }
   })
})

router.get('/events', (req, res) =>{
   let events = [

   ]
   res.json(events)
})

router.get('/special', (req, res) =>{
   let events = [

   ]
   res.json(events)
})

module.exports = router