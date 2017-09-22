var haloObj = function() {
	this.alive = [];
	this.x = [];
	this.y = [];
	this.r = [];
}

haloObj.prototype.num = 5;

haloObj.prototype.init = function() {
	for(var i = 0; i < this.num; i ++) {
		this.alive[i] = false;
		this.x[i] = 0;
		this.y[i] = 0;
		this.r[i] = 0;
	}
}

haloObj.prototype.draw = function() {
	context2.save();
	
	context2.lineWidth = 3;
	context2.shadowBlur = 10;
	context2.shadowColor = "rgba(203, 91, 0, 1)";
	
	for(var i = 0; i < this.num; i ++) {
		if(this.alive[i]) {
			this.r[i] += deltaTime * 0.08;
			if(this.r[i] > 100) {
				this.alive[i] = false;
				continue;
			}
			var alpha = 1 - this.r[i] / 100;
			
			context2.beginPath();
			context2.arc(this.x[i], this.y[i], this.r[i], 0, Math.PI * 2);
			context2.closePath();
			context2.strokeStyle = "rgba(203, 91, 0, " + alpha + ")";
			context2.stroke();
		}
	}
	
	context2.restore();
}

haloObj.prototype.born = function() {
	for(var i = 0; i < this.num; i ++) {
		if(!this.alive[i]) {
			this.alive[i] = true;
			this.x[i] = smallFish.x;
			this.y[i] = smallFish.y;
			this.r[i] = 20;
			return;
		}
	}
}