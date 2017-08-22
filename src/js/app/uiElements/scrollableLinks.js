'use strict';
var $ = require('jquery');
var settings = require('../settings/app.settings').website;
var animations = require('../utils/animations');

var scrollableLinks = $('a[data-scrollable-link]');

function ScrollableLinks() {
    var links = scrollableLinks;
    var scrollTime = settings.scrollTime || 1000;

    function addClickEventsForLinks() {
        for (var i = 0; i < links.length; i++) {
            addEventHandler(links[i]);
        }
    }

    function addEventHandler(link) {
        var elem = $($(link).attr('href'));
        $(link).on('click', function (event) {
            event.preventDefault();
            animations.scrollTo(elem, scrollTime);
        });
    }

    return {
        run: function () {
            addClickEventsForLinks();
        }
    };
}

module.exports = ScrollableLinks;
