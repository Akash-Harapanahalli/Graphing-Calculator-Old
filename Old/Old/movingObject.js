function movingObject(){
	//variables

	this.px = 0;
	this.py = 0;
	this.vx = 0;
	this.vy = 0;
	this.ax = 0;
	this.ay = 0;

	this.prev_px = 0;
	this.prev_py = 0;
	this.prev_vx = 0;
	this.prev_vy = 0;
	this.prev_ax = 0;
	this.prev_ay = 0;


	this.width = 0;
	this.height = 0;

	this.color;



	//setters

	this.setColor = function(inColor){
		this.color = inColor;
	}

	this.setPosition = function(inpx, inpy){
		this.prev_px = this.px;
		this.prev_py = this.py;
		this.px = inpx;
		this.py = inpy;
	}
	this.setVelocity = function(invx, invy){
		this.prev_vx = this.vx;
		this.prev_vy = this.vy;
		this.vx = invx;
		this.vy = invy;
	}
	this.setAcceleration = function(inax, inay){
		this.ax = inax;
		this.ay = inay;
		this.prev_ax = this.ax;
		this.prev_ay = this.ay;
	}


	//getters
	this.getPX = function(){
		return this.px;
	}
	this.getPY = function(){
		return this.py;
	}
	this.getVX = function(){
		return this.vx;
	}
	this.getVY = function(){
		return this.vy;
	}
	this.getAX = function(){
		return this.ax;
	}
	this.getAY = function(){
		return this.ay;
	}

	this.getVelocity = function(){
		return ((this.py - this.prev_py)/precision);
	}


	this.update = function(){
		this.prev_px = this.px;
		this.prev_py = this.py;
		this.prev_vx = this.vx;
		this.prev_vy = this.vy;
		this.prev_ax = this.ax;
		this.prev_ay = this.ay;

		this.vx += this.ax;
		this.vy += this.ay;
		this.px += this.vx;
		this.py += this.vy;
	}

	this.draw = function(){
		canvasContext.fillStyle = this.color;
		canvasContext.fillRect(this.px,this.py,this.width,this.height);
	}
}
