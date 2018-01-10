function axis(){
	this.px = 0;
	this.py = 0;
	this.width = 0;
	this.height = 0;
	this.color = 'black';
	this.draw = function(){
		canvasContext.fillStyle = this.color;
		canvasContext.fillRect(this.px,this.py,this.width,this.height);
	}
}
