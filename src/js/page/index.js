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

    var geetest = false; // 拖动验证

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
                    auto: true,
                    pauseOnHover: true
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

        formInit: function(){
            var formContainer = $('#banner .front'),
                search = $('#search'),
                login = $('#login'),
                win = $(window);

            function updateContainerPos(){
                formContainer
                    .css('right', win.width() < 980 ? (win.width() - 980) : ((win.width() - 980) / 2))
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
        },

        // 搜索框
        search: function() {
            var search = $('#search'),
                popUp = $('#search-popup'),
                searchInput = search.find('.search-input'),
                errorTip = search.find('.error-tip');

            // 校验
            search.find('.search').click(validate);
            searchInput.keypress(function(e){
                var code = e.keyCode || e.which;
                if(code === 13){
                    validate(e);
                }
            });

            // 浮层
            popUp.find('.close').click(function(e){
                e.preventDefault();
                $.modal.close();
            });

            // 执行搜素
            function doSearch(){
                // 发请求
                // =========== 测试代码开始 ===========
                var result;
                if(window.location.href.indexOf('type1') !== -1){
                    result = {
                        code: 11929333,
                        success: true,
                        times: 1
                    };
                }else if(window.location.href.indexOf('type2') !== -1){
                    result = {
                        code: 119293233,
                        success: true,
                        times: 12
                    };
                }else{
                    result = {
                        code: 11929333,
                        success: false,
                        times: 1
                    };
                }
                // =========== 测试代码结束 ===========
                showPopup(result);
            }

            // 显示浮层
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

            // 校验函数
            function validate(e){
                e.preventDefault();
                if(searchInput.val() === ''){
                    showError('请输入智溯码');
                    return false;
                }
                if(!geetest){
                    showError('请完成拖动验证');
                    return false;
                }
                errorTip.hide();
                doSearch();
            }

            function showError(msg){
                errorTip.show().html(msg);
            }
        },

        // 登录框
        login: function(){
            var login = $('#login'),
                loginForm = login.find('form'),
                clearIcon = login.find('.clear-username'),
                usernameInput = login.find('.username-input'),
                passwordInput = login.find('.password-input'),
                errorTip = login.find('.error-tip');

            // 清空
            usernameInput.keypress(function() {
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

            // 校验
            login.find('.login').click(validate);
            login.find('input').keypress(function(e){
                var code = e.keyCode || e.which;
                if(code === 13){
                    validate(e);
                }
            });

            function validate(e){
                e.preventDefault();
                if(usernameInput.val() === ''){
                    showError('请输入用户名');
                    return false;
                }
                if(passwordInput.val() === ''){
                    showError('请输入密码');
                    return false;
                }
                if(!geetest){
                    showError('请完成拖动验证');
                    return false;
                }
                errorTip.hide();
                loginForm.submit();
            }

            function showError(msg){
                errorTip.show().html(msg);
            }
        },

        // geetest验证
        // http://geetest.com/install/#api
        geetest: function(){
            var gt_custom_ajax = function(result, selector, message){
                geetest = !!result;
            };

            window.gt_custom_ajax = gt_custom_ajax;
        },

        // for bug #17
        bottomFunc: function(){
            $('.func').on('focus', 'a', function(){
                $(this).closest('.func-box').addClass('func-box-hover');
            });
            $('.func-box').mouseleave(function(){
                $(this).removeClass('func-box-hover');
            });
        }
    };

    $(function() {
        for (var i in func) {
            func[i]();
        }
    });

});
