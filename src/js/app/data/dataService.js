'use strict';

var $ = require('jquery');
var localForage = require('localforage');
var dateGen = require('../utils/dateGenerator');
var dateUtils = require('../utils/date.utils');

function getDataFromServer(path, errorMsg) {
    return $.when($.get(path)).done(function (data) {
        return data;
    }).fail(function () {
        return errorMsg;
    });
}

function setItem(key, value, expireParams) {
    var obj;
    if (expireParams) {
        obj = {
            expirationDate: dateGen.getDateDelayedByTimeParams(expireParams),
            value: value
        };
    }
    else {
        obj = value;
    }
    return $.when(localForage.setItem(key, obj));
}

function getRawData(data, errorMsg, date, deferred) {
    if (data !== null) {
        if (hasExpirationDate(data)) {
            if (isValidDate(data, date)) {
                deferred.resolve(data.value);
            }
            else {
                deferred.reject(errorMsg);
            }
        }
        else {
            deferred.resolve(data);
        }
    }
    deferred.reject(errorMsg);
}

function getItem(key, errorMsg) {
    var date = new Date();
    var deferred = $.Deferred();
    $.when(localForage.getItem(key)).done(function (data) {
        getRawData(data, errorMsg, date, deferred);
    }).fail(function () {
        deferred.reject(errorMsg);
    });
    return deferred;
}

function hasExpirationDate(object) {
    return (object.expirationDate && object.expirationDate instanceof Date);
}

function isValidDate(object, date) {
    if (hasExpirationDate(object)) {
        if (dateUtils.compareDates(date, object.expirationDate)) {
            return true;
        }
    }
    return false;
}

function getDataFromServerAndAddToStorage(path, key, errorMsg, expireParams) {
    return $.when(getDataFromServer(path, errorMsg)).then(function (data) {
        return setItem(key, data, expireParams).then(function () {
            return getItem(key, errorMsg);
        });
    }).catch(function () {
        return errorMsg;
    });
}

function getData(path, key, errorMsg, expireParams) {
    return $.when(getItem(key, errorMsg))
        .then(function (data) {
            return data;
        }, function () {
            return getDataFromServerAndAddToStorage(path, key, errorMsg, expireParams);
        })
        .catch(function () {
            return errorMsg;
        });
}

module.exports = {
    hasExpirationDate: hasExpirationDate,
    getDataFromServer: getDataFromServer,
    getData: getData,
    getDataFromServerAndAddToStorage: getDataFromServerAndAddToStorage,
    setItem: setItem,
    getItem: getItem
};
