var bgObj = function() {
	this.img;
}

bgObj.prototype.init = function() {
	this.img = new Image();
	this.img.src = "images/background.jpg";
}

bgObj.prototype.draw = function() {
	context1.drawImage(this.img, 0, 0, canvasWidth, canvasHeight);
}