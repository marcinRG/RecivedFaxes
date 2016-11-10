'use strict';
var dateUtilities = require('../../src/js/app/utils/date.utils');
var date = new Date();

describe('Testy modulu date.dateGen.js',function(){
    it('Powinien istnieć obiekt dateUtilites',function(){
        expect(dateUtilities).not.toBeNull();
    });

    it('Powinno zwrócić lancuch tekstowy bedacy tetstową reprezentacją daty',function(){
        date.setFullYear(2015,0,31);
        date.setHours(23,59);
        expect(dateUtilities.date2string(date)).toBe('2015-01-31');

        date.setFullYear(2015,0,1);
        expect(dateUtilities.date2string(date)).toBe('2015-01-01');

        date.setFullYear(2015,11,31);
        expect(dateUtilities.date2string(date)).toBe('2015-12-31');

        var string = '2015-02-01T13:54:40.641Z';
        var date2 = new Date(string);
        expect(dateUtilities.date2string(date2)).toBe('2015-02-01');
    });

    it('Powinno zwrocić lancuch tekstowy w postaci "nazwamiesiaca rok" dla podanej daty np. maj 2016',function(){
        date.setFullYear(2015,0,31);
        expect(dateUtilities.getMonthNameYear(date)).toBe('styczeń 2015');
        var string = '2016-09-02T13:54:42.292Z';
        var date2 = new Date(string);
        expect(dateUtilities.getMonthNameYear(date2)).toBe('wrzesień 2016');
    });

    it('Powinno zwrócić taki sam obiekt typu date jak podany jako argument lub utworzyć nowy',function(){
       date.setFullYear(2015,0,31);
       expect(dateUtilities.getNewOrCurrentDate(date)).toEqual(date);
       expect(dateUtilities.getNewOrCurrentDate() instanceof Date).toBeTruthy();
    });

   it('Powinno porównać dwie daty jesliu pierwsza mniejsza zwrócić true',function(){
      var date1 = new Date();
      var date2 = new Date();
      date1.setFullYear(2016,1,21);
      date2.setFullYear(2016,5,23);
      expect(dateUtilities.compareDates(date1,date2)).toBeTruthy();
   });
});
