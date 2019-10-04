const mongo = require('mongoose')
const host = process.env.HOST || 'localhost'
const dbPort = process.env.DB_PORT || 27017
const db = process.env.DB || 'caminante'
mongo.connect(
  `mongodb://${host}:${dbPort}/${db}`,
  { useNewUrlParser: true, useUnifiedTopology: true }
)

module.exports = mongo