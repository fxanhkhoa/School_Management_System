# School_Management_System

## Feature
- [x] Calendar Scheduler
- [x] Courses Progress
- [ ] Attendance system
- [ ] E-learning
- [x] Courses Management
- [x] Events Management
- [ ] Booking System

## Technology using
* Front-End
  * Angular 7
  * UI/UX: Bootstrap 4, Angular Material
* Back-End
  * NodeJS
  
## How to use
###*Installation*
```
Angular CLI: https://cli.angular.io/
```
###*Run*
- MongoDB Create Database (using mongo compass)
```
use school-management-system
db.updateUser(
  {
    user: "myAdmin",
    pwd:  passwordPrompt(),   // or cleartext password
    roles: [ { role: "readWrite", db: "school-management-system" },
             { role: "read", db: "reporting" } ]
  }
)

use school-management-system
db.updateUser(
   "myAdmin",
   {
     roles : [
       { role: "readWrite", db: "school-management-system" },
     ]
   }
)

use school-management-system
db.createUser(
  {
    user: "myAdmin",
    pwd:  passwordPrompt(),   // or cleartext password
    roles: [ { role: "readWrite", db: "school-management-system" }]
  }
```
- MongoDB
```
mongod --auth --port 27017 --dbpath "D:\Program Files\MongoDB\Server\4.2"
(Change your path)
```
- Angular
```
cd WorkProducts
cd School-Management-System
ng serve
```
- NodeJS
```
cd WorkProducts
cd Nodejs-DB-Mongo
node server.js
```
