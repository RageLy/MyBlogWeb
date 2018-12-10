var scripts = document.getElementsByTagName('script');
var blog_id = scripts[scripts.length - 1].getAttribute('data-id')
console.log(blog_id)
$('#share-2').share({sites: ['qzone', 'qq', 'weibo','wechat','douban']});
$("#urlinfo").html(window.location.href)
$("#urlinfo").attr('href',window.location.href)
var devide=''
var brower=''
var system=''
function checkEmail(myemail) {
    var myReg = /^[a-zA-Z0-9_-]+@([a-zA-Z0-9]+\.)+(com|cn|net|org)$/;
    if (myReg.test(myemail)) {
        return true;
    } else {
        return false;
    }
}
$("#blogpagination").whjPaging({
    //设为true时，ajax里的success函数必须调用setPage方法，否则分页插件显示保持不变
    isResetPage: true,
    css: 'css-4',
    isShowSkip: false,
    isShowRefresh: false,
    isShowPageSizeOpt: false,
    isShowFL: true,
    isShowTotalPage: false,
    isShowTotalSize: false,
    callBack: function(currPage, pageSize) {
        LoadComment(currPage, 10);
    }
});
$(function(){
    LoadComment(1,10);
});
(function($){
    var BrowserMatch = {
        init: function() {
            this.browser = this.getBrowser().browser || "未知浏览器";  //获取浏览器名
            this.version = this.getBrowser().version || "未知浏览器版本号";  //获取浏览器版本
            this.OS = this.getOS()+" "+this.getDigits() || "未知操作系统"; //系统版本号
        },
        getOS: function() {  //判断所处操作系统
            var sUserAgent = navigator.userAgent.toLowerCase();

            var isWin = (navigator.platform == "Win32") || (navigator.platform == "Win64")|| (navigator.platform == "wow64");

            var isMac = (navigator.platform == "Mac68K") || (navigator.platform == "MacPPC") || (navigator.platform == "Macintosh") || (navigator.platform == "MacIntel");
            if (isMac) return "Mac";
            var isUnix = (navigator.platform == "X11") && !isWin && !isMac;
            if (isUnix) return "Unix";
            var isLinux = (String(navigator.platform).indexOf("Linux") > -1);
            var bIsAndroid = sUserAgent.toLowerCase().match(/android/i) == "android";
            if (isLinux) {
                if(bIsAndroid) return "Android";
                else return "Linux";
            }
            if (isWin) {

                var isWin2K = sUserAgent.indexOf("Windows nt 5.0") > -1 || sUserAgent.indexOf("Windows 2000") > -1;
                if (isWin2K) return "Win2000";
                var isWinXP = sUserAgent.indexOf("Windows nt 5.1") > -1 || sUserAgent.indexOf("Windows XP") > -1
                sUserAgent.indexOf("Windows XP") > -1;
                if (isWinXP) return "WinXP";
                var isWin2003 = sUserAgent.indexOf("Windows nt 5.2") > -1 || sUserAgent.indexOf("Windows 2003") > -1;
                if (isWin2003) return "Win2003";
                var isWinVista= sUserAgent.indexOf("Windows nt 6.0") > -1 || sUserAgent.indexOf("Windows Vista") > -1;
                if (isWinVista) return "WinVista";
                var isWin7 = sUserAgent.indexOf("Windows nt 6.1") > -1 || sUserAgent.indexOf("Windows 7") > -1;
                if (isWin7) return "Win7";
                var isWin8 = sUserAgent.indexOf("windows nt 6.2") > -1 || sUserAgent.indexOf("Windows 8") > -1;
                if (isWin8) return "Win8";
                var isWin10 = sUserAgent.indexOf("windows nt 10.0")>-1||sUserAgent.indexOf("Windows 10")>-1;
                if(isWin10)return "Win10";
            }
            return "其他";
        },
        getDigits:function(){ //判断当前操作系统的版本号
            var sUserAgent = navigator.userAgent.toLowerCase();
            var is64 = sUserAgent.indexOf("win64") > -1||sUserAgent.indexOf("wow64") > -1;
            if (is64) {
                return "64位";
            }else{
                return "32位";
            }
        },
        getBrowser: function() {  // 获取浏览器名
            var rMsie = /(msie\s|trident\/7)([\w\.]+)/;
            var rTrident = /(trident)\/([\w.]+)/;
            var rEdge = /(chrome)\/([\w.]+)/;//IE

            var rFirefox = /(firefox)\/([\w.]+)/;  //火狐
            var rOpera = /(opera).+version\/([\w.]+)/;  //旧Opera
            var rNewOpera = /(opr)\/(.+)/;  //新Opera 基于谷歌
            var rChrome = /(chrome)\/([\w.]+)/; //谷歌
            var rUC = /(chrome)\/([\w.]+)/;//UC
            var rMaxthon = /(chrome)\/([\w.]+)/;//遨游
            var r2345 =  /(chrome)\/([\w.]+)/;//2345
            var rQQ =  /(chrome)\/([\w.]+)/;//QQ
            //var rMetasr =  /(metasr)\/([\w.]+)/;//搜狗
            var rSafari = /version\/([\w.]+).*(safari)/;

            var ua = navigator.userAgent.toLowerCase();


            var matchBS, matchBS2;

            //IE 低版
            matchBS = rMsie.exec(ua);
            if (matchBS != null) {
                matchBS2 = rTrident.exec(ua);
                if (matchBS2 != null) {
                    switch (matchBS2[2]) {
                        case "4.0":
                            return {
                                browser:
                                    "Microsoft IE",
                                version: "IE: 8"  //内核版本号
                            };
                            break;
                        case "5.0":
                            return {
                                browser:
                                    "Microsoft IE",
                                version: "IE: 9"
                            };
                            break;
                        case "6.0":
                            return {
                                browser:
                                    "Microsoft IE",
                                version: "IE: 10"
                            };
                            break;
                        case "7.0":
                            return {
                                browser:
                                    "Microsoft IE",
                                version: "IE: 11"
                            };
                            break;
                        default:
                            return {
                                browser:
                                    "Microsoft IE",
                                version: "Undefined"
                            };
                    }
                } else {
                    return {
                        browser: "Microsoft IE",
                        version: "IE:"+matchBS[2] || "0"
                    };
                }
            }
            //IE最新版
            matchBS = rEdge.exec(ua);
            if ((matchBS != null) && (!(window.attachEvent))) {
                return {
                    browser: "Microsoft Edge",
                    version: "Chrome/"+matchBS[2] || "0"
                };
            }
            //UC浏览器
            matchBS = rUC.exec(ua);
            if ((matchBS != null) && (!(window.attachEvent))) {
                return {
                    browser: "UC",
                    version: "Chrome/"+matchBS[2] || "0"
                };
            }
            //火狐浏览器
            matchBS = rFirefox.exec(ua);
            if ((matchBS != null) && (!(window.attachEvent))) {
                return {
                    browser: "火狐",
                    version: "Firefox/"+matchBS[2] || "0"
                };
            }
            //Oper浏览器
            matchBS = rOpera.exec(ua);
            if ((matchBS != null) && (!(window.attachEvent))) {
                return {
                    browser: "Opera",
                    version: "Chrome/"+matchBS[2] || "0"
                };
            }
            //遨游
            matchBS = rMaxthon.exec(ua);
            if ((matchBS != null) && (!(window.attachEvent))) {
                return {
                    browser: "遨游",
                    version: "Chrome/"+matchBS[2] || "0"
                };
            }
            //2345浏览器
            matchBS = r2345.exec(ua);
            if ((matchBS != null) && (!(window.attachEvent))) {
                return {
                    browser: "2345",
                    version: "Chrome/ "+matchBS[2] || "0"
                };
            }
            //QQ浏览器
            matchBS = rQQ.exec(ua);
            if ((matchBS != null) && (!(window.attachEvent))) {
                return {
                    browser: "QQ",
                    version: "Chrome/"+matchBS[2] || "0"
                };
            }
            //Safari（苹果）浏览器
            matchBS = rSafari.exec(ua);
            if ((matchBS != null) && (!(window.attachEvent)) && (!(window.chrome)) && (!(window.opera))) {
                return {
                    browser: "Safari",
                    version: "Safari/"+matchBS[1] || "0"
                };
            }
            //谷歌浏览器
            matchBS = rChrome.exec(ua);
            if ((matchBS != null) && (!(window.attachEvent))) {
                matchBS2 = rNewOpera.exec(ua);
                if (matchBS2 == null) {
                    return {
                        browser: "谷歌",
                        version: "Chrome/"+matchBS[2] || "0"
                    };
                } else {
                    return {
                        browser: "Opera",
                        version: "opr/"+matchBS2[2] || "0"
                    };
                }
            }
        }
    };
    BrowserMatch.init();
    brower=BrowserMatch.browser
    system=BrowserMatch.OS
    // {#alert("当前浏览器为：" + BrowserMatch.browser +"\n版本为："+ BrowserMatch.version + "\n所处操作系统为："+BrowserMatch.OS); #}
})(jQuery);


