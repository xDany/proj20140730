/**
 * page/registry.js
 * 注册
 */

require([
    'jquery',
    'registry-validate',
    'jquery.modal'
    ], function($) {
    'use strict';

    var func = {
        agreement: function(){
            $('a.read-agreement').click(function(e){
                e.preventDefault();
                $(this).modal({
                    fadeDuration: 100
                });
            });
            $('#agreement-content button').click(function(){
                $.modal.close();
                $('#agree')
                    .prop('checked', true)
                    .trigger('change');
            });
        }
    };

    $(function() {
        for (var i in func) {
            func[i]();
        }
    });

});