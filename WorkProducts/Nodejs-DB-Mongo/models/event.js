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
    type: String
})

module.exports = mongoose.model('event', eventSchema, 'events')