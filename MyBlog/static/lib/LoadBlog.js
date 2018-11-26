var scripts = document.getElementsByTagName('script');
var type = scripts[scripts.length - 1].getAttribute('data-id').split('&')[0]
var method=scripts[scripts.length - 1].getAttribute('data-id').split('&')[1]
//日期时间原型增加格式化方法

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
layui.use('flow', function(){
    var flow = layui.flow;
    flow.load({
        elem: '#flow' //指定列表容器
        ,scrollElem: '#flow' //滚动条所在元素，一般不用填，此处只是演示需要。
        ,done: function(page, next){ //到达临界点（默认滚动触发），触发下一页
            //以jQuery的Ajax请求为例，请求下一页数据（注意：page是从2开始返回）
            setTimeout(function() {
                var lis = [];
                $.get('../loadblog?'+type+'&'+method+'&page=' + page + '&limit=2',
                    function(res) {
                        console.info(res);
                        //假设你的列表返回在data集合中
                        layui.each(res.data, function(index, item) {
                            var blogcategorylist=[]
                            var blogcategory=layui.each(item.blogCategory,function(index,subitem)
                            {
                                var itemstr='<a href="../category/'+subitem.id +'">'+subitem.Name+'</a>'
                                blogcategorylist.push(itemstr)
                            });
                            var blog_blogtypelist=[]
                            var blog_blogtype=layui.each(item.blogType,function(index,subitem)
                            {
                                var itemstr='<a href="../types/'+subitem.TypeName +'">'+subitem.TypeName+'</a>'
                                blog_blogtypelist.push(itemstr)

                            });
                            console.log(blog_blogtypelist)
                            var str=' <div class="item">\n' +
                                '                        <div class="header">\n' +
                                '                            <div class="title"><a href="../details/'+item.id+'" title="'+item.title+'">'+item.title+'</a></div>\n' +
                                '                            <div class="category">'+blogcategorylist+'</div>\n' +
                                '                        </div>\n' +
                                '                        <div class="img"><img src="'+item.imgTitle+'" alt="'+item.title+'"></div>\n' +
                                '                        <div class="abstract"><a href="../details/"'+item.id+'" title="'+item.title+'">'+item.abstract+'</a></div>\n' +
                                '                        <div class="author">\n' +
                                '                            <span class="f_l t_left top">置顶</span>\n' +
                                '                            <span class="f_l lm">分类：'+blog_blogtypelist+'</span>\n' +
                                '                            <span class="dtime f_l">发布时间：'+new Date(item.createdate).Format("yyyy-MM-dd  hh:mm:ss")+'</span>\n' +
                                '                            <span class="f_r t_right orign">原创</span>\n' +
                                '                            <span class="viewnum f_r ">'+item.hit+'次阅读</span>\n' +
                                '                            <span class="pingl f_r">'+item.commentcount+'条评论</span>\n' +
                                '                        </div>\n' +
                                '                    </div>'
                            lis.push(str);
                            console.log(lis)
                        });
                        next(lis.join(''), page*2 < res.count); //假设总页数为 6
                    });
            }, 500);
        }
    });
});
