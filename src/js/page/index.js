/**
 * page/index.js
 * 主页
 */

require([
    'jquery',
    'jquery.slides',
    'jquery.placeholder',
    'jquery.modal'
    ], function($) {
    'use strict';

    var func = {
        // banner滚动
        slide: function() {
            var banner = $('#banner'),
                width = banner.width();
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
            $(window).resize(function(){
                banner.find('.slidesjs-pagination').css({
                    'padding-left': ($(window).width() - banner.find('.slidesjs-pagination').width()) / 2
                });
            });
        },

        // 初始化placeholder
        initPlaceholder: function() {
            $('input, textarea').placeholder();
        },

        // 搜索框
        search: function() {
            var formContainer = $('#banner .front'),
                search = $('#search'),
                login = $('#login'),
                popUp = $('#search-popup'),
                win = $(window);

            function updateContainerPos(){
                formContainer
                    .css('right', (win.width() - 980) / 2)
                    .fadeIn();
            }

            updateContainerPos();
            win.resize(updateContainerPos);

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

            search.find('button.search').click(function(e){
                // 执行搜素
                // 发请求
                e.preventDefault();
                var result = {
                    code: 11929333,
                    success: true,
                    times: 1
                };
                // var result = {
                //     code: 119293233,
                //     success: true,
                //     times: 12
                // };
                // var result = {
                //     code: 11929333,
                //     success: false,
                //     times: 1
                // };
                showPopup(result);
            });

            popUp.find('.close').click(function(e){
                e.preventDefault();
                $.modal.close();
            });

            function showPopup(o){
                var className = 'search-popup-';
                if(!o.success){
                    // 查询错误
                    className += 'error';
                }else if(o.times === 1){
                    // 正确，第一次
                    className += 'success';
                }else{
                    // 正确，多次
                    className += 'warning';
                }
                popUp.find('.code').html(o.code);
                popUp.find('.times').html(o.times);
                popUp
                    .removeClass('search-popup-error search-popup-success search-popup-warning')
                    .addClass(className)
                    .modal({
                        fadeDuration: 100
                    });
            }

        },

        // 登录框
        login: function(){
            var login = $('#login'),
                clearIcon = login.find('.clear-username'),
                usernameInput = login.find('.username-input');
            usernameInput.on('keydown', function() {
                var val = usernameInput.val();
                if (val !== '' && val !== usernameInput.attr('placeholder')) {
                    clearIcon.show();
                } else {
                    clearIcon.hide();
                }
            });
            clearIcon.click(function() {
                usernameInput.val('').focus();
                clearIcon.hide();
            });
        },

        // geetest验证
        // http://geetest.com/install/#api
        geetest: function(){
            var gt_custom_ajax = function(result, selector, message){
                if(result){
                    $('#search button.search')
                        .prop('disabled', false)
                        .removeClass('disabled');
                }
            };

            window.gt_custom_ajax = gt_custom_ajax;
        }
    };

    $(function() {
        for (var i in func) {
            func[i]();
        }
    });

});