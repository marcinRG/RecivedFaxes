'use strict';
var proxyquire = require('proxyquire');

describe('Testy funkcji getFileProperties(filePath, callback) modułu fileReader.js', function () {
    var stats;
    var fsStub;
    var pathStub;
    var asyncStub;
    var fileReader;

    beforeEach(function () {
        pathStub = {
            basename: function (str) {
            }
        };

        stats = {
            isFile: function () {
            },
            mtime: 'xxxx',
            birthtime: 'yyyy'
        };

        fsStub = {
            statCalled: false,
            stat: function (path, callback) {
            }
        };

        fileReader = proxyquire('../../server/modules/fileReader', {
            path: pathStub,
            fs: fsStub,
            async: asyncStub
        });

    });

    it('powinien być wywołany callback i spy', function () {

        var spyIsFile = spyOn(stats, 'isFile').and.returnValue(false);
        var spyFsStat = spyOn(fsStub, 'stat').and.callFake(function (path, callback) {
            fsStub.statCalled = true;
            callback(null, stats);
        });

        var callback = jasmine.createSpy('callback');

        fileReader.getFileProperties('fakePath', callback);
        expect(spyIsFile).toHaveBeenCalled();
        expect(spyFsStat).toHaveBeenCalled();
        expect(fsStub.statCalled).toBeTruthy();
        expect(callback).toHaveBeenCalled();
    });

    it('powinien być wywołany callback z błędem', function () {

        var error = new Error('Test Error');
        var spyIsFile = spyOn(stats, 'isFile').and.returnValue(false);
        var spyFsStat = spyOn(fsStub, 'stat').and.callFake(function (path, callback) {
            fsStub.statCalled = true;
            callback(error);
        });

        var callback = jasmine.createSpy('callback');

        fileReader.getFileProperties('fakePath', callback);
        expect(spyIsFile).not.toHaveBeenCalled();
        expect(spyFsStat).toHaveBeenCalled();
        expect(fsStub.statCalled).toBeTruthy();
        expect(callback).toHaveBeenCalled();
    });

    it('powinien być wywołany callback z błędem', function () {

        var spyIsFile = spyOn(stats, 'isFile').and.returnValue(true);
        var spyPathBasename = spyOn(pathStub, 'basename').and.returnValue('++base++');
        var spyFsStat = spyOn(fsStub, 'stat').and.callFake(function (path, callback) {
            fsStub.statCalled = true;
            callback(null, stats);
        });

        var callback = jasmine.createSpy('callback');

        fileReader.getFileProperties('fakePath', callback);

        expect(spyIsFile).toHaveBeenCalled();
        expect(spyFsStat).toHaveBeenCalled();
        expect(spyPathBasename).toHaveBeenCalled();
        expect(fsStub.statCalled).toBeTruthy();
        expect(callback).toHaveBeenCalled();
    });
});
