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

function processFilesFromDirectory(pathToFiles, iteratee, processMethod, transform, callback) {
    fs.readdir(pathToFiles, function (error, files) {
        if (error) {
            callback(error);
            return;
        }
        var filesWithFolder = transform(files);
        processMethod(filesWithFolder, iteratee, callback);
    });
}

function tranformResults(files) {
    return files.map(addFolder);
}

function addFolder(v) {
    return path.join(folderPath, v);
}

function processAllFilesFromDirectiory(pathToFiles, routeToFile, iteratee,
                                       processMethod, processFunc, transform, callback) {
    fs.stat(pathToFiles, function (error, stat) {
        if (error) {
            callback(error);
            return;
        }
        if (stat.isDirectory()) {
            folderPath = pathToFiles;
            routeTo = routeToFile;
            processFunc(pathToFiles, iteratee, processMethod, transform, callback);
            return;
        }
        callback(new Error('Not a directory'));
    });
}

function readAllFilesFromDirectory(pathToFiles, routeToFile, iteratee, callback) {
    processAllFilesFromDirectiory(pathToFiles, routeToFile, iteratee, async.concat,
        processFilesFromDirectory, tranformResults, callback);
}

module.exports = {
    getFileProperties: getFileProperties,
    readAllFilesFromDirectory: readAllFilesFromDirectory,
    processAllFilesFromDirectiory: processAllFilesFromDirectiory,
    processFilesFromDirectory: processFilesFromDirectory
};
