const Bots = require('./bots.model')

class BotsController {
  async index (req, res) {
    const bots = await Bots.find()

    res.status(200)
      .json({
        data: bots
      })
  }

  async show (req, res) {
    const { _id } = req.params

    try {
      const bot = await Bots.findOne({ _id })

      return res.status(200)
        .json({
          data: bot
        })
    } catch (error) {
      return res.status(404)
        .json({
          message: 'not found'
        })
    }
  }

  async store (req, res) {
    const { name } = req.body

    if (!name) {
      return res.status(400)
        .json({
          message: 'name field is required'
        })
    }

    const bot = new Bots({ name })
    const data = await bot.save()

    return res.status(201)
      .json({
        data
      })
  }

  async update (req, res) {
    const { _id } = req.params
    const { name } = req.body

    try {
      const data = await Bots.findOneAndUpdate({ _id }, { name }, {
        new: true,
        upsert: true
      })

      return res.status(200)
        .json({ data })
    } catch (error) {
      return res.status(404)
        .json({
          message: 'not found'
        })
    }
  }

  async destroy (req, res) {
    const { _id } = req.params

    try {
      await Bots.findByIdAndDelete({ _id })

      return res.status(200)
        .json({
          message: 'bot destroyed successfully'
        })
    } catch (error) {
      return res.status(404)
        .json({
          message: 'not found'
        })
    }
  }
}

module.exports = new BotsController()
