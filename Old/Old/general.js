var MOUSE_UP = 0;
var MOUSE_DOWN = 1;
var mouseState = MOUSE_UP;

var currentDragPosition = {
    x: 0,
    y: 0
}
var beforeDragPosition = {
    x: 0,
    y: 0
}
var beforeDrag = {
    xMin: 0,
    xMax: 0,
    yMin: 0,
    yMax: 0
}

var xMin = -10;
var xMax = 10;
var yMin = -5;
var yMax = 5;
var xStep = 1;
var yStep = 1;

var precision = 0;
var xScale = 0;
var yScale = 0;
var xOrigin;
var yOrigin;

var func = [];

var currentFunction = 0;
var functions = ["","","","","","","","",""];

var lastNumYouNeed;

var spanHoleText = '';
var spanAsymtoteText = '';

var integral = 0;

function startGraphing(){
    if($(functionDropdown).prop('enabled')){
        dropDown();
    }
    init_all();
    spanHoleText = '';
    spanAsymtoteText = '';

    xInput = xMin;
    functions[currentFunction] = functionBox.value;
    console.log(functions[currentFunction]);

    for(i = 8; i >= 0; i--){
        if(!(functions[i] == "")){
            lastNumYouNeed = i;
            i = -1;
        }
    }

    for(i = 0; i <= lastNumYouNeed; i++){
        done = false;
        xInput = xMin;
        console.log("f"+(i+1)+"(x)="+functions[i]);
        func[i] = math.compile(functions[i]);
        refresh(i);
    }


}

var xInput = xMin;
var done = false;
var prevRound;
function refresh(funcNum){

    //frameID = requestAnimationFrame(refresh);

    while(!done){

        var scope = {x: xInput};
        f.setPosition((xInput * xScale) + xOrigin, (func[funcNum].eval(scope) * yScale) + yOrigin);
        f.draw();

        if(firstDerivativeCheckBox.checked){
            f_.setPosition((xInput * xScale) + xOrigin, f.getVelocity() + yOrigin);
            f_.draw();
        }

        if(secondDerivativeCheckBox.checked){
            if(!(firstDerivativeCheckBox.checked)){
                f_.setPosition((xInput * xScale) + xOrigin, f.getVelocity() + yOrigin);
            }
            f__.setPosition((xInput * xScale) + xOrigin, f_.getVelocity() + yOrigin);
            f__.draw();
        }



        if(isNaN(func[funcNum].eval(scope))){
            if(Math.round(func[funcNum].eval({x: (prevRound - precision)})) == Math.round(func[funcNum].eval({x: (prevRound + precision)}))){
                console.log('Hole at (' + prevRound + ', ' + (Math.round(func[funcNum].eval({x: (prevRound + precision)}))) + ')');
                spanHoleText += (' ' + '(' + prevRound + ', ' + (Math.round(func[funcNum].eval({x: (prevRound + precision)}))) + ')')
                canvasContext.fillStyle = 'black';
                canvasContext.strokeStyle = 'white';
                canvasContext.beginPath();
                canvasContext.arc((prevRound * xScale) + xOrigin,((Math.round(func[funcNum].eval({x: (prevRound + precision)}))) * yScale) + yOrigin, 4, 0, 2 *Math.PI);
                canvasContext.stroke();
            }
        }
        if(func[funcNum].eval(scope) === Number.POSITIVE_INFINITY || func[funcNum].eval(scope) === Number.NEGATIVE_INFINITY){
            console.log('Vertical asymtote at x=' + prevRound);
            spanAsymtoteText += ('x=' + prevRound);
        }

        if(prevRound != Math.round(xInput)){
            prevRound = Math.round(xInput);
            scope = {x: prevRound};
            if(isNaN(func[funcNum].eval(scope))){
                if(Math.round(func[funcNum].eval({x: (prevRound - precision)})) == Math.round(func[funcNum].eval({x: (prevRound + precision)}))){
                    console.log('Hole at (' + prevRound + ', ' + (Math.round(func[funcNum].eval({x: (prevRound + precision)}))) + ')');
                    spanHoleText+='(' + prevRound + ', ' + (Math.round(func[funcNum].eval({x: (prevRound + precision)}))) + ') ';
                    canvasContext.strokeStyle = 'black';
                    canvasContext.fillStyle = 'white';
                    canvasContext.beginPath();
                    canvasContext.arc((prevRound * xScale) + xOrigin,((Math.round(func[funcNum].eval({x: (prevRound + precision)}))) * yScale) + yOrigin, 4, 0, 2 *Math.PI);
                    canvasContext.stroke();
                }
            }
            if(func[funcNum].eval(scope) === Number.POSITIVE_INFINITY || func[funcNum].eval(scope) === Number.NEGATIVE_INFINITY){
                console.log('Vertical asymtote at x=' + prevRound);
                spanAsymtoteText += ('x=' + prevRound);
            }
        }




        xInput+=precision;

        if(xInput >= xMax){
            console.log("Should be done graphing.");
            done = true;
        //    cancelAnimationFrame(frameID);
        }
        $(spanHole).html(spanHoleText);
        $(spanAsymtote).html(spanAsymtoteText);



    }

}


