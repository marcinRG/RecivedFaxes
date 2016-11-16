'use strict';

var _ = require('lodash');
var dateUtils = require('../utils/date.utils');

function intializeFileCollection(files) {
    return _.chain(files)
        .map(createDatePathFileNameObj)
        .orderBy('date', 'desc')
        .value();
}

function FilesListWithDateFilter(data) {
    var files = intializeFileCollection(data);

    function getRecentFiles() {
        return files.slice(0,10);
    }

    function getDateFilters() {
        return _.chain(files)
            .groupBy(getMonthNameYear)
            .map(function (value, key) {
                return {
                    monthYear: key,
                    days: createDaysTable(value)
                };
            })
            .value();
    }

    function getFilesFromDay(dateString) {
        return _.filter(files, function (value) {
            return (dateUtils.date2string(value.date) === dateString);
        });
    }

    return {
        getRecentFiles:getRecentFiles,
        getDateFilters: getDateFilters,
        getFilesFromDay: getFilesFromDay
    };
}

function FilesListWithOrderSelection(data) {
    var files = intializeFileCollection(data);
    var lastOrder = {};
    var orderMethods = [
        {name: 'Datami utworzenia', value: 'date', sort: 'asc'},
        {name: 'Nazwami plików', value: 'fileName', sort: 'asc'}
    ];

    function getOrderNames() {
        return _.chain(orderMethods)
            .orderBy('name', 'asc')
            .map(function (value) {
                return value.name;
            })
            .value();
    }

    function setSortOrder(sortName) {
        if (sortName !== lastOrder.name) {
            lastOrder = _.filter(orderMethods, function (value) {
                return value.name === sortName;
            })[0];
            return;
        }
        lastOrder.sort = lastOrder.sort === 'asc' ? 'desc' : 'asc';
    }

    function getRecentFiles() {
        return files.slice(0,10);
    }

    function sortFilesBy(sortName) {
        setSortOrder(sortName);
        return _.orderBy(files, lastOrder.value, lastOrder.sort);
    }

    return {
        getOrderNames: getOrderNames,
        sortFilesBy: sortFilesBy,
        getRecentFiles:getRecentFiles
    };
}

function getMonthNameYear(obj) {
    return dateUtils.getMonthNameYear(obj.date);
}

function createDatePathFileNameObj(obj) {
    return {
        path: obj.path,
        fileName: obj.fileName,
        date: new Date(obj.modified)
    };
}

function createDaysTable(monthDays) {
    return _.chain(monthDays)
        .map(function (day) {
            return {
                dateStr: dateUtils.date2string(day.date)
            };
        })
        .uniqBy('dateStr')
        .value();
}

module.exports = {
    FilesWithDateFilter: FilesListWithDateFilter,
    FilesWithOrderSelection: FilesListWithOrderSelection,
    createDatePathFileNameObj: createDatePathFileNameObj
};
