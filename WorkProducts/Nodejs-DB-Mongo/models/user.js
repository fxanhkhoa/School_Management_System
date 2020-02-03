const mongoose = require('mongoose')

const Schema = mongoose.Schema
const userSchema = new Schema({
   email: String,
   password: String,
   role: String,
   fullname: String,
   events: [String],
   courses: [String],
})

module.exports = mongoose.model('user', userSchema, 'users')