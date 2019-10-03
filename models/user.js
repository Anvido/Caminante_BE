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
  password: {
    type: String,
    required: true,
    minlength: [8, 'Password is too short']
  },
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

user_schema.pre('save', function(next) {
  var u = this
  if (!u.isModified('password')) {
    return next()
  }
  bcrypt.hash(u.password, 9, function(err, hash) {    
    if (err) {
      return next(err)
    }
    u.password = hash
    next()  
  })
})

user_schema.methods.validate_password = function(password, cb) {
  bcrypt.compare(password, this.password, function(err, res) {
    if (err) {
      return cb(err, null)
    }
    return cb(null, res)
  })
}

const user = mongo.model('User', user_schema)

module.exports = user