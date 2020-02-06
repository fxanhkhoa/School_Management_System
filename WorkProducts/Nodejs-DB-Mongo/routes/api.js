const express = require('express')
const jwt = require('jsonwebtoken')
const router = express.Router()
const User = require('../models/user')
const Event = require('../models/event')
const Course = require('../models/course')
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

router.post('/register-user', (req, res) =>{
   let userData = req.body
   var user = new User(userData)

   // console.log(userData)

   user.events = []
   user.courses = []

   User.findOne({email: userData.email}, (error, foundUser) =>{
      if (error){
         console.log(error)
      } else {
         // TODO: Check if email existed
         if (foundUser){
            res.status(409).send("email existed");
            return;
         }
         else{
            user.save((error, registeredUser) => {
               if (error){
                  console.log(error)
               } else {
                  let payload = { subject: registeredUser._id }
                  let token = jwt.sign(payload, 'secretKey')
                  res.status(200).send({token})
               }
            })
         }
      }
   });
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
   let event = new Event()

   // TODO: get data of event (exclude involvers)
   event.startdate = eventData.startDate
   event.enddate = eventData.endDate
   event.name = eventData.name
   event.content = eventData.content
   event.note = eventData.note
   event.progress = eventData.progress
   event.priority = eventData.priority
   event.type = eventData.type
   event.location = eventData.location

   // TODO: Save event to Database
   event.save((error, savedEvent) =>{
      if (error){
         console.log(error);
         res.status(204).send("Some Error");
      } else {
         // TODO: Push event to users involved 
         eventData.involver.forEach(element => {

            // TODO: Get current events and push new event to
            User.findById(element._id, function(err, user){
               
               // TODO: Check if user got this event or not
               if (!user.events.includes(savedEvent._id)){
                  user.events.push(savedEvent._id);
                  user.save((error, savedUser) =>{
                     if (error){
                        //** Raise Error */
                        console.log(error)
                     } else {
                        //** Do nothing */
                        // console.log("success")
                     }
                  });
               }
            })
         });

         // TODO: Return status to angular
         res.status(201).send(savedEvent);
      }
   });
});

/**
 * TODO: get all user, student, teacher (get email and full name)
 */
router.get('/get-users', verifyToken, (req, res) =>{

   User.find({}, function(err, users){
      if (err){
         res.status(404).send({err})
      }
      else{
         res.status(200).send(users);
      }
   })
})

/**
 * TODO: get all events of user then return to angular
 * @param: input email in json
 */
router.post('/get-events-of-user', verifyToken, async (req, res) =>{
   let userData = req.body;
   var eventsArray = [];

   // TODO: Get user with email
   // *input: email in json
   let userfound = await User.findOne(userData)
   // console.log(userfound);

   // TODO: get each event information
   
   for (let i = 0; i < userfound.events.length; i++){
      // TODO: Get event by id
      let oneEvent = await Event.findById(userfound.events[i]);
      // TODO: Push event to return array
      eventsArray.push(oneEvent);
   }

   // TODO: Return result to angular
   res.status(200).send(eventsArray);
})

/**
 * TODO: Create new course
 * @param: input model course
 */
router.post('/create-course', verifyToken, async(req, res) =>{

   let userData = req.body;

   // TODO: Initialize Course schema
   let courseData = new Course();

   // TODO: Check same existed ID
   Course.findOne({courseid: userData.courseid}, function(error, onecourse){
      if (error){
         // * 500: Internal Server Error
         res.status(500).send("fail");
      }
      // ! existed course id
      else if (onecourse){ 
         // * 409 : conflict status
         res.status(409).send("fail");
      }
      // * course id not existed
      // TODO: Add Course and involvers
      else {
         // TODO: Put value into courseData
         courseData.courseid = userData.courseid
         courseData.name = userData.coursename
         courseData.startday = userData.startday
         courseData.endday = userData.endday
         courseData.starttime = userData.starttime
         courseData.endtime = userData.endtime

         if (userData.monday == true){
            courseData.frequency.push("monday");
         }
         if (userData.tuesday == true){
            courseData.frequency.push("tuesday");
         }
         if (userData.wednesday == true){
            courseData.frequency.push("wednesday");
         }
         if (userData.thursday == true){
            courseData.frequency.push("thursday");
         }
         if (userData.friday == true){
            courseData.frequency.push("friday");
         }
         if (userData.saturday == true){
            courseData.frequency.push("saturday");
         }
         if (userData.sunday == true){
            courseData.frequency.push("sunday");
         }

         // TODO: Save course data to database
         courseData.save((error, savedCourse) =>{
            if (error){
               // * 500: Interal Server Errro
               res.status(500).send("Error");
            } else {
               // TODO: Push course to involvers
               userData.involver.forEach(element =>{
                  // TODO: Get current events and push new event to
                  User.findById(element._id, function(err, user){
                     // TODO: Check if user got this event or not
                     if (!user.courses.includes(savedCourse._id)){
                        user.courses.push(savedCourse._id);
                        user.save((error, savedUser) =>{
                           if (error){
                              //** Raise Error */
                              console.log(error)
                           } else {
                              //** Do nothing */
                              // console.log("success")
                           }
                        });
                     }
                  })
               })

               // TODO: Return status to angular
               res.status(201).send(savedCourse);
            }
         })
      }
   })

      
})

/**
 * TODO: Get all courses of user then return to angular 
 * @param: input email in json
 */
router.post('/get-courses-of-user', verifyToken, async (req, res) =>{
   let userData = req.body;
   let coursesArray = [];

   // TODO: Get user with email
   // *input: email in json
   let userfound = await User.findOne(userData);

   for (let i = 0; i < userfound.courses.length; i++){
      // TODO: Get event by id
      let oneCourse = await Course.findById(userfound.courses[i]);
      // TODO: Push event to return array
      coursesArray.push(oneCourse);
   }

   // TODO: Return result to angular
   res.status(200).send(coursesArray);
})

module.exports = router