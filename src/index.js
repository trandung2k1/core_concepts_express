const dotenv = require('dotenv');
const colors = require('colors');
dotenv.config();
const port = process.env.PORT || 4000;
const app = require('./app');
const connectDB = require('./configs/db');
const sockets = require('./sockets');
const server = app
    .listen(port, async () => {
        try {
            await connectDB();
            console.log(
                colors.green(`Server listening on http://localhost:${port}`),
            );
        } catch (error) {
            console.log(error);
        }
    })
    .on('error', (e) => {
        console.log(e);
        process.exit(1);
    });

sockets(server);
