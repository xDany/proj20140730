/**
 * page/registry-success.js
 * 注册成功
 */

require(['jquery'], function($) {
    'use strict';

    var func = {
        email: function(){
            var input = $('#email'),
                form = $('form'),
                errorTip = $('.success-mobile .error-tip');

            input.keypress(function(e){
                var code = e.keyCode || e.which;
                if(code === 13){
                    e.preventDefault();
                    return false;
                }
            });

            function isEmail(str){
                return /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/.test(str);
            }

            function validate(){
                if(input.val() === ''){
                    input.removeClass('input-error');
                    errorTip.hide();
                    return false;
                }
                var vali = isEmail(input.val());
                if(!vali){
                    input.addClass('input-error');
                    errorTip.show().html('请输入正确的邮箱格式');
                }else{
                    input.removeClass('input-error');
                    errorTip.hide();
                }
                return vali;
            }

            form.submit(function(){
                return validate();
            });
            input.blur(validate);
        }
    };

    $(function() {
        for (var i in func) {
            func[i]();
        }
    });

});
