// 项目数量
var num = 6;

// 索引
var index = 1;


// 可视范围
var package;

// 焦点
var point;
var points = new Array(num);

// 项目内容
var content;

// 项目
var project = new Array(num);

// 图片
var picture = new Array(num);
var picWidth = new Array(num);

// 文字
var text = new Array(num);


// 屏幕宽高
var windowWidth;
var windowHeight;

// 计时器
var timer;


window.onload = function() {
	getElements();
	init();
}

// 监听屏幕大小变化
window.onresize = function() {
	init();
}

// 监听鼠标滚动
document.addEventListener("DOMMouseScroll", mouseScroll);	/*Firefox浏览器*/
document.addEventListener("mousewheel", mouseScroll);		/*其他浏览器*/


// 获取元素
function getElements() {
	package = document.getElementById("package");
	point = document.getElementById("point");
	content = document.getElementById("content");
	
	for(var i = 1; i <= num; i++) {
		points[i] = document.getElementById("point" + i);
		
		project[i] = document.getElementById("project" + i);
		
		picture[i] = project[i].getElementsByTagName("img")[0];
		picWidth[i] = picture[i].width;
		
		text[i] = project[i].getElementsByClassName("text")[0];
	}
}

// 初始化
function init() {
	windowWidth = document.documentElement.clientWidth ? document.documentElement.clientWidth : document.body.clientWidth;
	windowHeight = document.documentElement.clientHeight ? document.documentElement.clientHeight : document.body.clientHeight;
	
	package.style.height = windowHeight + "px";
	
	point.style.top = (windowHeight - point.offsetHeight) / 2 + "px";
	points[index].className = "active";
	
	content.style.height = windowHeight * num + "px";
	content.style.top = -windowHeight * (index - 1) + "px";
	
	for(var i = 1; i <= num; i++) {
		points[i].addEventListener("click", function() {
			if(!timer) {
				index = this.getAttribute("index");
				change();
			}
		});
		
		project[i].style.height = windowHeight + "px";
		
		if(picture[i].width > windowWidth / 4 || picture[i].width < picWidth[i]) {
			picture[i].width = windowWidth / 4;
		}
		picture[i].style.marginTop = (windowHeight - picture[i].height) / 2 + "px";
	}
}

// 鼠标滚动事件
function mouseScroll(e) {
	var upOrDown;
	if(e.type == "mousewheel") {
		upOrDown = e.wheelDelta;
	} else if(e.type == "DOMMouseScroll") {
		upOrDown = -e.detail;
	}
	
	// 鼠标向上滚动
	if(upOrDown > 0) {
		if(!timer) {
			index --;
			if(index < 1) {
				index = num;
			}
			change();
		}
	}
	// 鼠标向下滚动
	else if(upOrDown < 0) {
		if(!timer) {
			index ++;
			if(index > num) {
				index = 1;
			}
			change();
		}
	}
}

// 改变焦点及可视内容
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