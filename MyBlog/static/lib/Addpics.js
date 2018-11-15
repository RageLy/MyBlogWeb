layui.use(['form','layer','layedit','laydate','upload'],function(){
    var form = layui.form
    layer = parent.layer === undefined ? layui.layer : top.layer,
        laypage = layui.laypage,
        upload = layui.upload,
        layedit = layui.layedit,
        laydate = layui.laydate,
        $ = layui.jquery;

    //用于同步编辑器内容到textarea
    // layedit.sync(editIndex);

    //上传缩略图
    upload.render({
        elem: '.thumbBox',
        url: '../upload_ajax/',
        method : "post",
        data:{'csrfmiddlewaretoken':$("[name='csrfmiddlewaretoken']").val(),'imgTitle':$('#imgTitle').val()},
        // before: function(obj) {
        //     //预读本地文件示例，不支持ie8
        //     obj.preview(function (index, file, result) {
        //         $('#test-upload-normal-img').attr('src', result); //图片链接（base64）
        //     });
        // },
        done: function(res, index, upload){
            console.log(res.imgurl)
            // var num = parseInt(4*Math.random());  //生成0-4的随机数，随机显示一个头像信息
            $('.thumbImg').attr('src',res.imgurl);
            // $('.thumbBox').css("background","#fff");
        }
    });

    //格式化时间
    function filterTime(val){
        if(val < 10){
            return "0" + val;
        }else{
            return val;
        }
    }
    //定时发布
    var time = new Date();
    var submitTime = time.getFullYear()+'-'+filterTime(time.getMonth()+1)+'-'+filterTime(time.getDate())+' '+filterTime(time.getHours())+':'+filterTime(time.getMinutes())+':'+filterTime(time.getSeconds());
    laydate.render({
        elem: '#release',
        type: 'datetime',
        trigger : "click",
        done : function(value, date, endDate){
            submitTime = value;
        }
    });
    form.on("radio(release)",function(data){
        if(data.elem.title == "定时发布"){
            $(".releaseDate").removeClass("layui-hide");
            $(".releaseDate #release").attr("lay-verify","required");
        }else{
            $(".releaseDate").addClass("layui-hide");
            $(".releaseDate #release").removeAttr("lay-verify");
            submitTime = time.getFullYear()+'-'+(time.getMonth()+1)+'-'+time.getDate()+' '+time.getHours()+':'+time.getMinutes()+':'+time.getSeconds();
        }
    });

    form.verify({
        newsName : function(val){
            if(val == ''){
                return "文章标题不能为空";
            }
        },
        content : function(val){
            if(val == ''){
                return "文章内容不能为空";
            }
        }
    })
    form.on("submit(addNews)",function(data){
        console.log(data)
        var method=''
        if($(".blogid").val()!='')
            method='update'
        else
        {
            method='add'
        }
        // console.log(data)
        //截取文章内容中的一部分文字放入文章摘要
        // var abstract = layedit.getText(editIndex).substring(0,50);
        //弹出loading
        var index = top.layer.msg('数据提交中，请稍候',{icon: 16,time:false,shade:0.8});
        // 实际使用时的提交信息
        $.post("../editblog/",{
            id:data.field['id'],
            title : $(".title").val(),  //文章标题
            abstract : $(".abstract").val(),  //文章摘要
            blogcontent : tinymce.get('editor1').getContent(),  //文章内容
            imgTitle : $(".thumbImg").attr("src"),  //缩略图
            classify : '1',    //文章分类
            newsStatus : $('.newsStatus select').val(),    //发布状态
            newsTime : submitTime,    //发布时间
            isTop : data.field.isTop == "on" ? "checked" : "",    //是否置顶
            isorg : data.field.isorg == "on" ? "checked" : "",    //是否置顶
            csrfmiddlewaretoken:$("[name='csrfmiddlewaretoken']").val(),
            method:method
        },function(res){
            top.layer.close(index);
            top.layer.msg(res.message);
            layer.closeAll("iframe");
            //刷新父页面
            parent.location.reload();
        })
        return false;
    })

    //预览
    form.on("submit(look)",function(){
        layer.alert("此功能需要前台展示，实际开发中传入对应的必要参数进行文章内容页面访问");
        return false;
    })

    //创建一个编辑器
    // var editIndex = layedit.build('editor1',{
    //     height : 535,
    //     uploadImage : {
    //         url : "../../json/newsImg.json"
    //     }
    // });

})