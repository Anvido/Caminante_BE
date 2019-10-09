const morgan = require('morgan')
const express = require('express')
const cors = require('./util/cors')
const passport = require('./auth/passport')
const graphqlHTTP = require('express-graphql')
const { api, auth_controller } = require('./controllers')

const app = express()
const port = process.env.PORT || 3000
require('./db')

app.use(cors)
app.use(morgan('tiny'))
app.use(express.json())

app.use(auth_controller)
app.get('/connect', (req, res, next) => {
  res.status(200).send('1');
})
app.use('/test', graphqlHTTP(api))
app.use('/', passport.authenticate('jwt', { session: false }), graphqlHTTP(api))

app.listen(port, () => {
  console.log(`Running app on port ${port}`);
})