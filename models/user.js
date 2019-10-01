const mongo = require('../db')

const user = mongo.model('user', {
  username: String,
  email: String,
  password_digest: String,
  followers: [String],
  followee: [String],
  avatar: String
})

module.exports = user