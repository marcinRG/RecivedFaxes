'use strict';

var _ = require('lodash');
var months = ['styczeń', 'luty', 'marzec', 'kwiecień', 'maj', 'czerwiec', 'lipiec', 'sierpień', 'wrzesień', 'październik', 'listopad', 'grudzień'];

function filesWithDateFilter(data) {
    var files;

    function intialize(inputFiles) {
        files = _.chain(inputFiles)
            .map(getModifiedObj)
            .orderBy('date', 'desc')
            .value();
    }

    function getFilters() {
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

    intialize(data);
    return {
        getFilters: getFilters
    };
}

function getModifiedObj(obj) {
    return {
        path: obj.path,
        fileName: obj.fileName,
        date: new Date(obj.modified)
    };
}

function getMonthNameYear(obj) {
    return months[obj.date.getMonth()] + ' ' + obj.date.getFullYear();
}

function date2Str(date) {
    var day;
    var month;
    day = date.getUTCDate();
    if (date.getUTCDate() < 10) {
        day = '0' + date.getUTCDate();
    }
    month = date.getMonth() + 1;
    if (date.getMonth() + 1 < 10) {
        month = '0' + (date.getMonth() + 1).toString();
    }
    return date.getFullYear() + '-' + month + '-' + day;
}

function createDaysTable(monthDays) {
    return _.chain(monthDays)
        .map(function (day) {
            return {
                dateStr: date2Str(day.date)
            };
        })
        .uniqBy('dateStr')
        .value();
}

module.exports = {
    filesWithDateFilter: filesWithDateFilter,
    date2Str: date2Str,
    getMonthNameYear: getMonthNameYear,
    getModifiedObj: getModifiedObj,
    months: months
};