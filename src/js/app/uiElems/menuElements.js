'use strict';
function createButton(txt) {
    var button = document.createElement('button');
    button.textContent = txt;
    return button;
}

function createlistElem(value) {
    var li = document.createElement('li');
    var link = document.createElement('a');
    link.textContent = value;
    li.appendChild(link);
    return li;
}

function createUnorderedList(days) {
    var ul = document.createElement('ul');
    for (var i = 0; i < days.length; i++) {
        ul.appendChild(createlistElem(days[i].dateStr));
    }
    return ul;
}

function createMenuDatesFilters(dataFilterValues) {
    var div = document.createElement('div');
    var buttonRecent = createButton('Ostatnie');
    div.appendChild(buttonRecent);
    dataFilterValues.forEach(function (value) {
        div.appendChild(createButton(value.monthYear));
        div.appendChild(createUnorderedList(value.days));
    });
    return div;
}

module.exports = {
    createMenuDateFilters: createMenuDatesFilters
};
