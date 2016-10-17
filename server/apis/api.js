var express = require('express');
var fileReader = require('../modules/fileReader');
var paths = require('../settings/settings').apiPaths;
var dirSettings = require('../settings/settings').paths;

var api = express.Router();

api.get(paths.pdfPath, function(request, response) {
    function writeTabStats(error, tabFileStats) {
        if (error) {
            console.log('Wystąpił błąd:' + error);
            return;
        }
        response.json(tabFileStats);
    }
    fileReader.readAllFilesFromDirectory(dirSettings.pdfs,fileReader.getFileProperties,writeTabStats);
});

api.get(paths.oldPdfPaths, function(request, response) {
    function writeTabStats(error, tabFileStats) {
        if (error) {
            console.log('Wystąpił błąd:' + error);
            return;
        }
        response.json(tabFileStats);
    }
    fileReader.readAllFilesFromDirectory(dirSettings.oldPdfs,fileReader.getFileProperties,writeTabStats);
});

module.exports = api;