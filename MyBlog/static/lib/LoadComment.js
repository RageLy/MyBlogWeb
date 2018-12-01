var scripts = document.getElementsByTagName('script');
var blog_id = scripts[scripts.length - 1].getAttribute('data-id').split('&')[0]
$(function(){
    LoadComment();
});
//加载初始化数据
function LoadComment(){
    $.ajax({
        type:'GET',
        dataType: "json",
        url:"../../loadcommentdata/",
        data:{
            'blogid':blog_id,
        },
        success:function(result){
            alert("加载数据");
            if(result.code=="0"){
                console.log(result);
                alert(res.msg);
                var info = result.data;
                $.each(result.data, function (i, item) {
                    var vfields = item;  //这里不定义也行，在下面的调用中直接使用item，请忽略我不规范的缩进
                    var str=" <div class=\"media-body\">\n" +
                        "                                    <div class=\"media-left\">\n" +
                        "                                        <img src=\"../"+ vfields.userpic+" \">\n" +
                        "                                    </div>\n" +
                        "                                    <div class=\"pad-btm\">\n" +
                        "                                        <p class=\"fontColor\"><a>"+ vfields.username +"</a></p>\n" +
                        "                                        <div class=\"min-font\">\n" +
                        "                                          <span class=\"layui-breadcrumb\" lay-separator=\"-\">\n" +
                        "                                            <a class=\"layui-icon layui-icon-cellphone\"></a>\n" +
                        "                                            <a>"+ vfields.device +"</a>\n" +
                        "                                            <a class=\"time\" datetime=\""+ vfields.createdate+"\"></a>\n" +
                        "                                          </span>\n" +
                        "                                        </div>\n" +
                        "                                        <p class=\"message-text\">"+ vfields.commentContent +"</p>\n" +
                        "                                    </div>\n" +
                        "                                    <div class=\"reply-text\">\n" +
                        "                                    </div>\n" +
                        "                                    <div class=\"reply-comment\">\n" +
                        "                                        <div class=\"like\">\n" +
                        "                                            <button class=\"layui-btn\" id=\"like"+ vfields.id +"\"><i class=\"layui-icon\">&#xe6c6;</i></button>\n" +
                        "                                            <button class=\"layui-btn\"><p class=\"likecon"+ vfields.id +"\">"+ vfields.likeNum +"</p></button>\n" +
                        "                                        </div>\n" +
                        "                                        <div class=\"reply-btn\">\n" +
                        "                                            <button class=\"layui-btn\"><i class=\"layui-icon\">&#xe611;</i></button>\n" +
                        "                                            <button class=\"layui-btn\" id='replylabel"+ vfields.id +"'>回复</button>\n" +
                        "                                        </div>\n" +
                        "                                    </div>\n" +
                        "                                    <form  id=\"formyz\">\n" +
                        "                                        {% csrf_token %}\n" +
                        "                                        <div class=\"reply-to-text\" id=\"reply"+ vfields.id +"\" style=\"display: none\">\n" +
                        "                                            <div class=\"text\">\n" +
                        "                                                <textarea class=\"reply-box-textarea\" id=\"replyContent"+ vfields.id +"\"></textarea>\n" +
                        "                                            </div>\n" +
                        "                                            <div class=\"replybtn\"><button class=\"layui-btn\" id=\"replybtn"+ vfields.id +"\" type=\"button\" >回复</button></div>\n" +
                        "                                        </div>\n" +
                        "                                    </form>\n" +
                        "                                </div>"
                    var javascriptexec=$(str);
                    $(".message-content").append(javascriptexec);
                    $(javascriptexec).find("[id^=like]").click(function(){
                        replyid=$(this).attr("id").split("like")[1]
                        $.ajax({
                            type:"POST",
                            data: {'replyid':replyid,'csrfmiddlewaretoken':$("[name='csrfmiddlewaretoken']").val()},
                            url: "{% url 'MyBlog:like' %}", //后台处理函数的url
                            cache: false,
                            async : false,
                            success: function(result){
                                console.log(result.message)
                                if(result.message="0")
                                {
                                    console.log(result.message)
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
                    console.log(javascriptexec)
                });
            }else{
                alert("数据错误！请联系管理员");
            }
        },
        error:function(){
            alert("发生错误");
        }
    });
}