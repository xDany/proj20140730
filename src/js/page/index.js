/**
 * page/index.js
 * 主页
 */

require(['jquery', 'jquery.slides'], function($, slide){
    'use strict';

    var func = {
        slide: function(){
            var banner = $('#banner');
            var width = banner.width();
            banner.find('.back').slidesjs({
                width: width,
                height: 380,
                navigation: {
                    active: false
                },
                play: {
                    auto: true
                },
                callback: {
                    loaded: function(){
                        var nav = banner.find('.slidesjs-pagination');
                        nav.css({
                            'padding-left': (width - nav.width()) / 2
                        });
                    }
                }
            });
        }
    };

    $(function(){
        for(var i in func){
            func[i]();
        }
    });

});
