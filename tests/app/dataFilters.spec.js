'use strict';
var dataFilters = require('../../src/js/app/dataFilters/dataFilters');

describe('Test filtrowania danych z modulu dataFilters.js', function () {
    var dataObj;
    var dataFilters;
    var filter;

    beforeEach(function () {
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
                modified: '2016-08-17T13:54:41.536Z',
                created: '2016-10-30T17:55:47.701Z'
            },
            {
                path: '/pdfs/021313863240_20160418_074814.pdf',
                fileName: '021313863240_20160418_074814.pdf',
                modified: '2016-08-17T13:54:41.860Z',
                created: '2016-10-30T17:55:47.705Z'
            },
            {
                path: '/pdfs/021313863240_20160628_102351.pdf',
                fileName: '021313863240_20160628_102351.pdf',
                modified: '2016-08-17T13:54:42.084Z',
                created: '2016-10-30T17:55:47.743Z'
            },
            {
                path: '/pdfs/021313863240_20160628_102555.pdf',
                fileName: '021313863240_20160628_102555.pdf',
                modified: '2016-09-02T13:54:42.292Z',
                created: '2016-10-30T17:55:47.744Z'
            },
            {
                path: '/pdfs/021313863240_20160704_033648.pdf',
                fileName: '021313863240_20160704_033648.pdf',
                modified: '2016-09-02T13:54:42.846Z',
                created: '2016-10-30T17:55:47.750Z'
            },
            {
                path: '/pdfs/021313863240_20160802_121509.pdf',
                fileName: '021313863240_20160802_121509.pdf',
                modified: '2016-09-02T13:54:43.059Z',
                created: '2016-10-30T17:55:47.791Z'
            },
            {
                path: '/pdfs/021313863240_20160802_121716.pdf',
                fileName: '021313863240_20160802_121716.pdf',
                modified: '2016-09-06T13:54:43.268Z',
                created: '2016-10-30T17:55:47.841Z'
            },
            {
                path: '/pdfs/021313863240_20160905_070006.pdf',
                fileName: '021313863240_20160905_070006.pdf',
                modified: '2016-09-06T13:54:43.584Z',
                created: '2016-10-30T17:55:47.846Z'
            },
            {
                path: '/pdfs/021313863240_20161004_081347.pdf',
                fileName: '021313863240_20161004_081347.pdf',
                modified: '2016-09-09T13:54:44.014Z',
                created: '2016-10-30T17:55:47.903Z'
            },
            {
                path: '/pdfs/071 798 48 48_20160514_130201.pdf',
                fileName: '071 798 48 48_20160514_130201.pdf',
                modified: '2016-09-06T13:54:44.697Z',
                created: '2016-10-30T17:55:47.875Z'
            },
            {
                path: '/pdfs/071 798 48 48_20160519_114136.pdf',
                fileName: '071 798 48 48_20160519_114136.pdf',
                modified: '2016-09-09T13:54:45.380Z',
                created: '2016-10-30T17:55:47.909Z'
            },
            {
                path: '/pdfs/071 798 48 48_20160520_153706.pdf',
                fileName: '071 798 48 48_20160520_153706.pdf',
                modified: '2016-09-09T13:54:45.848Z',
                created: '2016-10-30T17:55:47.913Z'
            },
            {
                path: '/pdfs/071 798 48 48_20160517_061414.pdf',
                fileName: '071 798 48 48_20160517_061414.pdf',
                modified: '2016-09-09T13:54:44.920Z',
                created: '2016-10-30T17:55:47.899Z'
            },
            {
                path: '/pdfs/071 798 48 48_20160513_070020.pdf',
                fileName: '071 798 48 48_20160513_070020.pdf',
                modified: '2016-09-06T13:54:44.240Z',
                created: '2016-10-30T17:55:47.871Z'
            },
            {
                path: '/pdfs/071 798 48 48_20161001_065115.pdf',
                fileName: '071 798 48 48_20161001_065115.pdf',
                modified: '2016-08-05T13:55:08.284Z',
                created: '2016-10-30T17:55:48.072Z'
            },
            {
                path: '/pdfs/071 798 48 48_20161004_200645.pdf',
                fileName: '071 798 48 48_20161004_200645.pdf',
                modified: '2016-08-05T13:55:08.549Z',
                created: '2016-10-30T17:55:48.078Z'
            },
            {
                path: '/pdfs/071 798 48 48_20161006_180404.pdf',
                fileName: '071 798 48 48_20161006_180404.pdf',
                modified: '2016-08-05T13:55:09.059Z',
                created: '2016-10-30T17:55:48.079Z'
            },
            {
                path: '/pdfs/071 798 48 48_20161008_111330.pdf',
                fileName: '071 798 48 48_20161008_111330.pdf',
                modified: '2016-08-05T13:55:09.312Z',
                created: '2016-10-30T17:55:48.134Z'
            },
            {
                path: '/pdfs/071 798 48 48_20161011_141521.pdf',
                fileName: '071 798 48 48_20161011_141521.pdf',
                modified: '2016-10-11T13:46:08.134Z',
                created: '2016-10-28T19:21:57.016Z'
            },
            {
                path: '/pdfs/071 798 48 48_20161011_185644.pdf',
                fileName: '071 798 48 48_20161011_185644.pdf',
                modified: '2016-10-12T04:02:55.112Z',
                created: '2016-10-28T19:21:57.021Z'
            },
            {
                path: '/pdfs/071 798 48 48_20161013_082237.pdf',
                fileName: '071 798 48 48_20161013_082237.pdf',
                modified: '2016-10-13T07:53:45.066Z',
                created: '2016-10-28T19:21:57.026Z'
            },
            {
                path: '/pdfs/0757211140_20161011_101504.pdf',
                fileName: '0757211140_20161011_101504.pdf',
                modified: '2016-10-11T09:44:48.888Z',
                created: '2016-10-28T19:21:56.995Z'
            },
            {
                path: '/pdfs/076-8702637_20150728_094104.pdf',
                fileName: '076-8702637_20150728_094104.pdf',
                modified: '2016-08-05T13:55:09.537Z',
                created: '2016-10-30T17:55:47.633Z'
            },
            {
                path: '/pdfs/076-8702637_20151027_122339.pdf',
                fileName: '076-8702637_20151027_122339.pdf',
                modified: '2016-08-05T13:55:09.782Z',
                created: '2016-10-30T17:55:47.675Z'
            },
            {
                path: '/pdfs/746497328_20150427_060318.pdf',
                fileName: '746497328_20150427_060318.pdf',
                modified: '2016-09-25T13:55:14.132Z',
                created: '2016-10-30T17:55:48.009Z'
            },
            {
                path: '/pdfs/746497328_20160115_122234.pdf',
                fileName: '746497328_20160115_122234.pdf',
                modified: '2016-09-25T13:55:14.350Z',
                created: '2016-10-30T17:55:48.034Z'
            },
            {
                path: '/pdfs/757223278_20160907_105047.pdf',
                fileName: '757223278_20160907_105047.pdf',
                modified: '2016-09-25T13:55:14.588Z',
                created: '2016-10-30T17:55:48.049Z'
            },
            {
                path: '/pdfs/757223278_20160907_105409.pdf',
                fileName: '757223278_20160907_105409.pdf',
                modified: '2016-09-19T13:55:15.032Z',
                created: '2016-10-30T17:55:47.954Z'
            },
            {
                path: '/pdfs/77 474 88 64_20161005_184059.pdf',
                fileName: '77 474 88 64_20161005_184059.pdf',
                modified: '2016-09-19T13:55:15.421Z',
                created: '2016-10-30T17:55:47.917Z'
            },
            {
                path: '/pdfs/774748864_20160919_132145.pdf',
                fileName: '774748864_20160919_132145.pdf',
                modified: '2016-09-19T13:55:15.754Z',
                created: '2016-10-30T17:55:47.981Z'
            },
            {
                path: '/pdfs/774748864_20160927_195209.pdf',
                fileName: '774748864_20160927_195209.pdf',
                modified: '2016-09-02T13:55:16.160Z',
                created: '2016-10-30T17:55:47.795Z'
            },
            {
                path: '/pdfs/Centrum Szkoleniowe_20150414_144137.pdf',
                fileName: 'Centrum Szkoleniowe_20150414_144137.pdf',
                modified: '2016-09-19T13:55:16.879Z',
                created: '2016-10-30T17:55:47.984Z'
            },
            {
                path: '/pdfs/Centrum Szkoleniowe_20150428_103959.pdf',
                fileName: 'Centrum Szkoleniowe_20150428_103959.pdf',
                modified: '2016-09-02T13:55:17.236Z',
                created: '2016-10-30T17:55:47.834Z'
            },
            {
                path: '/pdfs/Centrum Szkoleniowe_20150317_121546.pdf',
                fileName: 'Centrum Szkoleniowe_20150317_121546.pdf',
                modified: '2016-09-02T13:55:16.515Z',
                created: '2016-10-30T17:55:47.814Z'
            },
            {
                path: '/pdfs/Centrum Szkoleniowe_20160419_104541.pdf',
                fileName: 'Centrum Szkoleniowe_20160419_104541.pdf',
                modified: '2016-09-02T13:55:17.626Z',
                created: '2016-10-30T17:55:47.840Z'
            },
            {
                path: '/pdfs/Centrum Szkoleniowe_20160627_104900.pdf',
                fileName: 'Centrum Szkoleniowe_20160627_104900.pdf',
                modified: '2016-09-09T13:55:18.392Z',
                created: '2016-10-30T17:55:47.893Z'
            },
            {
                path: '/pdfs/Centrum Szkoleniowe_20160517_101018.pdf',
                fileName: 'Centrum Szkoleniowe_20160517_101018.pdf',
                modified: '2016-09-08T13:55:18.018Z',
                created: '2016-10-30T17:55:47.882Z'
            },
            {
                path: '/pdfs/Centrum Szkoleniowe_20160706_103111.pdf',
                fileName: 'Centrum Szkoleniowe_20160706_103111.pdf',
                modified: '2016-09-21T13:55:18.753Z',
                created: '2016-10-30T17:55:47.896Z'
            },
            {
                path: '/pdfs/Centrum Szkoleniowe_20160906_093645.pdf',
                fileName: 'Centrum Szkoleniowe_20160906_093645.pdf',
                modified: '2016-09-08T13:55:19.861Z',
                created: '2016-10-30T17:55:47.898Z'
            },
            {
                path: '/pdfs/Centrum Szkoleniowe_20160711_114834.pdf',
                fileName: 'Centrum Szkoleniowe_20160711_114834.pdf',
                modified: '2016-09-24T13:55:19.150Z',
                created: '2016-10-30T17:55:47.992Z'
            },
            {
                path: '/pdfs/Centrum Szkoleniowe_20160823_115528.pdf',
                fileName: 'Centrum Szkoleniowe_20160823_115528.pdf',
                modified: '2016-09-24T13:55:19.512Z',
                created: '2016-10-30T17:55:48.005Z'
            },
            {
                path: '/pdfs/Centrum Szkoleniowe_20160920_091559.pdf',
                fileName: 'Centrum Szkoleniowe_20160920_091559.pdf',
                modified: '2016-09-24T13:55:20.280Z',
                created: '2016-10-30T17:55:48.007Z'
            },
            {
                path: '/pdfs/Centrum Szkoleniowe_20161012_105502.pdf',
                fileName: 'Centrum Szkoleniowe_20161012_105502.pdf',
                modified: '2016-10-12T10:24:56.555Z',
                created: '2016-10-28T19:21:57.000Z'
            }];
        dataFilters = require('../../src/js/app/dataFilters/dataFilters');
        filter = dataFilters.filesWithDateFilter(dataObj);
    });

    it('Powinien zostać stworzony obiekt dataFilters i filter', function () {
        expect(dataFilters).not.toBeNull();
        expect(filter).not.toBeNull();
    });

    it('Powinno zwrócić tablice filtrów, której wartości odpowiadają odpowiedniemu reqexpowi', function () {
        dataFilters = filter.getFilters();
        expect(Array.isArray(dataFilters)).toBeTruthy();

        for (var i = 0; i < dataFilters.length; i++) {
            for (var j = 0; j < dataFilters[i].days.length; j++) {
                expect(dataFilters[i].days[j].dateStr).toMatch(/^\d{4}-\d{2}-\d{2}$/);
            }
        }
    });

});

