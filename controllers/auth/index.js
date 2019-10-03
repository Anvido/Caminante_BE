const jwt = require('../../auth/jwt')
const User = require('../../models/user')
const auth_controller = require('express').Router()


auth_controller.post('/register', (req, res, next) => {
  const user = new User(req.body)
  user.save((err, doc) => {
    if (err) {
      return next(err)
    }
    jwt.sign(doc._id, (err, token) => {
      if (err) {
        return next(err)
      }
      res.status(201).json({ token, user: doc })
    })
  })
})

auth_controller.post('/login', (req, res, next) => {
  User.findOne({ email: req.body.email }, (err, doc) => {
    if (err) {
      return next(err)
    }
    if (!doc) {
      return res.status(200).json({ token: null })
    }
    doc.validate_password(req.body.password, (err, valid) => {
      if (err) {
        return next(err)
      }
      if (!valid) {
        return res.status(200).json({ token: null })
      }
      jwt.sign(doc._id, (err, token) => {
        if (err) {
          return next(err)
        }
        res.status(201).json({ token, user: doc })
      })
    })
  })
})

auth_controller.post('/verify', (req, res, next) => {
  jwt.verify(req.body.token, (err, id) => {
    if (err) {
      return res.status(200).json({ token: null })
    }
    jwt.sign(id, (err, token) => {
      if (err) {
        return next(err)
      }
      res.status(200).json({ token })
    })
  })
})

module.exports = auth_controller