const express = require('express')
const jwt = require('jsonwebtoken')
const router = express.Router()
const User = require('../models/user')
const Event = require('../models/event')
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

function verifyToken(req, res, next){
   if (!req.headers.authorization) {
      return res.status(401).send("Unauthorized request")
   }
   let token = req.headers.authorization.split(' ')[1]
   if (token === 'null') {
      return res.status(401).send("Unauthorized request")
   }
   let payload = jwt.verify(token, 'secretKey')
   if (!payload) {
      return res.status(401).send("Unauthorized request")
   }
   req.userId = payload.subject
   next()
}

router.get('/', (req, res) => {
   res.send('From API Route')
})

router.post('/register', (req, res) =>{
   let userData = req.body
   let user = new User(userData)

   user.findOne({email: userData.email}, (error, user) =>{
      if (error){
         console.log(error)
      } else {
         if (user){
            res.status(409).send("email existed");
            return;
         }
         else{
            /** Do Nothing */
         }
      }
   });

   user.save((error, registeredUser) => {
      if (error){
         console.log(error)
      } else {
         let payload = { subject: registeredUser._id }
         let token = jwt.sign(payload, 'secretKey')
         res.status(200).send({token})
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
            let payload = { subject: user._id }
            let token = jwt.sign(payload, 'secretKey')
            let sendData = {
               "token": token,
               "email": user.email,
               "role": user.role
            }
            res.status(200).send(sendData)
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

router.get('/dashboard', verifyToken, (req, res) =>{
   let data = [
      {
         "id":"abc"
      }
   ]
   res.json(data)
})

router.post('/reload', verifyToken, (req, res) =>{
   let userData = req.body
   User.findOne({email: userData.email}, (error, user) =>{
      let data ={
         "role": user.role
      }
      res.json(data)
   })
})

/** Create Event */
router.post('/create-event', verifyToken, (req, res) =>{
   let eventData = req.body
   let event = new Event(eventData)

   event.save((error, savedEvent) =>{
      if (error){
         console.log(error);
         res.status(204).send("Some Error");
      } else {
         res.status(201).send(savedEvent);
      }
   });
});

module.exports = router