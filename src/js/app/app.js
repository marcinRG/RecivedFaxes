'use strict';

var test = require('./uiElements/menusAndMain');

test.createMenu();

// var settings = require('./settings/app.settings');
// var dataService = require('./dataService/dataService');
// var dataFilters = require('./dataFilters/dataFilters');
// var $ = require('jquery');
// //var elemS = require('./uiElements/mainElements');
//
// var menuElems = require('./uiElements/uiElements');
//
// //elemS.intialize();
//
// $.when(dataService.getData(settings.routes.pdfsRoute,
//     settings.storageAdditionalSettings.pdfs, 'Wystąpił błąd poczas wczytywana danych'))
//     .done(function (data) {
//         var filters = dataFilters.FilesWithDateFilter(data);
//         console.log('******Start************');
//
//         var div = menuElems.createMenuDateFilters(filters.getDateFilters());
//         var orderSelections = dataFilters.FilesWithOrderSelection(data);
//         var div2 = menuElems.createOrderSelection(orderSelections.getOrderNames());
//
//         var dateElems = $('.date-selector');
//         dateElems.hide();
//         dateElems.html(div);
//         dateElems.show(500);
//
//         $('.category-selector').html(div2);
//         console.log(filters.getFilesFromDay('2016-11-08'));
//
//         console.log('*********Koniec**********');
//     })
//     .fail(function (error) {
//         console.log(error);
//     });
