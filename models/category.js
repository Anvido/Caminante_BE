const mongo = require('../db')

const category = mongo.model('category', {
  category: String
})

module.exports = category