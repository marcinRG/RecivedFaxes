'use strict';

var months = ['styczeń', 'luty', 'marzec', 'kwiecień', 'maj', 'czerwiec', 'lipiec',
    'sierpień', 'wrzesień', 'październik', 'listopad', 'grudzień'];

function date2string(date) {
    var day;
    var month;
    day = date.getDate();
    if (date.getDate() < 10) {
        day = '0' + date.getDate();
    }
    month = date.getMonth() + 1;
    if (date.getMonth() + 1 < 10) {
        month = '0' + (date.getMonth() + 1).toString();
    }
    return date.getFullYear() + '-' + month + '-' + day;
}

function getMonthNameYear(date) {
    return months[date.getMonth()] + ' ' + date.getFullYear();
}

function getNewOrCurrentDate(date) {
    if (date && date instanceof Date) {
        return date;
    }
    return new Date();
}

function compareDates(dateSmaller, dateBigger) {
    return (dateSmaller.getTime() < dateBigger.getTime());
}

module.exports = {
    date2string: date2string,
    getMonthNameYear: getMonthNameYear,
    getNewOrCurrentDate: getNewOrCurrentDate,
    compareDates: compareDates
};
