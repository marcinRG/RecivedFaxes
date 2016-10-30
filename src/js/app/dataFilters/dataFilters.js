'use strict';

var _ = require('lodash');
var months = ['styczeń', 'luty', 'marzec', 'kwiecień', 'maj', 'czerwiec', 'lipiec', 'sierpień', 'wrzesień', 'październik', 'listopad', 'grudzień'];
var files;
var fileFilters;


function createFileObject(obj) {
    var newObj = new Object();
    newObj.path = obj.path;
    newObj.fileName = obj.fileName;
    newObj.date = new Date(obj.modified);
    return newObj;
}

function createFilters(obj) {
    var objNew = new Object();
    objNew.name = months[obj.date.getMonth()] + ' ' + obj.date.getFullYear();
    objNew.month = obj.date.getMonth();
    objNew.year = obj.date.getFullYear();
    return objNew;
}

function getFilesSortedByMonthsYears() {

}

function getFilesSortedByDays() {

}

function getFileFilters() {
    return fileFilters;
}

function getAllFiles() {
    return files;
}

function intialize(data) {
    files = _.orderBy(_.map(data, createFileObject), 'date', 'desc');
    fileFilters = _.uniqBy(_.map(files, createFilters), function (value) {
        return value.name;
    });

    var days = _.filter(files, function (obj) {
        return (obj.date.getMonth() + obj.date.getFullYear() === fileFilters[0].month + fileFilters[0].year);
    });

    var days2 = _.chain(files).map(function (value) {
        var newobj = {};
        newobj.dateStr = value.date.toLocaleDateString('pl-Pl');
        newobj.date = value.date;
        return newobj;
    })
        .filter(function (obj) {
            return (obj.date.getMonth() + obj.date.getFullYear() === fileFilters[0].month + fileFilters[0].year);
        }).uniqBy(function (value) {
            return value.date
        }).value();

    console.log(days2);


}

module.exports = {
    intialize: intialize,
    getAllFiles: getAllFiles,
    getFileFilters: getFileFilters
};