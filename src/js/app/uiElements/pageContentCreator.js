'use strict';

var $ = require('jquery');
var dataContext = require('../data/dataContext');
var dataFilters = require('../dataFilters/dataFilters');
var uiCreator = require('./uiElements');
var anims = require('../utils/animations');
var navbarButtons = require('../uiElements/navBarButtons');

// navbarButton.create($('.faxes-content .show-menu'),
//     $('.faxes-content .date-selector'));
// navbarButton.create($('.oldFaxes-content .show-menu'),
//     $('.oldFaxes-content .category-selector'));
//var navbarButton = require('./uiElements/navBarButtons');

var pageWithDateFilters = new PageWithDateFilters();
var pageWithOrderSelection = new PageWithOrderSelection();

function createFilesWithDateFiltersPage() {
    return $.when(dataContext.getFaxes())
        .then(function (data) {
            var dateFilter = dataFilters.FilesWithDateFilter(data);
            pageWithDateFilters.create(dateFilter);
        });
}

function createFileswithOrderSelectionPage() {
    return $.when(dataContext.getOldFaxes())
        .then(function (data) {
            var orderFilter = dataFilters.FilesWithOrderSelection(data);
            pageWithOrderSelection.create(orderFilter);
        });
}

function createMenuButton(button, menu) {
    var span = document.createElement('span');
    $(span).html('&#9660;');
    $(button).html('');
    $(button).append(span);
    navbarButtons.create($(button), menu);
}

function PageWithDateFilters() {
    var dateMenu = $('.faxes-content').find('.date-selector');
    var mainContent = $('.faxes-content').children('.main-content');
    var button = $('.faxes-content').find('.show-menu');

    function createMenuElems(filter) {
        dateMenu.html(uiCreator.createMenuDateFilters(filter.getDateFilters()));
        dateMenu.find('ul').hide();
        createRecentButtonHandler(filter);
        createMonthYearButtonHandlers();
        createLiDateHandlers(filter);
        createMenuButton(button, dateMenu);
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

function PageWithOrderSelection() {
    var orderMenu = $('.oldFaxes-content').find('.category-selector');
    var mainContent = $('.oldFaxes-content').children('.main-content');
    var button = $('.oldFaxes-content').find('.show-menu');

    function createMenuElems(filter) {
        orderMenu.html(uiCreator.createOrderSelection(filter.getOrderNames()));
        createMenuButton(button, orderMenu);
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

    function createButtonHandlers(filter) {
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

    function intialize(filter) {
        createMenuElems(filter);
        createButtonHandlers(filter);
        mainContent.hide();
        mainContent.html(uiCreator.createFileWrappers(
            filter.getRecentFiles()));
        mainContent.show().slideDown(1000);
    }

    return {
        create: intialize
    };
}

module.exports = {
    createFilesWithDateFiltersPage: createFilesWithDateFiltersPage,
    createFileswithOrderSelectionPage: createFileswithOrderSelectionPage
};