//检测平台
var p = navigator.platform;
system.win = p.indexOf("Win") == 0;
system.mac = p.indexOf("Mac") == 0;
system.x11 = (p == "X11") || (p.indexOf("Linux") == 0);
system.ipad = (navigator.userAgent.match(/iPad/i) != null)?true:false;
//跳转语句，如果是手机访问就自动跳转到wap.baidu.com页面
if (system.win || system.mac || system.xll||system.ipad) {
    console.log('电脑端')
    devide='电脑端'
} else if(system.mac)
{
    console.log('MAC端')
    devide='mac端'
}
else if(system.xll)
{
    console.log('OK')
    devide='x11或者Linux端'
}
else if(system.ipad)
{
    console.log('ipad端')
    devide='ipad端'
}
else
{
    console.log('手机端')
    devide='手机端'
}
layui.use('layer', function(){
    var layer = layui.layer;
    $("#sb-btn").click(function(){
        if($("#username").val()=="")
        {
            layer.msg('请输入昵称',{time:0.5*1000})
        }
        else if($("#email").val()=="")
        {
            layer.msg('邮箱必填',{time:0.5*1000})
        }
        else if($("#commentContent").val()=="")
        {
            layer.msg('评论不能为空',{time:0.5*1000})
        }
        else
        {
            $.ajax({
                type:"POST",
                data: {'username':$("#username").val(),'email':$("#email").val(),'blogid':blog_id,'csrfmiddlewaretoken':$("[name='csrfmiddlewaretoken']").val(),'commentContent':$("#commentContent").val(),'replytype':"0",'device':devide,'brower':brower,'system':system},
                url: "../../commentdata/", //后台处理函数的url
                cache: false,
                async : false,
                success: function(result,stutas){
                    // {#console.log(result.message)#}
                    if(result.message="0")
                    {
                        // {#console.log(result.message)#}
                        layer.msg('评论成功!',{time:0.5*1000})
                        // {#location.reload()#}
                        $(".commentcount").find('*').remove();
                        $(".commentcount").html(result.commentcount+'条评论')
                        LoadComment(1,10)
                        // {#console.log(result.data)#}
                    }
                }
            });
        }
    });
});

