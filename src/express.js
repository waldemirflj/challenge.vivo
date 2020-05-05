const cors = require('cors')
const express = require('express')
const routes = require('./routes')

const server = express()
  .use(cors())
  .use(express.urlencoded({ extended: false }))
  .use(express.json())
  .use(routes)

module.exports = server
