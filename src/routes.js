const Router = require('express').Router()
const domains = require('./domain')

const routes = Router
  .use('/api', domains)

module.exports = routes
