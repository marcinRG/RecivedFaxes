'use strict';
var settings = require('./settings/app.settings');
var dataService = require('./dataService/dataService');
var dataFilters = require('./dataFilters/dataFilters');
var $ = require('jquery');

var menuElems = require('./uiElements/uiElements');

$.when(dataService.getData(settings.routes.pdfsRoute,
    settings.storageAdditionalSettings.pdfs, 'Wystąpił błąd poczas wczytywana danych'))
    .done(function (data) {
        var filters = dataFilters.FilesWithDateFilter(data);
        console.log('******Start************');
        var div = menuElems.createMenuDateFilters(filters.getDateFilters());
        var orderSelections = dataFilters.FilesWithOrderSelection(data);
        var div2 = menuElems.createOrderSelection(orderSelections.getOrderNames());
        $('.date-selector').html(div);
        $('.category-selector').html(div2);
        console.log(filters.getFilesFromDay('2016-11-08'));

        console.log('*********Koniec**********');
    })
    .fail(function (error) {
        console.log(error);
    });

//
// var mainElem = $('.main-content');
// var x = 0;
// var button = $('#costam');
//
// button.on('click', function () {
//     x++;
//     console.log('Wywołanie funckcji'+x);
//     menuDates.createButton(mainElem,'To jest button'+x);
// });

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
//
// $.when(dataService.setItem('xxxx555', '123'))
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

// $.when(dataService.getItem('xxxx', 'Bład pobierania ssss')).done(function (data) {
//     console.log(data);
// }).fail(function (error) {
//     console.log('Bład');
//     console.log(error);
// });

// $.when(dataService.getItem('xxxx555', 'Bład pobierania 123')).done(function (data) {
//     console.log(data);
// }).fail(function (error) {
//     console.log('Bład');
//     console.log(error);
// });

// $.when(dataService.getData(settings.pdfsRoute,
//     'jakis_klucz', 'Wystąpił błąd'))
//     .done(function (data) {
//         console.log(data);
//     })
//     .fail(function (error) {
//         console.log(error);
//     });
//
// $.when(dataService.getData(settings.oldPdfsRoute,
//     'jakis_klucz2', 'Wystąpił błąd',settings.expire))
//     .done(function (data) {
//         console.log(data);
//     })
//     .fail(function (error) {
//         console.log(error);
//     });

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
