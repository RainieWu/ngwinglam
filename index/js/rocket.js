var rocketObj = function() {
	this.image;
	this.radiu;
	this.offset;
	this.x;
	this.y;
	this.rotation;
}

rocketObj.prototype.init = function() {
	this.image = new Image();
	this.image.src = "index/images/rocket.png";
	this.radiu = mainStar.width / 2;
	this.offset = 20;
	this.x = this.radiu + this.offset;
	this.y = 0;
	this.rotation = 0;
	this.image.onload = function() {}
}

rocketObj.prototype.draw = function() {
	var relativeX = mouseX - windowWidth / 2;
	var relativeY = mouseY - windowHeight / 2;
	this.x = this.radiu * relativeX / Math.sqrt(relativeX * relativeX + relativeY * relativeY) + this.offset;
	this.y = this.radiu * relativeY / Math.sqrt(relativeX * relativeX + relativeY * relativeY);
	
	this.rotation = Math.atan2(this.y, this.x);
	
	context3.save();
	context3.clearRect(0, 0, windowWidth, windowHeight);
	context3.translate(windowWidth / 2, windowHeight / 2);
	context3.rotate(this.rotation);
	context3.drawImage(this.image, this.radiu + this.offset, -50);
	context3.restore();
}