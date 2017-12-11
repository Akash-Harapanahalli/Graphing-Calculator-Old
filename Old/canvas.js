var canvas;
var canvasContext;

function init_canvas(){
    canvas = document.getElementById('gameCanvas');
    canvasContext = canvas.getContext('2d');
}

function drawCanvas(){
    canvasContext.fillStyle = 'white';
    canvasContext.fillRect(0,0,canvas.width, canvas.height);
    canvasContext.fillStyle = 'black';
    canvasContext.fillRect(0,0,1,canvas.height);
    canvasContext.fillRect(0,0,canvas.width, 1);
    canvasContext.fillRect(canvas.width-1,0,1,canvas.height);
    canvasContext.fillRect(0,canvas.height-1,canvas.width,1);
}



var functionBox;
function init_functionBox(){
    functionBox = document.getElementById("functionInput");
}

var precisionBox;
function init_precisionBox(){
    precisionBox = document.getElementById("precisionInput");
}

var xMinBox;
function init_xMinBox(){
    xMinBox = document.getElementById("xMinInput");
}

var xMaxBox;
function init_xMaxBox(){
    xMaxBox = document.getElementById("xMaxInput");
}

var yMinBox;
function init_yMinBox(){
    yMinBox = document.getElementById("yMinInput");
}

var yMaxBox;
function init_yMaxBox(){
    yMaxBox = document.getElementById("yMaxInput");
}

var xStepBox;
function init_xStepBox(){
    xStepBox = document.getElementById("xStepInput");
}

var yStepBox;
function init_yStepBox(){
    yStepBox = document.getElementById("yStepInput");
}


var firstDerivativeCheckBox;
function init_firstDerivativeCheckBox(){
    firstDerivativeCheckBox = document.getElementById("1stDerivative");

}

var secondDerivativeCheckBox;
function init_secondDerivativeCheckBox(){
    secondDerivativeCheckBox = document.getElementById("2ndDerivative");

}

var functionDropdown;
function init_functionDropDown(){
    functionDropdown = document.getElementById("functionDropdown");
}
function dropDown(){
    $(functionDropdown).toggle("show")
}
