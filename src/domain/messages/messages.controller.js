const Messages = require('./messages.model')

const _isEmpty = (obj) => {
  for (var key in obj) {
    if (obj[key] === undefined || obj[key] === '') {
      return key
    }
  }
}

const _isChannel = async ({ from, to }) => {
  const findByFrom = await Messages.findOne({
    conversationId: `${from}-${to}`
  })

  const findByTo = await Messages.findOne({
    conversationId: `${to}-${from}`
  })

  let channel = ''

  if (!findByFrom && !findByTo) {
    channel = `${from}-${to}`
  } else if (findByFrom && !findByTo) {
    channel = findByFrom.conversationId
  } else {
    channel = findByTo.conversationId
  }

  return {
    channel
  }
}

class MessagesController {
  async index (req, res) {
    const { conversationId } = req.query

    const messages = await Messages.find({ conversationId })

    res.status(200)
      .json({
        data: messages
      })
  }

  async show (req, res) {
    const { _id } = req.params

    try {
      const message = await Messages.findOne({ _id })

      return res.status(200)
        .json({
          data: message
        })
    } catch (error) {
      return res.status(404)
        .json({
          message: 'not found'
        })
    }
  }

  async store (req, res) {
    const { from, to, text } = req.body

    if (!from || !to || !text) {
      const key = _isEmpty({
        to,
        from,
        text
      })

      return res.status(400)
        .json({
          message: `${key} field is required`
        })
    }

    const { channel } = await _isChannel({ from, to })

    const message = new Messages({
      to,
      from,
      text,
      conversationId: channel
    })

    const data = await message.save()

    return res.status(201)
      .json({
        data
      })
  }
}

module.exports = new MessagesController()
