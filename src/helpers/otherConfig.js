const session = require('express-session');
const redisClient = require('../configs/redis');
const RedisStore = require('connect-redis').default;
const compressionOptions = {
    level: 6,
    threshold: 100 * 1000,
};

const redisStore = new RedisStore({
    client: redisClient,
    prefix: 'app:',
});
const sessionMiddleware = session({
    store: redisStore,
    resave: false,
    saveUninitialized: false,
    secret: process.env.SESSION_SECRET,
    saveUninitialized: true,
    name: 'sessionId',
    cookie: {
        httpOnly: true,
        path: '/',
        secure: false,
        sameSite: 'strict',
        maxAge: 30 * 24 * 60 * 60 * 1000,
    },
});
module.exports = { compressionOptions, sessionMiddleware };
