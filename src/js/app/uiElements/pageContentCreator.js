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
            var val = uiCreator.createFileWrappers(filter.getRecentFiles());
            mainContent.html(val);
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
                var val = uiCreator.createFileWrappers(filter.getFilesFromDay(
                    elem.attr('data-day')));
                mainContent.html(val);
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

function PageWith(){

}

module.exports = {
    createFilesWithDateFiltersPage: createFilesWithDateFiltersPage
};
