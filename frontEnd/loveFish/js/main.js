// 背景、海葵、漂浮物、果实
var canvas1;
var context1;

// 鱼、分值、特效
var canvas2;
var context2;

// 起始页、帮助页、结束页、倒计时
var canvas3;
var context3;

// 画布的宽高
var canvasWidth;
var canvasHeight;

// 鼠标坐标
var mouseX;
var mouseY;

// 上一帧的执行时间
var lastTime;
// 两帧相隔的时间差
var deltaTime;

// 对象变量
var bg;
var anemone;
var dust;
var fruit;
var bigFish;
var smallFish;
var data;
var wave;
var halo;

// 动画变量
var gameAnimation;


// 起始页
var startPage = document.getElementById("startPage");
var start = document.getElementById("start");

start.addEventListener("click", function() {
	startPage.style.display = "none";
	countDown();
	setTimeout(game, 2000);
});


// 帮助页
var help = document.getElementById("help");
var helpPage = document.getElementById("helpPage");

help.addEventListener("mouseover", function() {
	helpPage.style.display = "block";
});

help.addEventListener("mouseout", function() {
	helpPage.style.display = "none";
});


// 结束页
var endPage = document.getElementById("endPage");
var restart = document.getElementById("restart");
var quit = document.getElementById("quit");

restart.addEventListener("click", function() {
	reStart();
	countDown();
	setTimeout(game, 2000);
});

quit.addEventListener("click", function() {
	windowClose();
});


// 页面加载
window.onload = function() {
	init();
	background();
};


// 对象及相关变量初始化
function init() {
	lastTime = Date.now();
	deltaTime = 0;
	
	canvas1 = document.getElementById("canvas1");
	context1 = canvas1.getContext("2d");
	canvas2 = document.getElementById("canvas2");
	context2 = canvas2.getContext("2d");
	canvas3 = document.getElementById("canvas3");
	context3 = canvas2.getContext("2d");
	
	canvasWidth = canvas1.width;
	canvasHeight = canvas1.height;
	
	mouseX = canvasWidth * 0.5;
	mouseY = canvasHeight * 0.5 + 200;
	
	// 添加跟随鼠标事件
	canvas3.addEventListener("mousemove", mouseMove, false);
	
	bg = new bgObj();
	bg.init();
	
	anemone = new anemoneObj();
	anemone.init();
	
	dust = new dustObj();
	dust.init();
	
	fruit = new fruitObj();
	fruit.init();
	
	bigFish = new bigFishObj();
	bigFish.init();
	
	smallFish = new smallFishObj();
	smallFish.init();
	
	data = new dataObj();
	data.init();
	
	wave = new waveObj();
	wave.init();
	
	halo = new haloObj();
	halo.init();
}

// 鼠标跟随
function mouseMove(e) {
	if(data.gameState) {
		if(e.offSetX || e.layerX) {
			mouseX = e.offSetX == undefined ? e.layerX : e.offSetX;
			mouseY = e.offSetY == undefined ? e.layerY : e.offSetY;
		}
	}
}

// 背景循环
function background() {
	requestAnimFrame(background);
	
	var currentTime = Date.now();
	deltaTime = currentTime - lastTime;
	if(deltaTime > 25) {
		deltaTime = 25;
	}
	lastTime = currentTime;
	
	bg.draw();
	
	anemone.draw();
	
	dust.draw();
	
	fruitMonitor();
	fruit.draw();
}

// 倒计时
function countDown() {
	bigFish.show();
	smallFish.show();
	
	context3.save();
	
	context3.shadowBlur = 8;
	context3.shadowColor = "white";
	context3.textAlign = "center";
	context3.fillStyle = "rgba(255, 255, 255, 1)";
	context3.font = "80px Verdana";
	context3.fillText("READY", canvasWidth * 0.5, canvasHeight * 0.5 - 50);
	
	var timer = setInterval(function() {
		context3.clearRect(0, 0, canvasWidth, canvasHeight);
		context3.fillText("GO", canvasWidth * 0.5, canvasHeight * 0.5 - 50);
		
		context3.restore();
		
		bigFish.show();
		smallFish.show();
		
		clearInterval(timer);
	}, 1000);
	
	data.gameState = true;
}

// 游戏循环
function game() {
	gameAnimation = requestAnimFrame(game);
	
	context2.clearRect(0, 0, canvasWidth, canvasHeight);
	
	bigFish.draw();
	
	smallFish.draw();
	
	data.draw();
	
	wave.draw();
	
	halo.draw();
	
	eat();
	feed();
}

function reStart() {
	// 判断动画是否已停止
	if(Math.round(bigFish.x) != Math.round(smallFish.x) || Math.round(bigFish.y) != Math.round(smallFish.y)) {
		window.cancelAnimationFrame(gameAnimation);
	}
	
	context3.clearRect(0, 0, canvasWidth, canvasHeight);
	
	endPage.style.display = "none";
	
	// 对象重新初始化
	data.init();
	bigFish.init();
	smallFish.init();
}