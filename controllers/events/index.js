const requireSchema = require('require-graphql-file')
const schema = requireSchema('./event_schema')
const Event = require('../../models/event')

const resolvers = {
  getEvents: async () => {
    var events = null
    try {
      events = await Event.find({})
    } catch (err) {
      console.log(err)
      return [] 
    }
    return events
  }
}

module.exports = { schema, resolvers }