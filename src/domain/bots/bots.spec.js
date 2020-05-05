require('dotenv').config({
  path: process.env.NODE_ENV === 'test'
    ? '.env.test'
    : '.env'
})

const faker = require('faker')
const request = require('supertest')
const server = require('../../express')
const Bots = require('./bots.model')

describe('Bots endpoint', () => {
  afterEach(async (done) => {
    await Bots.deleteMany()
    done()
  })

  test('should create a new bot', async (done) => {
    const payload = {
      name: faker.name.findName()
    }

    const res = await request(server)
      .post('/api/bots')
      .send(payload)

    expect(res.statusCode).toEqual(201)
    expect(res.body).toHaveProperty('data')
    expect(res.body).toHaveProperty('data._id')
    expect(res.body).toHaveProperty('data.name', payload.name.toLocaleLowerCase())

    done()
  })

  test('should return 400 if no name is provided', async (done) => {
    const payload = {}

    const res = await request(server)
      .post('/api/bots')
      .send(payload)

    expect(res.statusCode).toEqual(400)
    expect(res.body).toHaveProperty('message')

    done()
  })

  test('should return a bot by id', async (done) => {
    const payload = {
      name: faker.name.findName()
    }

    const store = await request(server)
      .post('/api/bots')
      .send(payload)

    const { data: { _id } } = store.body

    const res = await request(server)
      .get(`/api/bots/${_id}`)

    expect(res.statusCode).toEqual(200)
    expect(res.body).toHaveProperty('data')
    expect(res.body).toHaveProperty('data._id', _id)
    expect(res.body).toHaveProperty('data.name', payload.name.toLocaleLowerCase())

    done()
  })

  test('should return 404 if no id is provided', async (done) => {
    const res = await request(server)
      .get(`/api/bots/${faker.random.uuid()}`)

    expect(res.statusCode).toEqual(404)
    expect(res.body).toHaveProperty('message')

    done()
  })

  test('should return a array of bots', async (done) => {
    const res = await request(server)
      .get('/api/bots')

    expect(res.statusCode).toEqual(200)
    expect(res.body).toHaveProperty('data')
    expect(res.body.data).toEqual(expect.any(Array))

    done()
  })

  test('should update a bot by id', async (done) => {
    const payload = {
      name: faker.name.findName()
    }

    const store = await new Bots({
      name: faker.name.findName()
    })

    store.save()

    const { _id } = store

    const update = await request(server)
      .put(`/api/bots/${_id}`)
      .send(payload)

    expect(update.statusCode).toEqual(200)
    expect(update.body).toHaveProperty('data')
    expect(update.body).toHaveProperty('data._id', _id.toString())
    expect(update.body).toHaveProperty('data.name', payload.name.toLocaleLowerCase())

    done()
  })

  test('should return 404 if no id is provided', async (done) => {
    const payload = {
      name: faker.name.findName()
    }

    const res = await request(server)
      .put(`/api/bots/${faker.random.uuid()}`)
      .send(payload)

    expect(res.statusCode).toEqual(404)
    expect(res.body).toHaveProperty('message')

    done()
  })

  test('should destroy a bot by id', async (done) => {
    const store = await new Bots({
      name: faker.name.findName()
    })

    store.save()

    const { _id } = store

    const res = await request(server)
      .delete(`/api/bots/${_id}`)

    expect(res.statusCode).toEqual(200)
    expect(res.body).toHaveProperty('message')

    done()
  })

  test('should return 404 if no id is provided', async (done) => {
    const res = await request(server)
      .delete(`/api/bots/${faker.random.uuid()}`)

    expect(res.statusCode).toEqual(404)
    expect(res.body).toHaveProperty('message')

    done()
  })
})
