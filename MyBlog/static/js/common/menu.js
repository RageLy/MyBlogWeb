
    // 导航菜单的间隔像素
   var menuCell = 5;

    layui.use('element', function(){
        var element = layui.element;
        var $ = layui.jquery;

        $.ajax({
            url:"/MyBlog/admin/menushow/",
            type:"get",
            dataType:"json",
            data:{},
            success:function(data){
                console.log("data: "+data);
                var liStr= "";
                // 遍历生成主菜单
                for( var i = 0; i <data.length; i++){
                    //console.log("--> "+JSON.stringify(data[i]));
                    // 判断是否存在子菜单
                    if(data[i].childMenus!=null&&data[i].childMenus.length>0){
                        console.log("--> "+JSON.stringify(data[i].childMenus));
                        liStr+="<li class=\"layui-nav-item\"><a class=\"\" href=\"javascript:;\" lay-tips=\"\" lay-direction=\"2\"> <i class=\"layui-icon "+data[i].icon+"\"></i>" +
                          "<cite>"+data[i].name+"</cite></a>\n"+
                            "<dl class=\"layui-nav-child\">\n";
                        // 遍历获取子菜单
                        for( var k = 0; k <data[i].childMenus.length; k++){
                            liStr+=getChildMenu(data[i].childMenus[k],0);
                        }
                        liStr+="</dl></li>";
                    }else{
                        liStr+="<li class=\"layui-nav-item\"><a class=\"\" href=\""+data[i].url+"\">"+data[i].name+"</a></li>";
                    }
                };
                console.log(">>>> "+liStr);
                // $("#LAY-system-side-menu").html("<ul class=\"layui-nav layui-nav-tree\" id=\"LAY-system-side-menu\" lay-filter=\"layadmin-system-side-menu\">\n" +liStr+"</ul>");
                $("#LAY-system-side-menu").html(liStr);
                element.init();
            }
        });

    });

    // 递归生成子菜单
    function getChildMenu(subMenu,num) {
        console.log("num: "+num);
        num++;
        var subStr = "";
        if(subMenu.childMenus!=null&&subMenu.childMenus.length>0){
            subStr+="<dd><ul><li class=\"layui-nav-item\" ><a  class=\"\" href=\"javascript:;\">"+subMenu.name+"</a>" +
                "<dl class=\"layui-nav-child\">\n";
            for( var j = 0; j <subMenu.childMenus.length; j++){
                subStr+=getChildMenu(subMenu.childMenus[j],num);
            }
            subStr+="</dl></li></ul></dd>";
        }else{
            subStr+="<dd><a lay-href=\""+subMenu.url+"\">"+subMenu.name+"</a></dd>";
        }
        return subStr;
    }
