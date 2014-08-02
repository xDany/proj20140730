/**
 * module/header.js
 * 头部
 */

define(['jquery'], function($){
    'use strict';

    $(function(){
        var hd = $('#header');
        var nav = hd.find('ul.nav');
        var cur = nav.find('li.current');
        var nb = hd.find('div.nav-border');
        var itemLeft = cur.css('padding-left').split('px')[0] - 0;
        var outTimer;

        nav.on('mouseenter', 'li', function(){
            clearTimeout(outTimer);
            pos($(this));
        }).on('mouseleave', 'li', function(){
            outTimer = setTimeout(pos, 300);
        });

        pos();

        function pos(navItem){
            navItem = navItem || cur;
            nb
                .width(navItem.width())
                .css('left', navItem.position().left + itemLeft)
                .show();
        }
    });
});
