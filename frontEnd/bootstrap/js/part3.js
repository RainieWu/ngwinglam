$(function() {
	if($(document).width() > 750) {
		marginTop = ($(".part3-img1").height() - $(".part3-text1").height()) / 2;
		$(".part3-text1").css("margin-top", marginTop);
		marginTop = ($(".part3-img2").height() - $(".part3-text2").height()) / 2;
		$(".part3-text2").css("margin-top", marginTop);
	}
	
	$(window).resize(function() {
		if($(document).width() > 750){
			marginTop = ($(".part3-img1").height() - $(".part3-text1").height()) / 2;
			$(".part3-text1").css("margin-top", marginTop);
			marginTop = ($(".part3-img2").height() - $(".part3-text2").height()) / 2;
			$(".part3-text2").css("margin-top", marginTop);
		} else {
			$(".part3-text1").css("margin-top", 0);
			$(".part3-text2").css("margin-top", 0);
		}
    });
});