/**
 *
 */

'use strict';

seajs.use(['jquery', 'test-module'], function($, tm){
    $(function(){
        console.log($('#page'));
        tm();
    });
});