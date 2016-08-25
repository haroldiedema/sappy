/*                                                                                              ___ ___ ____  ___  __ __
 * Structured Application Toolkit                                                              (_-</ _ `/ _ \/ _ \/ // /
 * Copyright 2016, <harold@iedema.me> - MIT                                                   /___/\_,_/ .__/ .__/\_, /
 * -------------------------------------------------------------------------------------------------- /_/  /_/ -- /_*/
'use strict';

function Extension (callback)
{
    return {
        compile: function (container)
        {
            callback(container);
        }
    };
}

module.exports = Extension;
