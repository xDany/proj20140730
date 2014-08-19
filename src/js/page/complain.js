/**
 * page/complain.js
 * 投诉
 */

require(['jquery'], function($) {
    'use strict';

    var func = {
        phone: function(){
            var input = $('#phone'),
                form = $('form'),
                tip = $('.validate-info-phone');

            input.keypress(function(e){
                var code = e.keyCode || e.which;
                if(code === 13){
                    e.preventDefault();
                    return false;
                }
            });

            function isPhone(str){
                return /^0?(13|15|18|14)[0-9]{9}$/.test(str) || /^[0-9\-()（）]{7,18}$/.test(str);
            }

            function validate(){
                if(input.val() === ''){
                    input.removeClass('input-error');
                    return false;
                }
                var vali = isPhone(input.val());
                if(!vali){
                    input.addClass('input-error');
                    tip.show();
                }else{
                    input.removeClass('input-error');
                    tip.hide();
                }
                return vali;
            }

            form.submit(function(){
                return validate();
            });
            input.blur(validate);
        },
        cancel: function(){
            $('#cancel').click(function(e){
                e.preventDefault();
                window.location.href = $('.logo').attr('href');
            });
        }
    };

    $(function() {
        for (var i in func) {
            func[i]();
        }
    });

});
