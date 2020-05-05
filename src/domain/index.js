const Router = require('express').Router()
const botsRoutes = require('./bots/routes')
const messageRoutes = require('./messages/routes')

const routes = Router
  .use('/bots', botsRoutes)
  .use('/messages', messageRoutes)

module.exports = routes
