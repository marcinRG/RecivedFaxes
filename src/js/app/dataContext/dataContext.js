'use strict';

var dataService = require('../dataService/dataService');
var settings = require('../settings/app.settings');

function getFaxes() {
    return dataService.getData(settings.routes.pdfsRoute,
        settings.storageAdditionalSettings.pdfs,
        'Wystąpił błąd poczas wczytywana danych', settings.storageAdditionalSettings.expire);
}

function getOldFaxes() {
    return dataService.getData(settings.routes.oldPdfsRoute,
        settings.storageAdditionalSettings.oldPdfs,
        'Wystąpił błąd poczas wczytywana danych', settings.storageAdditionalSettings.expire);
}

module.exports = {
    getFaxes: getFaxes,
    getOldFaxes: getOldFaxes
};
