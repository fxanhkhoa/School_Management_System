const mongoose = require('mongoose')

const Schema = mongoose.Schema
const courseSchema = new Schema({
    courseid: String,
    name: String,
    startday: Date,
    endday: Date,
    frequency: [String],
})

module.exports = mongoose.model('course', eventSchema, 'courses')