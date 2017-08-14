'use strict';
var $ = require('jquery');
var localForage = require('localforage');
//var utils = require('./utils/utilities');
var settings = require('./settings/app.settings').storageConfig;
var navElem = require('./uiElements/mainNav')();

$.when(localForage.config(settings)).then(function () {
    //navElem.start();
});
