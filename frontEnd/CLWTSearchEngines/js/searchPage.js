$(document).ready(function(e) {
    $("#searchForm").css("margin-left", ($(document).width() - 409 - 59) / 2 + 20);
	$(window).resize(function() {
    	$("#searchForm").css("margin-left", ($(document).width() - 409 - 59) / 2 + 20);
	});
	
	$("#submit").click(function() {
		if($("#keyword").val() != "") {
			location.href = "http://localhost:8080/nlp/Search?keyword=" + $("#keyword").val();
		}
	});
	
	$("#keyword").keydown(function(e) {
		if(e.keyCode == 13) {
			e.preventDefault();
			$("#submit").click();
		}
	});
});