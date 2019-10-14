const passport = require('passport')
const User = require('../models/user')
const JWTStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const secret_key = process.env.SECRET_KEY || 'caminantepassword2019'

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: secret_key
}

passport.use(new JWTStrategy(options, (payload, done) => {
  User.findOne({ _id: payload.sub }, '-password', (err, doc) => {
    if (err) {
      return done(null, false)
    }
    if (doc) {
      return done(null, doc)
    } else {
      return done(null, false)
    }
  })
}))

module.exports = passport