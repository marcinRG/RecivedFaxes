'use strict';
var $ = require('jquery');
var dataContext = require('../data/dataContext');
var dataFilters = require('../dataFilters/dataFilters');
var uiCreator = require('./uiElements');
var anims = require('../utils/animations');
var pageWithOrderSelection = new PageWithOrderSelection();

function PageWithOrderSelection() {
    var orderMenu = $('.oldFaxes-content').find('.category-selector');
    var mainContent = $('.oldFaxes-content').children('.main-content');

    function createMenuElems(filter) {
        orderMenu.html(uiCreator.createOrderSelection(filter.getOrderNames()));
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

var pageWithOrderSelection = new PageWithOrderSelection();

function createFileswithOrderSelectionPage() {
    return $.when(dataContext.getOldFaxes())
        .then(function (data) {
            var orderFilter = dataFilters.FilesWithOrderSelection(data);
            pageWithOrderSelection.create(orderFilter);
        });
}

module.exports = {
    createFileswithOrderSelectionPage: createFileswithOrderSelectionPage
};
