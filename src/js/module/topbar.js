/**
 * module/topbar.js
 * 顶部工具条
 */

define(['jquery', 'browser'], function($, browser){
    'use strict';

    $(function(){
        if(browser.ie6){
            var map = $('#topbar .map');
            map.on({
                mouseenter: function(){
                    map.addClass('mav-hover');
                },
                mouseleave: function(){
                    map.removeClass('mav-hover');
                }
            });
        }
    });

});
