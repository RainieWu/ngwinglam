$(document).ready(function(e) {
	(function ($) {
		$.getUrlParam = function (name) {
			var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
			var r = window.location.search.substr(1).match(reg);
			if (r != null) {
				return decodeURI(r[2]);
			}
			return null;
		}
	})(jQuery);
	
	showResult = function(keyword) {
		if(keyword == "") {
			location.href = "index.html";
		}
		$.ajax({
			type:"GET",
			url:"http://localhost:8080/nlp/Search?keyword=" + keyword,
			dataType:"jsonp",
			success: function(data) {
				if(data.msg == "success") {
					var dataLength = data.data.length;
					for(var i = 0; i < dataLength; i ++) {
						var html = "<li>";
						html += "<h3 class='title'><a href='" + data.data[i].url + "' target='_blank'>" + data.data[i].title + "</a></h3>";
						html += "<p class='detail'>" + data.data[i].content + "</p>";
						html += "<a href='" + data.data[i].url + "' class='link' target='_blank'>" + data.data[i].url + "</a>";
						html += "<p class='time'>" + data.data[i].time + "</p>";
						html += "</li>";
						$(".result ul").append(html);
					}
				} else {
					var img = "<img src='images/nothing.png' class='nothing'>";
					$(".result ul").append(img);
				}
			},
		});
	}
	
	
    $("#head").css("margin-left", ($(document).width() - 121 - 409 - 59) / 2 - 20);
	$(window).resize(function() {
    	$("#head").css("margin-left", ($(document).width() - 121 - 409 - 59) / 2 - 20);
	});
	
	var keyword = $.getUrlParam('keyword');
	$("#keyword").val(keyword);
	showResult(keyword);
	
	$("#searchButton").click(function() {
		$(".result ul").empty();
		showResult($("#keyword").val());
	});
});