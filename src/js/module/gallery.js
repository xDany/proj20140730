/**
 * module/gallery.js
 * jquery gallery 插件
 */

define(['jquery'], function($) {
    'use strict';

    $.fn.extend({
        gallery: function(config) {
            var defaultConfig = {
                listSelector: 'ul',
                itemSelector: 'li',
                arrLeftSelector: '.arrow-l',
                arrRightSelector: '.arrow-r',
                scrollNum: 1
            };
            config = $.extend(defaultConfig, config);
            var container = $(this),
                list = container.find(config.listSelector),
                item = container.find(config.itemSelector),
                arrLeft = container.find(config.arrLeftSelector),
                arrRight = container.find(config.arrRightSelector),
                scrollNum = config.scrollNum,
                width = item.outerWidth(),
                totalNum = item.length,
                showNum = Math.floor(container.width() / width),
                maxLeft = (showNum - totalNum) * width,
                maxRight = 0,
                currentMargin = 0,
                supportTransition = cssSupport('transition');

            list.width(width * totalNum);

            if (supportTransition) {
                list.css('transition', 'margin 0.4s');
            }

            function scroll(direction, num) {
                if (direction === 'left' && currentMargin <= maxLeft) {
                    // 到达最左边
                    return;
                }
                if (direction === 'right' && currentMargin >= maxRight) {
                    // 到达最右边
                    return;
                }
                currentMargin = direction === 'left' ?
                    currentMargin - width * num:
                    currentMargin + width * num;
                if (supportTransition) {
                    list.css('margin-left', currentMargin + 'px');
                } else {
                    list.animate({
                        marginLeft: currentMargin + 'px'
                    });
                }
            }

            arrLeft.click(function(e) {
                e.preventDefault();
                scroll('right', scrollNum);
            });
            arrRight.click(function(e) {
                e.preventDefault();
                scroll('left', scrollNum);
            });

            (function imageZoom(){
                if(cssSupport('transform') && supportTransition){
                    return;
                }
                container.find('img').on({
                    mouseenter: function(){
                        $(this).animate({
                            width: 240,
                            height: 360,
                            marginLeft: -45,
                            marginTop: -75
                        });
                    },
                    mouseleave: function(){
                        $(this).animate({
                            width: 150,
                            height: 210,
                            marginLeft: 0,
                            marginTop: 0
                        });
                    }
                });
            })();
        }
    });

    function cssSupport(attr) {
        return attr in document.createElement('div').style;
    }

});