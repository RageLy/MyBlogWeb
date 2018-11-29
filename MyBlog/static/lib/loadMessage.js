
Date.prototype.Format = function (formatStr) {
    var str = formatStr;
    var Week = ['日', '一', '二', '三', '四', '五', '六'];

    str = str.replace(/yyyy|YYYY/, this.getFullYear());
    str = str.replace(/yy|YY/, (this.getYear() % 100) > 9 ? (this.getYear() % 100).toString() : '0' + (this.getYear() % 100));
    var month = this.getMonth() + 1;
    str = str.replace(/MM/, month > 9 ? month.toString() : '0' + month);
    str = str.replace(/M/g, month);

    str = str.replace(/w|W/g, Week[this.getDay()]);

    str = str.replace(/dd|DD/, this.getDate() > 9 ? this.getDate().toString() : '0' + this.getDate());
    str = str.replace(/d|D/g, this.getDate());

    str = str.replace(/hh|HH/, this.getHours() > 9 ? this.getHours().toString() : '0' + this.getHours());
    str = str.replace(/h|H/g, this.getHours());
    str = str.replace(/mm/, this.getMinutes() > 9 ? this.getMinutes().toString() : '0' + this.getMinutes());
    str = str.replace(/m/g, this.getMinutes());

    str = str.replace(/ss|SS/, this.getSeconds() > 9 ? this.getSeconds().toString() : '0' + this.getSeconds());
    str = str.replace(/s|S/g, this.getSeconds());
    return str;
}
$(function(){
    initData();
});
//加载初始化数据
function initData(){
    $.ajax({
        type:'GET',
        dataType: "json",
        url:"../../loadmessage/",
        success:function(result){
            if(result.code=="0"){
                var info = result.data;
                // console.log(info)
                var html=""
                for(var i in info){
                    html+=
                        "                    <div class=\"Message\">\n" +
                        "                        <div class=\"headimg\"><img src=\"../../"+info[i].userpic+"\"></div>\n" +
                        "                        <div class=\"user\"> <p>"+info[i].username+"</p></div>\n" +
                        "                        <div class=\"text\"> <p>"+info[i].MessageContent+"</p></div>\n" +
                        "                        <div class=\"date\">  <span>"+new Date(info[i].createdate).Format("YYYY-MM-dd hh:mm:ss")+"</span><i class=\"layui-icon layui-icon-location\"> "+info[i].country+"· "+info[i].region+" · "+info[i].city+"</i></div>\n" +
                        "                    </div>\n"
                }
                $("#messagecon").append(html)
                // console.log(html)
            }else{
                alert("数据错误！请联系管理员");
            }
        },
        error:function(){
            alert("发生错误");
        }
    });
}
function checkEmail(myemail) {
    var myReg = /^[a-zA-Z0-9_-]+@([a-zA-Z0-9]+\.)+(com|cn|net|org)$/;
    if (myReg.test(myemail)) {
        return true;
    } else {
        return false;
    }
}
var timeagoInstance = timeago();// 实例
timeagoInstance.render(document.querySelectorAll('.time'),'zh_CN');
layui.config({
    base: '../../static/' //静态资源所在路径
}).use(['layer'], function(){
    var $ = layui.$
        ,layer = layui.layer
    $('#submit').on("click",function(){

        if ($(".username").val()=="")
        {
            layer.msg('请输入昵称',{time:0.5*1000})
        }
        else if ($(".email").val()=="")
        {
            layer.msg('请输入邮箱',{time:0.5*1000})
        }
        else if($("#MessageCon").val()=="")
        {
            layer.msg('说点什么吧！',{time:0.5*1000})
        }
        else if($(".email").val()!="" && !checkEmail($(".email").val()))
        {
            layer.msg('邮箱格式不对!',{time:0.5*1000})
        }
        else
        {
            $.ajax({
                type:"POST",
                data: {'MessageCon':$("#MessageCon").val(),"csrfmiddlewaretoken":$("[name='csrfmiddlewaretoken']").val(),'username':$(".username").val(),'email':$(".email").val(),'website':$(".website").val()
                },
                url: "../../submitmessage/", //后台处理函数的url
                cache: false,
                async : false,
                success: function(result) {
                    if(result.code=="0"){
                        var info = result.data;
                        // console.log(info)
                        var html=""

                            html+=" <div class=\"layui-card \">\n" +
                                "                    <div class=\"layui-card-body Message\">\n" +
                                "                        <div class=\"headimg\"><img src=\"../../"+info.userpic+"\"></div>\n" +
                                "                        <div class=\"user\"> <p>"+info.username+"</p></div>\n" +
                                "                        <div class=\"text\"> <p>"+info.MessageContent+"</p></div>\n" +
                                "                        <div class=\"date\">  <span class=\"time\" datetime=\""+info.createdate+"\"></span><i class=\"layui-icon layui-icon-location\"> "+info.country+"· "+info.region+" · "+info.city+"</i></div>\n" +
                                "                    </div>\n" +
                                "                </div>"
                        $("#messagecon").append(html)
                        // console.log(html)
                    }
                    else{
                        alert("数据错误！请联系管理员");
                    }

                },
                error:function(){
                    alert("发生错误");
                }
            });
        }
    });
});