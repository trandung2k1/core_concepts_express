const nodemailer = require('nodemailer');
require('dotenv').config();
const transport = nodemailer.createTransport({
    // service: 'gmail',
    // host: 'smtp.gmail.com',
    // port: 465,
    // secure: true, // use SSL
    // auth: {
    //     user: process.env.AUTH_EMAIL,
    //     pass: process.env.AUTH_PASS,
    // },
    host: process.env.HOST_MAIL,
    port: parseInt(process.env.PORT_MAIL),
    secure: false,
    auth: {
        user: process.env.AUTH_EMAIL,
        pass: process.env.AUTH_PASS,
    },
});

module.exports = transport;
