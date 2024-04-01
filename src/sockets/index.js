const { Server } = require('socket.io');
const jwt = require('jsonwebtoken');
const supportHandler = require('./support');

const sockets = (server) => {
    const io = new Server(server, {
        cors: {
            origin: '*',
            methods: ['GET', 'POST'],
            allowedHeaders: ['Authorization'],
            credentials: true,
        },
    });
    io.use(async (socket, next) => {
        try {
            const token = socket.handshake.headers['authorization'];
            if (token) {
                //verify token
                next();
            } else {
                return next(new Error('Not authorized'));
            }
        } catch (err) {
            console.log(err);
        }
    });
    const onConnection = (socket) => {
        supportHandler(io, socket);
    };
    io.on('connection', onConnection);
};

module.exports = sockets;
