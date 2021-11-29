const supertest = require('supertest')

const app = require('../server/index.js')

const request = supertest(app)

app.get('/', async (req, res) => {
  res.json({message: 'pass!'})
})

it('Gets the test endpoint', async done => {
  // Sends GET Request to / endpoint
  const res = await request.get('/test')
  expect(response.status).toBe(200)
  expect(response.body.message).toBe('Hello World!')
  done()
})