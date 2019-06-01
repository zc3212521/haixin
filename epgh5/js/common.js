
//在页面未加载完毕之前显示的loading Html自定义内容

//监听加载状态改变
document.onreadystatechange = completeLoading;

//加载状态为complete时移除loading效果
function completeLoading() {
    $('.loading_mask').show()
    if (document.readyState == "complete") {
        $('.loading_mask').hide()
    }
}
/*每1000毫秒(1秒)执行一次shijian()方法*/

setInterval("shijian()", 1)
function shijian() {
    var today = new Date();
    var hh = today.getHours();
    var mm = today.getMinutes();
    var ss = today.getSeconds();
    /*声明一个变量来接收转换成字符串*/
    var dayday;
    /*声明AM和PM分别代表上午和下午，因为时间设置为12小时制，从用户角度出发，提供便利*/
    var apm = "PM";
    var abm = "AM";

    /*从系统获取的时间为24小时制，我们减去12就可以转换成12小时制*/
    // if (hh > 12) {
    //     var num = hh - 12;
    //     document.getElementById("sel_time").innerHTML =num + "&nbsp;" + ":" + "&nbsp;" + (mm <10 ? '0' + mm : mm) + "&nbsp;" + apm+"<br/>"
    // } else {
    //     document.getElementById("sel_time").innerHTML =hh + "&nbsp;" + ":" + "&nbsp;" + (mm <10 ? '0' + mm : mm) + "&nbsp;" + abm + "<br/>";
    // }
    // 有版本号
    var na = isBroswer().name
    var ver = isBroswer().version
    if (hh > 12) {
        var num = hh - 12;
        document.getElementById("sel_time").innerHTML =num + "&nbsp;" + ":" + "&nbsp;" + (mm <10 ? '0' + mm : mm) + "&nbsp;" + apm+" <span class='version'>"+na+"-"+ver+"-v1.0</span><br/>"
    } else {
        document.getElementById("sel_time").innerHTML =hh + "&nbsp;" + ":" + "&nbsp;" + (mm <10 ? '0' + mm : mm) + "&nbsp;" + abm + "<span class='version'>"+na+"-"+ver+"-v1.0</span><br/>";
    }
}

// 剧集
function number(str) {
    console.log(str)
    if(str == '1-12'){
        $(".vipImg").css("display","none")
    }else {
        $(".vipImg").css("display","block")
    }
    var arr = str.split('-')
    var start = 0
    var end = 0
    if (arr.length>1) {
        start = parseInt(arr[0])
        end = parseInt(arr[1])
    }else { // =1
        start = parseInt(arr[0])
        end = parseInt(arr[0])
    }
    $(".setNumber .li").each(function (item,i) {
        if (start<=end) {
            $(this).show()
            $(this).children().html(start)
            start = start+1
        } else {
            $(this).hide()
        }
    })
}
//返回当前的索引值

function modIndex(cla) {
    var index = 0
    $("."+cla+' li').each(function () {
        if ($(this).hasClass('active')){

            index = $(this).index()
        }
    })
    return index
}

// 电视剧内页 和 游戏内页 事件
function keyEvent() {
    var jqThis;
    var colThis;
    var startAnimate = false
    $(window).keydown(function (e) {
            $('.inner_sel').each(function () {
                if ($(this).css('display') == 'block') {
                    $(this).children('li').each(function () { // 左右的this
                        if ($(this).hasClass('active')) {
                            jqThis = $(this)
                        }
                    });
                }
            })

            $('.nav_list li').each(function () { // 上下的this
                if ($(this).hasClass('active')) {
                    colThis = $(this)
                }
            });
            // console.log(e.keyCode)
            if(e.keyCode==38){ // 上
                if (colThis.index() === 0) {
                    colThis.parents('.nav_list').find('li').last().addClass('active')
                }
                colThis.prev().addClass('active')
                colThis.removeClass('active')
                $($(".inner_sel")[modIndex("nav_list")]).addClass('inner_aty  fadeIn').siblings().removeClass('inner_aty  fadeIn')

            }
            if(e.keyCode==40){ // 下
                if (colThis.next().length === 0) { // 这是到头啦
                    colThis.parents('.nav_list').find('li').eq(0).addClass('active')
                }
                colThis.next().addClass('active')
                colThis.removeClass('active')
                $($(".inner_sel")[modIndex("nav_list")]).addClass('inner_aty  fadeIn').siblings().removeClass('inner_aty  fadeIn')


            }
            if(e.keyCode==39){ // 右-39
                if (jqThis.parents().hasClass('inner_sel')) {
                    if (jqThis.next().length === 0) { // 这是到头啦
                        jqThis.parents('.inner_sel').find('.li').eq(0).addClass('active')
                    }
                    jqThis.next().addClass('active')
                    jqThis.removeClass('active')
                }
            }
            if(e.keyCode==37){ // 左-37
                if (jqThis.parents().hasClass('inner_sel')) {
                    jqThis.removeClass('active')
                    if(jqThis.parent().hasClass('inner_sel')){ // 父元素是1
                        if (jqThis.prev().length === 0) { // 这是到头啦
                            jqThis.parents('.inner_sel').find('.li').last().addClass('active')
                        }
                        jqThis.prev().addClass('active')
                    }
                }
            }
            if(e.keyCode==13){ // enter
                var type = jqThis.attr("data-type")
                if (type === '0'){ // 电视
                    window.location.href='details.html'
                }else if (type === '1'){ // 综艺
                    window.location.href='detailszy.html'
                }else if (type === '2'){ // 电影
                    window.location.href='detailsSingle.html'
                }
            }
            // 返回上一页
            if (e.keyCode == 8) { // Backspace键
                window.history.go(-1)
            }
            setTimeout(function () {
                startAnimate = false
            }, 200)
        })
}

