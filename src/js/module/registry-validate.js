/**
 * module/registry-validate.js
 * 注册校验
 */

define(['jquery'], function($) {
    'use strict';

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

    // 校验正则
    var validateRegExp = {
        email: '^\\w+((-\\w+)|(\\.\\w+))*\\@[A-Za-z0-9]+((\\.|-)[A-Za-z0-9]+)*\\.[A-Za-z0-9]+$', //邮件
        chinese: '^[\\u4e00-\\u9fa5]+$', //仅中文
        mobile: '^0?(13|15|18|14)[0-9]{9}$', //手机
        notempty: '^\\S+$', //非空
        fullNumber: '^[0-9]+$', //数字
        password: '^.*[A-Za-z0-9\\w_-]+.*$', //密码
        username: '^[A-Za-z0-9_\\-\\u4e00-\\u9fa5]+$', //户名
    };

    //验证规则
    var validateRules = {
        isNull: function (str) {
            return (str === '' || typeof str !== 'string');
        },
        betweenLength: function (str, _min, _max) {
            return (str.length >= _min && str.length <= _max);
        },
        isUid: function (str) {
            return new RegExp(validateRegExp.username).test(str);
        },
        fullNumberName: function (str) {
            return new RegExp(validateRegExp.fullNumber).test(str);
        },
        isPwd: function (str) {
            // return /^.*([\W_a-zA-z0-9-])+.*$/i.test(str);
            return new RegExp(validateRegExp.password).test(str);
        },
        isPwdRepeat: function (val1, val2) {
            return val1 === val2;
        },
        isEmail: function (str) {
            return new RegExp(validateRegExp.email).test(str);
        },
        isMobile: function (str) {
            return new RegExp(validateRegExp.mobile).test(str);
        },
        simplePwd: function (str) {
            return pwdLevel(str) === 1;
        }
    };

    var validateConfig = {
        regName: {
            badLength: [4,20],
            badFormat: ['isUid', 'isEmail', 'isMobile'],
            fullNumberName: 'fullNumberName',
            beUsed: function(val, callback){
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
            }
        },
        pwd: {
            badLength: [6,20],
            badFormat: ['isPwd'],
            simplePwd: ['simplePwd'],
            badRepeat: 'isPwdRepeat'
        },
        pwdRepeat: {
            badLength: [6,20],
            badFormat: ['isPwd'],
            badRepeat: 'isPwdRepeat'
        }
    };

    var validatePrompt = {
        regName: {
            onFocus: '请输入邮箱/用户名/手机号',
            succeed: '',
            isNull: '请输入邮箱/用户名/手机号',
            error: {
                beUsed: '该用户名已被使用，请重新输入',
                badLength: '用户名长度只能在4-20位字符之间',
                badFormat: '用户名只能由中文、英文、数字及“_”、“-”组成',
                fullNumberName: '<div class="two-lines">用户名不能是纯数字，请确认输入的是手机号或者重新输入</div>'
            },
            onFocusExpand: function() {
                $('#morePinDiv').removeClass().addClass('intelligent-error hide');
            }
        },

        pwd: {
            onFocus: '<div class="two-lines">6-20位字符，可使用字母、数字或符号的组合，不建议使用纯数字，纯字母，纯符号</div>',
            succeed: '',
            isNull: '请输入密码',
            error: {
                badLength: '密码长度只能在6-20位字符之间',
                badFormat: '密码只能由英文、数字及标点符号组成',
                simplePwd: '<div class="two-lines">该密码比较简单，有被盗风险，建议您更改为复杂密码，如字母+数字的组合</div>'
                // weakPwd: '<span>该密码比较简单，有被盗风险，建议您更改为复杂密码</span>'
            },
            onFocusExpand: function() {
                $('#pwdstrength').hide();
            }
        },
        pwdRepeat: {
            onFocus: '请再次输入密码',
            succeed: '',
            isNull: '请输入密码',
            error: {
                badLength: '密码长度只能在6-20位字符之间',
                badFormat: '密码只能由英文、数字及标点符号组成',
                badRepeat: '两次输入密码不一致'
            }
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
            onFocus: '',
            succeed: '',
            isNull: '',
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

    function showWarning(ele, tip, prompt){
        console.log(ele, tip, prompt);
        tip.html(prompt).show();
        ele.addClass('success');
    }

    function showSuccess(ele, tip){
        tip.hide();
        ele.removeClass('error').addClass('success');
    }

    function tipLoading(tip){
        tip.html('检验中......');
    }

    $(function(){
        var inputs = $('.input'),
            pwd = $('#pwd'),
            pwdRepeat = $('#pwdRepeat'),
            pwdRepeatTip = $('#pwdRepeat-tip');

        inputs.each(function() {
            var ele = $(this),
                id = ele.attr('id'),
                prompt = validatePrompt[id],
                error = prompt.error,
                conf = validateConfig[id],
                tip = $('#' + id + '-tip');

            ele.on({
                focus: function() {
                    if (prompt.onFocus) {
                        tip.html(prompt.onFocus).show().removeClass('tip-error');
                    }
                    ele.removeClass('success error');
                },
                blur: function() {
                    var val = ele.val(),
                        state = 'success';

                    if(val === ''){
                        tip.hide();
                        return;
                    }else{
                        // doValidation(ele);
                        for(var i in conf){
                            var v = conf[i];

                            switch(i){
                                case 'badLength':
                                    if(!validateRules.betweenLength(val, v[0], v[1])){
                                        showError(ele, tip, error[i]);
                                        state = 'error';
                                    }
                                    break;
                                case 'badFormat':
                                    var isFormat = false;
                                    for(var j in v){
                                        // 符合任一即可
                                        if(validateRules[v[j]](val)){
                                            isFormat = true;
                                            break;
                                        }
                                    }
                                    if(!isFormat){
                                        showError(ele, tip, error[i]);
                                        state = 'error';
                                    }
                                    break;
                                case 'fullNumberName':
                                    if(validateRules[i](val) && !validateRules.isMobile(val)){
                                        showError(ele, tip, error[i]);
                                        state = 'error';
                                    }
                                    break;
                                case 'beUsed':
                                    tipLoading(tip);
                                    v(val, function(ok){
                                        console.log(ok);
                                        if(ok){
                                            showSuccess(ele, tip);
                                        }else{
                                            showError(ele, tip, error[i]);
                                            state = 'error';
                                        }
                                    });
                                    break;
                                case 'simplePwd':
                                    if(validateRules[i](val)){
                                        tip.html(error[i]).show();
                                        state = 'warn';
                                    }else{
                                        state = 'success';
                                    }
                                    break;
                                case 'badRepeat':
                                    var val1 = pwd.val(),
                                        val2 = pwdRepeat.val();

                                    if(val1 === '' || val2 === ''){
                                        break;
                                    }
                                    if(!validateRules[v](val1, val2)){
                                        showError(pwdRepeat, pwdRepeatTip, validatePrompt.pwdRepeat.error.badRepeat);
                                        if(id === 'pwdRepeat'){
                                            state = 'error';
                                        }
                                    }else{
                                        showSuccess(pwdRepeat, pwdRepeatTip);
                                    }
                                    break;
                                default:
                                    break;
                            }

                            if(state === 'error'){
                                break;
                            }
                        }
                        if(state === 'success'){
                            showSuccess(ele, tip);
                        }else if(state === 'warn'){
                            ele.addClass('success');
                        }

                    }
                }
            });
        });

    });

});