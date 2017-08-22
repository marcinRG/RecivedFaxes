'use strict';
var $ = require('jquery');
var bodyObj = $('html, body');

function scrollTo(elementTo, scrollTime) {

    bodyObj.animate({
        scrollTop: elementTo.offset().top
    }, scrollTime);
}

function changeOpacity(elem) {
    elem
        .show()
        .css({opacity: 0})
        .animate({opacity: 1}, 1500, 'swing');
}

function rotateToDown(elem) {
    rotate(elem, 0, 180);
}

function rotateToUp(elem) {
    rotate(elem, 180, 360);
}

function rotate(elem, start, end) {
    $({t: start}).animate({t: end}, {
        duration: 500,
        step: function (now) {
            elem.css('transform', 'rotate(' + now + 'deg)');
        }
    });
}

module.exports = {
    changeOpacity: changeOpacity,
    rotateToDown: rotateToDown,
    rotateToUp: rotateToUp,
    scrollTo: scrollTo
};
