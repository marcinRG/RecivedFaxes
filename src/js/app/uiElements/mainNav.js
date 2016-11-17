'use strict';

var $ = require('jquery');
var pageCreator = require('./pageContentCreator');
var pageController = require('./pageController');

function NavBarControls() {
    var navElements = $('nav ul').children();
    var faxesNav = navElements.filter('[data-name="faxes"]');
    var oldFaxesNav = navElements.filter('[data-name="oldFaxes"]');
    var settingsNav = navElements.filter('[data-name="settings"]');

    function setSelectedNavElem(elem) {
        elem.addClass('selected');
    }

    function removeSelectedFromAllNavElems() {
        $.each(navElements, function (index) {
            $(navElements[index]).removeClass('selected');
        });
    }

    function beforePageSet() {
        pageController.hideAll();
        removeSelectedFromAllNavElems();
    }

    function afterPageSet(elem) {
        setSelectedNavElem(elem);
    }

    function addHandlerToFaxesElem() {
        faxesNav.on('click', function () {
            $.when(beforePageSet())
                .then(pageCreator.createFilesWithDateFiltersPage())
                .then(afterPageSet(faxesNav));
        });
    }

    function addHandlerToOldFaxesElem() {
        oldFaxesNav.on('click', function () {
            $.when(beforePageSet())
                .then(pageCreator.createFileswithOrderSelectionPage())
                .then(afterPageSet(oldFaxesNav));
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
        pageController.hideAll();
        pageController.hideLoading();
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
