var xMin, xMax, yMin, yMax;
var xOrigin, yOrigin;
var xScale, yScale;
var xStep, yStep;
var precision;
var der1, der2;
var currentFunctionNumber = 0;
var functionStrings = ["","","","","","","","","",""];
var func = [];

function refreshInputs(){
    // refreshing the inputs
    xMin = parseFloat($(xMinInput).val());
    xMax = parseFloat($(xMaxInput).val());
    yMin = parseFloat($(yMinInput).val());
    yMax = parseFloat($(yMaxInput).val());
    xStep = parseFloat($(xStepInput).val());
    yStep = parseFloat($(yStepInput).val());
    precision = 1 / parseInt($(precisionInput).val());
    der1 = $(der1Input).prop("checked");
    der2 = $(der2Input).prop("checked");
}

function graph(){
    refreshInputs();
    functionStrings[0] = $(functionBox).value;
    func[0] = math.compile(functionStrings[0]);
    graphing(0,precision);
}

function graphLowPrecision(){
    refreshInputs();
    functionStrings[0] = $(functionBox).value;
    func[0] = math.compile(functionStrings[0]);
    graphing(0,0.5);
}

function graphing(funcNum, prec){
    console.log("Graphing...");

    $("canvas").clearCanvas();
    xOrigin = $("canvas").width()/(-1 * ( (xMax - xMin) / xMin) );
    yOrigin = $("canvas").height() - $("canvas").height()/(-1 * ( (yMax - yMin) / yMin) );

    xScale = $("canvas").width() / ( xMax - xMin );
    yScale = -1 * $("canvas").height() / ( yMax - yMin );

    var f = func[funcNum];
    var dash = 0;

    // Graph the axes
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

    $("canvas").drawLine({
        strokeStyle: "#000000",
        strokeWidth: 5,
        x1: 0, y1: yOrigin,
        x2: $("canvas").width(), y2: yOrigin
    });
    $("canvas").drawLine({
        strokeStyle: "#000000",
        strokeWidth: 5,
        x1: xOrigin, y1: 0,
        x2: xOrigin, y2: $("canvas").height()
    });

    // Graph the borders, no necessary but looks really nice...
    $('canvas').drawLine({
        strokeStyle: '#000000',
        strokeWidth: 2,
        x1: 1, y1: 0,
        x2: 1, y2: $('canvas').height()
    });
    $('canvas').drawLine({
        strokeStyle: '#000000',
        strokeWidth: 2,
        x1: $('canvas').width() - 1, y1: 0,
        x2: $('canvas').width() - 1, y2: $('canvas').height()
    });
    $('canvas').drawLine({
        strokeStyle: '#000000',
        strokeWidth: 2,
        x1: 0, y1: 1,
        x2: $('canvas').width(), y2: 1
    });
    $('canvas').drawLine({
        strokeStyle: '#000000',
        strokeWidth: 2,
        x1: 0, y1: $('canvas').height()-1,
        x2: $('canvas').width(), y2: $('canvas').height()-1
    });

    // Graph the Function
    var xInput = xMin, prev_xInput;
    var yOutput = f.eval({x: xInput}), prev_yOutput =  yOutput;
    var f_ = (yOutput - prev_yOutput)/(xInput - prev_xInput), prev_f_ = f_;
    var f__ = (f_ - prev_f_)/(xInput - prev_xInput), prev_f__ = f__ ;

    while(xInput <= xMax){
        //xInput = Math.round((xInput + precision) * (1/precision)) * precision;
        xInput += prec;
        //console.log("xInput: " + xInput);
        yOutput = f.eval({x: xInput});

        f_ = (yOutput - prev_yOutput)/(xInput - prev_xInput);
        f__ = (f_ - prev_f_)/(xInput - prev_xInput);

        if(yOutput > yMax + 10 || yOutput < yMin-10){
            dash = 5;
        } else {
            dash = 0;
        }

        $("canvas").drawLine({
            strokeStyle: "#000000",
            strokeWidth: 2,
            strokeDash: [dash],
            x1: (prev_xInput * xScale + xOrigin), y1: (prev_yOutput * yScale + yOrigin),
            x2: (xInput * xScale + xOrigin), y2: (yOutput * yScale + yOrigin)
        });
        if(der1){
            $("canvas").drawLine({
                strokeStyle: "#2329cc",
                strokeWidth: 2,
                x1: (prev_xInput * xScale + xOrigin), y1: (prev_f_ * yScale + yOrigin),
                x2: (xInput * xScale + xOrigin), y2: (f_ * yScale + yOrigin)
            });
        }
        if(der2){
            $("canvas").drawLine({
                strokeStyle: "#e33712",
                strokeWidth: 2,
                x1: (prev_xInput * xScale + xOrigin), y1: (prev_f__ * yScale + yOrigin),
                x2: (xInput * xScale + xOrigin), y2: (f__ * yScale + yOrigin)
            });
        }

        prev_xInput = xInput;
        prev_yOutput = yOutput;
        prev_f_ = f_;
        prev_f__ = f__;
    }


    var xIn = xMin;
    var xStp = 0.1;
    while(xIn <= xMax){
        funcVal = f.eval({x:xIn});
        if(funcVal === Number.POSITIVE_INFINITY || funcVal === Number.NEGATIVE_INFINITY){
            console.log("Asymtote at x=" + xIn);
        }
        if(isNaN(funcVal)){
            console.log("Hole at x=" + xIn);
        }
        xIn = Math.round((xIn + xStp) * 100) / 100;
    }
    /*
    xIn = Math.PI/100;
    while(xIn <= xMax){

    }
    */
}

