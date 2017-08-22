'use strict';
var $ = require('jquery');
var pageSettings = require('../settings/app.settings').website;

function NavBarButton() {
    var win = $(window);
    var pageSmallSize = pageSettings.breakPoint;
    var slideTime = pageSettings.menuSlideTime || 1000;
    var prevWidth = win.outerWidth();

    function isSmallSize(size) {
        return (size < pageSmallSize);
    }

    function toggleMenuOnButtonPressHandler(navBtn, menu) {
        navBtn.on('click', function () {
            menu.slideToggle(slideTime);
        });
    }

    function toggleMenuOnBrowserResizeHandler(menu) {
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
        toggleMenuOnBrowserResizeHandler(menu);
        toggleMenuOnButtonPressHandler(navBtn, menu);
    }

    return {
        create: create
    };
}

module.exports = new NavBarButton();
