const keys = require('./keys');
const redis = require('redis');

const redisClient = redis.createClient({
  host: keys.redisHost,
  port: keys.redisPort,
  retry_strategy: () => 1000,
});
const sub = redisClient.duplicate();

const a1 = 3;
const q = 3;

function gProgression(n) {
  return a1 * Math.pow(q, n-1);
}

sub.on('message', (channel, message) => {
  redisClient.hset('values', message, gProgression(parseInt(message)));
});

sub.subscribe('insert');
