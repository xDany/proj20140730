/**
 * module/tabs.js
 * jquery tabs 插件
 */

define(['jquery'], function($) {
    'use strict';

    $.fn.extend({
        tabs: function(config) {
            var defaultConfig = {
                eventType: 'mouseenter',
                titleSelector: '.tab-t',
                boxSelector: '.tab-b',
                currentClass: 'current',
                selected: 0
            };
            config = $.extend(defaultConfig, config);
            var container = $(this),
                title = container.find(config.titleSelector),
                box = container.find(config.boxSelector),
                currentClass = config.currentClass,
                eventType = config.eventType + '.tabs',
                selected = config.selected,
                timer,
                toLeave;

            if (title.length !== box.length) {
                return;
            }

            function setTab(curTitle) {
                var index = curTitle.index(),
                    curBox = box.eq(index);
                title.removeClass(currentClass);
                curTitle.addClass(currentClass);
                box.hide();
                curBox.show();
            }

            if (eventType === 'mouseenter.tabs') {
                title.on(eventType, function() {
                    var $this = $(this);
                    toLeave = $this.index();
                    timer = setTimeout(function() {
                        setTab($this);
                    }, 200);
                }).on('mouseleave.tabs', function() {
                    if (timer && toLeave === $(this).index()) {
                        clearTimeout(timer);
                        timer = null;
                    }
                });
            } else {
                title.on(eventType, function(e) {
                    e.preventDefault();
                    setTab($(this));
                });
            }

            setTab(title.eq(selected));
        }
    });

});