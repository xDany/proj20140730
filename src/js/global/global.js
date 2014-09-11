/**
 * global/global.js
 * 全局js
 */

require.config({
    baseUrl: 'js/module',
    paths: {
        'jquery': '../lib/jquery-latest'
    }
});

require(['topbar', 'header']);
