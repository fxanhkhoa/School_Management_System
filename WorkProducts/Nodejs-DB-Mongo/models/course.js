const mongoose = require('mongoose')

const Schema = mongoose.Schema
const courseSchema = new Schema({
    courseid: String,
    name: String,
    startday: Date,
    endday: Date,
    starttime: String,
    endtime: String,
    frequency: [String],
})

module.exports = mongoose.model('course', courseSchema, 'courses')