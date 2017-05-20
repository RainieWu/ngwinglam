var littleStarObj = function() {
	this.image;
	this.x = [];
	this.y = [];
}

littleStarObj.prototype.num = 100;

littleStarObj.prototype.init = function() {
	this.image = new Image();
	this.image.src = "index/images/littleStar.png";
	
	for(var i = 0; i < this.num; i ++) {
		this.x[i] = Math.random() * windowWidth;
		this.y[i] = Math.random() * windowHeight;
	}
}

littleStarObj.prototype.draw = function() {
	for(var i = 0; i < this.num; i ++) {
		context1.drawImage(this.image, this.x[i], this.y[i]);
	}
}