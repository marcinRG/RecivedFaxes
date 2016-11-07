'use strict';
var dataFilters = require('../../src/js/app/dataFilters/dataFilters');
describe('Test obiektu zawierającego filtr po dacie modyfikacji pliku' +
    'z modulu dataFilters.js', function () {
    var dataObj;
    var filesWithDateFilter;

    beforeEach(function () {
        filesWithDateFilter = null;
    });

    it('Powinien zostać stworzony obiekt ' +
        ' filesWithDateFilter', function () {
        dataObj = [
            {
                path: '/pdfs/0049405591982_20151019_135253.pdf',
                fileName: '0049405591982_20151019_135253.pdf',
                modified: '2015-02-01T13:54:40.641Z',
                created: '2016-10-30T17:55:48.051Z'
            },
            {
                path: '/pdfs/0049405591982_20151019_145821.pdf',
                fileName: '0049405591982_20151019_145821.pdf',
                modified: '2014-02-08T13:54:40.866Z',
                created: '2016-10-30T17:55:48.056Z'
            }];

        filesWithDateFilter = dataFilters.FilesWithDateFilter(dataObj);
        expect(dataFilters).not.toBeNull();
        expect(filesWithDateFilter).not.toBeNull();
    });

    it('Powinno zwrócić tablice filtrów, której wartości odpowiadają' +
        ' odpowiedniemu reqexpowi', function () {

        dataObj = [
            {
                path: '/pdfs/0049405591982_20151019_135253.pdf',
                fileName: '0049405591982_20151019_135253.pdf',
                modified: '2015-02-01T13:54:40.641Z',
                created: '2016-10-30T17:55:48.051Z'
            },
            {
                path: '/pdfs/0049405591982_20151019_145821.pdf',
                fileName: '0049405591982_20151019_145821.pdf',
                modified: '2014-02-08T13:54:40.866Z',
                created: '2016-10-30T17:55:48.056Z'
            },
            {
                path: '/pdfs/0049405591982_20151204_111602.pdf',
                fileName: '0049405591982_20151204_111602.pdf',
                modified: '2016-08-17T13:54:41.106Z',
                created: '2016-10-30T17:55:47.722Z'
            },
            {
                path: '/pdfs/021313863240_20151120_095427.pdf',
                fileName: '021313863240_20151120_095427.pdf',
                modified: '2016-08-22T13:54:41.321Z',
                created: '2016-10-30T17:55:47.677Z'
            }];

        filesWithDateFilter = dataFilters.FilesWithDateFilter(dataObj);
        var dateFilters = filesWithDateFilter.getDateFilters();

        expect(Array.isArray(dateFilters)).toBeTruthy();
        expect(dateFilters.length).toBe(3);
        expect(dateFilters[0].monthYear).toBe('sierpień 2016');
        expect(dateFilters[1].monthYear).toBe('luty 2015');
        expect(dateFilters[2].monthYear).toBe('luty 2014');

        for (var i = 0; i < dateFilters.length; i++) {
            if (i === 0) {
                expect(dateFilters[i].days.length).toBe(2);
            }
            if (i === 1) {
                expect(dateFilters[i].days.length).toBe(1);
            }
            if (i === 2) {
                expect(dateFilters[i].days.length).toBe(1);
            }
            for (var j = 0; j < dateFilters[i].days.length; j++) {

                expect(dateFilters[i].days[j].dateStr).toMatch(/^\d{4}-\d{2}-\d{2}$/);
            }
        }
    });

    it('Powinno zwracać tablice obiektów dla podanej daty', function () {
        dataObj = [
            {
                path: '/pdfs/0049405591982_20151019_135253.pdf',
                fileName: '0049405591982_20151019_135253.pdf',
                modified: '2015-02-01T13:54:40.641Z',
                created: '2016-10-30T17:55:48.051Z'
            },
            {
                path: '/pdfs/0049405591982_20151019_145821.pdf',
                fileName: '0049405591982_20151019_145821.pdf',
                modified: '2014-02-08T13:54:40.866Z',
                created: '2016-10-30T17:55:48.056Z'
            },
            {
                path: '/pdfs/0049405591982_20151204_111602.pdf',
                fileName: '0049405591982_20151204_111602.pdf',
                modified: '2016-08-17T13:54:41.106Z',
                created: '2016-10-30T17:55:47.722Z'
            },
            {
                path: '/pdfs/021313863240_20151120_095427.pdf',
                fileName: '021313863240_20151120_095427.pdf',
                modified: '2016-08-17T13:54:41.321Z',
                created: '2016-10-30T17:55:47.677Z'
            },
            {
                path: '/pdfs/021313863240_20151120_104518.pdf',
                fileName: '021313863240_20151120_104518.pdf',
                modified: '2016-08-22T13:54:41.536Z',
                created: '2016-10-30T17:55:47.701Z'
            },
            {
                path: '/pdfs/021313863240_20160418_074814.pdf',
                fileName: '021313863240_20160418_074814.pdf',
                modified: '2016-08-24T13:54:41.860Z',
                created: '2016-10-30T17:55:47.705Z'
            }];

        filesWithDateFilter = dataFilters.FilesWithDateFilter(dataObj);
        var files = filesWithDateFilter.getFilesFromDay('2016-08-17');
        expect(files.length).toBe(2);
        var date = new Date();
        date.setFullYear(2016, 7, 17);
        for (var i = 0; i < files.length; i++) {
            expect(files[i].date).not.toBeUndefined();
            expect(files[i].path).not.toBeUndefined();
            expect(files[i].fileName).not.toBeUndefined();

            expect(files[i].date.getFullYear()).toBe(date.getFullYear());
            expect(files[i].date.getMonth()).toBe(date.getMonth());
            expect(files[i].date.getDate()).toBe(date.getDate());
        }

        var file = filesWithDateFilter.getFilesFromDay('2016-08-24');
        expect(file[0].path).toEqual('/pdfs/021313863240_20160418_074814.pdf');
        expect(file[0].fileName).toEqual('021313863240_20160418_074814.pdf');
    });

    it('Powinno działać nawet jeśli dane wejściowe są puste',function(){
       dataObj = null;
       filesWithDateFilter = dataFilters.FilesWithDateFilter(dataObj);
       var filters = filesWithDateFilter.getDateFilters();
       expect(filters.length).toBe(0);
       var files = filesWithDateFilter.getFilesFromDay();
       expect(files.length).toBe(0);
    });
});

