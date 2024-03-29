layui.use(['form','layer','jquery'],function(){
    var form = layui.form,
        layer = parent.layer === undefined ? layui.layer : top.layer
        $ = layui.jquery;
    //表单输入效果
    $(".loginBody .input-item").click(function(e){
        e.stopPropagation();
        $(this).addClass("layui-input-focus").find(".layui-input").focus();
    })

     $("#imgCode").click(function(e){
        e.stopPropagation();
        $(this).addClass("layui-input-focus").find(".layui-input").focus();
    })

    $(".loginBody .layui-form-item .layui-input").focus(function(){
        $(this).parent().addClass("layui-input-focus");
    })
    $(".loginBody .layui-form-item .layui-input").blur(function(){
        $(this).parent().removeClass("layui-input-focus");
        if($(this).val() != ''){
            $(this).parent().addClass("layui-input-active");
        }else{
            $(this).parent().removeClass("layui-input-active");
        }
    })

    $("#imgVercode").focus(function(){
        $(this).parent().parent().parent().addClass("layui-input-focus");
    })
    $("#imgVercode").blur(function(){
        $(this).parent().parent().parent().removeClass("layui-input-focus");
        if($(this).val() != ''){
            $(this).parent().parent().parent().addClass("layui-input-active");
        }else{
            $(this).parent().parent().parent().removeClass("layui-input-active");
        }
    })
})
