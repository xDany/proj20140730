/**
 * page/product-info.js
 * 产品信息
 */

require(['jquery', 'tabs'], function($, tabs) {
    'use strict';

    var func = {
        initTabs: function(){
            $('.prod-module').tabs();
        }
    };

    $(function() {
        for (var i in func) {
            func[i]();
        }
    });

});