/*获取控制对象*/
// 设置控制条的长度
var oBox=$("body").width()-66;
$(".controls").css({width:oBox+'px'})
// var vids=document.getElementById("vids");
var vids = videojs('vids')
var sskd=$(".controls").width();/*替换原来的764*/
/*一开始默认的视频路径（每个页面都会有一个默认的视频吧）*/
//var csdz="media/";
/*这一步判断他是什么浏览器，调用不同的格式的视频（这里以mp4为例子）*/
// var xzdz="https://blz-videos.nosdn.127.net/1/OverWatch/AnimatedShots/Overwatch_AnimatedShot_Soldier76_Hero.mp4";
// vids.src=csdz+xzdz;
// var xzdz="media/movie.mp4";
var xzdz = 'http://globalcdn.miguvideo.com:8088/play4/ac41b18bdde9ffc337ce22cde657f4ff.m3u8'
// vids.src=xzdz;
 /*点击暂停图标的时候*/
$("#pass").click(function(){
	$(this).css({display:"none"});
	$("#ztbf").attr("class","iconfont icon-zanting")
	vids.play();
	});
// 控制条 下移
// $('#controls').animate({
//     'bottom': '-100px'
// }, 2000);
/*点击控制按钮里面的暂停图标的时候*/
$("#ztbf").click(function(){
	if(vids.paused){
		vids.play()
		$("#ztbf").attr("class","iconfont icon-zanting")
		}else{
			vids.pause()
			$("#ztbf").attr("class","iconfont icon-bofang")
			}
})
/*不论任何途径只要是暂停或者播放*/
vids.onplay=function(){
	$("#pass").css({display:"none"});
	$("#ztbf").attr("class","iconfont icon-zanting");
	}
vids.onpause=function(){
	$("#pass").css({display:"block"});
	$("#ztbf").attr("class","iconfont icon-bofang");
	$("#pBar").on('mouseup',function(){
			$(this).off('mousemove')
			})
	}
/*时间转换器*/
function numFormat(time){
    time = parseInt(time);
    var h = addZero(Math.floor(time/3600));
    var  m = addZero(Math.floor((time%3600)/60));
    var s = addZero(Math.floor(time%60));
    return h+":"+m+":"+s;
}
function addZero(num){
    if(num<10){
        return "0"+num;
    }else{
        return ''+num;
    }
}
/*当前时间/总的时间(canplay方法开始)*/
vids.oncanplay=function(){
var aTime=numFormat(vids.duration);
$("#aTime").html(aTime);
/*第一步,进度条跟着时间动(鼠标点下的时候)*/
vids.ontimeupdate=function(){
	sskd=$(".controls").width()
	var hc=(vids.buffered.end(0)/vids.duration)*sskd;
	$("#buff").css({width:hc+'px'})
	var nTime=numFormat(vids.currentTime);
	$("#nTime").html(nTime);
	/*当前的时间比上总的时间乘以总的长度*/
	var nLengh=(vids.currentTime/vids.duration)*(sskd-20);
	$("#pBar_move").css({width:nLengh+'px'});
	}
/*第二步,点击时的进度条*/
$("#pBar").mousedown(function(e){
	var cLk=e.clientX;/*点击距离(点击在进度条区域)*/
	var pJl=$("#pBar").offset().left;/*获取进度条距离左边的距离*/
	var mLengh=cLk-pJl;/*移动的距离*/
	if(mLengh>=(sskd-20)){
		mLengh=(sskd-20)
		}
	$("#pBar_move").css({width:mLengh+'px'});/*改变进度条的距离*/
	var cTime1=mLengh/(sskd-20)*vids.duration;
	vids.currentTime=cTime1;
	var cTime2=numFormat(cTime1);
	$("#nTime").html(cTime2);/*改变html的显示时间*/
	vids.play();
/*---------------------------------鼠标拖拽的距离---------------------------------------*/
	$(document).on('mousemove',function(e){
		vids.pause();
		var newLeft=e.clientX-pJl;/*拖拽的距离*/
		if(newLeft<=0){
            newLeft=0;
        }
		if(newLeft>=(sskd-20)){
			newLeft=(sskd-20)
			}
		var cTime3=newLeft/(sskd-20)*vids.duration;
		var cTime4=numFormat(cTime3);
		$("#pBar_move").css({width:newLeft+'px'});
		vids.currentTime=cTime3;
		$("#nTime").html(cTime4);
		})/*拖拽结束*/
/*----------------------------------鼠标松开----------------------------------------*/
		$("body").on('mouseup',function(){
			$(document).off('mousemove');
			vids.play();
			})/*松开结束*/
	})/*mousedown方法结束*/
}/*(canplay方法结束)*/

