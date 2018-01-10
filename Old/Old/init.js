var f = new movingObject();
function init_f(){
	f.color = "black";
	f.width = 1;
	f.height = 1;
}

var f_ = new movingObject();
function init_f_(){
	f_.color = "blue";
	f_.width = 1;
	f_.height = 1;
}

var f__ = new movingObject();
function init_f__(){
	f__.color = "red";
	f__.width = 1;
	f__.height = 1;
}

var F = new movingObject();
function init_F(){
	F.color = "green";
	F.width = 1;
	F.height = 1;
	F.C = 0;
}

var xAxis = new axis();
xAxis.drawLabel = function(){
	for(i = 0; i < xMax; i+=xStep){
		var xPos = (i * xScale) + xOrigin;
		canvasContext.fillStyle = xAxis.color;
		canvasContext.fillRect(xPos,yOrigin - 10,1,20);
	}
	for(i = 0; i > xMin; i-=xStep){
		var xPos = (i * xScale) + xOrigin;
		canvasContext.fillStyle = xAxis.color;
		canvasContext.fillRect(xPos,yOrigin - 10,1,20);
	}
}
function init_xAxis(){
	xAxis.width = canvas.width;
	xAxis.height = 1;
	xAxis.py = yOrigin;//canvas.height/2;
	xAxis.px = 0;
}

var yAxis = new axis();
yAxis.drawLabel = function(){
	for(i = 0; i < yMax; i+=yStep){
		var yPos = (i * yScale) + yOrigin;
		canvasContext.fillStyle = yAxis.color;
		canvasContext.fillRect(xOrigin - 10, yPos, 20, 1);
	}
	for(i = 0; i > yMin; i-=yStep){
		var yPos = (i * yScale) + yOrigin;
		canvasContext.fillStyle = yAxis.color;
		canvasContext.fillRect(xOrigin - 10, yPos, 20, 1);
	}
}
function init_yAxis(){
	yAxis.width = 1;
	yAxis.height = canvas.height;
	yAxis.px = xOrigin;//canvas.width/2;
	yAxis.py = 0;
}

var spanHole;
function init_spanHole(){
	spanHole = document.getElementById('spanHole');
}

var spanAsymtote;
function init_spanAsymtote(){
	spanAsymtote = document.getElementById('spanAsymtote');
}


function init_all(){
	init_canvas();
	init_functionBox();
	init_precisionBox();
	init_spanHole();
	init_spanAsymtote();
	init_xMinBox();
	init_xMaxBox();
	init_yMinBox();
	init_yMaxBox();
	init_xStepBox();
	init_yStepBox();

	init_firstDerivativeCheckBox();
	init_secondDerivativeCheckBox();

	xMinCompiled = math.compile("0+" + xMinBox.value);
	xMaxCompiled = math.compile("0+" + xMaxBox.value);
	yMinCompiled = math.compile("0+" + yMinBox.value);
	yMaxCompiled = math.compile("0+" + yMaxBox.value);

	if(mouseState == MOUSE_UP){
		xMin = xMinCompiled.eval();
		xMax = xMaxCompiled.eval();
		yMin = yMinCompiled.eval();
		yMax = yMaxCompiled.eval();
		xScale = 1/((xMax - xMin) / canvas.width); //200
		yScale = -1/((yMax - yMin) / canvas.height); //200
	}

	xStepCompiled = math.compile("0+" + xStepBox.value);
	yStepCompiled = math.compile("0+" + yStepBox.value);

	xStep = xStepCompiled.eval();
	yStep = yStepCompiled.eval();

	xOrigin = canvas.width/(-1 * ( (xMax - xMin) / xMin) );
	yOrigin = canvas.height - canvas.height/(-1 * ( (yMax - yMin) / yMin) );

	init_xAxis();
	init_yAxis();

	init_f();
	init_f_();
	init_f__();
	init_F();


	precision = parseFloat('0' + precisionBox.value);

	if(precision == 0){
		precision = 1;
	}

	xInput = xMin;

	//console.log("initialized all. x is " + xInput);
	drawCanvas();
	xAxis.draw();
	xAxis.drawLabel();
	yAxis.draw();
	yAxis.drawLabel();
	//console.log("drew canvas and x/y axes.");
}
