// 屏幕宽高
var windowWidth;
var windowHeight;

// 项目数量
var num = 3;

// 项目数组
var project = new Array(num);

// 图片数组
var picture = new Array(num);
var picWidth = new Array(num);

var package;
var content;

window.onload = function() {
	for(var i = 1; i <= num; i ++) {
		project[i] = document.getElementById("project" + i);
		
		picture[i] = project[i].getElementsByTagName("img")[0];
		picWidth[i] = picture[i].width;
	}
	
	package = document.getElementById("package");
	content = document.getElementById("content");
	
	init();
	
	// 鼠标滚动事件
	document.addEventListener("mousewheel", mouseScroll);
	document.addEventListener("DOMMouseScroll", mouseScroll);
}

window.onresize = function() {
	//windowWidth = document.documentElement.clientWidth ? document.documentElement.clientWidth : document.body.clientWidth;
	//windowHeight = document.documentElement.clientHeight ? document.documentElement.clientHeight : document.body.clientHeight;
	init();
}

function init() {
	windowWidth = document.documentElement.clientWidth ? document.documentElement.clientWidth : document.body.clientWidth;
	windowHeight = document.documentElement.clientHeight ? document.documentElement.clientHeight : document.body.clientHeight;
	
	for(var i = 1; i <= num; i ++) {
		project[i].style.height = windowHeight + "px";
		
		if(picture[i].width > windowWidth / 4 || picture[i].width < picWidth[i]) {
			picture[i].width = windowWidth / 4;
		}
		picture[i].style.marginTop = (windowHeight - picture[i].height) / 2 + "px";
	}
	
	package.style.height = windowHeight + "px";
	
	content.style.height = windowHeight * num + "px";
	content.style.top = -windowHeight + "px";
}

function mouseScroll(e) {
	var upOrDown;
	if(e.type == "mousewheel") {
		upOrDown = e.wheelDelta;
	} else if(e.type == "DOMMouseScroll") {
		upOrDown = -e.detail;
	}
	
	if(upOrDown > 0) {
		content.style.top = parseInt(content.style.top) + windowHeight + "px";
	} else if(upOrDown < 0) {
		content.style.top = parseInt(content.style.top) - windowHeight + "px";
	}
}