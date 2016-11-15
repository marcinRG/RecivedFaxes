'use strict';

var $ = require('jquery');

var pages = {
    faxes: $('.faxes-content'),
    oldFaxes: $('.oldFaxes-content'),
    settings: $('.settings-content')
};

var loader = $('.loader');
var navElements = $('nav ul').children();

function hideAll() {
    for (var page in pages) {
        if (pages.hasOwnProperty(page)) {
            pages[page].hide();
        }
    }
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

function removeHiddenClass() {
    pages.faxes.removeClass('hidden');
    pages.oldFaxes.removeClass('hidden');
    pages.settings.removeClass('hidden');
}

function removeSelectedFromAllNavElems() {
    $.each(navElements, function (index) {
        $(navElements[index]).removeClass('selected');
    });
}

function setSelected(elem) {
    elem.addClass('selected');
}

function intialize() {
    hideAll();
    removeHiddenClass();
    $.each(navElements, function (index, value) {
        var elem = $(value);
        elem.on('click', function () {
            showLoading();
            removeSelectedFromAllNavElems();
            hideAll();
            setSelected(elem);
            showPage(elem.attr('data-name'));
            hideLoading();
        });
    });

}

module.exports = {
    intialize: intialize
};
