var smallFishObj = function() {
	this.x;
	this.y;
	this.angle;
	
	this.smallTail = [];
	this.tailIndex;
	
	this.smallBody = [];
	this.bodyIndex;
	this.bodyTimer;
	
	this.smallEye = [];
	this.eyeIndex;
	this.eyeTimer;
	this.eyeInterval;
}

smallFishObj.prototype.init = function() {
	this.x = canvasWidth * 0.5;
	this.y = canvasHeight * 0.5 + 200;
	this.angle = 90 * Math.PI / 180;
	
	for(var i = 0; i < 8; i ++) {
		this.smallTail[i] = new Image();
		this.smallTail[i].src = "images/babyTail" + i + ".png";
	}
	this.tailIndex = 0;
	
	for(var i = 0; i < 20; i ++) {
		this.smallBody[i] = new Image();
		this.smallBody[i].src = "images/babyFade" + i + ".png";
	}
	this.bodyIndex = 0;
	this.bodyTimer = 0;
	
	for(var i = 0; i < 2; i ++) {
		this.smallEye[i] = new Image();
		this.smallEye[i].src = "images/babyEye" + i + ".png";
	}
	this.eyeIndex = 0;
	this.eyeTimer = Math.random() * 4000 + 1000;
	this.eyeInterval = 1000;
}

smallFishObj.prototype.draw = function() {
	this.x = lerpDistance(bigFish.x, this.x, 0.98);
	this.y = lerpDistance(bigFish.y, this.y, 0.98);
	
	var deltaX = bigFish.x - this.x;
	var deltaY = bigFish.y - this.y;
	var angle = Math.atan2(deltaY, deltaX) + Math.PI;
	this.angle = lerpAngle(angle, this.angle, 0.9);
	
	this.tailIndex = (this.tailIndex + 1) % 8;
	
	this.bodyTimer += deltaTime;
	if(this.bodyTimer > 200) {
		this.bodyIndex = this.bodyIndex + 1;
		this.bodyTimer = this.bodyTimer % 200;
		if(this.bodyIndex > 19) {
			this.bodyIndex = 19;
			
			// 游戏结束
			data.gameState = false;
		}
	}
	
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
	context2.drawImage(this.smallTail[this.tailIndex], -this.smallTail[this.tailIndex].width * 0.5 + 25, -this.smallTail[this.tailIndex].height * 0.5);
	context2.drawImage(this.smallBody[this.bodyIndex], -this.smallBody[this.bodyIndex].width * 0.5, -this.smallBody[this.bodyIndex].height * 0.5);
	context2.drawImage(this.smallEye[this.eyeIndex], -this.smallEye[this.eyeIndex].width * 0.5, -this.smallEye[this.eyeIndex].height * 0.5);
	
	context2.restore();
}

// 静止的小鱼
smallFishObj.prototype.show = function() {
	context2.save();
	
	context2.translate(canvasWidth * 0.5, canvasHeight * 0.5 + 200);
	context2.rotate(90 * Math.PI / 180);
	context2.drawImage(this.smallTail[0], -this.smallTail[0].width * 0.5 + 25, -this.smallTail[0].height * 0.5);
	context2.drawImage(this.smallBody[0], -this.smallBody[0].width * 0.5, -this.smallBody[0].height * 0.5);
	context2.drawImage(this.smallEye[0], -this.smallEye[0].width * 0.5, -this.smallEye[0].height * 0.5);
	
	context2.restore();
}