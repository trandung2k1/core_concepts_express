const express = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const cors = require('cors');
const morgan = require('morgan');
const rfs = require('rotating-file-stream');
const mongoSanitize = require('express-mongo-sanitize');
const compression = require('compression');
const cookieParser = require('cookie-parser');
const swaggerUi = require('swagger-ui-express');
const passport = require('passport');
const path = require('path');
require('./helpers/otherService');
require('./configs/redis');
const {
    notFound,
    errorHandler,
} = require('./middlewares/handlerError.middleware');
const corsOptions = require('./middlewares/cors.middleware');
const viewEngine = require('./configs/viewEngine');
const routes = require('./routes');
const {
    compressionOptions,
    sessionMiddleware,
} = require('./helpers/otherConfig');
const openapiSpecification = require('./helpers/swagger');
const googleStrategy = require('./helpers/googleStrategy');
const isProduction = process.env.NODE_ENV === 'production';
const accessLogStream = rfs.createStream('production.log', {
    interval: '2d',
    path: path.join(__dirname, 'logs'),
});
const devLogStream = rfs.createStream('development.log', {
    interval: '1d',
    path: path.join(__dirname, 'logs'),
});
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors(corsOptions));
app.use(
    mongoSanitize({
        allowDots: true,
        replaceWith: '_',
    }),
);
app.use(cookieParser());
app.use(compression(compressionOptions));
app.use(sessionMiddleware);

//Save user to session
passport.serializeUser((user, done) => {
    done(null, user._id);
});
//Take user from session -> req.user
passport.deserializeUser((id, done) => {
    User.findById(id)
        .then((user) => {
            delete user.password;
            done(null, user);
        })
        .catch((err) => {
            console.log(err);
        });
});
passport.use(googleStrategy);

app.use(passport.initialize());
app.use(
    isProduction
        ? morgan('combined', { stream: accessLogStream })
        : morgan('tiny', { stream: devLogStream }),
);
app.use(
    helmet.contentSecurityPolicy({
        directives: {
            defaultSrc: ["'self'"],
            fontSrc: ["'self'"],
            imgSrc: ["'self'"],
            scriptSrc: ["'self'"],
            upgradeInsecureRequests: [],
            styleSrc: ["'self'"],
            frameSrc: ["'self'"],
        },
        reportOnly: true, // Set to 'true' to enable report-only mode
    }),
);

viewEngine(app);
app.get('/', (req, res) => {
    // return res.status(200).json('Hello World!');
    return res.render('index', {
        title: 'Home Page',
    });
});
app.get('/dowload', (req, res) => {
    const fileName = '1711982283050.png';
    const filePath = __dirname + '/public/images/' + fileName;
    return res.download(filePath, fileName);
});
routes(app);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(openapiSpecification));

//create schema using openapi frontend
app.get('/api-docs-json', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    return res.send(openapiSpecification);
});
app.use(notFound);
app.use(errorHandler);
module.exports = app;
