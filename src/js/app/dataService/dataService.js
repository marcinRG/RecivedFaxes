'use strict';

var $ = require('jquery');
var localForage = require('localforage');
var utils = require('../utils/utilities');

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
            expirationDate: utils.getDelayedDate(expireParams),
            value: value
        };
    }
    else {
        obj = value;
    }
    return $.when(localForage.setItem(key, obj));
}

function returnExpirableData(data,date) {
    var deferred = $.Deferred();
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
    return deferred;
}

function getItem(key, errorMsg) {
    var date = new Date();
    var deferred = $.Deferred();
    $.when(localForage.getItem(key)).done(function (data) {
        if (data !== null) {
            deferred = returnExpirableData(data,date);
        }
        else {
            deferred.reject(errorMsg);
        }
    }).fail(function () {
        deferred.reject(errorMsg);
    });
    return deferred.promise();
}

function hasExpirationDate(object) {
    return (object.expirationDate && object.expirationDate instanceof Date);
}

function isValidDate(object, date) {
    if (hasExpirationDate(object)) {
        if (utils.smallerDate(date, object.expirationDate)) {
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
    getDataFromServer: getDataFromServer,
    getData: getData,
    getDataFromServerAndAddToStorage: getDataFromServerAndAddToStorage,
    setItem: setItem,
    getItem: getItem
};
