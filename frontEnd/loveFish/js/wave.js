var waveObj = function() {
	this.alive = [];
	this.x = [];
	this.y = [];
	this.r = [];
}

waveObj.prototype.num = 20;

waveObj.prototype.init = function() {
	for(var i = 0; i < this.num; i ++) {
		this.alive[i] = false;
		this.x[i] = 0;
		this.y[i] = 0;
		this.r[i] = 0;
	}
}

waveObj.prototype.draw = function() {
	context2.save();
	
	context2.lineWidth = 2;
	context2.shadowBlur = 10;
	context2.shadowColor = "white";
	
	for(var i = 0; i < this.num; i ++) {
		if(this.alive[i]) {
			this.r[i] += deltaTime * 0.08;
			if(this.r[i] > 60) {
				this.alive[i] = false;
				continue;
			}
			var alpha = 1 - this.r[i] / 60;
			
			context2.beginPath();
			context2.arc(this.x[i], this.y[i], this.r[i], 0, Math.PI * 2);
			context2.closePath();
			context2.strokeStyle = "rgba(255, 255, 255, " + alpha + ")";
			context2.stroke();
		}
	}
	
	context2.restore();
}

waveObj.prototype.born = function(i) {
	this.alive[i] = true;
	this.x[i] = fruit.x[i];
	this.y[i] = fruit.y[i];
	this.r[i] = 10;
}