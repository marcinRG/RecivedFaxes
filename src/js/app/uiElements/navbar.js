'use strict';

var $ = require('jquery');
var pages = require('./pages')();

function NavBar() {
    var navElements = $('.navbar > .menu  li');
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

    function pageSet(elem,pageName) {
        removeSelectedFromAllNavElems();
        setSelectedNavElem(elem);
        pages.showPage(pageName);

    }

    function addHandlerToNavElem(elem, pageName) {
        elem.on('click', function () {
            pageSet(elem,pageName);
        });
    }

    function initialize() {
        addHandlerToNavElem(faxesNav, 'faxes');
        addHandlerToNavElem(oldFaxesNav, 'oldFaxes');
        addHandlerToNavElem(settingsNav, 'settings');
        pageSet(faxesNav,'faxes');
    }

    return {
        start: initialize
    };
}

module.exports = NavBar;
