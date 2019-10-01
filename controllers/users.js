const User = require('../models/user')
const users_controller = require('express').Router()

users_controller.get('/', (req, res) => {
  res.send('Users :v')
  
})

users_controller.post('/', (req, res, next) => {
  console.log(req.body)
  const user = new User(req.body)
  user.save((err, doc) => {
    if (err) {
      return next(err)
    }
    console.log(doc.password_digest)
    
    res.status(201).json(doc)
  })
})

module.exports = users_controller