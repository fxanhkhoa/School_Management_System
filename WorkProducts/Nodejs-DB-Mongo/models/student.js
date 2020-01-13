const mongoose = require('mongoose')

const Schema = mongoose.Schema
const studentSchema = new Schema({
    email: String,
    password: String,
    fullname: String,
    birthday: Date,
    gender: String,
    phone: String,
    events: [String]
})

module.exports = mongoose.model('student', eventSchema, 'students')