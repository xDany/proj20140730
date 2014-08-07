/**
 * module/registry-validate.js
 * 注册校验
 */

define(['jquery'], function($){
    'use strict';

    var validatePrompt = {
        regName: {
            onFocus: '请输入邮箱/用户名/手机号',
            succeed: '',
            isNull: '请输入邮箱/用户名/手机号',
            error: {
                beUsed: '该用户名已被使用，请重新输入',
                badLength: '用户名长度只能在4-20位字符之间',
                badFormat: '用户名只能由中文、英文、数字及“_”、“-”组成',
                fullNumberName: '<span>用户名不能是纯数字，请确认输入的是手机号或者重新输入</span>'
            },
            onFocusExpand: function () {
                $('#morePinDiv').removeClass().addClass('intelligent-error hide');
            }
        },

        pwd: {
            onFocus: '<span>6-20位字符，可使用字母、数字或符号的组合，不建议使用纯数字，纯字母，纯符号</span>',
            succeed: '',
            isNull: '请输入密码',
            error: {
                badLength: '密码长度只能在6-20位字符之间',
                badFormat: '密码只能由英文、数字及标点符号组成',
                simplePwd: '<span>该密码比较简单，有被盗风险，建议您更改为复杂密码，如字母+数字的组合</span>',
                weakPwd: '<span>该密码比较简单，有被盗风险，建议您更改为复杂密码</span>'
            },
            onFocusExpand: function () {
                $('#pwdstrength').hide();
            }
        },
        pwdRepeat: {
            onFocus: '请再次输入密码',
            succeed: '',
            isNull: '请输入密码',
            error: {
                badLength: '密码长度只能在6-20位字符之间',
                badFormat2: '两次输入密码不一致',
                badFormat1: '密码只能由英文、数字及标点符号组成'
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

    $.fn.extend({
        validate: function(){
            this.each(function(){
                var ele = $(this),
                    id = ele.attr('id'),
                    conf = validatePrompt[id],
                    tip = $('#' + id + '-tip');

                ele.on({
                    focus: function(){
                        conf.onFocus && tip.html(conf.onFocus).show();
                    },
                    blur: function(){
                        if(ele.prop('required') && ele.val() === ''){
                            tip.html(conf.isNull).show().addClass('tip-error');
                        }else{
                            tip.hide();
                        }
                    }
                });
            });
        }
    });
});
