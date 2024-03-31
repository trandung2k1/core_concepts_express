const express = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const cors = require('cors');
const morgan = require('morgan');
const mongoose = require('mongoose');
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(helmet());
app.use(morgan('combined'));
mongoose
    .connect(process.env.MONGODB_URL)
    .then(() => {
        console.log('Connected DB successfully');
    })
    .catch((err) => {
        console.log(err);
        console.log('Connected DB failed');
    });
app.get('/', (req, res) => {
    res.status(200).json('Hello World!');
});
module.exports = app;
