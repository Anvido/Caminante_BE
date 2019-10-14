const requireSchema = require('require-graphql-file')
const schema = requireSchema('./user_schema')
const User = require('../../models/user')

const resolvers = {
  getUsers: async () => {
    var users = null
    try {
      users = await User.find({})
    } catch (err) {
      console.log(err)
      return [] 
    }
    return users
  },
  getMyUser: async (args, context, info) => {
    return context.user
  }
}

module.exports = { schema, resolvers }