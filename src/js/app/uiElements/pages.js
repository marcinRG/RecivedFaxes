'use strict';
var $ = require('jquery');
var pageContentCreator = require('./pageContentCreator');

var pages = {
    faxes: $('.faxes-content'),
    oldFaxes: $('.oldFaxes-content'),
    settings: $('.settings-content'),
    loader: $('.loader')
};

function Pages() {
    function hideAll() {
        pages.faxes.hide();
        pages.oldFaxes.hide();
        pages.settings.hide();
    }

    function initialize() {
        hideAll();
        pages.faxes.removeClass('hidden');
        pages.oldFaxes.removeClass('hidden');
        pages.settings.removeClass('hidden');
    }

    function createContentPage(pageName) {
        switch (pageName) {
            case 'faxes':
                return pageContentCreator.createFilesWithDateFiltersPage();
            case 'oldFaxes':
                return pageContentCreator.createFileswithOrderSelectionPage();
            case 'settings':
                return;
        }
    }

    function showPage(name) {
        hideAll();
        pages.loader.show();
        $.when(createContentPage(name))
            .then(pages.loader.slideUp(1000))
            .then(function () {
                pages[name].show(500);
            });
    }

    initialize();
    return {
        hideAll: hideAll,
        showPage: showPage
    };
}

module.exports = Pages;
