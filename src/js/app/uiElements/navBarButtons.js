'use strict';
var $ = require('jquery');
var pageSettings = require('../settings/app.settings').website;
var animations = require('../utils/animations');
var win = $(window);
var pageSmallSize = pageSettings.breakPoint;
var slideTime = pageSettings.menuSlideTime || 1000;

function NavBarButton(navBtn) {
    var hidden = false;
    var prevWidth = win.outerWidth();

    function isSmallSize(size) {
        return (size < pageSmallSize);
    }

    /*    function toggleNavButton(navBtn, menu) {
            var arrow = navBtn.children('span');
            if (menu.is(':hidden')) {
                console.log('is hidden');
                animations.rotateToDown(arrow);
            }
            else {
                console.log('is shown');
                animations.rotateToUp(arrow);
            }
        }*/

    function toggleMenuOnButtonPressHandler(navBtn) {
        navBtn.on('click', function () {
            console.log('click');
            console.log('hidden' + hidden);
            //toggleNavButton(navBtn, menu);
            //menu.slideToggle(slideTime);
        });
    }

    function toggleMenuOnBrowserResizeHandler() {
        win.on('resize', function () {
            var currentSize = win.outerWidth();
            if (isSmallSize(prevWidth) && !(isSmallSize(currentSize))) {
                //menu.show();
                console.log('xxx');
            }
            if (!isSmallSize(prevWidth) && (isSmallSize(currentSize))) {
                console.log('yyy');
                //menu.hide();
            }
            prevWidth = currentSize;
        });
    }

    toggleMenuOnButtonPressHandler(navBtn);
    toggleMenuOnBrowserResizeHandler();
}

module.exports = NavBarButton;
