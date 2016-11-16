'use strict';

var $ = require('jquery');
var dataContext = require('../dataContext/dataContext');
var dataFilters = require('../dataFilters/dataFilters');
var uiCreator = require('./uiElements');

function createMenu() {
    $.when(dataContext.getFaxes())
        .then(function (data) {
                var filesWithDateFilter = dataFilters.FilesWithDateFilter(data);
                return filesWithDateFilter;
            })
        .then(function (filter) {
            console.log(filter.getDateFilters());
        });
}

module.exports = {
    createMenu: createMenu
};
