const Router = require('express').Router()
const controller = require('./messages.controller')

const routes = Router
  .get('/conversationId', controller.index)
  .get('/:_id', controller.show)
  .post('/', controller.store)

module.exports = routes
