var dataObj = function() {
	this.fruitNum;
	this.score;
	// 游戏状态，游戏进行为true，游戏结束为false
	this.gameState;
	this.alpha;
	this.type;
}

dataObj.prototype.init = function() {
	this.fruitNum = 0;
	this.score = 0;
	this.gameState = false;
	this.alpha = 0;
	this.type = "orange";
}

dataObj.prototype.draw = function() {
	context3.save();
	
	context3.shadowBlur = 8;
	context3.shadowColor = "white";
	context3.textAlign = "center";
	context3.fillStyle = "white";
	context3.font = "30px Verdana";
	context3.fillText(this.score, canvasWidth * 0.5, canvasHeight - 50);
	
	if(!this.gameState) {
		// 透明度渐变
		this.alpha += deltaTime * 0.001;
		if(this.alpha > 1) {
			this.alpha = 1;
		}
		
		context3.fillStyle = "rgba(255, 255, 255, " + this.alpha + ")";
		context3.font = "80px Verdana";
		context3.fillText("GAME OVER", canvas1.width * 0.5, canvas1.height * 0.5 - 50);
		
		endPage.style.display = "block";
		endPage.style.opacity = this.alpha;
		
		// 停止动画
		if(Math.round(bigFish.x) == Math.round(smallFish.x) && Math.round(bigFish.y) == Math.round(smallFish.y)) {
			window.cancelAnimationFrame(gameAnimation);
		}
	} else {
		endPage.style.display = "none";
	}
	
	context3.restore();
}

dataObj.prototype.addScore = function() {
	this.score += this.fruitNum * 100;
	this.fruitNum = 0;
	
	if(this.score <= 0) {
		this.gameState = false;
	}
}

dataObj.prototype.subScore = function() {
	data.score -= 500;
	data.fruitNum --;
	
	if(this.score <= 0) {
		this.gameState = false;
	}
}