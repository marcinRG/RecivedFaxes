'use strict';

var $ = require('jquery');
var pageCreator = require('./pageContentCreator');

function NavBarControls() {
    var pages = {
        faxes: $('.faxes-content'),
        oldFaxes: $('.oldFaxes-content'),
        settings: $('.settings-content')
    };

    var loader = $('.loader');
    var navElements = $('nav ul').children();
    var faxesNav = navElements.filter('[data-name="faxes"]');
    var oldfaxesNav = navElements.filter('[data-name="oldFaxes"]');
    var settingsNav = navElements.filter('[data-name="settings"]');

    function hideAll() {
        pages.faxes.hide();
        pages.oldFaxes.hide();
        pages.settings.hide();
    }

    function showLoading() {
        loader.show('fast');
    }

    function hideLoading() {
        loader.hide();
    }

    function showPage(name) {
        pages[name].show('slow');
    }

    function removeSelectedFromAllNavElems() {
        $.each(navElements, function (index) {
            $(navElements[index]).removeClass('selected');
        });
    }

    function setSelected(elem) {
        elem.addClass('selected');
    }

    function beforePageSet() {
        hideAll();
        showLoading();
        removeSelectedFromAllNavElems();
    }

    function afterPageSet(elem) {
        hideLoading();
        setSelected(elem);
        showPage(elem.attr('data-name'));
    }

    function addHandlerToFaxesElem() {
        faxesNav.on('click', function () {
            $.when(beforePageSet())
                .then(pageCreator.createFilesWithDateFiltersPage())
                .then(afterPageSet(faxesNav));
        });
    }

    function addHandlerToOldFaxesElem() {
        oldfaxesNav.on('click', function () {
            $.when(beforePageSet())
                .then(pageCreator.createFileswithOrderSelectionPage())
                .then(afterPageSet(oldfaxesNav));
        });
    }

    function addHandlerToSettingsElem() {
        settingsNav.on('click', function () {
            $.when(beforePageSet())
                .then(function () {
                })
                .then(afterPageSet(settingsNav));
        });
    }

    function intialize() {
        hideLoading();
        hideAll();
        addHandlerToFaxesElem();
        addHandlerToOldFaxesElem();
        addHandlerToSettingsElem();
        pageCreator.createFilesWithDateFiltersPage();
        afterPageSet(faxesNav);
    }

    return {
        start:intialize
    };

}

module.exports = NavBarControls;
