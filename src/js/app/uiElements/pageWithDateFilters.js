'use strict';
var $ = require('jquery');
var dataContext = require('../data/dataContext');
var dataFilters = require('../dataFilters/dataFilters');
var uiCreator = require('./uiElements');
var anims = require('../utils/animations');
var pageWithDateFilters = new PageWithDateFilters();

function PageWithDateFilters() {
    var dateMenu = $('.faxes-content').find('.date-selector');
    var mainContent = $('.faxes-content').children('.main-content');

    function createMenuElems(filter) {
        dateMenu.html(uiCreator.createMenuDateFilters(filter.getDateFilters()));
        dateMenu.find('ul').hide();
        createRecentButtonHandler(filter);
        createMonthYearButtonHandlers();
        createLiDateHandlers(filter);
    }

    function createRecentButtonHandler(filter) {
        var buttonRecent = dateMenu.find('button[data-name="Ostatnie"]');
        buttonRecent.on('click', function () {
            mainContent.hide();
            mainContent.html(uiCreator.createFileWrappers(
                filter.getRecentFiles()));
            anims.changeOpacity(mainContent);
        });
    }

    function createMonthYearButtonHandlers() {
        var buttons = dateMenu.find('button').not('[data-name="Ostatnie"]');
        $.each(buttons, function (index, value) {
            var elem = $(value);
            elem.on('click', function () {
                if (elem.next().is(':hidden')) {
                    anims.rotateToDown(elem.children('span'));
                }
                else {
                    anims.rotateToUp(elem.children('span'));
                }
                elem.next().slideToggle('slow');
            });
        });
    }

    function createLiDateHandlers(filter) {
        var days = dateMenu.find('li[data-day]');
        $.each(days, function (index, value) {
            var elem = $(value);
            elem.on('click', function () {
                console.log('date click');
                mainContent.hide();
                mainContent.html(uiCreator.createFileWrappers(filter.getFilesFromDay(
                    elem.attr('data-day'))));
                anims.changeOpacity(mainContent);
            });
        });
    }

    function intialize(filter) {
        createMenuElems(filter);
        mainContent.hide();
        mainContent.html(uiCreator.createFileWrappers(
            filter.getRecentFiles()));
        mainContent.show().slideDown(1000);
    }

    return {
        create: intialize
    };
}

function createFilesWithDateFiltersPage() {
    return $.when(dataContext.getFaxes())
        .then(function (data) {
            var dateFilter = dataFilters.FilesWithDateFilter(data);
            pageWithDateFilters.create(dateFilter);
        });
}

module.exports = {
    createFilesWithDateFiltersPage: createFilesWithDateFiltersPage
};
