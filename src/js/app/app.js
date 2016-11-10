'use strict';
var dataService = require('./dataService/dataService');
var localForage = require('localforage');
var $ = require('jquery');

localForage.config({
    driver: localForage.INDEXEDDB, // Force WebSQL; same as using setDriver()
    name: 'RecivedFaxes',
    version: 1.0,
    size: 4980736, // Size of database, in bytes. WebSQL-only for now.
    storeName: 'baza_RecivedFaxes', // Should be alphanumeric, with underscores.
    description: 'moja baza lokalna'
});

var settings = {
    pdfs: 'pdfs',
    oldPdfs: 'oldPdfs',
    expire: {minutes: 10},
    pdfsRoute: '/api/pdfs',
    oldPdfsRoute: '/api/oldPdfs'
};

console.log('******Start************');

// $.when(dataService.setItem('xxxx', '234', settings.expire))
//     .done(function (data) {
//         console.log(data);
//         if (dataService.hasExpirationDate(data)) {
//             console.log('Ma date wygasniecia');
//             console.log(data.expirationDate instanceof Date);
//         }
//     })
//     .fail(function (error) {
//         console.log(error);
//     });

$.when(dataService.getItem('xxxx', 'Bład pobierania ssss'))
    .done(function (data) {
        console.log('Było ok');
        console.log(data);
    })
    .fail(function (error) {
        console.log('Bład');
        console.log(error);
    });

// $.when(dataService.getDataFromServer(settings.pdfsRoute, 'Wystąpił błąd'))
//     .done(function (data) {
//         console.log(data);
//     })
//     .fail(function (error) {
//         console.log(error);
//     });

// $.when(dataService.getDataFromServer(settings.oldPdfsRoute, 'Wystąpił błąd'))
//     .done(function (data) {
//         console.log(data);
//     })
//     .fail(function (error) {
//         console.log(error);
//     });

console.log('*********Koniec**********');
