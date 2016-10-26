'use strict';

var proxyquire = require('proxyquire');

var fsStub = {
    stat: function (path, callback) {
    }
};

var stats =  {
    isDirectory: function(){

    },
    isFile: function () {

    },
    mtime:'',
    birthtime:'',
}

var pathStub = {
    basename : function(str) {

    }
};
var asyncStub = {};

var fileReader = proxyquire('../../server/modules/fileReader', {
    path: pathStub,
    fs: fsStub,
    async: asyncStub
});

describe('Testy filtrow uzywanych w aplikacji', function () {
    it('powinien być wywołana funkcja processAllFilesFromDirectiory', function () {
        var spy = spyOn(fileReader,'readAllFilesFromDirectory');
        var iteratee = jasmine.createSpy('iteratee');
        var callback = jasmine.createSpy('callback');
        fileReader.readAllFilesFromDirectory('pathToFiles', 'routeToFile', iteratee, callback);
        expect(spy).toHaveBeenCalled();
    });
});

