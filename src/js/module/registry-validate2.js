/**
 * module/registry-validate.js
 * 注册校验
 */

define(['jquery'], function($) {
    'use strict';

    $(function(){

        var container = $('.reg-content'),
            inputs = container.find('.input'),
            pwd = $('#pwd'),
            pwdRepeat = $('#pwdRepeat'),
            pwdRepeatTip = $('#pwdRepeat-tip'),
            pwdLvl = $('#pwd-lvl');

        // 密码安全等级
        function pwdLevel(value) {
            var pattern_1 = /^.*([\W_])+.*$/i;
            var pattern_2 = /^.*([a-zA-Z])+.*$/i;
            var pattern_3 = /^.*([0-9])+.*$/i;
            var level = 0;
            if (value.length > 10) {
                level++;
            }
            if (pattern_1.test(value)) {
                level++;
            }
            if (pattern_2.test(value)) {
                level++;
            }
            if (pattern_3.test(value)) {
                level++;
            }
            if (level > 3) {
                level = 3;
            }
            return level;
        }

        // 校验方法
        var rules = {
            isNull: function (str) {
                return (str === '' || typeof str !== 'string');
            },
            betweenLength: function (str, _min, _max) {
                return (str.length >= _min && str.length <= _max);
            },
            isUid: function (str) {
                return /^[A-Za-z0-9_\-\u4e00-\u9fa5]+$/.test(str);
            },
            fullNumberName: function (str) {
                return /^[0-9]+$/.test(str);
            },
            isPwd: function (str) {
                return /^.*([\W_a-zA-z0-9-])+.*$/i.test(str);
            },
            isPwdRepeat: function (val1, val2) {
                return val1 === val2;
            },
            isEmail: function (str) {
                return /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/.test(str);
            },
            isMobile: function (str) {
                return /^0?(13|15|18|14)[0-9]{9}$/.test(str);
            },
            simplePwd: function (str) {
                return pwdLevel(str) === 1;
            }
        };

        var config = {
            regName: {
                badLength: {
                    method: function(str){
                        return !rules.betweenLength(str, 4 ,20);
                    },
                    tip: '用户名长度只能在4-20位字符之间'
                },
                badFormat: {
                    method : function(str){
                        return !(rules.isUid(str) || rules.isMobile(str) || rules.isEmail(str));
                    },
                    tip: '用户名只能由中文、英文、数字及“_”、“-”组成'
                },
                fullNumberName: {
                    method: function(str){
                        return rules.fullNumberName(str) && !rules.isMobile(str);
                    },
                    tip: '<div class="two-lines">用户名不能是纯数字，请确认输入的是手机号或者重新输入</div>'
                },
                beUsed: {
                    method: function(val, callback){
                        // ajax here
                        // test
                        console.log('假装在发请求.........................');
                        setTimeout(function(){
                            if(val === 'used'){
                                callback(false);
                            }else{
                                callback(true);
                            }
                        }, 1000);
                    },
                    tip: '该用户名已被使用，请重新输入'
                }
            },
            pwd: {
                badLength: {
                    method: function(str){
                        return !rules.betweenLength(str, 6 ,20);
                    },
                    tip: '密码长度只能在6-20位字符之间'
                },
                badFormat: {
                    method: function(str){
                        return !rules.isPwd(str);
                    },
                    tip: '密码只能由英文、数字及标点符号组成'
                },
                simplePwd: {
                    method: function(str){
                        return rules.simplePwd(str);
                    },
                    tip: '<div class="two-lines">该密码比较简单，有被盗风险，建议您更改为复杂密码，如字母+数字的组合</div>',
                    warning: true
                },
                badRepeat: {
                    method: function(str1, str2){
                        return !rules.isPwdRepeat(str1, str2);
                    },
                    tip: '两次输入密码不一致'
                }
            },
            pwdRepeat: {
                badLength: {
                    method: function(str){
                        return !rules.betweenLength(str, 6 ,20);
                    },
                    tip: '密码长度只能在6-20位字符之间'
                },
                badFormat: {
                    method: function(str){
                        return !rules.isPwd(str);
                    },
                    tip: '密码只能由英文、数字及标点符号组成'
                },
                badRepeat: {
                    method: function(str1, str2){
                        return !rules.isPwdRepeat(str1, str2);
                    },
                    tip: '两次输入密码不一致'
                }
            }
        };

        var tips = {
            regName: {
                onFocus: '请输入邮箱/用户名/手机号',
                isNull: '请输入邮箱/用户名/手机号'
            },

            pwd: {
                onFocus: '<div class="two-lines">6-20位字符，可使用字母、数字或符号的组合，不建议使用纯数字，纯字母，纯符号</div>',
                isNull: '请输入密码'
            },
            pwdRepeat: {
                onFocus: '请再次输入密码',
                isNull: '请输入密码'
            },
            mobileCode: {
                onFocus: '',
                succeed: '',
                isNull: '请输入短信验证码',
                error: '验证码错误'
            },
            protocol: {
                onFocus: '',
                succeed: '',
                isNull: '请先阅读并同意《智溯科技用户注册协议》',
                error: ''
            },
            captcha: {
                isNull: '请输入验证码',
                error: '验证码错误，请核对后再输入'
            },
            empty: {
                onFocus: '',
                succeed: '',
                isNull: '',
                error: ''
            }
        };

        function showError(ele, tip, prompt){
            tip.html(prompt).addClass('tip-error').show();
            ele.addClass('error');
        }

        function showSuccess(ele, tip){
            tip.hide();
            ele.removeClass('error').addClass('success');
        }

        function tipLoading(tip){
            tip.html('检验中......');
        }

        // 校验
        inputs.each(function(){
            var ele = $(this),
                id = ele.attr('id'),
                tip = $('#' + id + '-tip'),
                conf = config[id],
                msg = tips[id];

            ele.on({
                focus: function(){
                    if(msg.onFocus){
                        tip.html(msg.onFocus).show().removeClass('tip-error');
                    }
                },
                blur: function(){
                    var val = ele.val(),
                        state = 'success';

                    if(val === ''){
                        tip.hide();
                        ele.removeClass('error success');
                        return;
                    }

                    for(var i in conf){
                        var error = conf[i].tip;
                        switch(i){
                            case 'beUsed': // 用户名是否可用
                                tipLoading(tip);
                                conf[i].method(val, function(success){
                                    if(success){
                                        showSuccess(ele, tip);
                                    }else{
                                        showError(ele, tip, error);
                                        state = 'error';
                                    }
                                });
                                break;

                            case 'badRepeat': // 密码重复
                                var val1 = pwd.val(),
                                    val2 = pwdRepeat.val();

                                if(val1 === '' || val2 === ''){
                                    break;
                                }

                                if(conf[i].method(val1, val2)){
                                    showError(pwdRepeat, pwdRepeatTip, error);
                                    if(id === 'pwdRepeat'){
                                        state = 'error';
                                    }
                                }else{
                                    showSuccess(pwdRepeat, pwdRepeatTip);
                                }
                                break;

                            default:
                                console.log(id, i, conf[i].method(val));
                                if(conf[i].method(val)){
                                    if(conf[i].warning){
                                        tip.html(error).show();
                                        state = 'warn';
                                    }else{
                                        showError(ele, tip, conf[i].tip);
                                        state = 'error';
                                    }
                                }
                                break;
                        }
                        if(state === 'error'){
                            break;
                        }
                    }
                    if(state === 'success'){
                        showSuccess(ele, tip);
                    }else if(state === 'warn'){
                        ele.removeClass('error').addClass('success');
                    }
                }
            });

            // 密码安全等级
            pwd.on({
                focus: function(){
                    pwdLvl.show();
                },
                blur: function(){
                    pwdLvl.hide();
                },
                keyup: function(){
                    var val = pwd.val(),
                        lv = pwdLevel(pwd.val());

                    pwdLvl.find('.lvl-active').removeClass('lvl-active');
                    if(val !== ''){
                        pwdLvl.find('.lvl' + lv).addClass('lvl-active');
                    }
                }
            });

            // 验证码类型
            var regName = $('#regName'),
                captchaArea = container.find('.captcha-area'),
                smsArea = container.find('.sms-area');

            regName.on('keyup', function(){
                if(rules.isMobile(regName.val())){
                    smsArea.show();
                    captchaArea.hide();
                }else{
                    captchaArea.show();
                    smsArea.hide();
                }
            });

            // 刷新验证码
            captchaArea.find('.refresh').click(function(e){
                e.preventDefault();
            });

            // 获取短信验证码
            container.find('button.sms').click(function(){

            });
        });

    });

});