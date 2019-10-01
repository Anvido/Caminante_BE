const comment = require('../models/comment')
const comments_controller = require('express').Router()

comments_controller.get('/', (req, res) => {
  res.send('Comments :v')
  
})

module.exports = comments_controller