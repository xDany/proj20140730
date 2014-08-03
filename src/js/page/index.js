/**
 * page/index.js
 * 主页
 */

require(['jquery', 'jquery.slides'], function($, slide){
    'use strict';

    var func = {
        slide: function(){
            $('#banner ul').slidesjs();
        }
    };

    $(function(){
        for(var i in func){
            func[i]();
        }
    });

});
