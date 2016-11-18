'use strict';

var website = require('../settings/app.settings').website;

function isSmall() {
    if (window.innerWidth < website.breakPoint) {
        return true;
    }
    return false;
}

module.exports = {
    isSmall: isSmall
};
