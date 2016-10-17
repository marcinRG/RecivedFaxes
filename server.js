var express = require("express");
var path = require('path');




var imagePaths = require('./server/settings/settings').images;
var publicPath = require('./server/settings/settings').public;
var fileReader = require('./server/modules/fileReader');
var app = express();


app.use('/images',express.static(path.join(__dirname, imagePaths)));
app.use('/',express.static(path.join(__dirname, publicPath)));

app.get("/api/images", function(request, response) {
    function writeTabStats(error, tabFileStats) {
    if (error) {
        console.log('Wystąpił błąd:' + error);
        return;
    }
    response.send(JSON.stringify(tabFileStats));
    }

    fileReader.readAllFilesFromDirectory(imagePaths,fileReader.getFileProperties,writeTabStats);
});
app.listen(3000, function() {
    console.log("Express app started on port 3000.");
});

