const { createClient } = require('redis');
const colors = require('colors');
// const redisClient = createClient();

//Production
const redisClient = createClient({
    // url: process.env.REDIS_CLOUD_URL,
    // Redis render
    url: 'rediss://red-cn8r320cmk4c739sl950:Tmrace0tN4oJ29NcHkc5IACd29aZbkfd@oregon-redis.render.com:6379',
    socket: {
        connectTimeout: 10000,
    },
});

redisClient.on('error', (err) => {
    console.log(err);
    console.log(colors.red('Redis Client Error'));
    process.exit(1);
});
redisClient.on('connect', () => {
    console.log(colors.green('Redis plugged in.'));
});
(async () => {
    await redisClient.connect();
})();

module.exports = redisClient;
