const mongo = require('../db')

const comment_schema = mongo.Schema({
  user_id: String,
  event_id: String,
  comment: String,
  created_date: Date
})

const comment = mongo.model('Comment', comment_schema)

module.exports = comment