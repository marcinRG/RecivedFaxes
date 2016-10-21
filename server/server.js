'use strict';
var express = require('express');
var path = require('path');

var pathSettings = require('./settings/settings').app;
var errorSettings = require('./settings/settings').error;
var routes = require('./settings/settings').fileRoutes;
var errorHandler = require('./errorHandlers/errors');
var apiRequests = require('./apis/api');
var portDefault = require('./settings/settings').defaultPort;

var port = process.env.PORT || portDefault;
var enviroment = process.env.NODE_ENV;

var app = express();

app.use(routes.pdfs, express.static(path.join(__dirname, '../' + pathSettings.pdfs)));
app.use(routes.oldPdfs, express.static(path.join(__dirname, '../' + pathSettings.oldPdfs)));
app.use(errorSettings.url, express.static(path.join(__dirname, '../' + errorSettings.path)));
if (enviroment === 'dev') {
    app.use(express.static(path.join(__dirname, '../' + pathSettings.page)));
}
if (enviroment === 'build') {
    app.use(express.static(path.join(__dirname, '../' + pathSettings.build)));
}

app.use(apiRequests);
app.use(errorHandler);

app.listen(port, function () {
    console.log('Express app started on port:' + port);
    console.log(__dirname);
});

