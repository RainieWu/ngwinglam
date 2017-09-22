// 碰撞检测


// 大鱼吃果实
function eat() {
	if(data.gameState) {
		for(var i = 0; i < fruit.num; i++) {
			if(fruit.alive[i] && fruit.size[i] >= 16) {
				var dis = calLength2(fruit.x[i], fruit.y[i], bigFish.x, bigFish.y);
				if(dis < 900) {
					fruit.eaten(i);
					data.fruitNum ++;
					bigFish.bodyIndex ++;
					if(bigFish.bodyIndex > 7) {
						bigFish.bodyIndex = 7;
					}
					if(fruit.type[i] == "blue") {
						bigFish.bodyIndex --;
						data.type = "blue";
						data.subScore();
					} else{
						data.type = "orange";
					}
					wave.born(i);
				}
			}
		}
	}
}


// 大鱼喂小鱼
function feed() {
	if(data.fruitNum > 0 && data.gameState) {
		var dis = calLength2(bigFish.x, bigFish.y, smallFish.x, smallFish.y);
		if(dis < 900) {
			smallFish.bodyIndex = 0;
			bigFish.bodyIndex = 0;
			data.addScore();
			halo.born();
		}
	}
}