function home(){
    xMin = -10;
    xMax = 10;
    yMin = -5;
    yMax = 5;
    xMinBox.value = xMin;
    xMaxBox.value = xMax;
    yMinBox.value = yMin;
    yMaxBox.value = yMax;
    xStepBox.value = "1";
    startGraphing();
}

function trig(){
    xMinBox.value = "-2pi";
    xMaxBox.value = "2pi";
    yMinBox.value = "-3";
    yMaxBox.value = "3";
    xStepBox.value = "pi/4";
    startGraphing();
}

function checkForChanges(){
    $(canvas).on('mousedown', function(e){
		console.log("in mousedown");
		mouseState = MOUSE_DOWN;

        beforeDrag = {
            xMin: xMin,
            xMax: xMax,
            yMin: yMin,
            yMax: yMax
        }
        previousDragPosition = {
            x: (e.pageX - canvas.offsetLeft),
            y: (e.pageY - canvas.offsetTop)
        };
        currentDragPosition = {
            x: (e.pageX - canvas.offsetLeft),
            y: (e.pageY - canvas.offsetTop)
        };
        console.log('(' + previousDragPosition.x + ', ' + previousDragPosition.y + ')');
	});

    $(canvas).on('mousemove', function(e){
        if(mouseState === MOUSE_DOWN){
            //console.log("dragging");
            currentDragPosition = {
                x: (e.pageX - canvas.offsetLeft),
                y: (e.pageY - canvas.offsetTop)
            };
            xMin = beforeDrag.xMin + ((previousDragPosition.x - currentDragPosition.x)/xScale);
            xMax = beforeDrag.xMax + ((previousDragPosition.x - currentDragPosition.x)/xScale);
            yMin = beforeDrag.yMin + ((previousDragPosition.y - currentDragPosition.y)/yScale);
            yMax = beforeDrag.yMax + ((previousDragPosition.y - currentDragPosition.y)/yScale);

            xMinBox.value = xMin;
            xMaxBox.value = xMax;
            yMinBox.value = yMin;
            yMaxBox.value = yMax;


            startGraphing();

            //console.log('delta x = ' + (previousDragPosition.x - currentDragPosition.x)/xScale + ', delta y = ' + (previousDragPosition.y - currentDragPosition.y)/yScale);
        }

    });

    $(canvas).on('mouseup', function(e){
		console.log("in mouseup");
		mouseState = MOUSE_UP;
        currentDragPosition = {
            x: (e.pageX - canvas.offsetLeft),
            y: (e.pageY - canvas.offsetTop)
        };
        startGraphing();
	});

    $('#functionInput').on('input', function() {
		startGraphing();
	});
	$('#precisionInput').on('input', function() {
		startGraphing();
	});
	$('#1stDerivative').on('change', function() {
		startGraphing();
	});
	$('#2ndDerivative').on('change', function() {
		startGraphing();
    });
    $('#xMinInput').on('input', function() {
		startGraphing();
    });
    $('#xMaxInput').on('input', function() {
		startGraphing();
    });
    $('#yMinInput').on('input', function() {
		startGraphing();
    });
    $('#yMaxInput').on('input', function() {
		startGraphing();
    });
    $('#xStepInput').on('input', function() {
		startGraphing();
    });
    $('#yStepInput').on('input', function() {
		startGraphing();
    });
    $(functionDropdown).on('click', function(e){
        console.log(e.target.hash);
        setCurrentFunction(e.target.hash);
        dropDown();
    });

}

function setCurrentFunction(inFunc){
    switch (inFunc){
    case '#f1':
        currentFunction = 0;
        functionNumber.value = "f1(x)";
        break;
    case '#f2':
        currentFunction = 1;
        functionNumber.value = "f2(x)";
        break;
    case '#f3':
        currentFunction = 2;
        functionNumber.value = "f3(x)";
        break;
    case '#f4':
        currentFunction = 3;
        functionNumber.value = "f4(x)";
        break;
    case '#f5':
        currentFunction = 4;
        functionNumber.value = "f5(x)";
        break;
    case '#f6':
        currentFunction = 5;
        functionNumber.value = "f6(x)";
        break;
    case '#f7':
        currentFunction = 6;
        functionNumber.value = "f7(x)";
        break;
    case '#f8':
        currentFunction = 7;
        functionNumber.value = "f8(x)";
        break;
    case '#f9':
        currentFunction = 8;
        functionNumber.value = "f9(x)";
        break;
    }
    functionBox.value = functions[currentFunction];
}
