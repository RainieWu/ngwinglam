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

// 文字数组
var text = new Array(num);

var package;
var content;

// 焦点
var point;
var points = new Array(num);

// 索引
var index = 1;

// 计时器
var timer;

window.onload = function() {
	for(var i = 1; i <= num; i++) {
		project[i] = document.getElementById("project" + i);
		
		picture[i] = project[i].getElementsByTagName("img")[0];
		picWidth[i] = picture[i].width;
		
		text[i] = project[i].getElementsByClassName("text")[0];
		
		points[i] = document.getElementById("point" + i);
		points[i].addEventListener("click", function() {
			index = this.getAttribute("index");
			if(!timer) {
				change();
			}
			//change();
		});
	}
	
	package = document.getElementById("package");
	content = document.getElementById("content");
	point = document.getElementById("point");
	
	init();
	
	
}

// 鼠标滚动事件
document.addEventListener("mousewheel", mouseScroll);
document.addEventListener("DOMMouseScroll", mouseScroll);

window.onresize = function() {
	//windowWidth = document.documentElement.clientWidth ? document.documentElement.clientWidth : document.body.clientWidth;
	//windowHeight = document.documentElement.clientHeight ? document.documentElement.clientHeight : document.body.clientHeight;
	init();
}

function init() {
	windowWidth = document.documentElement.clientWidth ? document.documentElement.clientWidth : document.body.clientWidth;
	windowHeight = document.documentElement.clientHeight ? document.documentElement.clientHeight : document.body.clientHeight;
	
	for(var i = 1; i <= num; i++) {
		project[i].style.height = windowHeight + "px";
		
		if(picture[i].width > windowWidth / 4 || picture[i].width < picWidth[i]) {
			picture[i].width = windowWidth / 4;
		}
		picture[i].style.marginTop = (windowHeight - picture[i].height) / 2 + "px";
	}
	
	package.style.height = windowHeight + "px";
	
	content.style.height = windowHeight * num + "px";
	content.style.top = -windowHeight * (index - 1) + "px";
	
	point.style.top = (windowHeight - point.offsetHeight) / 2 + "px";
	
	points[index].className = "active";
}

function mouseScroll(e) {
	var upOrDown;
	if(e.type == "mousewheel") {
		upOrDown = e.wheelDelta;
	} else if(e.type == "DOMMouseScroll") {
		upOrDown = -e.detail;
	}
	
	if(upOrDown > 0) {
		index --;
		if(index < 1) {
			index = 1;
		}
		//console.log(timer);
		if(!timer) {
			change();
		}
		//change();
	} else if(upOrDown < 0) {
		index ++;
		if(index > num) {
			index = num;
		}
		//console.log(timer);
		if(!timer) {
			change();
		}
		//change();
	}
}

function change() {
	for(var i = 1; i <= num; i++) {
		if(i != index) {
			points[i].className = "";
			text[i].className = "text";
		}
		points[index].className = "active";
		text[index].className = "text textAnimation";
	}
	
	var currentTop = content.offsetTop;
	var targetTop = -windowHeight * (index - 1);
	var delta = Math.abs(currentTop - targetTop) / 20;
	
	clearInterval(timer);
	timer = setInterval(function() {
		if(currentTop > targetTop) {
			content.style.top = parseInt(content.style.top) - delta + "px";
			if(parseInt(content.style.top) < targetTop) {
				content.style.top = targetTop + "px";
			}
		} else if(currentTop < targetTop) {
			content.style.top = parseInt(content.style.top) + delta + "px";
			if(parseInt(content.style.top) > targetTop) {
				content.style.top = targetTop + "px";
			}
		}
		if(parseInt(content.style.top) == targetTop) {
			clearInterval(timer);
			timer = null;
		}
	}, 30);
}