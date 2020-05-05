const mongoose = require('../../config/mongo')

const bots = new mongoose.Schema({
  name: {
    type: mongoose.SchemaTypes.String,
    required: true,
    lowercase: true
  }
}, {
  collection: 'bots',
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
})

bots.pre('save', (next) => {
  this.updatedAt = Date.now()
  return next()
})

module.exports = mongoose.model('bots', bots)
