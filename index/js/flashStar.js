var flashStarObj = function() {
	this.image = [];
	this.x = [];
	this.y = [];
	this.index = [];
	this.frequency = [];
	this.accumulation = [];
}

flashStarObj.prototype.num = 10;

flashStarObj.prototype.init = function() {
	for(var i = 1; i <= 6; i ++) {
		this.image[i] = new Image();
		this.image[i].src = "index/images/flashStar" + i + ".png";
	}
	
	for(var i = 0; i < this.num; i ++) {
		this.x[i] = Math.random() * windowWidth;
		this.y[i] = Math.random() * windowHeight;
		this.index[i] = Math.floor(Math.random() * 6 + 1);
		this.frequency[i] = Math.floor(Math.random() * 1000 + 500);
		this.accumulation[i] = 0;
	}
}

flashStarObj.prototype.draw = function() {
	for(var i = 0; i < this.num; i ++) {
		this.accumulation[i] += deltaTime;
		if(this.accumulation[i] > this.frequency[i]) {
			this.index[i] ++;
			if(this.index[i] > 6) {
				this.index[i] = 1;
			}
			this.accumulation[i] = 0;
		}
		context1.drawImage(this.image[this.index[i]], this.x[i] - this.image[this.index[i]].width / 2, this.y[i] - this.image[this.index[i]].height / 2);
	}
}