'use strict';

var $ = require('jquery');
var dataContext = require('../dataContext/dataContext');
var dataFilters = require('../dataFilters/dataFilters');
var uiCreator = require('./uiElements');

function createFilesWithDateFiltersPage() {
    $.when(dataContext.getFaxes())
        .then(function (data) {
            return dataFilters.FilesWithDateFilter(data);
        })
        .then(function (dateFilter) {
            new PageWithDateFilters(dateFilter);
        });
}

function createFileswithOrderSelectionPage() {
    $.when(dataContext.getOldFaxes())
        .then(function (data) {
            return dataFilters.FilesWithOrderSelection(data);
        })
        .then(function (dateFilter) {
            new PageWithOrderSelection(dateFilter);
        });
}

function PageWithDateFilters(filter) {
    var dateMenu = $('.faxes-content').find('.date-selector');
    var mainContent = $('.faxes-content').children('.main-content');

    function createMenuElems() {
        dateMenu.hide();
        dateMenu.html(uiCreator.createMenuDateFilters(filter.getDateFilters()));
        dateMenu.find('ul').hide();
        createRecentButtonHandler();
        createMonthYearButtonHandlers();
        createLiDateHandlers();
        dateMenu.show();
    }

    function createRecentButtonHandler() {
        var buttonRecent = dateMenu.find('button[data-name="Ostatnie"]');
        buttonRecent.on('click', function () {
            mainContent.hide();
            mainContent.html(uiCreator.createFileWrappers(
                filter.getRecentFiles()));
            mainContent.show();
        });
    }

    function createMonthYearButtonHandlers() {
        var buttons = dateMenu.find('button').not('[data-name="Ostatnie"]');
        $.each(buttons, function (index, value) {
            var elem = $(value);
            elem.on('click', function () {
                elem.next().slideToggle('slow');
            });
        });
    }

    function createLiDateHandlers() {
        var days = dateMenu.find('li[data-day]');
        $.each(days, function (index, value) {
            var elem = $(value);
            elem.on('click', function () {
                mainContent.hide();
                mainContent.html(uiCreator.createFileWrappers(filter.getFilesFromDay(
                    elem.attr('data-day'))));
                mainContent.show();
            });
        });
    }

    function intialize() {
        createMenuElems();
        mainContent.hide();
        mainContent.html(uiCreator.createFileWrappers(
            filter.getRecentFiles()));
        mainContent.show();
    }

    intialize();
}

function PageWithOrderSelection(filter) {
    var orderMenu = $('.oldFaxes-content').find('.category-selector');
    var mainContent = $('.oldFaxes-content').children('.main-content');

    function createMenuElems() {
        orderMenu.hide();
        orderMenu.html(uiCreator.createOrderSelection(filter.getOrderNames()));
        orderMenu.show();
    }

    function createButtonHandlers() {
        var buttons = orderMenu.find('button');
        $.each(buttons, function (index, value) {
            var elem = $(value);
            elem.on('click', function () {
                console.log(elem.attr('data-name'));
                mainContent.hide();
                mainContent.html(uiCreator.createFileWrappers(
                    filter.sortFilesBy(elem.attr('data-name'))));
                mainContent.show();
            });
        });
    }

    function intialize() {
        createMenuElems();
        createButtonHandlers();
        mainContent.hide();
        mainContent.html(uiCreator.createFileWrappers(
            filter.getRecentFiles()));
        mainContent.show();
    }

    intialize();
}

module.exports = {
    createFilesWithDateFiltersPage: createFilesWithDateFiltersPage,
    createFileswithOrderSelectionPage: createFileswithOrderSelectionPage
};
