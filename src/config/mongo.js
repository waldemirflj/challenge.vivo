const mongoose = require('mongoose')

const {
  MONGO_URI
} = process.env

mongoose.connect(`mongodb://${MONGO_URI}`, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true
})

// const db = mongoose.connection

// db.on('error', () => {
//   console.log('---')
//   console.log('mongodb: error occurred from the database')
// })

// db.once('open', () => {
//   console.log('---')
//   console.log('mongodb: successfully opened the database')
// })

module.exports = mongoose
