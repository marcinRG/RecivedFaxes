'use strict';

var $ = require('jquery');
var animations = require('../utils/animations');
var pageSettings = require('../settings/app.settings').website;

var menus = $('*[data-menu]');
var win = $(window);
var pageSmallSize = pageSettings.breakPoint;
var slideTime = pageSettings.menuSlideTime || 1000;

function Menu(menuElem) {
    var menuItems = $(menuElem).find('*[data-menu-items]');
    var menuButton = $(menuElem).find('*[data-menu-button]');
    var arrow = $(menuButton).children('span');
    var hidden = false;
    var size = win.outerWidth();

    function isSmallSize(size) {
        return (size < pageSmallSize);
    }

    function toggleMenu(hidden) {
        if (hidden) {
            $(menuItems).slideUp(slideTime);
            animations.rotateToUp(arrow);
        }
        else {
            $(menuItems).slideDown(slideTime);
            animations.rotateToDown(arrow);
        }
    }

    function resize() {
        var currentSize = win.outerWidth();
        if (isSmallSize(size) && !(isSmallSize(currentSize))) {
            if (hidden) {
                hidden = false;
                toggleMenu(hidden);
            }
        }
        if (!isSmallSize(size) && (isSmallSize(currentSize))) {
            hidden = true;
            toggleMenu(hidden);
        }
        size = currentSize;
    }

    function addClickHandler() {
        menuButton.on('click', function () {
            if (hidden) {
                hidden = false;
                toggleMenu(hidden);
            }
            else {
                hidden = true;
                toggleMenu(hidden);
            }
        });
    }

    function addOnResizeHandler() {
        win.on('resize', function () {
            resize();
        });
    }

    function intialize() {
        addOnResizeHandler();
        addClickHandler();
        if (isSmallSize(size)) {
            hidden = true;
            toggleMenu(hidden);
        }
        else {
            animations.rotateToDown(arrow);
        }
    }

    intialize();
}

function createMenus() {
    for (var i = 0; i < menus.length; i++) {
        new Menu(menus[i]);
    }
}

module.exports = {
    test: createMenus
};
