'use strict';
var $ = require('jquery');
var localForage = require('localforage');
var utils = require('./utils/utilities');

var settings = require('./settings/app.settings').storageConfig;
var navElem = require('./uiElements/mainNav')();

window.addEventListener('resize', function () {
    if (utils.isSmall()) {
        console.log('Małe');
    }
});

$.when(localForage.config(settings)).then(function () {
    navElem.start();
});
