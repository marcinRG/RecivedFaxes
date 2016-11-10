'use strict';
var dateGenerator = require('../../src/js/app/utils/dateGenerator');

describe('Testy modułu dateGenerator.js', function () {

    it('Obiekt dateGenerator nie powinien być null i undefined', function () {
        expect(dateGenerator).toBeDefined();
        expect(dateGenerator).not.toBeNull();
    });

    it('Metoda countAdditionalTime powinna zwracać odpowiednie wartości w ' +
        'zależności od obiektu timeParams', function () {
        var timeParams = {hours: 1};
        expect(dateGenerator.countAdditionalTime(timeParams)).toBe(1 * 60 * 60 * 1000);

        timeParams = {hours: 23};
        expect(dateGenerator.countAdditionalTime(timeParams)).toBe(23 * 60 * 60 * 1000);

        timeParams = {minutes: 60};
        expect(dateGenerator.countAdditionalTime(timeParams)).toBe(59 * 60 * 1000);

        timeParams = {minutes: 59};
        expect(dateGenerator.countAdditionalTime(timeParams)).toBe(59 * 60 * 1000);

        timeParams = {seconds: 60};
        expect(dateGenerator.countAdditionalTime(timeParams)).toBe(59 * 1000);

        timeParams = {seconds: 59};
        expect(dateGenerator.countAdditionalTime(timeParams)).toBe(59 * 1000);

        timeParams = {seconds: 30};
        expect(dateGenerator.countAdditionalTime(timeParams)).toBe(30 * 1000);

        timeParams = null;
        expect(dateGenerator.countAdditionalTime(timeParams)).toBe(0);

    });

    it('Powinna zwracać sparsowana wartoćć albo liczbe max podaną ' +
        'jako drugi argument', function () {
        expect(dateGenerator.parseNumberWithMaxValue('22', 80)).toBe(22);
        expect(dateGenerator.parseNumberWithMaxValue('22', 20)).toBe(20);
        expect(dateGenerator.parseNumberWithMaxValue('22zzz', 24)).toBe(22);
    });

    it('Powinna byc zwrocna nowa data albo data przekazana w parametrze' +
        ' powiekszona o wartosci z timeParams', function () {
        var date = new Date();
        date.setFullYear(2016, 1, 21);
        date.setHours(11, 0, 0, 0);

        var timeParams = {hours:1};

        var newDate = dateGenerator.getDateDelayedByTimeParams(timeParams,date);
        expect(newDate.getHours()).toBe(12);
        expect(newDate.getMinutes()).toBe(0);
        expect(newDate.getSeconds()).toBe(0);
        expect(newDate.getMilliseconds()).toBe(0);

        date.setFullYear(2016, 1, 21);
        date.setHours(11, 0, 0, 0);

        timeParams = {hours:1, minutes:25,seconds: 20};
        newDate = dateGenerator.getDateDelayedByTimeParams(timeParams,date);
        expect(newDate.getHours()).toBe(12);
        expect(newDate.getMinutes()).toBe(25);
        expect(newDate.getSeconds()).toBe(20);
        expect(newDate.getMilliseconds()).toBe(0);

        date = new Date();
        timeParams = {hours:1, minutes:25,seconds: 20};
        newDate = dateGenerator.getDateDelayedByTimeParams(timeParams);
        expect(newDate.getTime()>date.getTime()).toBeTruthy();

    });
});
