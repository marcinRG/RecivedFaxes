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

function returnExpirableData(data, errorMsg, date) {
    console.log('----Expir data');
    var deferred = $.Deferred();
    if (data !== null) {
        if (hasExpirationDate(data)) {
            console.log('-----Expir data has expiration');
            if (isValidDate(data, date)) {
                console.log('------Expir data valid date');
                deferred.resolve(data.value);
            }
            else {
                console.log('------Expir data not valid date');
                deferred.reject(errorMsg);
            }
        }
        else {
            deferred.resolve(data);
        }
    }
    console.log('------before leve expir');
    return deferred;
}

function getItem(key, errorMsg) {
    var date = new Date();
    var deferred = $.Deferred();
    console.log('Poczatek');
    $.when(localForage.getItem(key)).done(function (data) {
        console.log('Dane');
        if (data !== null) {
            console.log('Data not null');
            return returnExpirableData(data, errorMsg, date);
        }
        else {
            deferred.reject(errorMsg);
        }
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
    returnExpirableData: returnExpirableData,
    getDataFromServer: getDataFromServer,
    getData: getData,
    getDataFromServerAndAddToStorage: getDataFromServerAndAddToStorage,
    setItem: setItem,
    getItem: getItem
};
