$(document).ready(function(){
    var selector = $('.count');
    var replay = 'replay'
    
    function isScrolledIntoView(el) {
        var docViewTop = $(window).scrollTop();
        var docViewBottom = docViewTop + $(window).height();
        var elTop = el.offset().top;
        var elBottom = elTop + el.height();
        return ((elBottom <= docViewBottom) && (elTop >= docViewTop));
    }
    
    function animate_numbers(element) {
        if (isScrolledIntoView(element)) {
            element.addClass('started').css('visibility','visible')
            var startnum = element.text();
            if(element.text() % 1 === 0 && $.isNumeric(element.text())) {
                var step = function () { element.text(Math.ceil(this.Counter)); }
            } else if(element.text() % 1 !== 0 && $.isNumeric(element.text())) {
                var step = function () { element.text(this.Counter.toFixed(2)); }
            }
            jQuery({ Counter: 0 }).animate({ Counter: element.text() }, {
                duration : 2000,
                complete: function() { element.text($.trim(startnum)).addClass('finished').removeClass('started'); },
                step: step
            });
        }
    }
    
    selector.each(function () {
        $(this).css('visibility','hidden');
        animate_numbers($(this));
    });
    
    $(document).on("scroll", function () {
        selector.not('.finished, .started').each(function () {
            animate_numbers($(this));
        });
        selector.each(function () {
        if(!isScrolledIntoView($(this)) && $(this).hasClass(replay)) {
            $(this).removeClass('finished');
        }
        });
    });
});
