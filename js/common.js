var lastScrollTop = 0;
$(document).ready(function() {
// Tooltip only Text
$('.masterTooltip').hover(function() {
        // Hover over code
        var title = $(this).attr('title');
        $(this).data('tipText', title).removeAttr('title');
        $('<p class="tooltip"></p>')
        .text(title)
        .appendTo('body')
        .fadeIn('slow');
}, function() {
        // Hover out code
        $(this).attr('title', $(this).data('tipText'));
        $('.tooltip').remove();
}).mousemove(function(e) {
        var mousex = e.pageX + 20; //Get X coordinates
        var mousey = e.pageY + 10; //Get Y coordinates
        $('.tooltip')
        .css({ top: mousey, left: mousex })
});
$('.connection-wrap').hover(function() {
        // Hover over code
        var title = $(this).attr('title');
        $(this).data('tipText', title).removeAttr('title');
        $('<p class="tooltip"></p>')
        .text(title)
        .appendTo('body')
        .fadeIn('slow');
}, function() {
        // Hover out code
        $(this).attr('title', $(this).data('tipText'));
        $('.tooltip').remove();
}).mousemove(function(e) {
        var mousex = e.pageX + 20; //Get X coordinates
        var mousey = e.pageY + 10; //Get Y coordinates
        $('.tooltip')
        .css({ top: mousey, left: mousex })
});
});



var graphScale = 1;

var paperScale = function(sx, sy) {
  paper.scale(sx, sy);
};

var zoomOut = function()  {
  graphScale -= 0.1;
  paperScale(graphScale, graphScale);
}

var zoomIn = function() {
  graphScale += 0.1;
  paperScale(graphScale, graphScale);
};

var resetZoom = function() {
  graphScale = 1;
  paperScale(graphScale, graphScale);
};

/*$(window).scroll(function() {
        var direction = $(this).scrollTop();
        if (direction < lastScrollTop) {
          graphScale += 0.1;
        } else {
          if (graphScale > 0 ) {
            graphScale -= 0.1;
          }
        }
        paper.scale(graphScale, graphScale);
        lastScrollTop = direction;
        return;
});*/