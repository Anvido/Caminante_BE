const mongo = require('../db')
const bcrypt = require('bcrypt')
const regex = require('../util/email_regex')

var user_schema = mongo.Schema({
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    match: [regex, 'Email entered is not an email']
  },
  password_digest: String,
  followers: {
    type: [String],
    default: []
  },
  followee: {
    type: [String],
    default: []
  },
  avatar: {
    type: String,
    default: null
  }
})

user_schema.virtual('password')

user_schema.pre('save', function(next) {
  const u = this
  if (u.isModified('password')) {
    return next()
  }
  bcrypt.hash(this.password, 9, function(err, hash) {
    if (err) {
      return next(err)
    }
    u.password_digest = hash
  })
  next()
})

user_schema.methods.validate_password = function(password, cb) {
  bcrypt.compare(password, this.password_digest, function(err, res) {
    if (err) {
      return cb(err, null)
    }
    return cb(null, res)
  })
}

const user = mongo.model('User', user_schema)

module.exports = user