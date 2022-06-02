const debug = require('debug')('server').extend('app')
const express = require('express')
const cors = require('cors')
const morgan = require('morgan')

const { pgClient, redisClient, redisPublisher } = require('./db')

const port = process.env.PORT || 5000
const app = express()
const isDevelopment = app.get('env') === 'development'

app
  .use(cors())
  .use(express.json())
  .use(express.urlencoded({ extended: true }))
  .use(morgan(isDevelopment ? 'dev' : 'common'))

app.get('/', (_req, res) => {
  res.json({ message: 'Hi' })
})

app.get('/values/all', async (_req, res) => {
  const values = await pgClient.query('SELECT * FROM values;')

  return res.json({ data: values.rows })
})

app.get('/values/current', async (_req, res) => {
  const values = await redisClient.hGetAll('values')

  return res.json({ data: values })
})

app.post('/values', async (req, res) => {
  const index = req.body.index

  if (parseInt(index, 10) > 40) {
    return res.status(422).send('Index to high')
  }

  await redisClient.hSet('values', index, 'Nothing yet!')
  redisPublisher.publish('insert', index)

  pgClient.query('INSERT INTO values(number) VALUES($1)', [index])

  return res.json({ working: true })
})

app.listen(port, () => debug('App listening on port ' + port))
