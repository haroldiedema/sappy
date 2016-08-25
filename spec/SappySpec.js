/*                                                                                              ___ ___ ____  ___  __ __
 * Structured Application Toolkit                                                              (_-</ _ `/ _ \/ _ \/ // /
 * Copyright 2016, <harold@iedema.me> - MIT                                                   /___/\_,_/ .__/ .__/\_, /
 * -------------------------------------------------------------------------------------------------- /_/  /_/ -- /_*/
'use strict';

describe('Sappy', function() {
    it('Should be able to require the components', function () {
        const Sappy = require('../src/sappy');

        expect(typeof Sappy.Map).toEqual('function');
        expect(typeof Sappy.Collection).toEqual('function');
    });
});
