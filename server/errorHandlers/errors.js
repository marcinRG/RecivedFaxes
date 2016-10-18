var express = require('express');
var path = require('path');
//var errorSettings = require('../settings/settings').error;

var api = express.Router();
// api.use(function(req, res, next) {
//     var err = new Error();
//     err.status = 404;
//     next(err);
// });
// api.use(function(err, req, res, next) {
//     if(err.status !== 404) {
//         return next(err);
//     }
//     res.status(404);
//     res.redirect('/errors/404.html');
// });

module.exports = api;
