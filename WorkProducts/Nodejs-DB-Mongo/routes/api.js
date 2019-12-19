const express = require('express')
const router = express.Router()
const User = require('../models/user')
const mongoose = require('mongoose')
const db = "mongodb://myAdmin:myAdmin@localhost:6969/school-management-system"

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
         res.status(200).send(registeredUser)
      }
   })
})

module.exports = router