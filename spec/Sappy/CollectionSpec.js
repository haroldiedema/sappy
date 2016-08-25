/*                                                                                              ___ ___ ____  ___  __ __
 * Structured Application Toolkit                                                              (_-</ _ `/ _ \/ _ \/ // /
 * Copyright 2016, <harold@iedema.me> - MIT                                                   /___/\_,_/ .__/ .__/\_, /
 * -------------------------------------------------------------------------------------------------- /_/  /_/ -- /_*/
'use strict';

describe('Sappy.Collection', function() {
    const Collection = require('../../src/Sappy/Collection');

    it('Should throw an error if something else than an array is passed to the constructor', function () {
        expect(function() { new Collection({}) }).toThrow(Error('Collection expects an array, got object instead.'));
    });

    it('Should allow passing an array as constructor', function () {
        var obj = {1: true, 2: false},
            col = new Collection([1, 2, obj]);

        expect(col.contains(3)).toBeFalsy();
        expect(col.contains(1)).toBeTruthy();
        expect(col.count()).toEqual(3);
        expect(col.get(2)).toEqual(obj);
        expect(col.contains('Hello World')).toBeFalsy();
        col.add('Hello World');
        expect(col.count()).toEqual(4);
        expect(col.contains('Hello World')).toBeTruthy();
    });

    it('Should throw an error when an index is out of range', function () {
        var col = new Collection([1, 2, 3]);
        expect(function() { col.get(4); }).toThrow(Error('Index #4 is out of range of 0-2.'));
    });

    it('Should be able to add and remove items on-the-fly.', function () {
        var col = new Collection(['foo', 'bar', 'baz']);

        expect(col.count()).toEqual(3);
        expect(col.contains('bar')).toBeTruthy();
        col.remove('bar');
        expect(col.count()).toEqual(2);
        expect(col.contains('bar')).toBeFalsy();
        expect(col.all()).toEqual(['foo', 'baz']);
    });

    it('Should be able to iterate over collections.', function () {
        var col     = new Collection([1, 2, 3, 4]),
            counter = 0;

        col.each(function (item, index, collection) {
            expect(collection).toEqual(col);
            expect(item).toEqual(collection.get(index));
            expect(item).toEqual(collection.get(counter));
            counter++;
        });

        expect(counter).toEqual(4);
    });

    it('Should be able to update existing items.', function () {
        var col = new Collection([1, 2, 3, 4]);

        expect(col.get(0)).toEqual(1);
        col.set(0, 'foobar');
        expect(col.get(0)).toEqual('foobar');
        expect(function () { col.set(5, '0') }).toThrow(Error('Index #5 is out of range of 0-3.'));
    });
});
