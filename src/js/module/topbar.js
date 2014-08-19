/**
 * module/topbar.js
 * 顶部工具条
 */

define(['jquery', 'util'], function($, util){
    'use strict';

    $(function(){
        if(util.browser.ie6){
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
