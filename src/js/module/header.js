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
            cur = nav.find('.current').length ?
                nav.find('.current'):
                nav.find('li').first(),
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

        // 初始化时不显示动画，后来再加上
        setTimeout(function(){
            nb.addClass('nav-animate');
        }, 0);

        function pos(navItem){
            navItem = navItem || cur;
            nb
                .width(navItem.width())
                .css('left', navItem.position().left + itemLeft)
                .show();
        }
    });
});
