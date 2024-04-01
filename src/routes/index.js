const user = require('./user.route');
const google = require('./google.route');
const upload = require('./upload.route');
const routes = (app) => {
    app.use('/upload', upload);
    app.use('/auth', google);
    app.use('/api/users', user);
};
module.exports = routes;
