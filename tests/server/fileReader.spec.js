'use strict';
var proxyquire = require('proxyquire');

describe('Testy modulu fileReader.js', function () {
    describe('Funkcja getFileProperties(filePath, callback)', function () {
        var stats;
        var fsStub;
        var pathStub;
        var fileReader;
        console.log('Test getFileProperties(filePath, callback)');
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
                stat: function (path, callback) {
                }
            };

            fileReader = proxyquire('../../server/modules/fileReader', {
                path: pathStub,
                fs: fsStub
            });
        });

        it('powinien być wywołany callback z argumentem Error(Not a file)', function () {

            var spyIsFile = spyOn(stats, 'isFile').and.returnValue(false);
            var spyFsStat = spyOn(fsStub, 'stat').and.callFake(function (path, callback) {
                callback(null, stats);
            });

            var callback = jasmine.createSpy('callback');
            fileReader.getFileProperties('fakePath', callback);
            expect(spyIsFile).toHaveBeenCalled();
            expect(spyFsStat).toHaveBeenCalled();
            var error = callback.calls.mostRecent().args[0];
            expect(error instanceof Error).toBeTruthy();
            expect(error.message).toBe('Not a file');
            expect(callback).toHaveBeenCalled();
        });

        it('powinien być wywołany callback z zdefiniowanym błędem', function () {

            var error = new Error('Test Error');
            var spyIsFile = spyOn(stats, 'isFile').and.returnValue(false);
            var spyFsStat = spyOn(fsStub, 'stat').and.callFake(function (path, callback) {
                callback(error);
            });

            var callback = jasmine.createSpy('callback');

            fileReader.getFileProperties('fakePath', callback);
            expect(spyIsFile).not.toHaveBeenCalled();
            expect(spyFsStat).toHaveBeenCalled();
            expect(callback).toHaveBeenCalled();
            expect(callback).toHaveBeenCalledWith(error);
        });

        it('powinien być wywołany callback z argumentami (null,stats)', function () {

            var spyIsFile = spyOn(stats, 'isFile').and.returnValue(true);
            var spyPathBasename = spyOn(pathStub, 'basename').and.returnValue('++base++');
            var spyFsStat = spyOn(fsStub, 'stat').and.callFake(function (path, callback) {
                callback(null, stats);
            });

            var callback = jasmine.createSpy('callback');

            fileReader.getFileProperties('fakePath', callback);

            expect(spyIsFile).toHaveBeenCalled();
            expect(spyFsStat).toHaveBeenCalled();
            expect(spyPathBasename).toHaveBeenCalled();
            expect(spyPathBasename.calls.count()).toEqual(2);

            expect(callback.calls.mostRecent().args.length).toEqual(2);
            var stats1 = callback.calls.mostRecent().args[1];
            expect(stats1.path).toBe('/' + '++base++');
            expect(stats1.fileName).toBe('++base++');
            expect(stats1.modified).toBe('xxxx');
            expect(stats1.created).toBe('yyyy');
        });
    });
    describe('Funkcja processAllFilesFromDirectiory(path, route, it, procMethod, cb)',
        function () {
            var stats;
            var fsStub;
            var fileReader;
            console.log('Test processAllFilesFromDirectiory(path, route, it, procMethod, cb)');

            beforeEach(function () {
                stats = {
                    isDirectory: function () {
                    }
                };

                fsStub = {
                    stat: function (path, callback) {
                    }
                };

                fileReader = proxyquire('../../server/modules/fileReader', {
                    fs: fsStub
                });
            });

            it('powinien być wywołany callback z argumentem Error(Not a directory)', function () {
                var spyStatsIsDirectory = spyOn(stats, 'isDirectory').and.returnValue(false);
                var spyFsStat = spyOn(fsStub, 'stat').and.callFake(function (path, callback) {
                    callback(null, stats);
                });

                var callback = jasmine.createSpy('callback');
                var iteratee = jasmine.createSpy('iteratee');
                var processMethod = jasmine.createSpy('iteratee');
                var processFunc = jasmine.createSpy('processFunc');
                var transform = jasmine.createSpy('transform');

                fileReader.processAllFilesFromDirectiory('fakePath', 'fakeRoute', iteratee,
                    processMethod, processFunc, transform, callback);

                expect(spyStatsIsDirectory).toHaveBeenCalled();
                expect(spyFsStat).toHaveBeenCalled();
                expect(callback).toHaveBeenCalled();
                var error = callback.calls.mostRecent().args[0];
                expect(error instanceof Error).toBeTruthy();
                expect(error.message).toBe('Not a directory');
            });

            it('powinien być wywołany callback ze zdefiniowanym bledem', function () {

                var error = new Error('Test Error');
                var spyStatsIsDirectory = spyOn(stats, 'isDirectory').and.returnValue(true);
                var spyFsStat = spyOn(fsStub, 'stat').and.callFake(function (path, callback) {
                    callback(error);
                });

                var callback = jasmine.createSpy('callback');
                var iteratee = jasmine.createSpy('iteratee');
                var processMethod = jasmine.createSpy('iteratee');
                var processFunc = jasmine.createSpy('processFunc');
                var transform = jasmine.createSpy('transform');

                fileReader.processAllFilesFromDirectiory('fakePath', 'fakeRoute', iteratee,
                    processMethod, processFunc, transform, callback);

                expect(spyStatsIsDirectory).not.toHaveBeenCalled();
                expect(spyFsStat).toHaveBeenCalled();
                expect(callback).toHaveBeenCalled();
                var errorArg = callback.calls.mostRecent().args[0];
                expect(errorArg).toEqual(error);
            });

            it('Powienien być wywołana funkcja processFunc', function () {

                var spyStatsIsDirectory = spyOn(stats, 'isDirectory').and.returnValue(true);
                var spyFsStat = spyOn(fsStub, 'stat').and.callFake(function (path, callback) {
                    callback(null, stats);
                });

                var callback = jasmine.createSpy('callback');
                var iteratee = jasmine.createSpy('iteratee');
                var processMethod = jasmine.createSpy('iteratee');
                var processFunc = jasmine.createSpy('processFunc');
                var transform = jasmine.createSpy('transform');

                fileReader.processAllFilesFromDirectiory('fakePath', 'fakeRoute', iteratee,
                    processMethod, processFunc, transform, callback);

                expect(spyStatsIsDirectory).toHaveBeenCalled();
                expect(spyFsStat).toHaveBeenCalled();
                expect(processFunc).toHaveBeenCalled();

            });
        });
    describe('Funkcja processFilesFromDirectory(path, iter, processMethod, callback)',
        function () {
            var fsStub;
            var fileReader;
            console.log('Test processFilesFromDirectory(path, iter, processMethod, callback)');
            beforeEach(function () {
                fsStub = {
                    readdir: function (path, callback) {
                    }
                };

                fileReader = proxyquire('../../server/modules/fileReader', {
                    fs: fsStub
                });
            });

            it('powinien być wywołany callback ze zdefiniowanym bledem', function () {
                var error = new Error('custom error');
                var callback = jasmine.createSpy('callback');
                var iteratee = jasmine.createSpy('iteratee');
                var processMethod = jasmine.createSpy('iteratee');

                var spyReaddir = spyOn(fsStub, 'readdir').and.callFake(function (path, callback) {
                    callback(error);
                });
                var transform = jasmine.createSpy('transform');

                fileReader.processFilesFromDirectory('fakePath', iteratee,
                    processMethod, transform, callback);

                expect(spyReaddir).toHaveBeenCalled();
                expect(callback).toHaveBeenCalledWith(error);
            });

            it('powinna być wywołana funkcja processMethod', function () {

                var callback = jasmine.createSpy('callback');
                var iteratee = jasmine.createSpy('iteratee');
                var processMethod = jasmine.createSpy('iteratee');

                var spyReaddir = spyOn(fsStub, 'readdir').and.callFake(function (path, callbck) {
                    callbck(null, {something: 'someThing'});
                });

                var transform = jasmine.createSpy('transform');

                fileReader.processFilesFromDirectory('fakePath', iteratee,
                    processMethod, transform, callback);

                expect(spyReaddir).toHaveBeenCalled();
                expect(processMethod).toHaveBeenCalled();
            });

        });
});
