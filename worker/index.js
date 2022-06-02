const keys = require('./keys')
const { sleep } = require('./util')
const redis = require('redis')

const redisClient = redis.createClient({
  host: keys.redisHost,
  port: keys.redisPort
})

redisClient.on('error', (err) => console.log('Redis Client Error', err))

const sub = redisClient.duplicate()

async function fib(index) {
  if (index < 2) return 1

  await sleep(2000)

  return fib(index - 1) + fib(index - 2)
}

sub.on('message', async (_channel, message) => {
  const value = await fib(parseInt(message, 10))
  redisClient.hSet('values', message, value)
})

sub.subscribe('insert')
sub.connect()
