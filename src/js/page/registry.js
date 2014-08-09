/**
 * module/registry.js
 * 注册
 */

require(['jquery', 'registry-validate2'], function($) {
    'use strict';

    var func = {

    };

    $(function() {
        for (var i in func) {
            func[i]();
        }
    });

});