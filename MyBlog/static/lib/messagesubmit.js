layui.define(['jquery'],function(exports) {
            var menu = {
                replybtn: $("#replybtn").on('click', function () {
                    var btn = $(this).attr('replybtn')
                    var text = $(this).children('a');
                    var cont = $(this).parents('.Message').siblings('#submit');
                    if (btn) {
                        $(text).text('取消回复');
                        $(this).attr('replybtn', '');
                        $(cont).css('display', 'none')
                    } else {
                        $(text).text('回复');
                        $(this).attr('replybtn', 'true')
                        $(cont).css('display', 'block')
                    }
                })
            }
            exports('messagesubmit',menu)
        }
    );
