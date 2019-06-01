
document.body.addEventListener('touchstart', function () {});

/*---------------弹窗方法-------------------*/
function PelletClick (thisTitle) {

    var thisId= "#"+thisTitle;

    $(thisId).fadeIn(500).addClass('ovhid');
	$('body').css({
		'overflow':'hidden'
	});
	
	$(thisId).find(".close").click(function() {
		$(this).parents(".window").fadeOut(500).removeClass('ovhid');
		if ($('.window').hasClass('ovhid')) {

		}else{
			$('body').css({
				'overflow':'auto'
			});
		}
	});
	
    var popX=$(window).height();
	var tc_h=$(thisId).find(".popBox").height();
    var tc_w=$(thisId).find(".popBox").width();

    $(thisId).find(".popBox").css({
		top:(popX-tc_h)/2,
		left:'50%',
    	marginLeft:-tc_w/2
	})
	
}