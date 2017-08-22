'use strict';
var $ = require('jquery');
var localForage = require('localforage');
var settings = require('./settings/app.settings').storageConfig;
var mainNavbar = require('./uiElements/navbar')();
var scrollableLinks = require('./uiElements/scrollableLinks')();

$.when(localForage.config(settings)).then(function () {
    scrollableLinks.run();
    mainNavbar.start();
});
