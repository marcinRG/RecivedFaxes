var fs = require('fs');
var path = require('path');
var tiff2Pdf = require('tiff2pdf');
var fileReader = require('../modules/fileReader');
var settings = require('../settings/settings').utilsSettings;

function convertFile(filePath,callback) {
    fs.stat(filePath, function (error, stat) {
        if (error) {
            callback(error);
            return;
        }
        if (stat.isFile()) {
            tiff2Pdf(filePath,settings.outputDir);
            callback(null, path.basename(filePath));
        }
    });
}

function outputResults(error){
    if (error) {
        console.log('Wystąpił błąd:' + error);
        return;
    }
    console.log('Zakończone powodzeniem');
}

fileReader.processAllFilesFromDirectiory(settings.images,null,convertFile,fileReader.forEachElem,outputResults);