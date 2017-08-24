'use strict';
var $ = require('jquery');
var pageSettings = require('../settings/app.settings').website;
var animations = require('../utils/animations');

function NavBarButton() {
    var win = $(window);
    var pageSmallSize = pageSettings.breakPoint;
    var slideTime = pageSettings.menuSlideTime || 1000;
    var prevWidth = win.outerWidth();

    function isSmallSize(size) {
        return (size < pageSmallSize);
    }

    function toggleNavButton(navBtn, menu) {
        var arrow = navBtn.children('span');
        if (menu.is(':hidden')) {
            console.log('is hidden');
            animations.rotateToDown(arrow);
        }
        else {
            console.log('is shown');
            animations.rotateToUp(arrow);
        }
    }

    function toggleMenuOnButtonPressHandler(navBtn, menu) {
        navBtn.on('click', function () {
            toggleNavButton(navBtn, menu);
            menu.slideToggle(slideTime);
        });
    }

    function toggleMenuOnBrowserResizeHandler(navBtn, menu) {
        win.on('resize', function () {
            var currentSize = win.outerWidth();
            if (isSmallSize(prevWidth) && !(isSmallSize(currentSize))) {
                menu.show();
            }
            if (!isSmallSize(prevWidth) && (isSmallSize(currentSize))) {
                menu.hide();
            }
            prevWidth = currentSize;
        });
    }

    function create(navBtn, menu) {
        toggleMenuOnBrowserResizeHandler(navBtn, menu);
        toggleMenuOnButtonPressHandler(navBtn, menu);
    }

    return {
        create: create
    };
}

module.exports = new NavBarButton();
