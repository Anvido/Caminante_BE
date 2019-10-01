const users = require('./users')
const events = require('./events')
const comments = require('./comments')
const categories = require('./categories')

module.exports = [
  { path: '/users', controller: users },
  { path: '/events', controller: events },
  { path: '/comments', controller: comments },  
  { path: '/categories', controller: categories }
]