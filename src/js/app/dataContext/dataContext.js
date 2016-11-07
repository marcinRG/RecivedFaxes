'use strict';

var dataService = require('../dataService/dataService');
var settings = require('../settings/app.settings').storageSettings;

function getFaxes() {
    return dataService.getData(settings.pdfsRoute,
        settings.pdfs, 'Nie udało się pobrać danych o faksach',
        settings.expire);
}
function getOldFaxes() {
    return dataService.getData(settings.oldPdfsRoute,
        settings.oldPdfs, 'Nie udało się pobrać danych o starych faksach',
        settings.expire);
}

module.exports = {
    getFaxes: getFaxes,
    getOldFaxes: getOldFaxes
};

