/**
 * module/header.js
 * 头部
 */

define(['jquery'], function($){
    'use strict';

    $(function(){
        var hd = $('#header');
        if(!hd.length){
            return;
        }
        var nav = hd.find('ul.nav'),
            cur = nav.find('li.current'),
            nb = hd.find('div.nav-border'),
            itemLeft = cur.css('padding-left').split('px')[0] - 0,
            outTimer;

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
