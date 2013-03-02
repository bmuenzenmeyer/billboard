/*
jQuery Billboard by Brian Muenzenmeyer www.brianmuenzenmeyer.com 
Copyright (c) 2013 Brian Muenzenmeyer
Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/
(function ($, window, undefined) {
    'use strict';
    $.billboard = function (element, options) {
        var defaults = {
                messages: [],
                interval: 5000
            },
            plugin = this,
            currentIndex = 0,
            $element = $(element);
        plugin.settings = {};

        var displayNext = function () {
            clearTimeout(plugin.timerId);
            if (currentIndex >= plugin.settings.messages.length - 1) {
                currentIndex = 0;
            } else {
                currentIndex++;
            }
            $(element).fadeOut("slow", function () {
                $(element).text(plugin.settings.messages[currentIndex]);
            });
            $(element).fadeIn("slow");
            plugin.timerId = setTimeout(displayNext, plugin.settings.interval);
        };

        var stop = function () {
            $element.stop().removeAttr('style');
            clearTimeout(plugin.timerId);
        };

        var start = function () {
            plugin.timerId = setTimeout(displayNext, plugin.settings.interval);
        };

        plugin.init = function () {
            plugin.settings = $.extend({}, defaults, options);
            $element.on('click', function(){
                displayNext();
            });
            $element.hover(stop,start);
            start();
        };
        plugin.init();
    };

    $.fn.billboard = function (options) {
        return this.each(function () {
            if (undefined == $(this).data('billboard')) {
                var plugin = new $.billboard(this, options);
                $(this).data('billboard', plugin);
            }
        });
    };
})(jQuery, window);