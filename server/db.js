const keys = require('./keys')

const debug = require('debug')('server:db')
const redis = require('redis')
const { Pool } = require('pg')

const pgClient = new Pool({
  host: keys.pgHost,
  port: keys.pgPort,
  user: keys.pgUser,
  password: keys.pgPwd,
  database: keys.pgDb,
  log: (msg) => debug(msg),
  min: 1,
  max: 10
})

pgClient.on('error', () => debug('Lost PostgreSQL connection'))

pgClient.connect(async (err, client) => {
  if (err) debug('DB connect error' + err.message)
  await pgClient.query(
    'CREATE TABLE IF NOT EXISTS values (number UNSIGNED INT)'
  )
})

const redisClient = redis.createClient({
  host: keys.redisHost,
  port: keys.redisPort
})

const redisPublisher = redisClient.duplicate()

redisPublisher.connect()

module.exports = { pgClient, redisClient, redisPublisher }
