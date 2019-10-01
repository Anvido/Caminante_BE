const mongo = require('../db')

const category_schema = mongo.Schema({
  category: String
})

const category = mongo.model('Category', category_schema)


module.exports = category