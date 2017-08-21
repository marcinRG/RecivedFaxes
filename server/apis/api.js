'use strict';
var express = require('express');
var fileReader = require('../modules/fileReader');
var paths = require('../settings/settings').apiRotues;
var routes = require('../settings/settings').fileRoutes;
var dirSettings = require('../settings/settings').app;

var api = express.Router();

api.get(paths.pdfPath, function (request, response) {
    function writeTabStats(error, tabFileStats) {
        if (error) {
            console.log('Wystąpił błąd: ' + error);
            return;
        }
        response.status(200);
        response.json(tabFileStats);
    }

    fileReader.readAllFilesFromDirectory(dirSettings.pdfs,
        routes.pdfs, fileReader.getFileProperties, writeTabStats);
});

api.get(paths.oldPdfPaths, function (request, response) {
    function writeTabStats(error, tabFileStats) {
        if (error) {
            console.log('Wystąpił błąd: ' + error);
            return;
        }
        response.status(200);
        response.json(tabFileStats);
    }

    fileReader.readAllFilesFromDirectory(dirSettings.oldPdfs, routes.oldPdfs,
        fileReader.getFileProperties, writeTabStats);
});

module.exports = api;
