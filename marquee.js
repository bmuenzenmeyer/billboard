(function($) {
    $.marquee = function(element, options) {
        var defaults = {
            messages: [],
            interval: 8000
        }
        var plugin = this,
            currentIndex = 0;
        plugin.timerId;
        plugin.settings = {}
        var $element = $(element),
             element = element;

        var displayNext = function() {
            clearTimeout(plugin.timerId);
            if(currentIndex >= plugin.settings.messages.length - 1){
                currentIndex = 0;
            } else {
                currentIndex++;
            }
            $(element).fadeOut("slow", function(){
                $(element).text(plugin.settings.messages[currentIndex]);
            });
            $(element).fadeIn("slow");
            plugin.timerId = setTimeout(displayNext, plugin.settings.interval);
        }

        var stop = function() {
            $element.stop().removeAttr('style');
            clearTimeout(plugin.timerId)
        }

        var start = function() {
            plugin.timerId = setTimeout(displayNext, plugin.settings.interval);
        }

        plugin.init = function() {
            plugin.settings = $.extend({}, defaults, options);
            $element.on('click', function(){
                displayNext();
            });
            $element.hover(stop,start);
            start();
        }
        plugin.init();
    }

    $.fn.marquee = function(options) {
        return this.each(function() {
            if (undefined == $(this).data('marquee')) {
                var plugin = new $.marquee(this, options);
                $(this).data('marquee', plugin);
            }
        });
    }
})(jQuery);