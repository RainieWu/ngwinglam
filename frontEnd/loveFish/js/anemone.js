var anemoneObj = function() {
	this.rootX = [];
	this.headX = [];
	this.headY = [];
	this.alpha = [];
	this.amplitude = [];
}

anemoneObj.prototype.num = 50;

anemoneObj.prototype.init = function() {
	for(var i = 0; i < this.num; i ++) {
		this.rootX[i] = i * 18 + Math.random() * 10 - 50;
		this.headX[i] = this.rootX[i];
		this.headY[i] = canvasHeight - 250 + Math.random() * 50;
		this.alpha[i] = 0;
		this.amplitude[i] = Math.random() * 30 + 30;
	}
}

anemoneObj.prototype.draw = function() {
	context1.save();
	
	context1.lineWidth = 20;
	context1.lineCap = "round";
	context1.strokeStyle = "#3b154e";
	context1.globalAlpha = 0.6;
	
	for(var i = 0; i < this.num; i ++) {
		this.alpha[i] += deltaTime * 0.001;
		this.headX[i] = this.rootX[i] + Math.sin(this.alpha[i]) * this.amplitude[i];
		
		context1.beginPath();
		context1.moveTo(this.rootX[i], canvasHeight);
		context1.quadraticCurveTo(this.rootX[i], canvasHeight - 100, this.headX[i], this.headY[i]);
		context1.stroke();
	}
	
	context1.restore();
}