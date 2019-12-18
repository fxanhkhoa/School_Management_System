const express = require('express')
const router = express.Router()
const User = require('../models/user')
const mongoose = require('mongoose')
const db = "mongodb://localhost:27017/school-management-system"

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

module.exports = router