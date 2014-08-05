/**
 * page/index.js
 * 主页
 */

require([
    'jquery',
    'jquery.slides',
    'jquery.placeholder'
    ], function($, slide, placeholder) {
    'use strict';

    var func = {
        // banner滚动
        slide: function() {
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
                    loaded: function() {
                        var nav = banner.find('.slidesjs-pagination');
                        nav.css({
                            'padding-left': (width - nav.width()) / 2
                        });
                    }
                }
            });
        },

        // 初始化placeholder
        initPlaceholder: function() {
            $('input, textarea').placeholder();
        },

        // 搜索框
        search: function() {
            var formContainer = $('#banner .front');
            var search = $('#search');
            var login = $('#login');

            // 切换登录与查询
            formContainer.find('a.switch').on('click', function(e) {
                e.preventDefault();
                if ($(this).hasClass('switch-search')) {
                    search.show();
                    login.hide();
                } else {
                    login.show();
                    search.hide();
                }
            });

            // 登录框x号
            var clearIcon = login.find('.clear-username');
            var usernameInput = login.find('.username-input');
            usernameInput.on('keydown', function() {
                var val = usernameInput.val();
                if (val !== '' && val !== usernameInput.attr('placeholder')) {
                    clearIcon.show();
                } else {
                    clearIcon.hide();
                }
            });
            clearIcon.click(function() {
                usernameInput.val('');
                clearIcon.hide();
            });
        }
    };

    $(function() {
        for (var i in func) {
            func[i]();
        }
    });

});