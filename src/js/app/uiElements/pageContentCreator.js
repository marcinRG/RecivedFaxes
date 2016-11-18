'use strict';

var $ = require('jquery');
var dataContext = require('../dataContext/dataContext');
var dataFilters = require('../dataFilters/dataFilters');
var uiCreator = require('./uiElements');
var pageController = require('./pageController');
var anims = require('../animations/animations');

function createFilesWithDateFiltersPage() {
    pageController.showLoading();
    $.when(dataContext.getFaxes())
        .then(function (data) {
            return dataFilters.FilesWithDateFilter(data);
        })
        .then(function (dateFilter) {
            pageController.hideLoading();
            pageController.showPage('faxes');
            new PageWithDateFilters(dateFilter);
        });
}

function createFileswithOrderSelectionPage() {
    pageController.showLoading();
    $.when(dataContext.getOldFaxes())
        .then(function (data) {
            return dataFilters.FilesWithOrderSelection(data);
        })
        .then(function (orderFilter) {
            pageController.hideLoading();
            pageController.showPage('oldFaxes');
            new PageWithOrderSelection(orderFilter);
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

    function createLiDateHandlers() {
        var days = dateMenu.find('li[data-day]');
        $.each(days, function (index, value) {
            var elem = $(value);
            elem.on('click', function () {
                mainContent.hide();
                mainContent.html(uiCreator.createFileWrappers(filter.getFilesFromDay(
                    elem.attr('data-day'))));
                anims.changeOpacity(mainContent);
            });
        });
    }

    function intialize() {
        createMenuElems();
        mainContent.hide();
        mainContent.html(uiCreator.createFileWrappers(
            filter.getRecentFiles()));
        mainContent.show().slideDown(1000);
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

    function hideSpansFromButtons() {
        var buttons = orderMenu.find('button');
        $.each(buttons, function (index) {
            $(buttons[index]).children('span').hide();
        });
    }

    function setSpanContent(span, sort) {
        if (sort === 'desc') {
            span.html('&#9660;');
            return 'asc';
        }
        else {
            span.html('&#9650;');
            return 'desc';
        }
    }

    function createButtonHandlers() {
        var buttons = orderMenu.find('button');
        hideSpansFromButtons();
        $.each(buttons, function (index, value) {
            var elem = $(value);
            var span = elem.children('span');
            var sort = 'asc';
            elem.on('click', function () {
                mainContent.hide();
                hideSpansFromButtons();
                sort = setSpanContent(span, sort);
                span.show();
                mainContent.html(uiCreator.createFileWrappers(
                    filter.sortFilesBy(elem.attr('data-name'))));
                anims.changeOpacity(mainContent);
            });
        });
    }

    function intialize() {
        createMenuElems();
        createButtonHandlers();
        mainContent.hide();
        mainContent.html(uiCreator.createFileWrappers(
            filter.getRecentFiles()));
        mainContent.show().slideDown(1000);
    }

    intialize();
}

module.exports = {
    createFilesWithDateFiltersPage: createFilesWithDateFiltersPage,
    createFileswithOrderSelectionPage: createFileswithOrderSelectionPage
};
