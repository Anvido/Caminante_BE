const category = require('../../models/category')
const categories_controller = require('express').Router()

categories_controller.get('/', (req, res) => {
  res.send('Category :v')
  
})

module.exports = categories_controller