'use strict';
var storagePrefix = 'xx789_345';

var localStorageSettings = {
    pdfs: storagePrefix + 'pdfs',
    oldPdfs: storagePrefix + 'oldPdfs',
    expire: {minutes: 10},
    pdfsRoute: '/api/pdfs',
    oldPdfsRoute: '/api/oldPdfs'
};

module.exports = {
    storageSettings: localStorageSettings
};
