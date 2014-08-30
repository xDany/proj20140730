/**
 * page/complain.js
 * 投诉
 */

require(['jquery'], function($) {
    'use strict';

    var func = {
        validate: function(){
            var phone = $('#phone'),
                form = $('form'),
                required = form.find('.required'),
                tip = $('.validate-info-phone');

            required.each(function(){
                var $this = $(this),
                    name = $this.siblings('label').text();

                name = name.substring(2, name.length-1);
                $this.data('error-msg', '请输入' + name);
            });

            required.focus(function(){
                var $this = $(this);
                if($this.hasClass('error') && $this.val() === $this.data('error-msg')){
                    $this.removeClass('error').val('');
                }
            });

            phone.keypress(function(e){
                var code = e.keyCode || e.which;
                if(code === 13){
                    e.preventDefault();
                    return false;
                }
            });

            form.submit(function(){
                return validate() && validatePhone();
            });
            phone.blur(validatePhone);

            function isPhone(str){
                return /^0?(13|15|18|14)[0-9]{9}$/.test(str) || /^[0-9\-()（）]{7,18}$/.test(str);
            }

            function isNull(input){
                return input.val() === '' || input.val() === input.data('error-msg');
            }

            function validatePhone(){
                if(isNull(phone)){
                    phone.removeClass('error');
                    tip.hide();
                    return false;
                }
                var vali = isPhone(phone.val());
                if(!vali){
                    phone.addClass('error');
                    tip.show();
                }else{
                    phone.removeClass('error');
                    tip.hide();
                }
                return vali;
            }

            function validate(){
                var vali = true;
                required.each(function(){
                    var $this = $(this);
                    if(isNull($this)){
                        vali = false;
                        $this.addClass('error').val($this.data('error-msg'));
                    }
                });
                return vali;
            }
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
