var fruitObj = function() {
	this.x = [];
	this.y = [];
	this.alive = [];
	this.size = [];
	this.v0 = [];
	this.type = [];
	this.index = [];
	this.orange = new Image();
	this.blue = new Image();
}

fruitObj.prototype.num = 20;

fruitObj.prototype.init = function() {
	for(var i = 0; i < this.num; i ++) {
		this.alive[i] = false;
		this.x[i] = 0;
		this.y[i] = 0;
		this.v0[i] = Math.random() * 0.03 + 0.003;
		this.type[i] = "";
		this.index[i] = Math.floor(Math.random() * anemone.num);
	}
	this.orange.src = "images/orange.png";
	this.blue.src = "images/blue.png";
}

fruitObj.prototype.draw = function() {
	for(var i = 0; i < this.num; i ++) {
		if(this.alive[i]) {
			// 生长状态
			if(this.size[i] <= 16) {
				this.x[i] = anemone.headX[this.index[i]];
				this.y[i] = anemone.headY[this.index[i]];
				this.size[i] += 0.01 * deltaTime;
			} else {
				this.y[i] -= this.v0[i] * 3 * deltaTime;
			}
			
			// 果实类型
			if(this.type[i] == "blue") {
				var pic = this.blue;
			} else {
				var pic = this.orange;
			}
			
			context1.drawImage(pic, this.x[i] - this.size[i] * 0.5, this.y[i] - this.size[i] * 0.5, this.size[i], this.size[i]);
			
			// 判断是否出界
			if(this.y[i] < 10) {
				this.alive[i] = false;
			}
		}
	}
}

fruitObj.prototype.born = function(i) {
	this.size[i] = 0;
	this.alive[i] = true;
	
	var type = Math.random();
	if(type < 0.2) {
		this.type[i] = "blue";
	} else {
		this.type[i] = "orange";
	}
}

fruitObj.prototype.eaten = function(i) {
	this.alive[i] = false;
}

// 监控果实的生成
function fruitMonitor() {
	var count = 0;
	
	for(var i = 0; i < this.num; i ++) {
		if(this.alive[i]) {
			count ++;
		}
	}
	
	if(count < 15) {
		for(var i = 0; i < fruit.num; i ++) {
			if(!fruit.alive[i]) {
				fruit.born(i);
				return;
			}
		}
		return;
	}
}