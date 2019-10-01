const morgan = require('morgan')
const express = require('express')
const cors = require('./util/cors')
const controllers = require('./controllers')

const app = express()
const port = process.env.PORT || 3000
require('./db')

app.use(cors)
app.use(morgan('tiny'))
app.use(express.json())

controllers.forEach(c => {
  app.use(c.path, c.controller)
})


app.listen(port, () => {
  console.log(`Running app on port ${port}`);
})