(function($) {
    $.marquee = function(element, options) {
        var defaults = {
            messages: [],
            interval: 8000
        }
        var plugin = this,
            timerId,
            currentIndex = 0;
        plugin.settings = {}
        var $element = $(element),
             element = element;
        plugin.init = function() {
            plugin.settings = $.extend({}, defaults, options);
            $element.click(function(){
                displayNext();
            });
            setTimeout(displayNext, plugin.settings.interval);
        }
        /*plugin.foo_public_method = function() {
            // code goes here
        }*/
        var displayNext = function() {
            clearTimeout(timerId);
            if(currentIndex >= plugin.settings.messages.length - 1){
                currentIndex = 0;
            } else {
                currentIndex++;
            }
            $(element).fadeOut("slow", function(){
                $(element).text(plugin.settings.messages[currentIndex]);
            });
            $(element).fadeIn("slow");
            timerId = setTimeout(displayNext, plugin.settings.interval);
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