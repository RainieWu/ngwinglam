// background, littleStar, flashStar
var canvas1;
var context1;

// mainStar
var canvas2;
var context2;

// rocket
var canvas3;
var context3;

// 屏幕宽高
var windowWidth;
var windowHeight;

// 鼠标坐标
var mouseX;
var mouseY;

// 上一帧的执行时间
var lastTime;
// 两帧相隔的时间差
var deltaTime;

// 对象变量
var background;
var littleStar;
var flashStar;
var mainStar;
var rocket;


window.onload = function() {
	init();
	main();
}

window.onresize = function() {
	windowWidth = document.documentElement.clientWidth ? document.documentElement.clientWidth : document.body.clientWidth;
	windowHeight = document.documentElement.clientHeight ? document.documentElement.clientHeight : document.body.clientHeight;
	init();
	main();
}


function init() {
	lastTime = Date.now();
	deltaTime = 0;
	
	canvas1 = document.getElementById("canvas1");
	context1 = canvas1.getContext("2d");
	canvas2 = document.getElementById("canvas2");
	context2 = canvas2.getContext("2d");
	canvas3 = document.getElementById("canvas3");
	context3 = canvas3.getContext("2d");
	
	windowWidth = document.documentElement.clientWidth ? document.documentElement.clientWidth : document.body.clientWidth;
	windowHeight = document.documentElement.clientHeight ? document.documentElement.clientHeight : document.body.clientHeight;
	
	canvas1.width = windowWidth;
	canvas1.height = windowHeight;
	canvas2.width = windowWidth;
	canvas2.height = windowHeight;
	canvas3.width = windowWidth;
	canvas3.height = windowHeight;
	
	mouseX = windowWidth / 2;
	mouseY = windowHeight / 2;
	canvas3.addEventListener("mousemove", mouseMove, false);
	
	background = new backgroundObj();
	background.init();
	
	littleStar = new littleStarObj();
	littleStar.init();
	
	flashStar = new flashStarObj();
	flashStar.init();
	
	mainStar = new mainStarObj();
	mainStar.init();
	
	rocket = new rocketObj();
	rocket.init();
}

function main() {
	requestAnimFrame(main);
	
	var currentTime = Date.now();
	deltaTime = currentTime - lastTime;
	if(deltaTime > 25) {
		deltaTime = 25;
	}
	lastTime = currentTime;
	
	background.draw();
	littleStar.draw();
	flashStar.draw();
	mainStar.draw();
	rocket.draw();
}

function mouseMove(e) {
	if(e.offSetX || e.layerX) {
		mouseX = e.offSetX == undefined ? e.layerX : e.offSetX;
		mouseY = e.offSetY == undefined ? e.layerY : e.offSetY;
	}
}