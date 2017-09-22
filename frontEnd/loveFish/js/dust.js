var dustObj = function() {
	this.dustImg = [];
	this.x = [];
	this.y = [];
	this.amplitude = [];
	this.index = [];
	this.alpha;
}

dustObj.prototype.num = 30;

dustObj.prototype.init = function() {
	for(var i = 0; i < 5; i ++) {
		this.dustImg[i] = new Image();
		this.dustImg[i].src = "images/dust" + i + ".png";
	}
	
	for(var i = 0; i < this.num; i ++) {
		this.x[i] = Math.random() * canvasWidth;
		this.y[i] = Math.random() * canvasHeight;
		this.amplitude[i] = Math.random() * 25 + 20;
		this.index[i] = Math.floor(Math.random() * 5);
	}
	this.alpha = 0;
}

dustObj.prototype.draw = function() {
	this.alpha += deltaTime * 0.001;
	
	for(var i = 0; i < this.num; i ++) {
		context1.drawImage(this.dustImg[this.index[i]], this.x[i] + this.amplitude[i] * Math.sin(this.alpha), this.y[i]);
	}
}