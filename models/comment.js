const mongo = require('../db')

const comment_schema = mongo.Schema({
  user_id: String,
  comment: String
})

const comment = mongo.model('Comment', comment_schema)

module.exports = comment