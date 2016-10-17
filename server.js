var express = require("express");
var path = require('path');

var settings = require('./server/settings/settings').paths;
var routes = require('./server/settings/settings').fileRoutes;
var errorHandler = require('./server/errorHandlers/errors');
var apiRequests = require('./server/apis/api');

var app = express();

app.use(routes.pdfs,express.static(path.join(__dirname, settings.pdfs)));
app.use(routes.oldPdfs,express.static(path.join(__dirname, settings.oldPdfs)));
app.use(express.static(path.join(__dirname,settings.page)));
app.use(apiRequests);
app.use(errorHandler);

app.listen(3000, function() {
    console.log("Express app started on port 3000.");
});

