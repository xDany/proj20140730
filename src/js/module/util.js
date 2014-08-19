/**
 * module/util.js
 * 工具
 */

define([], function(){
    'use strict';

    return {
        browser: {
            ie6: 'undefined' === typeof(document.body.style.maxHeight)
        }
    };
});
