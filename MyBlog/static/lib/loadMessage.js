
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
    /*瀑布流开始*/
    var container = $('.waterfall ul');
    var loading=$('#imloading');
    // 初始化loading状态
    loading.data("on",true);
    /*判断瀑布流最大布局宽度，最大为1280*/
    function tores(){
        var tmpWid=$(window).width();
        if(tmpWid>1240){
            tmpWid=1240;
        }else{
            var column=Math.floor(tmpWid/305);
            tmpWid=column*305;
            console.log(tmpWid)
        }
        $('.waterfall').width(tmpWid);
        console.log(tmpWid)
    }
    tores();
    $(window).resize(function(){
        tores();
    });
    container.imagesLoaded(function(){
        container.masonry({
            columnWidth: 309.625,
            itemSelector : '.item',
            isFitWidth: true,//是否根据浏览器窗口大小自动适应默认false
            isAnimated: true,//是否采用jquery动画进行重拍版
            isRTL:false,//设置布局的排列方式，即：定位砖块时，是从左向右排列还是从右向左排列。默认值为false，即从左向右
            isResizable: true,//是否自动布局默认true
            animationOptions: {
                duration: 800,
                easing: 'easeInCubic',//如果你引用了jQeasing这里就可以添加对应的动态动画效果，如果没引用删除这行，默认是匀速变化
                queue: false//是否队列，从一点填充瀑布流
            }
        });
    });
    /*模拟从后台获取到的数据*/
    var dataLoading = false;
    var canColorChange = true;
    // /*本应该通过ajax从后台请求过来类似sqljson的数据然后，便利，进行填充，这里我们用sqlJson来模拟一下数据*/
    $(window).scroll(function(){
        if(!loading.data("on")) return;
        if(dataLoading) return;
        // 计算所有瀑布流块中距离顶部最大，进而在滚动条滚动时，来进行ajax请求，方法很多这里只列举最简单一种，最易理解一种
        var itemNum=$('#waterfall').find('.item').length;
        var itemArr=[];
        itemArr[0]=$('#waterfall').find('.item').eq(itemNum-1).offset().top+$('#waterfall').find('.item').eq(itemNum-1)[0].offsetHeight;
        itemArr[1]=$('#waterfall').find('.item').eq(itemNum-2).offset().top+$('#waterfall').find('.item').eq(itemNum-1)[0].offsetHeight;
        itemArr[2]=$('#waterfall').find('.item').eq(itemNum-3).offset().top+$('#waterfall').find('.item').eq(itemNum-1)[0].offsetHeight;
        var maxTop=Math.max.apply(null,itemArr);
        if(maxTop<$(window).height()+$(document).scrollTop()){
            //加载更多数据
            var sqlJson='';
            dataLoading = true;
            $.get("../loadmessage/",function(data,status){
                // console.log(status)
                if(status == "success"){
                    sqlJson = (data.data.list);
                    // console.log(sqlJson)
                    if (itemNum=>10)
                    {itemNumfact=data.itemNum+10}

                    console.log(data.itemNum)
                    console.log(itemNumfact)
                    loading.data("on",false).fadeIn(800);
                    addFlow(sqlJson,itemNumfact);
                }else{
                    alert('出错了！');
                }
                dataLoading = false;
            });
        }
        function  addFlow(sqlJson,itemNumfact){
            console.log(itemNumfact)
            /*这里会根据后台返回的数据来判断是否你进行分页或者数据加载完毕这里假设大于30就不在加载数据*/
            if(itemNum == itemNumfact){
                loading.text('就有这么多了！');
            }else{
                var html="";

                for(var i in sqlJson){
                    html+="<li class='item'><div class='userinfo'>\n" +
                        "<div class='headpic'> <img src='../../static/common/imgs/userhead.png'></div>\n" +
                        "<h2 class='li-title' title='"+sqlJson[i].username +"'>"+sqlJson[i].username +"</h2>\n" +
                        "<div class='qianm'><span class='sp3'>"+jQuery.timeago(sqlJson[i].createdate)+"</span></div></div>\n" +
                        "<div class='con'><a class='description'>"+sqlJson[i].MessageContent +"</a></div>\n" +
                        "<div class='otherinfo'><i class='layui-icon layui-icon-location'> " +sqlJson[i].country +" · "+sqlJson[i].region +" · "+sqlJson[i].city +"</i></div></li>"

                }
                console.log(html)
                /*模拟ajax请求数据时延时800毫秒*/
                var time=setTimeout(function(){
                    $(html).find('img').each(function(index){
                        loadImage($(this).attr('src'));
                    })
                    var $newElems = $(html).css({ opacity: 0}).appendTo(container);
                    $newElems.imagesLoaded(function(){
                        $newElems.animate({ opacity: 1},800);
                        container.masonry( 'appended', $newElems,true);
                        loading.data("on",true).fadeOut();
                        clearTimeout(time);
                        // {#deleteShow();#}
                    });
                },800)
            }
        }
    });
    function loadImage(url) {
        var img = new Image();
        //创建一个Image对象，实现图片的预下载
        img.src = url;
        if (img.complete) {
            return img.src;
        }
        img.onload = function () {
            return img.src;
        };
    };
    loadImage('../../static/waterfall/images/one.jpeg',test());
    /*item hover效果*/
    var rbgB=['#71D3F5','#F0C179','#F28386','#8BD38B'];
    $('#waterfall').on('mouseover','.item',function(){
        var random=Math.floor(Math.random() * 4);
        $(this).stop(true).animate({'backgroundColor':rbgB[random]},1000);
    });
    $('#waterfall').on('mouseout','.item',function(){
        $(this).stop(true).animate({'backgroundColor':'#fff'},1000);
    });
})