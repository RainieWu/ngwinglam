var bigFishObj = function() {
	this.x;
	this.y;
	this.angle;
	
	this.bigTail = [];
	this.tailIndex;
	
	this.bigBody = [];
	this.bigBodyBlue;
	this.bodyIndex;
	
	this.bigEye = [];
	this.eyeIndex;
	this.eyeTimer;
	this.eyeInterval;
}

bigFishObj.prototype.init = function() {
	this.x = canvasWidth * 0.5;
	this.y = canvasHeight * 0.5 + 200;
	this.angle = 90 * Math.PI / 180;
	
	for(var i = 0; i < 8; i ++) {
		this.bigTail[i] = new Image();
		this.bigTail[i].src = "images/bigTail" + i + ".png";
	}
	this.tailIndex = 0;
	
	for(var i = 0; i < 8; i ++) {
		this.bigBody[i] = new Image();
		this.bigBody[i].src = "images/bigSwim" + i + ".png";
	}
	this.bigBodyBlue = new Image();
	this.bigBodyBlue.src = "images/bigSwimBlue.png";
	this.bodyIndex = 0;
	
	for(var i = 0; i < 2; i ++) {
		this.bigEye[i] = new Image();
		this.bigEye[i].src = "images/bigEye" + i + ".png";
	}
	this.eyeIndex = 0;
	this.eyeTimer = Math.random() * 4000 + 1000;
	this.eyeInterval = 1000;
}

bigFishObj.prototype.draw = function() {
	this.x = lerpDistance(mouseX, this.x, 0.95);
	this.y = lerpDistance(mouseY, this.y, 0.95);
	
	var deltaX = mouseX - this.x;
	var deltaY = mouseY - this.y;
	var angle = Math.atan2(deltaY, deltaX) + Math.PI;
	this.angle = lerpAngle(angle, this.angle, 0.6);
	
	this.tailIndex = (this.tailIndex + 1) % 8;
	
	this.eyeTimer += deltaTime;
	if(this.eyeTimer > this.eyeInterval) {
		this.eyeIndex = (this.eyeIndex + 1) % 2;
		this.eyeTimer = this.eyeTimer % this.eyeInterval;
		// 睁眼
		if(this.eyeIndex == 0) {
			this.eyeInterval = Math.random() * 4000 + 1000;
		
		}
		// 闭眼
		else {
			this.eyeInterval = 200;
		}
	}
	
	context2.save();
	
	context2.translate(this.x, this.y);
	context2.rotate(this.angle);
	context2.drawImage(this.bigTail[this.tailIndex], -this.bigTail[this.tailIndex].width * 0.5 + 29, -this.bigTail[this.tailIndex].height * 0.5);
	// 吃橙色果实身体颜色渐变
	if(data.type == "orange") {
		context2.drawImage(this.bigBody[this.bodyIndex], -this.bigBody[this.bodyIndex].width * 0.5, -this.bigBody[this.bodyIndex].height * 0.5);
	} else {
		context2.drawImage(this.bigBodyBlue, -this.bigBodyBlue.width * 0.5, -this.bigBodyBlue.height * 0.5);
	}
	context2.drawImage(this.bigEye[this.eyeIndex], -this.bigEye[this.eyeIndex].width * 0.5, -this.bigEye[this.eyeIndex].height * 0.5);
	
	context2.restore();
}

// 静止的大鱼
bigFishObj.prototype.show = function() {
	context2.save();
	
	context2.translate(canvasWidth * 0.5, canvasHeight * 0.5 + 200);
	context2.rotate(90 * Math.PI / 180);
	context2.drawImage(this.bigTail[0], -this.bigTail[0].width * 0.5 + 29, -this.bigTail[0].height * 0.5);
	context2.drawImage(this.bigBody[0], -this.bigBody[0].width * 0.5, -this.bigBody[0].height * 0.5);
	context2.drawImage(this.bigEye[0], -this.bigEye[0].width * 0.5, -this.bigEye[0].height * 0.5);
	
	context2.restore();
}