//加载初始化数据
function LoadComment(currPage, pageSize){
    $.ajax({
        type:'GET',
        dataType: "json",
        data: {'page':currPage,'limit':pageSize,'blogid':blog_id},
        url:"../../loadcommentdata/",
        success:function(result){
            $(".commentcount").find('*').remove();
            $(".commentcount").html(result.commentcount+'条评论')
            if(result.code=="0"){
                var info = result.data;
                // console.log(result)
                var html=""
                for(var i in info){
                    var sublist=info[i].Reply
                    var addstr=""
                    // console.log(sublist)
                    if(sublist!=[])
                    {
                        var MessageReplylist="<ul class=\"message-rely-list\">"
                        var str=""
                        for(var j in sublist)
                        {
                            str+="<li class=\"message-rely-children\" data-id=\""+sublist[j].id+"\" data-name=\""+sublist[j].from_uid+"\">\n" +
                                "<div class=\"reply-head\">\n" +
                                "<img src=\"../../"+sublist[j].from_userpic+"\"></div>\n" +
                                "<div class=\"reply-user\"><a href=\""+sublist[j].from_userwebsite+"\">"+sublist[j].from_username+"</a><a class=\"replytoreply\" replytoreply=\"true\">回复</a></div>\n" +
                                "<div class=\"reply-content\"><span>回复 @"+sublist[j].to_username+"：</span>"+sublist[j].replyContent+"</div>\n" +
                                "<div class=\"reply-other\"><span class=\"replytime\" datetime=\""+sublist[j].createdate+"\"></span><i class=\"layui-icon layui-icon-location\"> "+sublist[j].country+" · "+sublist[j].region+" · "+sublist[j].city+" - "+sublist[j].system+" - "+sublist[j].brower+"</i></div>\n" +
                                "<div class=\"replybtn\"></div>\n" +
                                "<form id=\"submitsub\" ></form></li>"
                        }
                        MessageReplylist+=str+"</ul>"
                        addstr = MessageReplylist
                    }
                    // console.log(addstr)

                    html+="<div class=\"Message\" data-id=\""+info[i].id+"\" data-name=\""+info[i].uid+"\">"+
                        "<div class=\"headimg\"><img src=\"../../"+info[i].userpic+"\"></div>\n" +
                        "<div class=\"user\"><a href=\""+info[i].website+"\" target=\"_blank\">"+info[i].username+"</a></div>\n" +
                        "<div class=\"text\"><p>"+info[i].commentContent+"</p></div>\n" +
                        "<div class=\"date\"><span class=\"replytime\" datetime=\""+info[i].createdate+"\"></span><i class=\"layui-icon layui-icon-location\"> "+info[i].country+" · "+info[i].region+" · "+info[i].city+" - "+info[i].system+" - "+info[i].brower+"</i></div>\n" +
                        "<div class=\"replybtn\" ><a class=\"Mainreplybtn\" replybtn=\"true\">回复</a></div><form id=\"submit\" ></form>"+addstr+"</div>"
                }

                // location.reload()
                $('#messagetext').find('*').remove();
                console.log(result.currPage, result.totalPage,  result.totalSize)
                $("#messagetext").append(html)

                $("#blogpagination").whjPaging(
                    "setPage",
                    {currPage: result.currPage, totalPage: result.totalPage, totalSize: result.totalSize}
                );
                (function($){
                    var BrowserMatch = {
                        init: function() {
                            this.browser = this.getBrowser().browser || "未知浏览器";  //获取浏览器名
                            this.version = this.getBrowser().version || "未知浏览器版本号";  //获取浏览器版本
                            this.OS = this.getOS()+" "+this.getDigits() || "未知操作系统"; //系统版本号
                        },
                        getOS: function() {  //判断所处操作系统
                            var sUserAgent = navigator.userAgent.toLowerCase();

                            var isWin = (navigator.platform == "Win32") || (navigator.platform == "Win64")|| (navigator.platform == "wow64");

                            var isMac = (navigator.platform == "Mac68K") || (navigator.platform == "MacPPC") || (navigator.platform == "Macintosh") || (navigator.platform == "MacIntel");
                            if (isMac) return "Mac";
                            var isUnix = (navigator.platform == "X11") && !isWin && !isMac;
                            if (isUnix) return "Unix";
                            var isLinux = (String(navigator.platform).indexOf("Linux") > -1);
                            var bIsAndroid = sUserAgent.toLowerCase().match(/android/i) == "android";
                            if (isLinux) {
                                if(bIsAndroid) return "Android";
                                else return "Linux";
                            }
                            if (isWin) {

                                var isWin2K = sUserAgent.indexOf("Windows nt 5.0") > -1 || sUserAgent.indexOf("Windows 2000") > -1;
                                if (isWin2K) return "Win2000";
                                var isWinXP = sUserAgent.indexOf("Windows nt 5.1") > -1 || sUserAgent.indexOf("Windows XP") > -1
                                sUserAgent.indexOf("Windows XP") > -1;
                                if (isWinXP) return "WinXP";
                                var isWin2003 = sUserAgent.indexOf("Windows nt 5.2") > -1 || sUserAgent.indexOf("Windows 2003") > -1;
                                if (isWin2003) return "Win2003";
                                var isWinVista= sUserAgent.indexOf("Windows nt 6.0") > -1 || sUserAgent.indexOf("Windows Vista") > -1;
                                if (isWinVista) return "WinVista";
                                var isWin7 = sUserAgent.indexOf("Windows nt 6.1") > -1 || sUserAgent.indexOf("Windows 7") > -1;
                                if (isWin7) return "Win7";
                                var isWin8 = sUserAgent.indexOf("windows nt 6.2") > -1 || sUserAgent.indexOf("Windows 8") > -1;
                                if (isWin8) return "Win8";
                                var isWin10 = sUserAgent.indexOf("windows nt 10.0")>-1||sUserAgent.indexOf("Windows 10")>-1;
                                if(isWin10)return "Win10";
                            }
                            return "其他";
                        },
                        getDigits:function(){ //判断当前操作系统的版本号
                            var sUserAgent = navigator.userAgent.toLowerCase();
                            var is64 = sUserAgent.indexOf("win64") > -1||sUserAgent.indexOf("wow64") > -1;
                            if (is64) {
                                return "64位";
                            }else{
                                return "32位";
                            }
                        },
                        getBrowser: function() {  // 获取浏览器名
                            var rMsie = /(msie\s|trident\/7)([\w\.]+)/;
                            var rTrident = /(trident)\/([\w.]+)/;
                            var rEdge = /(chrome)\/([\w.]+)/;//IE

                            var rFirefox = /(firefox)\/([\w.]+)/;  //火狐
                            var rOpera = /(opera).+version\/([\w.]+)/;  //旧Opera
                            var rNewOpera = /(opr)\/(.+)/;  //新Opera 基于谷歌
                            var rChrome = /(chrome)\/([\w.]+)/; //谷歌
                            var rUC = /(chrome)\/([\w.]+)/;//UC
                            var rMaxthon = /(chrome)\/([\w.]+)/;//遨游
                            var r2345 =  /(chrome)\/([\w.]+)/;//2345
                            var rQQ =  /(chrome)\/([\w.]+)/;//QQ
                            //var rMetasr =  /(metasr)\/([\w.]+)/;//搜狗
                            var rSafari = /version\/([\w.]+).*(safari)/;

                            var ua = navigator.userAgent.toLowerCase();


                            var matchBS, matchBS2;

                            //IE 低版
                            matchBS = rMsie.exec(ua);
                            if (matchBS != null) {
                                matchBS2 = rTrident.exec(ua);
                                if (matchBS2 != null) {
                                    switch (matchBS2[2]) {
                                        case "4.0":
                                            return {
                                                browser:
                                                    "Microsoft IE",
                                                version: "IE: 8"  //内核版本号
                                            };
                                            break;
                                        case "5.0":
                                            return {
                                                browser:
                                                    "Microsoft IE",
                                                version: "IE: 9"
                                            };
                                            break;
                                        case "6.0":
                                            return {
                                                browser:
                                                    "Microsoft IE",
                                                version: "IE: 10"
                                            };
                                            break;
                                        case "7.0":
                                            return {
                                                browser:
                                                    "Microsoft IE",
                                                version: "IE: 11"
                                            };
                                            break;
                                        default:
                                            return {
                                                browser:
                                                    "Microsoft IE",
                                                version: "Undefined"
                                            };
                                    }
                                } else {
                                    return {
                                        browser: "Microsoft IE",
                                        version: "IE:"+matchBS[2] || "0"
                                    };
                                }
                            }
                            //IE最新版
                            matchBS = rEdge.exec(ua);
                            if ((matchBS != null) && (!(window.attachEvent))) {
                                return {
                                    browser: "Microsoft Edge",
                                    version: "Chrome/"+matchBS[2] || "0"
                                };
                            }
                            //UC浏览器
                            matchBS = rUC.exec(ua);
                            if ((matchBS != null) && (!(window.attachEvent))) {
                                return {
                                    browser: "UC",
                                    version: "Chrome/"+matchBS[2] || "0"
                                };
                            }
                            //火狐浏览器
                            matchBS = rFirefox.exec(ua);
                            if ((matchBS != null) && (!(window.attachEvent))) {
                                return {
                                    browser: "火狐",
                                    version: "Firefox/"+matchBS[2] || "0"
                                };
                            }
                            //Oper浏览器
                            matchBS = rOpera.exec(ua);
                            if ((matchBS != null) && (!(window.attachEvent))) {
                                return {
                                    browser: "Opera",
                                    version: "Chrome/"+matchBS[2] || "0"
                                };
                            }
                            //遨游
                            matchBS = rMaxthon.exec(ua);
                            if ((matchBS != null) && (!(window.attachEvent))) {
                                return {
                                    browser: "遨游",
                                    version: "Chrome/"+matchBS[2] || "0"
                                };
                            }
                            //2345浏览器
                            matchBS = r2345.exec(ua);
                            if ((matchBS != null) && (!(window.attachEvent))) {
                                return {
                                    browser: "2345",
                                    version: "Chrome/ "+matchBS[2] || "0"
                                };
                            }
                            //QQ浏览器
                            matchBS = rQQ.exec(ua);
                            if ((matchBS != null) && (!(window.attachEvent))) {
                                return {
                                    browser: "QQ",
                                    version: "Chrome/"+matchBS[2] || "0"
                                };
                            }
                            //Safari（苹果）浏览器
                            matchBS = rSafari.exec(ua);
                            if ((matchBS != null) && (!(window.attachEvent)) && (!(window.chrome)) && (!(window.opera))) {
                                return {
                                    browser: "Safari",
                                    version: "Safari/"+matchBS[1] || "0"
                                };
                            }
                            //谷歌浏览器
                            matchBS = rChrome.exec(ua);
                            if ((matchBS != null) && (!(window.attachEvent))) {
                                matchBS2 = rNewOpera.exec(ua);
                                if (matchBS2 == null) {
                                    return {
                                        browser: "谷歌",
                                        version: "Chrome/"+matchBS[2] || "0"
                                    };
                                } else {
                                    return {
                                        browser: "Opera",
                                        version: "opr/"+matchBS2[2] || "0"
                                    };
                                }
                            }
                        }
                    };
                    BrowserMatch.init();
                    brower=BrowserMatch.browser
                    system=BrowserMatch.OS
                    // {#alert("当前浏览器为：" + BrowserMatch.browser +"\n版本为："+ BrowserMatch.version + "\n所处操作系统为："+BrowserMatch.OS); #}
                })(jQuery);
//检测平台
                var p = navigator.platform;
                system.win = p.indexOf("Win") == 0;
                system.mac = p.indexOf("Mac") == 0;
                system.x11 = (p == "X11") || (p.indexOf("Linux") == 0);
                system.ipad = (navigator.userAgent.match(/iPad/i) != null)?true:false;
                //跳转语句，如果是手机访问就自动跳转到wap.baidu.com页面
                if (system.win || system.mac || system.xll||system.ipad) {
                    console.log('电脑端')
                    devide='电脑端'
                } else if(system.mac)
                {
                    console.log('MAC端')
                    devide='mac端'
                }
                else if(system.xll)
                {
                    console.log('OK')
                    devide='x11或者Linux端'
                }
                else if(system.ipad)
                {
                    console.log('ipad端')
                    devide='ipad端'
                }
                else
                {
                    console.log('手机端')
                    devide='手机端'
                }


                $(function () {
                    $(".Mainreplybtn").on('click', function () {
                        //胞兄的孩子
                        var contsiblingsub = $(this).parents().siblings('.Message').children('.message-rely-list').children('.message-rely-children').children('#submitsub').children('.reply-input');
                        var contsiblingsubtext = $(this).parents().siblings('.Message').children('.message-rely-list').children('.message-rely-children').children('.reply-user').children('.replytoreply');
                        //自己的孩子
                        var contsub = $(this).parents().parents('.Message').children('.message-rely-list').children('.message-rely-children').children('#submitsub').children('.reply-input');
                        var contsubtext = $(this).parents().parents('.Message').children('.message-rely-list').children('.message-rely-children').children('.reply-user').children('.replytoreply');
                        //自己
                        var contsibling = $(this).parents().siblings('.Message').children('#submit').children('.reply-input');
                        var contsiblingtext = $(this).parents().siblings('.Message').children('.replybtn').children('.Mainreplybtn');
                        // {#console.log(contsub)#}
                        // {#console.log(contsibling)#}
                        var btn = $(this).attr('replybtn')
                        if (btn)
                        {
                            $(contsub).remove()
                            $(contsibling).remove()
                            $(contsubtext).text('回复')
                            $(contsubtext).attr('replytoreply', 'true');
                            $(contsiblingtext).text('回复')
                            $(contsiblingtext).attr('replybtn', 'true');
                            $(contsiblingsub).remove()
                            $(contsiblingsubtext).text('回复')
                            $(contsiblingsubtext).attr('replytoreply', 'true');
                            $(this).text('取消回复');
                            $(this).attr('replybtn', '');
                            $(this).parents().parents('.Message').children('#submit').append(
                                "<div class=\"reply-input\"><div class=\"userinfo\">\n" +
                                "<div class=\"inline-space\"><input placeholder=\"用户名\" class=\"message-to-username\"></div>\n" +
                                "<div class=\"inline-space\"><input placeholder=\"邮箱\" class=\"message-to-email\"></div>\n" +
                                "<div class=\"inline-space\"><input placeholder=\"站点\" class=\"message-to-website\"></div></div><div class=\"text\">\n" +
                                "<textarea placeholder=\"请说点什么呗\" class=\"message-to-replycontent\"></textarea></div>\n" +
                                "<div class=\"reply-submit\"><button id=\"ReplyMain\"type=\"button\">回复</button></div></div>\n"
                            )
                        }
                        else
                        {
                            $(this).text('回复');
                            $(this).attr('replybtn', 'true');
                            $(this).parents().parents('.Message').children('#submit').children('.reply-input').remove()
                        }
                        $("#ReplyMain").on("click", function () {
                            console.log($(".Message").attr("data-id"))
                            if ($(".message-to-username").val()=="")
                            {
                                layer.msg('请输入昵称',{time:0.5*1000})
                            }
                            else if ($(".message-to-email").val()=="")
                            {
                                layer.msg('请输入邮箱',{time:0.5*1000})
                            }
                            else if($(".message-to-replycontent").val()=="")
                            {
                                layer.msg('说点什么吧！',{time:0.5*1000})
                            }
                            else if($(".message-to-email").val()!="" && !checkEmail($(".message-to-email").val()))
                            {
                                layer.msg('邮箱格式不对!',{time:0.5*1000})
                            }
                            else {
                                $.ajax({
                                    type: "POST",
                                    data: {
                                        'commentid': $(this).parents(".reply-submit").parents().parents("#submit").parents(".Message").attr("data-id"), 'to_uid':$(this).parents(".reply-submit").parents().parents("#submit").parents(".Message").attr("data-name"),'username': $('.message-to-username').val(),
                                        'email': $('.message-to-email').val(),
                                        'blogid':blog_id,
                                        'website': $('.message-to-website').val(),
                                        'ReplyContent': $('.message-to-replycontent').val(),
                                        "csrfmiddlewaretoken": $("[name='csrfmiddlewaretoken']").val(),
                                        'device':devide,'brower':brower,'system':system
                                    },
                                    url: "../../commenttocommentdata/", //后台处理函数的url
                                    cache: false,
                                    success: function (result) {
                                        if(result.code=="0"){
                                            LoadComment(1,10);
                                        }
                                        else{
                                            alert("数据错误！请联系管理员");
                                        }
                                    },
                                });
                                return false;
                            }

                        });
                    });
                    var timeagoInstance = timeago();// 实例
                    timeagoInstance.render(document.querySelectorAll('.time'),'zh_CN');
                    timeagoInstance.render(document.querySelectorAll('.replytime'),'zh_CN');
                    $(".replytoreply").on('click', function () {
                        var btn = $(this).attr('replytoreply')
                        //自己父亲
                        var contparent = $(this).parents().parents('.message-rely-children').parents().parents('.Message').children('#submit').children('.reply-input');
                        var contparenttext = $(this).parents().parents('.message-rely-children').parents().parents('.Message').children('.replybtn').children('.Mainreplybtn');
                        //自己的兄弟
                        var contsiblings = $(this).parents().siblings('.message-rely-children').children('#submitsub').children('.reply-input');
                        var contsiblingstext = $(this).parents().siblings('.message-rely-children').children('.reply-user').children('.replytoreply');
                        //自己表堂
                        var contparentsiblings = $(this).parents().parents('.message-rely-children').parents().siblings('.Message').children('#submit').children('.reply-input');
                        var contparentsiblingstext = $(this).parents().parents('.message-rely-children').parents().siblings('.Message').children('.reply-user').children('.Mainreplybtn');
                        if (btn) {
                            $(this).text('取消回复');
                            $(contsiblingstext).text('回复');
                            $(contparenttext).text('回复');
                            $(this).attr('replytoreply', '');
                            $(contparent).remove()
                            $(contsiblings).remove()
                            $(contparenttext).attr('replybtn', 'true');
                            $(contsiblingstext).attr('replytoreply', 'true');
                            $(contparentsiblings).remove()
                            $(contparentsiblingstext).text('回复')
                            $(contparentsiblingstext).attr('replytoreply', 'true');
                            $(this).parents().parents('.message-rely-children').children('#submitsub').append(
                                "<div class=\"reply-input\"><div class=\"userinfo\">\n" +
                                "<div class=\"inline-space\"><input placeholder=\"用户名\" class=\"reply-to-username\"></div>\n" +
                                "<div class=\"inline-space\"><input placeholder=\"邮箱\" class=\"reply-to-email\"></div>\n" +
                                "<div class=\"inline-space\"><input placeholder=\"站点\" class=\"reply-to-website\"></div></div><div class=\"text\">\n" +
                                "<textarea placeholder=\"请说点什么呗\" class=\"reply-to-replycontent\"></textarea></div>\n" +
                                "<div class=\"reply-submit\" ><button id=\"ReplySub\" type=\"button\">回复</button></div></div>")
                        }
                        else
                        {
                            $(this).text('回复');
                            $(this).attr('replytoreply', 'true')
                            $(this).parents().parents('.message-rely-children').children('#submitsub').children('.reply-input').remove()
                        }
                        $("#ReplySub").on("click", function () {
                            if ($(".reply-to-username").val()=="")
                            {
                                layer.msg('请输入昵称',{time:0.5*1000})
                            }
                            else if ($(".reply-to-email").val()=="")
                            {
                                layer.msg('请输入邮箱',{time:0.5*1000})
                            }
                            else if($(".reply-to-replycontent").val()=="")
                            {
                                layer.msg('说点什么吧！',{time:0.5*1000})
                            }
                            else if($(".reply-to-email").val()!="" && !checkEmail($(".reply-to-email").val()))
                            {
                                layer.msg('邮箱格式不对!',{time:0.5*1000})
                            }
                            else {
                                $.ajax({
                                    type: "POST",
                                    data: {'commentid':$(".Message").attr("data-id"),
                                        'to_uid':$(".message-rely-children").attr("data-name"),
                                        'replyid': $(".message-rely-children").attr("data-id"), 'username': $('.reply-to-username').val(),
                                        'email': $('.reply-to-email').val(),
                                        'website': $('.reply-to-website').val(),
                                        'ReplyContent': $('.reply-to-replycontent').val(),
                                        "csrfmiddlewaretoken": $("[name='csrfmiddlewaretoken']").val(),
                                        'device':devide,'brower':brower,'system':system
                                    },
                                    url: "../../commenttoreplydata/", //后台处理函数的url
                                    cache: false,
                                    success: function (result) {
                                        if (result.code == "0") {
                                            LoadComment(1, 10);
                                        } else {
                                            alert("数据错误！请联系管理员");
                                        }

                                    },
                                });
                                return false;
                            }
                        })
                    });
                })
                console.log(html)

            }else{
                alert("数据错误！请联系管理员");
            }
        },
        error:function(){
            alert("发生错误");
        }
    });
}

