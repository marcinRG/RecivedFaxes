'use strict';
var $ = require('jquery');
var localForage = require('localforage');
var settings = require('./settings/app.settings').storageConfig;
var mainNavbar = require('./uiElements/navbar')();
var scrollableLinks = require('./uiElements/scrollableLinks');
var navbarButton = require('./uiElements/navBarButtons');

$.when(localForage.config(settings)).then(function () {
    scrollableLinks.run();
    navbarButton.create($('.faxes-content .show-menu'),
        $('.faxes-content .date-selector'));
    navbarButton.create($('.oldFaxes-content .show-menu'),
        $('.oldFaxes-content .category-selector'));
    mainNavbar.start();
});
