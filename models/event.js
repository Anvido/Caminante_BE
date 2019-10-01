const mongo = require('../db')

const event_schema = mongo.Schema({
  user_id: String,
  comment_id: String,
  title: String,
  description: String,
  check_number: Number,
  latitude: Number,
  longitude: Number
})

const event = mongo.model('Event', event_schema)

module.exports = event