const mongoose = require('mongoose')

const Schema = mongoose.Schema
const eventSchema = new Schema({
    startdate: Date,
    enddate: Date,
    name: String,
    content: String,
    note: String,
    progress: String,
    priority: String,
    type: String,
    location: String,
    involvers: [String], // email of user
})

module.exports = mongoose.model('event', eventSchema, 'events')