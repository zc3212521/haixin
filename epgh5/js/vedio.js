/*获取控制对象*/
// 设置控制条的长度
function videoControl() {
    var oBox=$("body").width()-66;
    $(".controls").css({width:oBox+'px'})
    // $(".controls").attr('class','controls animated slideOutDown')
    $(".controls").attr('class','controls animated fadeOut')

    var vids=document.getElementById("vids");
    // var vids = videojs('vids')
    // console.log(vids)

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
    function canPlay(){}
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
    }/*(canplay方法结束)*/

    /*----------------------------------快进快退(点击键盘的时候)----------------------------------*/
    $(document).keydown(function (event) {
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

            $(".list_1 .icon-kuaitui").css({
                color:"#00aaff"
            })
            // 点击快进或快退的时候 出现暂停按钮
            $("#pass").css({display:"block"});
            $("#bf").attr("class","iconfont icon-kuaitui")
            $("#ztbf").css({
                'color':'#fff'
            })
            // $('.controls').attr('class','controls animated slideInUp');
            $('.controls').attr('class','controls animated fadeIn');

        }
        if (event.keyCode===39){ // End
            if (m<=30){
                vids.currentTime+=10;
            } else if (30<m<59){
                vids.currentTime+=30;
            } else if (h>=1){
                vids.currentTime+=60;
            }
            $(".list_1 .icon-kuaijin").css({
                color:"#00aaff"
            })

            $("#pass").css({display:"block"});
            // $('.controls').attr('class','controls animated slideInUp');
            $('.controls').attr('class','controls animated fadeIn');

            $("#bf").attr("class","iconfont icon-kuaijin")
            $("#ztbf").css({
                'color':'#fff'
            })
        }
        /*----暂停播放(点击键盘空格的时候)----*/
        if (event.keyCode===13){ // 回车
            if(vids.paused){
                vids.play()
                $("#ztbf").attr("class","iconfont icon-zanting").css({
                    'color':'#fff'
                })
                $("#pass").css({display:"none"});
                $("#bf").attr("class","iconfont icon-zanting")
                // $('.controls').attr('class','controls animated  slideOutDown');
                // setTimeout(function () {
                    //$('.controls').attr('class','controls animated  fadeOut');
                // },3000)

            }else{
                vids.pause()
                $("#ztbf").attr("class","iconfont icon-bofang2").css({
                    'color':'#00aaff'
                })
                $("#pass").css({display:"block"});
                $("#bf").attr("class","iconfont icon-bofang2")
                // $('.controls').attr('class','controls animated slideInUp');
                //$('.controls').attr('class','controls animated fadeIn');

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
            // $('.controls').attr('class','controls animated  slideInUp');
            $('.controls').attr('class','controls animated  fadeIn');

            $("#ztbf").css({
                'color':'#00aaff'
            })
        }else{
            $("#pass").css({display:"none"});
            $("#bf").attr("class", "iconfont icon-zanting")
            // $('.controls').attr('class','controls animated  slideOutDown ');
            // setTimeout(function () {
                $('.controls').attr('class','controls animated  fadeOut ');
            // },3000)

            $("#ztbf").css({
                'color':'#fff'
            })
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
}
