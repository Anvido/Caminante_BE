const mongo = require('../db')

const event = mongo.model('event', {
  user_id: String,
  comment_id: String,
  title: String,
  description: String,
  check_number: Number,
  latitude: Number,
  longitude: Number
})

module.exports = event