'use strict';

var dateUtils = require('./date.utils');

function countAdditionalTime(timeParams) {
    var addTime = 0;
    if (timeParams) {
        if (timeParams.hours) {
            addTime = addTime + (parseNumberWithMaxValue(timeParams.hours, 23)) *
                60 * 60 * 1000;
        }
        if (timeParams.minutes) {
            addTime = addTime + (parseNumberWithMaxValue(timeParams.minutes, 59)) *
                60 * 1000;
        }
        if (timeParams.seconds) {
            addTime = addTime + (parseNumberWithMaxValue(timeParams.seconds, 59)) *
                1000;
        }
    }
    return addTime;
}

function getDateDelayedByTimeParams(timeParams, date) {
    var dateNew = dateUtils.getNewOrCurrentDate(date);
    var addTime = countAdditionalTime(timeParams);
    if (addTime > 0) {
        dateNew.setTime(dateNew.getTime() + addTime);
    }
    return dateNew;
}

function parseNumberWithMaxValue(str, maxValue) {
    var num = Number.parseInt(str.toString());
    if (num <= maxValue) {
        return num;
    }
    return maxValue;
}

module.exports = {
    getDateDelayedByTimeParams: getDateDelayedByTimeParams,
    countAdditionalTime: countAdditionalTime,
    parseNumberWithMaxValue: parseNumberWithMaxValue
};
