const { buildSchema } = require('graphql')
const { mergeTypes, mergeResolvers } = require('merge-graphql-schemas')

const auth_controller = require('./auth')

const users = require('./users')
// const events = require('./events')
// const comments = require('./comments')
// const categories = require('./categories')



const controllers = [
  users
]

module.exports = {
  api: { 
    schema: buildSchema(mergeTypes(controllers.map( c => c.schema ), { all: true })),
    rootValue: mergeResolvers(controllers.map( c => c.resolvers )),
    graphiql: true 
  },
  auth_controller
}