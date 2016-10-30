'use strict';

var $ = require('jquery');
var localForage = require('localforage');
var utils = require('../utils/utilities');

function getServerData(path, errorMsg) {
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

function getItem(key, errorMsg) {
    var date = new Date();
    var deferred = $.Deferred();
    $.when(localForage.getItem(key)).done(function (data) {
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

function getDataAddToLocal(path, key, errorMsg, expireParams) {
    return $.when(getServerData(path, errorMsg)).then(function (data) {
        return setItem(key, data, expireParams).then(function () {
            return getItem(key,errorMsg);
        });
    }).catch(function () {
        return errorMsg;
    });
}

function getCatchedData(path, key, errorMsg, expireParams) {
    return $.when(getItem(key, errorMsg))
        .then(function (data) {
            return data;
        }, function () {
            return getDataAddToLocal(path, key, errorMsg, expireParams);
        })
        .catch(function () {
            return errorMsg;
        });
}

module.exports = {
    getData: getServerData,
    getCatchedData: getCatchedData,
    getDataAddToLocal: getDataAddToLocal,
    setItem: setItem,
    getItem: getItem
};