function preloadImg(srcArr){
    if(srcArr instanceof Array){
        for(var i=0; i<srcArr.length; i++){
            var oImg = new Image();
            oImg.src = srcArr[i];
        }
    }
}

// 二屏滚动
var ele = document.getElementById('pageContent');
function bottom() {
    $("#pageContent").stop().animate({
        scrollTop: ele.scrollHeight
    },1000);
}
function tops() {
    $("#pageContent").stop().animate({
        scrollTop: 0
    },800);
}
function tops2() {
    console.log(document.getElementById('top1').offsetHeight)
    console.log($('#top1').height())
    var topHei = document.getElementById('top1').offsetHeight
    var btom = document.getElementById('sel_lr').offsetHeight
    var t = topHei - btom
    $("#pageContent").stop().animate({
        scrollTop: t
    },800);
}
// function bottom2() {
//     $("#pageContent").stop().animate({
//         scrollTop: ele.scrollHeight
//     },1000);
// }
//toast
function toust(con) {
    $('body').append('<div id="toust"><span>'+con+'</span></div>')
}
function toustRemove() {
    $('#toust').remove()
    // console.log(111)
}

//验证码倒计时功能
function times(){
    var time=60;
    var button=$("#y_text");
    var timer=null;
    timer=setInterval(function(){
        if(time<0){
            button.html("获取验证码");
            button.attr('class','');
            clearInterval(timer);//这句话至关重要
        }else {
            button.attr('class','yzm');
             button.html(time+"s");
            time--;
        }
    },1000);
}

// 个人中心  修改密码 重置密码

function passWords(){
    // 键盘事件开始
    var colThis;
    var lsThis;
    $(window).keydown(function (e) {
        $('.updpass').children().each(function () { // 上下的this
            if ($(this).hasClass('active')&&$(this).parents(".updpass").css("display")=='block') {
                colThis = $(this)
            }
        });

        $('.login_sign span').each(function () { // 左右的this
            if ($(this).hasClass('log_aty')) {
                lsThis = $(this)
            }
        });
        if (e.keyCode == 37){ // 左切换
            if(lsThis.prev().length != 0){
                lsThis.prev().addClass('log_aty')
                lsThis.removeClass('log_aty')
                $(".sign").attr('class','personal updpass resetPass loginSign sign animated fadeOutRightBig')
                setTimeout(function () {
                    $(".login").attr('class','personal updpass loginSign login animated fadeInLeftBig')
                    $('.login').css('display','block')
                    $(".sign").css('display','none')
                },500)
            }
        }
        if (e.keyCode == 39){ // 右切换
            if(lsThis.next().length != 0){
                lsThis.next().addClass('log_aty')
                lsThis.removeClass('log_aty')
                $(".login").attr('class','personal updpass loginSign login animated fadeOutLeftBig')
                setTimeout(function () {
                    $(".sign").attr('class','personal updpass resetPass loginSign sign animated fadeInRightBig')
                    $('.login').css('display','none')
                    $(".sign").css('display','block')
                },500)
            }
        }
        if(e.keyCode==38){ // 上
            if (colThis.prev().length === 0 && colThis.parents(".updpass").css("display")=='block') {
                console.log(colThis.parents(".updpass").css("display"))
                colThis.parents(".updpass").children().last().addClass('active')
                colThis.parents(".updpass").children().last().children('input').focus()
            }
            colThis.prev().addClass('active')
            colThis.prev().children('input').focus()
            colThis.removeClass('active')
            colThis.children('input').blur()
        }
        if(e.keyCode==40){ // 下 滑到下一页
            if (colThis.next().length === 0 && colThis.parents(".updpass").css("display")=='block') { // 这是到头啦
                colThis.parents(".updpass").children().first().addClass('active')
                colThis.parents(".updpass").children().first().children('input').focus()
            }
            colThis.next().addClass('active')
            colThis.next().children('input').focus()
            colThis.removeClass('active')
            colThis.children('input').blur()
        }
        if(e.keyCode==13){ // enter
            if (colThis.hasClass('updOk')){
                //修改密码
                var newPas = $("#y_newPas").val()
                console.log(newPas)
                if (newPas.length<=16 && newPas.length>=6) {
                    toust('修改成功')
                    setTimeout(toustRemove,2000)
                }else {
                    toust('新密码格式错误')
                    setTimeout(toustRemove,2000)
                }
            } else if (colThis.hasClass('gety') && !(colThis.children().eq(0).hasClass("yzm"))) {
                times()
            }
        }
        // 返回上一页
        if (e.keyCode == 8) { // backspace
            window.history.go(-1)
        }
    })
}