/*----------------------------------快进快退(点击键盘的时候)----------------------------------*/
$(document).keydown(function (event) {
    console.log(event.keyCode)
    var time = numFormat(vids.duration).split(":")
    var h = time[0]
    var m = time[1]
    var s = time[2]
    if (event.keyCode === 8){ // esc
        window.history.go(-1)
    }
	if (event.keyCode===37){ // Home
		if (m<=30){
            vids.currentTime-=10;
		} else if (30<m<59){
            vids.currentTime-=30;
        } else if (h>=1){
            vids.currentTime-=60;
		}

        $(".icon-kuaitui").css({
            color:"#00aaff"
        })
		// 点击快进或快退的时候 出现暂停按钮
        $("#pass").css({display:"block"});
        $("#bf").attr("class","iconfont icon-zanting")
        $('.controls').attr('class','controls animated slideInUp');

	}
	if (event.keyCode===39){ // End
        if (m<=30){
            vids.currentTime+=10;
        } else if (30<m<59){
            vids.currentTime+=30;
        } else if (h>=1){
            vids.currentTime+=60;
        }
        $(".icon-kuaijin").css({
            color:"#00aaff"
        })
        $("#pass").css({display:"block"});
        $("#bf").attr("class","iconfont icon-zanting")
        $('.controls').attr('class','controls animated slideInUp');

    }
	/*----暂停播放(点击键盘空格的时候)----*/
	if (event.keyCode===13){ // 空格
		if(vids.paused){
			vids.play()
			$("#ztbf").attr("class","iconfont icon-zanting")
            $("#pass").css({display:"none"});
            $("#bf").attr("class","iconfont icon-zanting")
            $('.controls').attr('class','controls animated  slideOutDown');
        }else{
			vids.pause()
			$("#ztbf").attr("class","iconfont icon-bofang2")
            $("#pass").css({display:"block"});
            $("#bf").attr("class","iconfont icon-bofang2")
            $('.controls').attr('class','controls animated slideInUp');

        }
	}
})

/*-----------------------------键盘抬起的时候----------------------------------------*/
$(document).keyup(function (event) {
    // vids.currentTime+=10;
    $(".icon-kuaijin").css({
        color:"#ffffff"
    })
    $(".icon-kuaitui").css({
        color:"#ffffff"
    })
    if(vids.paused) {
        $("#pass").css({display:"block"});
        $("#bf").attr("class", "iconfont icon-bofang2")
        $('.controls').attr('class','controls animated  slideInUp');

    }else{
        $("#pass").css({display:"none"});
        $("#bf").attr("class", "iconfont icon-zanting")
        $('.controls').attr('class','controls animated  slideOutDown ');

    }
    if (event.keyCode===37){ //kuaitui
        // vids.currentTime-=10;
        // $(".icon-kuaitui").css({
        //     color:"#ffffff"
        // })
        // if(vids.paused) { // 暂停状态
        //     $("#pass").css({display:"block"});
        //     $("#bf").attr("class", "iconfont icon-bofang2")
        //     $('.controls').attr('class','controls animated slideInUp');
        // }else{
        //     $("#pass").css({display:"none"});
        //     $("#bf").attr("class", "iconfont icon-zanting")
        //     $('.controls').attr('class','controls animated slideOutDown');
        //
        // }
    }
    if (event.keyCode===39){ //kuaijin
        // vids.currentTime+=10;
        // $(".icon-kuaijin").css({
        //     color:"#ffffff"
        // })
        // if(vids.paused) {
        //     // vids.play()
        //     $("#pass").css({display:"block"});
        //     $("#bf").attr("class", "iconfont icon-bofang2")
        //     $('.controls').attr('class','controls animated  slideOutDown');
        //
        // }else{
        //     $("#pass").css({display:"none"});
        //     $("#bf").attr("class", "iconfont icon-zanting")
        //     $('.controls').attr('class','controls animated slideInUp');
        //
        // }
    }

})
/*全屏播放按钮*/
$("#qp").click(function(){
	if($(".video_ls").hasClass("on")){
		$(".video_ls").removeClass("on");
		$(".controls").css({width:"764px"})
		}else{
			$(".video_ls").addClass("on");
			var oBox=$("body").width()-66;
			$(".controls").css({width:oBox+'px'})
			}
})
/*音量加减*/
vBtn.onmousedown = function(ev){
    var ev=ev||window.event;
    var xs=ev.clientX - this.offsetLeft;
    document.onmousemove = function(ev){
        var newLefts=ev.clientX-xs;
        if(newLefts<=0){
            newLefts=0;
        }else if(newLefts>=vBar.offsetWidth-vBtn.offsetWidth){
            newLefts=vBar.offsetWidth-vBtn.offsetWidth;
        }
        vBtn.style.left=newLefts+"px";
        vBar_in.style.width =(newLefts+8)+"px";
        var prop=newLefts/(vBar.offsetWidth-vBtn.offsetWidth);
        vids.volume =prop;
        //静音改变音量图标
        if(!vids.volume){
            icon.style.backgroundImage="url(images/iconb.png)"
        }else{
            icon.style.backgroundImage="url(images/icona.png)"
        }
    }
	document.onmouseup = function(){
	document.onmousemove = null;
	document.onmouseup = null;
    }
}
