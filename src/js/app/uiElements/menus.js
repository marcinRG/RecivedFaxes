'use strict';

var $ = require('jquery');
var menus = $('*[data-menu]');

function test() {
    console.log(menus);
}

function Menu(menuElem) {
    var menuItems = menuElem.children('')
}

module.exports = {
    test: test
};
