'use strict';
function getDelayedDate(dateParams, currentDate) {
    var date = getDateValue(currentDate);
    var addTime = countAdditionalTime(dateParams);
    if (addTime > 0) {
        date.setTime(date.getTime() + addTime);
    }
    return date;
}

function getDateValue(currentDate) {
    if (currentDate && currentDate instanceof Date) {
        return currentDate;
    }
    return new Date();
}

function countAdditionalTime(dateParams) {
    var addTime = 0;
    if (dateParams) {
        if (dateParams.hours) {
            addTime = addTime + (parseNumber(dateParams.hours, 23)) * 60 * 60 * 1000;
        }
        if (dateParams.minutes) {
            addTime = addTime + (parseNumber(dateParams.minutes, 23)) * 60 * 1000;
        }
        if (dateParams.seconds) {
            addTime = addTime + (parseNumber(dateParams.minutes, 23)) * 1000;
        }
        return addTime;
    }
}

function parseNumber(str, maxValue) {
    var num = Number.parseInt(str.toString());
    if (num <= maxValue) {
        return num;
    }
    return maxValue;
}

function smallerDate(dateSmaller, dateBigger) {
    return (dateSmaller.getTime() < dateBigger.getTime());
}

module.exports = {
    getDelayedDate: getDelayedDate,
    parseNumber: parseNumber,
    smallerDate: smallerDate
};
