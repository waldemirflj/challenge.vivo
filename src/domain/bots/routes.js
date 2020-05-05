const Router = require('express').Router()
const controller = require('./bots.controller')

const routes = Router
  .get('/', controller.index)
  .get('/:_id', controller.show)
  .post('/', controller.store)
  .put('/:_id', controller.update)
  .delete('/:_id', controller.destroy)

module.exports = routes
