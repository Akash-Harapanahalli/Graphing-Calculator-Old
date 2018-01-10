var yMax = 5, yMin = -5, xMax = 5, xMin = -5;
var xStep = 1, yStep = 1;
var xOrigin, yOrigin;
var xScale, yScale;

function drawAxes(){

    for(var i = 0; i < xMax; i+=xStep){
        $("canvas").drawLine({
            strokeStyle: "#bdbdbd",
            strokeWidth: 2,
            x1: xOrigin + i*xScale, y1: 0,
            x2: xOrigin + i*xScale, y2: $('canvas').height()
        });
    }
    for(var i = 0; i > xMin; i-=xStep){
        $("canvas").drawLine({
            strokeStyle: "#bdbdbd",
            strokeWidth: 2,
            x1: xOrigin + i*xScale, y1: 0,
            x2: xOrigin + i*xScale, y2: $('canvas').height()
        });
    }
    for(var i = 0; i < yMax; i+=yStep){
        $("canvas").drawLine({
            strokeStyle: "#bdbdbd",
            strokeWidth: 2,
            x1: 0, y1: yOrigin + i*yScale,
            x2: $('canvas').width(), y2: yOrigin + i*yScale
        });
    }
    for(var i = 0; i > yMin; i-=yStep){
        $("canvas").drawLine({
            strokeStyle: "#bdbdbd",
            strokeWidth: 2,
            x1: 0, y1: yOrigin + i*yScale,
            x2: $('canvas').width(), y2: yOrigin + i*yScale
        });
    }

    $('#canvas').drawLine({
        layer: true,
        strokeStyle: '#000000',
        strokeWidth: 5,
        x1: xOrigin, y1: 0,
        x2: xOrigin, y2: $('#canvas').height()
    });

    $('#canvas').drawLine({
        layer: true,
        strokeStyle: '#000000',
        strokeWidth: 5,
        x1: 0, y1: yOrigin,
        x2: $('#canvas').width(), y2: yOrigin
    });

}

function updateCanvas(){
    var left = $('#canvas').offset().left;
    var top = $('#canvas').offset().top;
    $('#canvas').offset({top: 0, left: 0});
    $('#canvas').prop({width: ($('body').width() + 2*left), height: ($('body').height() + 2*top)});
}

function updateGlobals(){
    xOrigin = $("canvas").width()/(-1 * ( (xMax - xMin) / xMin) );
    yOrigin = $("canvas").height() - $("canvas").height()/(-1 * ( (yMax - yMin) / yMin) );

    xScale = $("canvas").width() / ( xMax - xMin );
    yScale = -1 * $("canvas").height() / ( yMax - yMin );
}
