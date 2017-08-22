'use strict';
var storagePrefix = 'xx789_345';
var localForage = require('localforage');

var localStorageAdditonalSettings = {
    pdfs: storagePrefix + 'pdfs',
    oldPdfs: storagePrefix + 'oldPdfs',
    expire: {minutes: 10}
};

var website =  {
    breakPoint: 700,
    scrollTime: 1500,
    menuSlideTime: 1000
};

var storageConfig = {
    driver: localForage.INDEXEDDB,
    name: 'RecivedFaxes',
    version: 1.0,
    size: 4980736,
    storeName: 'baza_RecivedFaxes',
    description: 'moja baza lokalna'
};

var routes = {
    pdfsRoute: '/api/pdfs',
    oldPdfsRoute: '/api/oldPdfs'
};

module.exports = {
    storageAdditionalSettings: localStorageAdditonalSettings,
    routes : routes,
    storageConfig:storageConfig,
    website:website
};