// 开关方法 暂没调用
function openClo(){
    if ($(this).attr('isopen') == 'false') {
        $(this).attr('isopen','true').animate({left:'0px'});
        $(this).attr('class','btnn btnnk');
        $(this).parent().attr('class','right rightk');
        $(this).html('开')
    } else {
        $(this).attr('isopen','false').animate({left:'9.8vmin'});
        $(this).attr('class','btnn btnng');
        $(this).parent().attr('class','right rightg');
        $(this).html('关')
    }
}

// alert(isBroswer().version + isBroswer().name)
function isBroswer () {//检测浏览器内核--返回的是两个key，name：浏览器内核的名称---version：浏览器的版本号
    var _broswer = {};
    var sUserAgent = navigator.userAgent;
    var isOpera = sUserAgent.indexOf("Opera") > -1;
    if (isOpera) {
        //首先检测Opera是否进行了伪装
        if (navigator.appName == 'Opera') {
            //如果没有进行伪装，则直接后去版本号
            _broswer.version = parseFloat(navigator.appVersion);
        } else {
            var reOperaVersion = new RegExp("Opera (\\d+.\\d+)");
            //使用正则表达式的test方法测试并将版本号保存在RegExp.$1中
            reOperaVersion.test(sUserAgent);
            _broswer.version = parseFloat(RegExp['$1']);
        }
        _broswer.opera = true;
        _broswer.name = 'opera';
    }
    var isChrome = sUserAgent.indexOf("Chrome") > -1;
    if (isChrome) {
        var reChorme = new RegExp("Chrome/(\\d+\\.\\d+(?:\\.\\d+\\.\\d+))?");
        reChorme.test(sUserAgent);
        _broswer.version = parseFloat(RegExp['$1']);
        _broswer.chrome = true;
        _broswer.name = 'chrome';
    }
    //排除Chrome信息，因为在Chrome的user-agent字符串中会出现Konqueror/Safari的关键字
    var isKHTML = (sUserAgent.indexOf("KHTML") > -1
        || sUserAgent.indexOf("Konqueror") > -1 || sUserAgent
            .indexOf("AppleWebKit") > -1)
        && !isChrome;
    if (isKHTML) {//判断是否基于KHTML，如果时的话在继续判断属于何种KHTML浏览器
        var isSafari = sUserAgent.indexOf("AppleWebKit") > -1;
        var isKonq = sUserAgent.indexOf("Konqueror") > -1;
        if (isSafari) {
            var reAppleWebKit = new RegExp("Version/(\\d+(?:\\.\\d*)?)");
            reAppleWebKit.test(sUserAgent);
            var fAppleWebKitVersion = parseFloat(RegExp["$1"]);
            _broswer.version = parseFloat(RegExp['$1']);
            _broswer.safari = true;
            _broswer.name = 'safari';
        } else if (isKonq) {
            var reKong = new RegExp(
                "Konqueror/(\\d+(?:\\.\\d+(?\\.\\d)?)?)");
            reKong.test(sUserAgent);
            _broswer.version = parseFloat(RegExp['$1']);
            _broswer.konqueror = true;
            _broswer.name = 'konqueror';
        }
    }
    // !isOpera 避免是由Opera伪装成的IE
    var isIE = sUserAgent.indexOf("compatible") > -1
        && sUserAgent.indexOf("MSIE") > -1 && !isOpera;
    if (isIE) {
        var reIE = new RegExp("MSIE (\\d+\\.\\d+);");
        reIE.test(sUserAgent);
        _broswer.version = parseFloat(RegExp['$1']);
        _broswer.msie = true;
        _broswer.name = 'msie';
    }
    // 排除Chrome 及 Konqueror/Safari 的伪装
    var isMoz = sUserAgent.indexOf("Gecko") > -1 && !isChrome && !isKHTML;
    if (isMoz) {
        var reMoz = new RegExp("rv:(\\d+\\.\\d+(?:\\.\\d+)?)");
        reMoz.test(sUserAgent);
        _broswer.version = parseFloat(RegExp['$1']);
        _broswer.mozilla = true;
        _broswer.name = 'mozilla';
    }
    return _broswer;
}
