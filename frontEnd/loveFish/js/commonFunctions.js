// 根据机器性能进行循环
window.requestAnimFrame = (function() {
	return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame ||
		function( /* function FrameRequestCallback */ callback, /* DOMElement Element */ element) {
			return window.setTimeout(callback, 1000 / 60);
		};
})();

// 两点之间距离的平方
function calLength2(x1, y1, x2, y2) {
	return Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2);
}

// 趋向目标角度
function lerpAngle(a, b, t) {
	var d = b - a;
	if (d > Math.PI) d = d - 2 * Math.PI;
	if (d < -Math.PI) d = d + 2 * Math.PI;
	return a + d * t;
}

// 趋向目标值
function lerpDistance(aim, cur, ratio) {
	var delta = cur - aim;
	return aim + delta * ratio;
}

// 兼容多个浏览器关闭当前窗口
function windowClose() {
	// IE浏览器
	if(navigator.userAgent.indexOf("MSIE") > 0) {
		// IE 浏览器版本
		if(navigator.userAgent.indexOf("MSIE 6.0") > 0) {
			window.opener = null;
			window.close();
		} else {
			window.open("", "_top");
			window.top.close();
		}
	}
	// 火狐浏览器
	else if(navigator.userAgent.indexOf("Firefox") > 0) {
		window.location.href = "about:blank";
	}
	// 其他浏览器
	else {
		window.opener = null;
		window.open("", "_self");
		window.close();
	}
}