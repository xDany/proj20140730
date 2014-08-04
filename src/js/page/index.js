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
        },

        search: function(){
            var formContainer = $('#banner .front');
            var search = $('#search');
            var login = $('#login');
            formContainer.find('a.switch').on('click', function(e){
                e.preventDefault();
                if( $(this).hasClass('switch-search') ){
                    search.show();
                    login.hide();
                }else{
                    login.show();
                    search.hide();
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