describe('Test funkcji konwersji createDatePathFileNameObj' +
    ' z modulu dataFilters.js',function(){

    it('Powinno przekonwertować obiekt na inny zawierający datę, nazwe' +
        ' pliku i sciezke', function () {
        var data = {
            path: '/pdfs/0049405591982_20151019_145821.pdf',
            fileName: '0049405591982_20151019_145821.pdf',
            modified: '2014-02-08T13:54:40.866Z',
            created: '2016-10-30T17:55:48.056Z'
        };

        var newObj = dataFilters.createDatePathFileNameObj(data);
        expect(newObj).not.toBeUndefined();
        expect(newObj.date).not.toBeUndefined();
        expect(newObj.path).not.toBeUndefined();
        expect(newObj.fileName).not.toBeUndefined();

        expect(newObj.path).toEqual(data.path);
        expect(newObj.fileName).toEqual(data.fileName);
        expect(newObj.date).toEqual(new Date(data.modified));
    });
});

describe('Test obiektu zawierjacego opcje sortowania' +
    ' z modulu dataFilter.js',function () {
    var dataObj;
    var filesWithSortOdrer;

    beforeEach(function () {
        filesWithSortOdrer = null;
    });

    it('Powinno utorzyc obiekt filesWithSortOdrer',function () {
        dataObj = [
            {
                path: '/pdfs/0049405591982_20151019_135253.pdf',
                fileName: '0049405591982_20151019_135253.pdf',
                modified: '2015-02-01T13:54:40.641Z',
                created: '2016-10-30T17:55:48.051Z'
            },
            {
                path: '/pdfs/0049405591982_20151019_145821.pdf',
                fileName: '0049405591982_20151019_145821.pdf',
                modified: '2014-02-08T13:54:40.866Z',
                created: '2016-10-30T17:55:48.056Z'
            }];
        filesWithSortOdrer = dataFilters.FilesWithOrderSelection(dataObj);
        expect(filesWithSortOdrer).not.toBeNull();
        expect(filesWithSortOdrer).not.toBeUndefined();
    });

    it('Powinno wypisać wszystkie sposoby sortowania i zwracać odpowiednio ' +
        'posortowane pliki',function(){
        dataObj = [
            {
                path: '/pdfs/0049405591982_20151019_135253.pdf',
                fileName: '0049405591982_20151019_135253.pdf',
                modified: '2015-02-01T13:54:40.641Z',
                created: '2016-10-30T17:55:48.051Z'
            },
            {
                path: '/pdfs/071 798 48 48_20160517_061414.pdf',
                fileName: '071 798 48 48_20160517_061414.pdf',
                modified: '2016-09-09T13:54:44.920Z',
                created: '2016-10-30T17:55:47.899Z'
            },
            {
                path: '/pdfs/0049405591982_20151019_145821.pdf',
                fileName: '0049405591982_20151019_145821.pdf',
                modified: '2014-02-08T13:54:40.866Z',
                created: '2016-10-30T17:55:48.056Z'
            }];
        filesWithSortOdrer = dataFilters.FilesWithOrderSelection(dataObj);
        var orderNames = filesWithSortOdrer.getOrderNames();
        expect(Array.isArray(orderNames)).toBeTruthy();
        expect(orderNames.length).toBe(2);
        expect(orderNames[0]).toEqual('Datami utworzenia');
        expect(orderNames[1]).toEqual('Nazwami plików');
        var files = filesWithSortOdrer.sortFilesBy('Datami utworzenia');
        expect(files.length).toBe(3);
        expect(files[0].fileName).toBe('0049405591982_20151019_145821.pdf');
        files = filesWithSortOdrer.sortFilesBy('Datami utworzenia');
        expect(files[0].fileName).toBe('071 798 48 48_20160517_061414.pdf');

        files = filesWithSortOdrer.sortFilesBy('Nazwami plików');
        expect(files[0].fileName).toBe('0049405591982_20151019_135253.pdf');

        files = filesWithSortOdrer.sortFilesBy('Nazwami plików');
        expect(files[0].fileName).toBe('071 798 48 48_20160517_061414.pdf');
    });
});
