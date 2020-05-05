require('dotenv').config({
  path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env'
})

const { PORT, NODE_ENV } = process.env
const server = require('./express')

server
  .listen(PORT, () => {
    console.info(`server is running in ${NODE_ENV}: ${new Date()}`)
  })
