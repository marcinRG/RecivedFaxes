'use strict';
var $ = require('jquery');
var localForage = require('localforage');
var settings = require('./settings/app.settings').storageConfig;
var mainNavbar = require('./uiElements/navbar')();

$.when(localForage.config(settings)).then(function () {
    mainNavbar.start();
});
