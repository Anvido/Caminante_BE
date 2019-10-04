const requireSchema = require('require-graphql-file')
const schema = require('./comment_schema')
const Comment = require('../../models/comment')

const resolvers = {
  getComments: async () => {
    var commments = null
    try {
      comments = Comment.find({})
    } catch (err) {
      console.log(err)
      return []
    }
    return comments
  }
}

module.exports = { schema, resolvers}