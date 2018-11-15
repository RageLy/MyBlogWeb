layui.use(['form','layer','laydate','table','laytpl'],function(){
    var form = layui.form,
        layer = parent.layer === undefined ? layui.layer : top.layer,
        $ = layui.jquery,
        laydate = layui.laydate,
        laytpl = layui.laytpl,
        table = layui.table;

    //新闻列表
    // var tableIns = table.render({
    //     elem: '#test-table-toolbar',
    //     url : '../Blogsdata/'
    //     ,title: '用户表'
    //     ,height: 'full-200'
    //     ,page: true //开启分页
    //     ,toolbar:  '#test-table-toolbar-toolbarDemo'//开启工具栏，此处显示默认图标，可以自定义模板，详见文档
    //     ,totalRow: true //开启合计行
    //     ,id : "testReload"
    //     ,cols: [[ //表头
    //         {type: 'checkbox', fixed: 'left'}
    //         ,{field: 'id', title: 'ID', width:80, sort: true, fixed: 'left', totalRowText: '合计：'}
    //         ,{field: 'title', title: '标题', width:120}
    //         ,{field: 'abstract', title: '摘要', width:120}
    //         ,{field: 'type', title: '类型', width: 100, sort: true, totalRow: true}
    //         ,{field: 'createdate', title: '创建日期', width:120, sort: true}
    //         ,{field: 'modifydate', title: '修改日期', width:120, sort: true}
    //         ,{field: 'imgTitle', title: '缩略图', width:120, sort: true}
    //         // {#,{field: 'blogcontent', title: '内容',  sort: true, totalRow: true}#}
    //         ,{field: 'hit', title: '点击率', width:100}
    //
    //         ,{field: 'isTop', title: '是否置顶', width:100,align:'center', templet:function(d){
    //                 return '<input type="checkbox" name="isTop" lay-filter="isTop" lay-skin="switch" lay-text="是|否" '+d.isTop+'>'
    //             }}
    //         ,{field: 'isorg', title: '来源',width:120, align:'center',templet:function(d){
    //                 return '<input type="checkbox" name="isorg" lay-filter="isorg" lay-skin="switch" lay-text="原创|转载" '+d.isorg+'>'
    //             }}
    //         ,{fixed: 'right', title:'操作', width:200,toolbar: '#test-table-toolbar-barDemo'}
    //     ]],
    // });

    //是否置顶
    form.on('switch(isTop)', function(data){
        var index = layer.msg('修改中，请稍候',{icon: 16,time:false,shade:0.8});
        console.log(data)
               $.ajax({
                        type:"GET",
                        data: {'id':data['id'],'isTop':data['isTop'] },
                        url: "../Top", //后台处理函数的url
                        cache: false,
                        success: function(result){
                            // layer.msg(result.message,{time:0.5*1000})
                            layer.close(index);
                            location.reload()
                        },
                        error: function(){
                            layer.msg('传输格式有误，请检查')
                            layer.close(index);
                        }
                    });
                    return false;

        // setTimeout(function(){
        //     layer.close(index);
        //     if(data.elem.checked){
        //         layer.msg("置顶成功！");
        //     }else{
        //         layer.msg("取消置顶成功！");
        //     }
        // },500);
    })

    //搜索【此功能需要后台配合，所以暂时没有动态效果演示】
    $(".search_btn").on("click",function(){
        if($(".searchVal").val() != ''){
            table.reload("newsListTable",{
                page: {
                    curr: 1 //重新从第 1 页开始
                },
                where: {
                    key: $(".searchVal").val()  //搜索的关键字
                }
            })
        }else{
            layer.msg("请输入搜索的内容");
        }
    });

    //添加文章
    function addNews(edit){
        var index = layui.layer.open({
            title : "添加文章",
            type : 2,
            content : "../editblog",
            success : function(layero, index){
                var body = layui.layer.getChildFrame('body', index);
                if(edit){
                    body.find(".blogid").val(edit.id);
                    body.find(".title").val(edit.title);
                    body.find(".abstract").val(edit.abstract);
                    body.find(".thumbImg").attr("src",edit.imgTitle);
                    body.find(".editor2").val(edit.blogcontent);

                    body.find(".newsStatus select").val(edit.newsStatus);
                    body.find(".openness input[name='openness'][title='"+edit.newsLook+"']").prop("checked","checked");
                    body.find(".isTop input[name='isTop']").prop("checked",edit.isTop);
                    body.find(".isorg input[name='isorg']").prop("checked",edit.isorg);
                    form.render();
                }
                setTimeout(function(){
                    layui.layer.tips('点击此处返回文章列表', '.layui-layer-setwin .layui-layer-close', {
                        tips: 3
                    });
                },500)
            }
        })
        layui.layer.full(index);
        //改变窗口大小时，重置弹窗的宽高，防止超出可视区域（如F12调出debug的操作）
        $(window).on("resize",function(){
            layui.layer.full(index);
        })
    }
    $(".addNews_btn").click(function(){
        addNews();
    })

    //批量删除
    $(".delAll_btn").click(function(){
        var checkStatus = table.checkStatus('testReload'),
            data = checkStatus.data,
            newsId = [];
        if(data.length > 0) {
            for (var i in data) {
                newsId.push(data[i].id);
            }
            layer.confirm('确定删除选中的文章？', {icon: 3, title: '提示信息'}, function (index) {
                $.get("../deleteblog/",{
                    idlist : newsId,  //将需要删除的newsId作为参数传入
                    type:'mult'
                },function(data){
                tableIns.reload();
                layer.close(index);
                })
            })
        }else{
            layer.msg("请选择需要删除的文章");
        }
    })

    //列表操作
    table.on('tool(test-table-toolbar)', function(obj){
        var layEvent = obj.event,
            data = obj.data;

        if(layEvent === 'edit'){ //编辑
            addNews(data);
        } else if(layEvent === 'del'){ //删除
            layer.confirm('确定删除此文章？',{icon:3, title:'提示信息'},function(index){
                 $.get("../deleteblog/",{
                     id : data.id,  //将需要删除的newsId作为参数传入
                     type:'single'
                 },function(data){
                tableIns.reload();
                layer.close(index);
                 })
            });
        } else if(layEvent === 'look'){ //预览
            layer.alert("此功能需要前台展示，实际开发中传入对应的必要参数进行文章内容页面访问")
        }
    });

})