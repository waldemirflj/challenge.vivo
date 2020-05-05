const mongoose = require('../../config/mongo')

const messages = new mongoose.Schema({
  to: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'bots',
    required: true
  },
  from: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'bots',
    required: true
  },
  text: {
    type: mongoose.SchemaTypes.String,
    required: true
  },
  conversationId: {
    type: mongoose.SchemaTypes.String,
    required: true
  }
}, {
  collection: 'messages',
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
})

module.exports = mongoose.model('messages', messages)