var isMouseDown = false;
var beforeDrag, previousDragPosition, currentDragPosition;

function init(){
    $('canvas').on('mousedown', function(e){

        isMouseDown = true;
        beforeDrag = {
            xMin: xMin,
            xMax: xMax,
            yMin: yMin,
            yMax: yMax
        }

        previousDragPosition = {
            x: (e.offsetX),
            y: (e.offsetY)
        }
        currentDragPosition = {
            x: (e.offsetX),
            y: (e.offsetY)
        }

    });

    $('canvas').on('mousemove', function(e){
        if(isMouseDown){
            console.log("dragging...");
            currentDragPosition = {
                x: (e.offsetX),
                y: (e.offsetY)
            }
            /*
            xMin = ((beforeDrag.xMin) + ((previousDragPosition.x - currentDragPosition.x)/xScale));
            xMax = ((beforeDrag.xMax) + ((previousDragPosition.x - currentDragPosition.x)/xScale));
            yMin = ((beforeDrag.yMin) + ((previousDragPosition.y - currentDragPosition.y)/yScale));
            yMax = ((beforeDrag.yMax) + ((previousDragPosition.y - currentDragPosition.y)/yScale));
            */
            $(xMinInput).val(((beforeDrag.xMin) + ((previousDragPosition.x - currentDragPosition.x)/xScale)));
            $(xMaxInput).val(((beforeDrag.xMax) + ((previousDragPosition.x - currentDragPosition.x)/xScale)));
            $(yMinInput).val(((beforeDrag.yMin) + ((previousDragPosition.y - currentDragPosition.y)/yScale)));
            $(yMaxInput).val(((beforeDrag.yMax) + ((previousDragPosition.y - currentDragPosition.y)/yScale)));

            graphLowPrecision();
        }
    });

    $('canvas').on('mouseup', function(e){
        isMouseDown = false;
        graph();
    });


    $(functionInput).on('input',function(){ graph(); });
    $(xMinInput).on('input',function(){ graph(); });
    $(xMaxInput).on('input',function(){ graph(); });
    $(yMinInput).on('input',function(){ graph(); });
    $(yMaxInput).on('input',function(){ graph(); });
    $(xStepInput).on('input',function(){ graph(); });
    $(yStepInput).on('input',function(){ graph(); });
    $(precisionInput).on('input',function(){ graph(); });
    $(der1Input).on('change',function(){ graph(); });
    $(der2Input).on('change',function(){ graph(); });
    $(functionDropdown).on('click', function(e){
        console.log(e);
    });
}

function setCurrentFunctionNumber(f){
    switch(f){
        case '#f1':
        currentFunctionNumber = 0;
        break;
        case '#f2':
        currentFunctionNumber = 1;
        break;
        case '#f3':
        currentFunctionNumber = 2;
        break;
        case '#f4':
        currentFunctionNumber = 3;
        break;
        case '#f5':
        currentFunctionNumber = 4;
        break;
        case '#f6':
        currentFunctionNumber = 5;
        break;
        case '#f7':
        currentFunctionNumber = 6;
        break;
        case '#f8':
        currentFunctionNumber = 7;
        break;
        case '#f9':
        currentFunctionNumber = 8;
        break;
        case '#f10':
        currentFunctionNumber = 9;
        break;

    }
}

function dropDown(){
    $(functionDropdown).toggle("show");
}
