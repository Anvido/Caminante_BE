const event = require('../models/event')
const events_controller = require('express').Router()

events_controller.get('/', (req, res) => {
  res.send('Events :v')
  
})

module.exports = events_controller