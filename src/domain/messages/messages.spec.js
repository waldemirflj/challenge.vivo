require('dotenv').config({
  path: process.env.NODE_ENV === 'test'
    ? '.env.test'
    : '.env'
})

const faker = require('faker')
const request = require('supertest')
const server = require('../../express')
const Messages = require('././messages.model')

describe('Messages endpoint', () => {
  afterEach(async (done) => {
    await Messages.deleteMany()
    done()
  })

  test('should create a new message', async (done) => {
    const bot1 = await request(server)
      .post('/api/bots')
      .send({
        name: faker.name.findName()
      })

    const bot2 = await request(server)
      .post('/api/bots')
      .send({
        name: faker.name.findName()
      })

    const { data: { _id: from } } = bot1.body
    const { data: { _id: to } } = bot2.body

    const payload = {
      to,
      from,
      text: faker.lorem.paragraph()
    }

    const res = await request(server)
      .post('/api/messages')
      .send(payload)

    expect(res.statusCode).toEqual(201)
    expect(res.body).toHaveProperty('data')
    expect(res.body).toHaveProperty('data.to', to)
    expect(res.body).toHaveProperty('data.from', from)
    expect(res.body).toHaveProperty('data.text', payload.text)
    expect(res.body).toHaveProperty('data.conversationId', `${from}-${to}`)

    done()
  })

  test('should return 400 if no from, to or text is provided', async (done) => {
    const bot1 = await request(server)
      .post('/api/bots')
      .send({
        name: faker.name.findName()
      })

    const bot2 = await request(server)
      .post('/api/bots')
      .send({
        name: faker.name.findName()
      })

    const { data: { _id: from } } = bot1.body
    const { data: { _id: to } } = bot2.body

    const payload = {
      to,
      from
    }

    const res = await request(server)
      .post('/api/messages')
      .send(payload)

    expect(res.statusCode).toEqual(400)
    expect(res.body).toHaveProperty('message')

    done()
  })

  test('should return a message by id', async (done) => {
    const bot1 = await request(server)
      .post('/api/bots')
      .send({
        name: faker.name.findName()
      })

    const bot2 = await request(server)
      .post('/api/bots')
      .send({
        name: faker.name.findName()
      })

    const { data: { _id: from } } = bot1.body
    const { data: { _id: to } } = bot2.body

    const payload = {
      to,
      from,
      text: faker.lorem.paragraph(),
      conversationId: `${from}-${to}`
    }

    const message = new Messages(payload)
    const { _id } = await message.save()

    const res = await request(server)
      .get(`/api/messages/${_id}`)

    expect(res.statusCode).toEqual(200)
    expect(res.body).toHaveProperty('data')
    expect(res.body).toHaveProperty('data._id', _id.toString())
    expect(res.body).toHaveProperty('data.to', to)
    expect(res.body).toHaveProperty('data.from', from)
    expect(res.body).toHaveProperty('data.text', payload.text)
    expect(res.body).toHaveProperty('data.conversationId', `${from}-${to}`)

    done()
  })

  test('should return 404 if no id is provided', async (done) => {
    const res = await request(server)
      .get(`/api/messages/${faker.random.uuid()}`)

    expect(res.statusCode).toEqual(404)
    expect(res.body).toHaveProperty('message')

    done()
  })

  test('should return a array of messages', async (done) => {
    const bot1 = await request(server)
      .post('/api/bots')
      .send({
        name: faker.name.findName()
      })

    const bot2 = await request(server)
      .post('/api/bots')
      .send({
        name: faker.name.findName()
      })

    const { data: { _id: from } } = bot1.body
    const { data: { _id: to } } = bot2.body

    const message1 = new Messages({
      to,
      from,
      text: 'oie, alguém ai?',
      conversationId: `${from}-${to}`
    })

    const message2 = new Messages({
      to: from,
      from: to,
      text: 'sim, como posso te ajudar?',
      conversationId: `${from}-${to}`
    })

    await message1.save()
    await message2.save()

    const res = await request(server)
      .get(`/api/messages/conversationId?conversationId=${from}-${to}`)

    expect(res.statusCode).toEqual(200)
    expect(res.body).toHaveProperty('data')
    expect(res.body.data).toEqual(expect.any(Array))

    done()
  })
})
