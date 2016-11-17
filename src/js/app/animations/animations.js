'use strict';
var $ = require('jquery');

function changeOpacity(elem) {
    elem
        .css({opacity: 0})
        .animate({opacity: 1}, 100, 'swing');
}

function rotateToDown(elem) {
    rotate(elem, 0, 180);
}

function rotateToUp(elem) {
    rotate(elem, 180, 0);
}

function rotate(elem, start, end) {
    $({t: start}).animate({t: end}, {
        duration: 1000,
        step: function (now) {
            console.log(now);
            elem.css('transform', 'rotate(' + now + 'deg)');
        }
    });
}

module.exports = {
    changeOpacity: changeOpacity,
    rotateToDown: rotateToDown,
    rotateToUp: rotateToUp
};