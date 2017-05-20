var mainStarObj = function() {
	this.image;
	this.width;
	this.height;
	this.rotation;
}

mainStarObj.prototype.init = function() {
	this.image = new Image();
	this.image.src = "index/images/mainStar.png";
	this.width = "400";
	this.height = "400";
	this.rotation = 0;
	this.image.onload = function() {}
}

mainStarObj.prototype.draw = function() {
	this.rotation += deltaTime * -0.002;
	context2.save();
	context2.clearRect(0, 0, windowWidth, windowHeight);
	context2.translate(windowWidth / 2, windowHeight / 2);
	context2.rotate(this.rotation * Math.PI / 180);
	context2.drawImage(this.image, -this.image.width / 2, -this.image.height / 2);
	context2.restore();
}