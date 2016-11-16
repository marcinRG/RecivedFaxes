'use strict';
var dateUtils = require('../utils/date.utils');

function createButton(txt) {
    var button = document.createElement('button');
    button.textContent = txt;
    return button;
}

function createlistDateElem(value) {
    var li = document.createElement('li');
    var link = document.createElement('a');
    link.textContent = value;
    li.appendChild(link);
    return li;
}

function createUnorderedListForFileWrapper(fileProperties) {
    var ul = document.createElement('ul');
    var liFileName = document.createElement('li');
    var strongName = document.createElement('strong');
    var liDate = document.createElement('li');
    var strongDate = document.createElement('strong');

    liFileName.textContent = 'Nazwa pliku:';
    strongName.textContent = fileProperties.fileName.slice(0, 34);
    liFileName.appendChild(strongName);
    liDate.textContent = 'Data utworzenia:';
    strongDate.textContent = dateUtils.date2string(fileProperties.date);
    liDate.appendChild(strongDate);
    ul.appendChild(liFileName);
    ul.appendChild(liDate);
    return ul;
}

function createUnorderedListForDates(days) {
    var ul = document.createElement('ul');
    for (var i = 0; i < days.length; i++) {
        ul.appendChild(createlistDateElem(days[i].dateStr));
    }
    return ul;
}

function createMenuDatesFilters(dataFilterValues) {
    var div = document.createElement('div');
    var buttonRecent = createButton('Ostatnie');
    div.appendChild(buttonRecent);
    dataFilterValues.forEach(function (value) {
        div.appendChild(createButton(value.monthYear));
        div.appendChild(createUnorderedListForDates(value.days));
    });
    return div;
}

function createOrderSelection(orderValues) {
    var div = document.createElement('div');
    orderValues.forEach(function (value) {
        div.appendChild(createButton(value));
    });
    return div;
}

function createDivFileWrapper(fileProperties) {
    var div = document.createElement('div');
    var img = document.createElement('img');
    img.setAttribute('src', 'images/pdf.png');
    div.classList.add('file-container');
    div.appendChild(img);
    div.appencChild(createUnorderedListForFileWrapper(fileProperties));
    return div;
}

function createFileWrappers(filePropertiesArray) {
    var fragment = document.createDocumentFragment();
    filePropertiesArray.forEach(function (fileProperties) {
        fragment.appendChild(createDivFileWrapper(fileProperties));
    });
    return fragment;
}

module.exports = {
    createMenuDateFilters: createMenuDatesFilters,
    createOrderSelection: createOrderSelection,
    createFileWrappers: createFileWrappers
};
