var fs = require('fs');
var path = require('path');
var async = require('async');

var folderPath='';

function getFileProperties(filePath, callback) {
    fs.stat(filePath, function (error, stat) {
        if (error) {
            callback(error);
            return;
        }
        if (stat.isFile()) {
            callback(null, {
                paths: filePath,
                fileName: path.basename(filePath),
                modified: stat.mtime,
                created: stat.birthtime
            });
        }
    });
}

function readFilesFromDirectory(pathToFiles, iteratee, callback) {
    fs.readdir(pathToFiles, function (error, files) {
        if (error) {
            callback(error);
            return;
        }
        var filesWithFolder = files.map(addFolder);
        async.concat(filesWithFolder, iteratee, callback);
    });
}

function addFolder(v) {
    return path.join(folderPath, v);
}

function readAllFilesFromDirectory(pathToFiles, iteratee, callback) {
    fs.stat(pathToFiles, function (error, stat) {
        if (error) {
            callback(error);
            return;
        }
        if (stat.isDirectory()) {
            folderPath = pathToFiles;
            readFilesFromDirectory(pathToFiles, iteratee, callback);
        }
    });
}

module.exports = {
    getFileProperties:getFileProperties,
    readAllFilesFromDirectory:readAllFilesFromDirectory
};