/*                                                                                              ___ ___ ____  ___  __ __
 * Structured Application Toolkit                                                              (_-</ _ `/ _ \/ _ \/ // /
 * Copyright 2016, <harold@iedema.me> - MIT                                                   /___/\_,_/ .__/ .__/\_, /
 * -------------------------------------------------------------------------------------------------- /_/  /_/ -- /_*/
'use strict';

(function (sappy) {
    if (typeof module === 'object' && module.exports) {
        module.exports = sappy;
    } else if (typeof window === 'object' && window.document) {
        window.Sappy = sappy;
    } else if (typeof global === 'object') {
        global.Sappy = sappy;
    } else {
        return sappy;
    }
}({
    /**
     * Allows creating hash-maps with protective elements and merge/dereference features.
     */
    Map: require('./Sappy/Map.js'),

    /**
     * Allows creating collections.
     */
    Collection: require('./Sappy/Collection')
}));
