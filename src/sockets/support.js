const users = []; // Users online
// Add user
const addUser = (userId, socketId) => {
    !users.some((user) => user.userId === userId) &&
        users.push({ userId, socketId });
};

// Remove user
const removeUser = (socketId) => {
    users = users.filter((user) => user.socketId !== socketId);
};

const getUser = (receiverId) => {
    return users.find((user) => user.userId === receiverId);
};

const createMessage = ({ senderId, receiverId, text, images }) => ({
    senderId,
    receiverId,
    text,
    images,
    seen: false,
});

const supportHandler = (io, socket) => {
    console.log(socket.id + ' connect');

    // User connect
    socket.on('addUser', (userId) => {
        addUser(userId, socket.id);
        io.emit('getUsers', users);
    });

    const messages = {};

    socket.on('sendMessage', ({ senderId, receiverId, text, images }) => {
        const message = createMessage({ senderId, receiverId, text, images });
        const user = getUser(receiverId);
        // Store the messages in the `messages` object
        if (!messages[receiverId]) {
            messages[receiverId] = [message];
        } else {
            messages[receiverId].push(message);
        }

        // send the message to the recevier
        io.to(user?.socketId).emit('getMessage', message);
    });

    // User disconnect
    socket.on('disconnect', () => {
        console.log(socket.id + ' disconnect');
        removeUser(socket.id);
        io.emit('getUsers', users);
    });
};
module.exports = supportHandler;
