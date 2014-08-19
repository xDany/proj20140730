/**
 * page/product-center.js
 * 产品中心
 */

require(['jquery'], function($) {
    'use strict';

    var func = {
        toggleDetail: function(){
            $('.detail-content').on('click', '.view-detail', function(e){
                var $this = $(this),
                    detail = $this.closest('.product').find('.detail'),
                    leftHeight = detail.find('.left').length ?
                        detail.find('.left').height(): 0,
                    rightHeight = detail.find('.right').length ?
                        detail.find('.right').height(): 0,
                    middleHeight = detail.find('.middle').length ?
                        detail.find('.middle').height(): 0;

                detail.height(Math.max(leftHeight, rightHeight, middleHeight));
                $this.hide().siblings().show();
            }).on('click', '.hide-detail', function(e){
                var $this = $(this),
                    detail = $this.closest('.product').find('.detail');

                detail.height(0);
                $this.hide().siblings().show();
            });
        }
    };

    $(function() {
        for (var i in func) {
            func[i]();
        }
    });

});
