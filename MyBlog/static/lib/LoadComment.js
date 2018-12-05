var scripts = document.getElementsByTagName('script');
var blog_id = scripts[scripts.length - 1].getAttribute('data-id')
console.log(blog_id)
$('#share-2').share({sites: ['qzone', 'qq', 'weibo','wechat','douban']});
$("#urlinfo").html(window.location.href)
$("#urlinfo").attr('href',window.location.href)
var devide=''
var brower=''
var system=''
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
    console.log('继续加载')
    $.ajax({
        type:'GET',
        dataType: "json",
        url:"../../loadcommentdata/",
        data:{
            'blogid':blog_id,'page':currPage,'limit':pageSize
        },
        success:function(result){
            if(result.code=="0"){
                // {#console.log(result);#}
                // {#alert(res.msg);#}
                var info = result.data;
                var str = ""
                $.each(result.data, function (i, item) {
                    var replystr = ""
                    var topstr = "<div class=\"reply-text\"><div class=\"reply-container\">\n"
                    var bottomstr = "</div></div>"
                    $.each(item.replylist, function (i, item) {
                        // {#console.log('liebiao', item.replylist)#}
                        replystr +=
                            "<div class=\"box-reply\">\n" +
                            "<div class=\"title\">\n" +
                            "<img src=\"../"+item.userpic+"\">\n" +
                            "<p>用户" + item.id + "</p></div>\n" +
                            "<div class=\"brower\">"+item.country+" ▪ "+item.region+" ▪ "+item.city+" - "+item.system+" - "+item.brower+"</div>\n" +
                            "<div class=\"replyContent\"><p>" + item.replyContent + "</p></div><div class=\"other\">\n" +
                            "<div class=\"like\">\n" +
                            "<button class=\"layui-btn\" id=\"replylike" + item.id + "\"><i class=\"layui-icon\">&#xe6c6;</i></button>\n" +
                            "<span class=\"layui-btn\"><p class=\"replylikecon" + item.id + "\">" + item.likeNum + "</p></span></div>\n" +
                            "<div class=\"reply-date\">\n" +
                            "<a class=\"replytime\" datetime=\"" + item.createdate + "\"></a></div></div></div>"
                    });
                    if (item.replylist.length > 0) {
                        replystr = topstr + replystr + bottomstr
                    }

                    var vfields = item;  //这里不定义也行，在下面的调用中直接使用item，请忽略我不规范的缩进

                    str += " <div class=\"media-body\">\n" +
                        "                                    <div class=\"media-left\">\n" +
                        "                                        <img src=\"../" + vfields.userpic + " \">\n" +
                        "                                    </div>\n" +
                        "                                    <div class=\"pad-btm\">\n" +
                        "                                        <p class=\"fontColor\"><a>" + vfields.username + "</a></p>\n" +
                        "                                        <div class=\"min-font\">\n" +
                        "                                          <span >\n" +
                        "                                            <a class=\"layui-icon layui-icon-cellphone\"> - </a>\n" +
                        "                                            <a>" + vfields.device + " - </a>\n" +
                        "                                            <a class=\"time\" datetime=\"" + vfields.createdate + "\"> </a>\n" +
                        "                                         <a class=\"brower\"> - "+vfields.country+" ▪ "+vfields.region+" ▪ "+vfields.city+" - "+vfields.system+" - "+vfields.brower+"</a>\n" +
                        "                                          </span>\n" +
                        "                                        </div>\n" +
                        "                                        <p class=\"message-text\">" + vfields.commentContent + "</p>\n" +
                        "                                    </div>\n" + replystr +

                        "                                    <div class=\"reply-text\">\n" +
                        "                                    </div>\n" +
                        "                                    <div class=\"reply-comment\">\n" +
                        "                                        <div class=\"like\">\n" +
                        "                                            <button class=\"layui-btn\" id=\"like" + vfields.id + "\"><i class=\"layui-icon\">&#xe6c6;</i></button>\n" +
                        "                                            <button class=\"layui-btn\"><p class=\"likecon" + vfields.id + "\">" + vfields.likeNum + "</p></button>\n" +
                        "                                        </div>\n" +
                        "                                        <div class=\"reply-btn\">\n" +
                        "                                            <button class=\"layui-btn\"><i class=\"layui-icon\">&#xe611;</i></button>\n" +
                        "                                            <button class=\"layui-btn\" id='replylabel" + vfields.id + "'>回复</button>\n" +
                        "                                        </div>\n" +
                        "                                    </div>\n" +
                        "                                    <form  id=\"formyz\">\n" +
                        // {#"                                        {% csrf_token %}\n" +#}
                        "                                        <div class=\"reply-to-text\" id=\"reply" + vfields.id + "\" style=\"display: none\">\n" +
                        "                                            <div class=\"text\">\n" +
                        "                                                <textarea class=\"reply-box-textarea\" id=\"replyContent" + vfields.id + "\"></textarea>\n" +
                        "                                            </div>\n" +
                        "                                            <div class=\"replybtn\"><button class=\"layui-btn\" id=\"replybtn" + vfields.id + "\" type=\"button\" >回复</button></div>\n" +
                        "                                        </div>\n" +
                        "                                    </form>\n" +
                        "                                </div>"
                });

                if(str.length>0)
                {
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
                    $("#messagetext").find('*').remove();
                    var javascriptexec=$(str);
                    $("#messagetext").append(javascriptexec);
                    $(javascriptexec).find("[id^=like]").click(function(){
                        commentid=$(this).attr("id").split("like")[1]
                        $.ajax({
                            type:"POST",
                            data: {'commentid':commentid,'csrfmiddlewaretoken':$("[name='csrfmiddlewaretoken']").val()},
                            url: "../../like/", //后台处理函数的url
                            cache: false,
                            async : false,
                            success: function(result){
                                // {#console.log(result.message)#}
                                if(result.message="0")
                                {
                                    // {#console.log(result.message)#}
                                    layer.msg('点赞成功',{time:0.5*1000})
                                    var likecon='likecon'+commentid
                                    $("."+likecon).html(result.like)
                                    console.log(result.like,$("."+likecon).html())
                                }
                            },
                            error: function(){
                                layer.msg('传输格式有误，请检查')
                            }
                        });
                    })
                    $(javascriptexec).find('[id^=replylabel]').click(function ()
                    {

                        id=$(this).attr("id").split("replylabel")[1]

                        var replyid='reply'+id
                        var replylabelid='replylabel'+id
                        replysbid=id
                        replyContentid='replyContent'+id
                        if($('#'+replyid).css("display")=='block')
                        {
                            $('#'+replyid).css("display", "none")
                            $(this).text("回复")
                        }
                        else
                        {
                            $("#formyz div[id^='reply']").not("#"+replyid).css("display", "none")
                            $("#reply-comment button[id^='replylabel']").not("#"+replylabelid).text("回复")

                            $('#'+replyid).css("display","block")
                            $(this).text("收起")
                        }
                    })
                    // {#回复评论#}
                    var replysbid=''
                    var replyContentid=''
                    $(javascriptexec).find("[id^=replybtn]").click(function(){
                        var replyid='reply'+replysbid
                        var replylabelid='replylabel'+replysbid
                        if($("#"+replyContentid).val()=="")
                        {
                            layer.msg('回复不能为空!',{time:0.5*1000})
                        }
                        else
                        {
                            $.ajax({
                                type:"POST",
                                data: {'userid':"1",'commentid':replysbid,'blogid':blog_id,'csrfmiddlewaretoken':$("[name='csrfmiddlewaretoken']").val(),'replyContent':$("#"+replyContentid).val(),'device':devide,'brower':brower,'system':system},
                                url: "../../replydata/", //后台处理函数的url
                                cache: false,
                                async : false,
                                success: function(result){
                                    if(result.message="0")
                                    {
                                        console.log("回复成功")
                                        layer.msg('回复成功',{time:0.5*1000})
                                        // {#location.reload()#}
                                        LoadComment(1,10)
                                        console.log(replyid)
                                        $('#'+replyid).css("display", "none")
                                        $('#'+replylabelid).text("回复")
                                    }
                                },
                                error: function(){
                                    // {#$('#test1').html('传输格式有错误')#}
                                    // {#layer.confirm(result)#}
                                    layer.msg('传输格式有误，请检查')
                                }
                            });
                        }
                    })
                    $(javascriptexec).find("[id^=replylike]").click(function(){
                        replyid=$(this).attr("id").split("replylike")[1]
                        $.ajax({
                            type:"POST",
                            data: {'replyid':replyid,'csrfmiddlewaretoken':$("[name='csrfmiddlewaretoken']").val()},
                            url: "../../replylike/", //后台处理函数的url
                            cache: false,
                            async : false,
                            success: function(result){
                                console.log(result.message)
                                if(result.message="0")
                                {
                                    console.log(result.message)
                                    layer.msg('点赞成功',{time:0.5*1000})
                                    var replylikecon='replylikecon'+replyid
                                    $("."+replylikecon).html(result.replylike)
                                    console.log(result.replylike,$("."+replylikecon).html())

                                }
                            },
                            error: function(){
                                layer.msg('传输格式有误，请检查')
                            }
                        });
                    })
                    var timeagoInstance = timeago();// 实例
                    timeagoInstance.render(document.querySelectorAll('.time'),'zh_CN');
                    timeagoInstance.render(document.querySelectorAll('.replytime'),'zh_CN');

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

                    console.log(javascriptexec)

                    $("#blogpagination").whjPaging(
                        "setPage",
                        {currPage: result.currPage, totalPage: result.totalPage, totalSize: result.totalSize}
                    );
                }
            }else{
                alert("数据错误！请联系管理员");
            }

        },
        error:function(){
            alert("发生错误");
        }
    });
}
