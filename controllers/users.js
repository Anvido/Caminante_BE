const user = require('../models/user')
const users_controller = require('express').Router()

users_controller.get('/', (req, res) => {
  res.send('Users :v')
  
})

module.exports = users_controller