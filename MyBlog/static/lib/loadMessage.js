
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
    loadData(1,10);
});
$("#pagination").whjPaging({
    //设为true时，ajax里的success函数必须调用setPage方法，否则分页插件显示保持不变
    isResetPage: true,
    css: 'css-4',
    isShowSkip: false,
    isShowRefresh: false,
    isShowPageSizeOpt: false,
    isShowFL: false,
    isShowTotalPage: false,
    isShowTotalSize: false,
    callBack: function(currPage, pageSize) {
        loadData(currPage, 10);
    }
});
//加载初始化数据
function loadData(currPage, pageSize){
    $.ajax({
        type:'GET',
        dataType: "json",
        data: {'page':currPage,'limit':pageSize},
        url:"../../loadmessage/",
        success:function(result){
            if(result.code=="0"){
                var info = result.data;
                // console.log(result)
                var html=""
                for(var i in info){
                    var sublist=info[i].MessageReply
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
                                "<div class=\"reply-user\"><a href=\""+sublist[j].from_userwebsite+"\">"+sublist[j].from_username+"</a></div>\n" +
                                "<div class=\"reply-content\"><span>回复 @"+sublist[j].to_username+"：</span>"+sublist[j].ReplyContent+"</div>\n" +
                                "<div class=\"reply-other\"><span>"+new Date(sublist[j].createdate).Format("YYYY-MM-dd hh:mm:ss")+"</span></div>\n" +
                                "<div class=\"replybtn\"><a class=\"replytoreply\" replytoreply=\"true\">回复</a></div>\n" +
                                "<form id=\"submitsub\" ></form></li>"
                        }
                        MessageReplylist+=str+"</ul>"
                        addstr = MessageReplylist
                    }
                    // console.log(addstr)

                    html+="<div class=\"Message\" data-id=\""+info[i].id+"\" data-name=\""+info[i].uid+"\">"+
                        "<div class=\"headimg\"><img src=\"../../"+info[i].userpic+"\"></div>\n" +
                        "<div class=\"user\"> <p><a href=\""+info[i].website+"\" target=\"_blank\">"+info[i].username+"</a></p></div>\n" +
                        "<div class=\"text\"> <p>"+info[i].MessageContent+"</p></div>\n" +
                        "<div class=\"date\">  <span>"+new Date(info[i].createdate).Format("YYYY-MM-dd hh:mm:ss")+"</span><i class=\"layui-icon layui-icon-location\"> "+info[i].country+" · "+info[i].region+" · "+info[i].city+"</i></div>\n" +
                        "<div class=\"replybtn\" ><a class=\"Mainreplybtn\" replybtn=\"true\">回复</a></div><form id=\"submit\" ></form>"+addstr+"</div>"
                }
                // location.reload()
                $('#messagecon').find('*').remove();
                // console.log($('#messagecon').html())
                $("#messagecon").append(html)
                $(function () {
                    $(".Mainreplybtn").on('click', function () {
                        //胞兄的孩子
                        var contsiblingsub = $(this).parents().siblings('.Message').children('.message-rely-list').children('.message-rely-children').children('#submitsub').children('.reply-input');
                        var contsiblingsubtext = $(this).parents().siblings('.Message').children('.message-rely-list').children('.message-rely-children').children('.replybtn').children('.replytoreply');
                        //自己的孩子
                        var contsub = $(this).parents().parents('.Message').children('.message-rely-list').children('.message-rely-children').children('#submitsub').children('.reply-input');
                        var contsubtext = $(this).parents().parents('.Message').children('.message-rely-list').children('.message-rely-children').children('.replybtn').children('.replytoreply');
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
                                        'messageid': $(this).parents(".reply-submit").parents().parents("#submit").parents(".Message").attr("data-id"), 'to_uid':$(this).parents(".reply-submit").parents().parents("#submit").parents(".Message").attr("data-name"),'username': $('.message-to-username').val(),
                                        'email': $('.message-to-email').val(),
                                        'website': $('.message-to-website').val(),
                                        'ReplyContent': $('.message-to-replycontent').val(),
                                        "csrfmiddlewaretoken": $("[name='csrfmiddlewaretoken']").val(),
                                    },
                                    url: "../../replytomessage/", //后台处理函数的url
                                    cache: false,
                                    success: function (result) {
                                        if(result.code=="0"){
                                            loadData(1,10);
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
                    $(".replytoreply").on('click', function () {
                        var btn = $(this).attr('replytoreply')
                        //自己父亲
                        var contparent = $(this).parents().parents('.message-rely-children').parents().parents('.Message').children('#submit').children('.reply-input');
                        var contparenttext = $(this).parents().parents('.message-rely-children').parents().parents('.Message').children('.replybtn').children('.Mainreplybtn');
                        //自己的兄弟
                        var contsiblings = $(this).parents().siblings('.message-rely-children').children('#submitsub').children('.reply-input');
                        var contsiblingstext = $(this).parents().siblings('.message-rely-children').children('.replybtn').children('.replytoreply');
                        //自己表堂
                        var contparentsiblings = $(this).parents().parents('.message-rely-children').parents().siblings('.Message').children('#submit').children('.reply-input');
                        var contparentsiblingstext = $(this).parents().parents('.message-rely-children').parents().siblings('.Message').children('.replybtn').children('.Mainreplybtn');
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
                                    data: {'messageid':$(".Message").attr("data-id"),
                                        'to_uid':$(".message-rely-children").attr("data-name"),
                                        'replyid': $(".message-rely-children").attr("data-id"), 'username': $('.reply-to-username').val(),
                                        'email': $('.reply-to-email').val(),
                                        'website': $('.reply-to-website').val(),
                                        'ReplyContent': $('.reply-to-replycontent').val(),
                                        "csrfmiddlewaretoken": $("[name='csrfmiddlewaretoken']").val(),
                                    },
                                    url: "../../replytoreply/", //后台处理函数的url
                                    cache: false,
                                    success: function (result) {
                                        if (result.code == "0") {
                                            loadData(1, 10);
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
                // console.log(html)
                $("#pagination").whjPaging(
                    "setPage",
                    {currPage: result.currPage, totalPage: result.totalPage, totalSize: result.totalSize}
                );
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
                        loadData(1,10);
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