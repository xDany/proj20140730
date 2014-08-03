/**
 * module/browser.js
 * 判断浏览器类型
 */

define([], function(){
    'use strict';

    return {
        ie6: 'undefined' === typeof(document.body.style.maxHeight)
    };
});
