'use strict';

var $ = require('jquery');

var pages = {
    faxes: $('.faxes-content'),
    oldFaxes: $('.oldFaxes-content'),
    settings: $('.settings-content')
};

var loader = $('.loader');

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

module.exports = {
    pages:pages,
    hideAll:hideAll,
    showLoading:showLoading,
    hideLoading:hideLoading,
    showPage:showPage
};
