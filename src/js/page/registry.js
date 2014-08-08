/**
 * module/registry.js
 * 注册
 */

require(['jquery', 'registry-validate'], function($) {
    'use strict';

    var func = {

    };

    $(function() {
        for (var i in func) {
            func[i]();
        }
    });

});