const mongo = require('../db')

const comment = mongo.model('comment', {
  user_id: String,
  comment: String
})

module.exports = comment