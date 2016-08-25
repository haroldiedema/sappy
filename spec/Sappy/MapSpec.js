/*                                                                                              ___ ___ ____  ___  __ __
 * Structured Application Toolkit                                                              (_-</ _ `/ _ \/ _ \/ // /
 * Copyright 2016, <harold@iedema.me> - MIT                                                   /___/\_,_/ .__/ .__/\_, /
 * -------------------------------------------------------------------------------------------------- /_/  /_/ -- /_*/
'use strict';

describe("Sappy.Map", function() {
    const Map = require('../../src/Sappy/Map');

    it('The constructor should only accept a hash-map object as its only argument', function () {
        expect(function () {new Map([1, 2, 3])}).toThrow(Error('Map requires an object (hash-map).'));
        // Should not throw an exception:
        var map = new Map({foo: 'bar', hello: 'world'});
        expect(typeof map).toEqual('object');
    });

    it('Should be able to set and get new values', function () {
        var map = new Map({'foo' : 'bar'});

        expect(map.has('foo')).toBeTruthy();
        expect(map.has('bar')).toBeFalsy();
        expect(map.get('foo')).toEqual('bar');
        expect(function () {map.get('bar'); }).toThrow(Error('Attempt to retrieve undefined item "bar" from map.'));

        map.set('bar', 'baz');
        map.set('foo', 'FOO!');
        expect(map.has('bar')).toBeTruthy();
        expect(map.get('bar')).toEqual('baz');
        expect(map.get('foo')).toEqual('FOO!');
    });

    it('Should be able to lock certain items, but not modify them.', function () {
        var map = new Map();

        map.set('foo', 'bar', true);
        expect(map.has('foo')).toBeTruthy();
        expect(map.get('foo')).toEqual('bar');

        expect(function () { map.set('foo', 'baz') }).toThrow(Error('Unable to modify locked item "foo" in this map.'));
    });

    it('Should be able to freeze a map and prohibit modifications.', function () {
        var map = new Map({'foo' : 'bar'});

        map.freeze();
        expect(map.has('foo')).toBeTruthy();
        expect(map.get('foo')).toEqual('bar');

        // New item
        expect(function () { map.set('hello', 'world') }).toThrow(Error('Modifying a frozen map is prohibited.'));

        // Existing item
        expect(function () { map.set('foo', 'world') }).toThrow(Error('Modifying a frozen map is prohibited.'));
    });

    it('Should be able to merge an object into the map recursively.', function () {
        var map = new Map({foo: 'bar', nested: {a: 'b', nested2: {foo: 'bar'}}}),
            obj = {bar: 'baz', nested: {nested2: {'bar' : 'baz'}}};

        expect(map.has('nested')).toBeTruthy();
        expect(map.get('nested')).toEqual({a: 'b', nested2: {foo: 'bar'}});
        expect(map.has('bar')).toBeFalsy();
        map.merge(obj);
        expect(map.get('nested')).toEqual({ a: 'b', nested2: Object({ foo: 'bar', bar: 'baz' }) });
        expect(map.has('bar')).toBeTruthy();
    });

    it('Should always dereference objects from its original object.', function () {
        var obj = {a: 1, b: {c: 42}},
            map = new Map(obj);

        expect(map.get('a')).toEqual(1);
        expect(map.get('b')).toEqual({c: 42});

        obj.a   = 2;
        obj.b.c = 44;

        // Should still be the same...
        expect(map.get('a')).toEqual(1);
        expect(map.get('b')).toEqual({c: 42});
    });
});
