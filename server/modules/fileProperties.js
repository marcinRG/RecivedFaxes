var fs = require('fs');
var path = require('path');
var Q = require('q');

var tabFiles = [];


function test(bool) {
    var deffered = Q.defer();

    if (bool) {
        deffered.resolve("To jest prawidłowa wartosc");
    }
    else {
        deffered.reject("Wystąpił bład");
    }
    return deffered.promise;
}

function getFileProperies(filePath) {
    fs.stat(filePath, function (error, stat) {
        if (!error && stat.isFile()) {
            return {
                paths: filePath,
                fileName: path.basename(filePath),
                modified: stat.mtime,
                created: stat.birthtime
            };
        }
    });
}

function getFilesDefered(x) {
    var tab=[];
    return Q.fcall(getFiles,x,tab);
}

function getFiles(directoryPath,tabFilesProperties) {

    fs.stat(directoryPath, function (error) {
        tabFilesProperties = [];
        if (!error) {
            fs.readdir(directoryPath, function (error, files) {
                if (!error) {
                    for (var i = 0; i < files.length; i++) {
                        var filePath = path.join(directoryPath, files[i]);
                         var something = getFileProperies(filePath,tabFilesProperties);
                        console.log(something);
                    }
                }
            });
        }
    });
}

module.exports = {
    getFiles: getFiles,
    test:test,
    getFilesDefered:getFilesDefered
};
