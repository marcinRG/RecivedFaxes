'use strict';
var fs = require('fs');
var path = require('path');
var async = require('async');

var folderPath = '';
var routeTo = '';

function getFileProperties(filePath, callback) {
    fs.stat(filePath, function (error, stats) {
        if (error) {
            callback(error);
            return;
        }
        if (stats.isFile()) {
            callback(null, {
                path: routeTo + '/' + path.basename(filePath),
                fileName: path.basename(filePath),
                modified: stats.mtime,
                created: stats.birthtime
            });
            return;
        }
        callback(new Error('Not a file'));
    });
}

function processFilesFromDirectory(pathToFiles, iteratee, processMethod, callback) {
    fs.readdir(pathToFiles, function (error, files) {
        if (error) {
            callback(error);
            return;
        }
        var filesWithFolder = files.map(addFolder);
        processMethod(filesWithFolder, iteratee, callback);
    });
}

function addFolder(v) {
    return path.join(folderPath, v);
}

function processAllFilesFromDirectiory(pathToFiles, routeToFile, iteratee,
                                       processMethod, callback) {
    fs.stat(pathToFiles, function (error, stat) {
        if (error) {
            callback(error);
            return;
        }
        if (stat.isDirectory()) {
            folderPath = pathToFiles;
            routeTo = routeToFile;
            processFilesFromDirectory(pathToFiles, iteratee, processMethod, callback);
        }
    });
}

function readAllFilesFromDirectory(pathToFiles, routeToFile, iteratee, callback) {
    processAllFilesFromDirectiory(pathToFiles, routeToFile, iteratee, async.concat, callback);
}

module.exports = {
    getFileProperties: getFileProperties,
    readAllFilesFromDirectory: readAllFilesFromDirectory,
    processAllFilesFromDirectiory: processAllFilesFromDirectiory
};
