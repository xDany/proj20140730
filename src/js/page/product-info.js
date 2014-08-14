/**
 * page/product-info.js
 * 产品信息
 */

require([
    'jquery',
    'tabs',
    'gallery'
    ], function($) {
    'use strict';

    var func = {
        initTabs: function(){
            $('.prod-module').tabs();
        },

        initGallery: function(){
            $('.gallery').gallery();
        }
    };

    $(function() {
        for (var i in func) {
            func[i]();
        }
    });

});