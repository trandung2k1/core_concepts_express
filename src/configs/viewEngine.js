const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const viewEngine = (app) => {
    app.use(expressLayouts);
    app.set('view engine', 'ejs');
    app.use(express.static('./src/public'));
    app.use(expressLayouts);
    app.set('layout', './layouts/main');
    app.set('views', './src/views');
};
module.exports = viewEngine;
