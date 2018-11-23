$(function() {
    $(document).click(function() {
        $(".user_login_box").hide();
        $(".user_login").removeClass("btn_active");
    })
    $(".user_login,.user_login_box").click(function(event) {
        event.stopPropagation();
    })
    $(".user_login").each(function() {
        $(this).click(function() {
            $(this).toggleClass("btn_active");
            $(this).next().toggle();
            $(this).parent().siblings().find(".user_login_box").hide();
        })
    })
    var index_1 = 0;
    $("ul.navigation li a").hover(function() {
        $("ul.navigation li a").removeClass("on");
        $(this).addClass("on");
        audioPlayer();
    }, function() {
        $("#audioPlayer")[0].pause();
    });
    $("ul.navigation li a").hover(function() {
        index_1 = $(this).parent().index();
        $(".sub_nav ul .sub_list p").eq(index_1).stop(true, true).show(600).siblings().hide();
        audioPlayer();
    }, function() {
        $("#audioPlayer")[0].pause();
    });
    function audioPlayer() {
        $("#audioPlayer").attr({
            "src": "/wp-content/uploads/2015/01/3.mp3"
        });
        $("#audioPlayer")[0].play();
        $("#audioPlayer")[0].volume = "0.5";
    }
    ;$.browser.mozilla = /firefox/.test(navigator.userAgent.toLowerCase());
    $.browser.webkit = /webkit/.test(navigator.userAgent.toLowerCase());
    $.browser.opera = /opera/.test(navigator.userAgent.toLowerCase());
    $.browser.msie = /msie/.test(navigator.userAgent.toLowerCase());
    if (($.browser.webkit && parseFloat($.browser.version) < 35) || $.browser.msie) {
        $("#main_nav li a").css({
            "transition": "none",
            background: "none",
            "transform": "rotateX(0deg)"
        });
        $("#main_nav li a").find("span:last-child").css({
            display: "none"
        });
        $("#main_nav li a").click(function() {
            $(this).css({
                background: "none",
                "transform": "rotateX(0deg)"
            });
        });
        $("#main_nav li a").mouseover(function() {
            $(this).css({
                background: "none",
                "transform": "rotateX(0deg)"
            });
        });
    }
    if ($(".sub_nav").length > 0) {
        var navTop = $(".sub_nav").offset().top - $('.sub_nav').height() / 5;
        $(window).scroll(function() {
            if ($(window).scrollTop() >= navTop) {
                $(".sub_nav").addClass("fixed");
                $(".sub_nav ul li a.smallogo").css({
                    opacity: 1
                });
            } else {
                $(".sub_nav").removeClass("fixed");
                $(".sub_nav ul li a.smallogo").css({
                    opacity: 0
                });
            }
        });
    }
    var len = $(".main_banner li").length;
    var index_2 = 0;
    var timer = 800;
    var intervaltimer = 0;
    var isMoving = false;
    function slide(slideMode) {
        if (isMoving == false) {
            isMoving = true;
            var prev;
            var next;
            var hidden;
            var curr = $("#imgCard" + index_2);
            if (index_2 == 0) {
                prev = $("#imgCard" + (len - 1));
            } else {
                prev = $("#imgCard" + (index_2 - 1));
            }
            if (index_2 == (len - 1)) {
                next = $("#imgCard0");
            } else {
                next = $("#imgCard" + (index_2 + 1));
            }
            if (slideMode) {
                if (index_2 - 2 >= 0) {
                    hidden = $("#imgCard" + (index_2 - 2));
                } else {
                    hidden = $("#imgCard" + (len + index_2 - 2));
                }
                prev.css("z-index", "5");
                next.css("z-index", "1");
                curr.css("z-index", "2");
                hidden.css("z-index", "1");
                hidden.css({
                    width: "450px",
                    height: "180px",
                    top: "60px",
                    "left": "0px",
                    "opacity": 0
                });
                hidden.stop(true, true).animate({
                    width: "580px",
                    height: "240px",
                    top: "20px",
                    left: "0px",
                    opacity: 1
                }, timer);
                curr.stop(true, true).animate({
                    width: "580px",
                    height: "240px",
                    top: "20px",
                    left: "600px",
                    opacity: 1
                }, timer);
                next.stop(true, true).animate({
                    width: "450px",
                    height: "180px",
                    top: "60px",
                    "left": "730px",
                    "opacity": 0
                }, timer, function() {
                    next.find("span").css("opacity", 0);
                    isMoving = false;
                });
                prev.find("span").css("opacity", 0);
                $(".main_banner_box li").find("p").css({
                    "bottom": "-50px"
                });
                prev.stop(true, true).animate({
                    width: "670px",
                    height: "280px",
                    left: "255px",
                    top: 0,
                    opacity: 1
                }, timer, function() {
                    $(this).find("p").animate({
                        "bottom": "0px"
                    });
                });
                index_2--;
            } else {
                if (index_2 + 2 >= len) {
                    hidden = $("#imgCard" + (index_2 + 2 - len));
                } else {
                    hidden = $("#imgCard" + (index_2 + 2));
                }
                prev.css("z-index", "1");
                next.css("z-index", "5");
                curr.css("z-index", "2");
                hidden.css("z-index", "1");
                hidden.css({
                    width: "450px",
                    height: "180px",
                    top: "60px",
                    "left": "730px",
                    "opacity": 0
                });
                hidden.stop(true, true).animate({
                    width: "580px",
                    height: "240px",
                    top: "20px",
                    left: "600px",
                    opacity: 1
                }, timer);
                curr.stop(true, true).animate({
                    width: "580px",
                    height: "240px",
                    top: "20px",
                    left: "0px",
                    opacity: 1
                }, timer);
                next.find("span").css("opacity", 0);
                $(".main_banner_box li").find("p").css({
                    "bottom": "-50px"
                });
                next.stop(true, true).animate({
                    width: "670px",
                    height: "280px",
                    left: "255px",
                    top: 0,
                    opacity: 1
                }, timer, function() {
                    $(this).find("p").animate({
                        "bottom": "0px"
                    });
                });
                prev.stop(true, true).animate({
                    width: "450px",
                    height: "180px",
                    left: "0px",
                    top: "60px",
                    opacity: 0
                }, timer, function() {
                    isMoving = false;
                });
                index_2++;
            }
            hidden.find("span").css("opacity", 0.5);
            curr.find("span").css("opacity", 0.5);
            if (index_2 == len)
                index_2 = 0;
            if (index_2 < 0)
                index_2 = len + index_2;
            $(".btn_list span").removeClass('curr').eq(index_2).addClass('curr');
        }
    }
    if (len > 3) {
        $(".btn_list span").click(function(event) {
            if (isMoving)
                return;
            var oIndex = $(this).index();
            if (oIndex == index_2)
                return;
            clearInterval(intervaltimer)
            intervaltimer = null;
            var flag = false;
            if (Math.abs(index_2 - oIndex) > 1 && Math.abs(len - Math.abs(index_2 - oIndex)) != 1) {
                $(".main_banner_box li").css({
                    width: "300px",
                    height: "120px",
                    left: "600px",
                    top: "60px",
                    opacity: 0
                });
                if (index_2 > oIndex && len - Math.abs(index_2 - oIndex) != 1) {
                    flag = true;
                    index_2 = oIndex + 1;
                } else {
                    index_2 = oIndex - 1;
                    if (index_2 < 0)
                        index_2 = len - 1;
                }
            } else {
                if ((index_2 > oIndex && len - (index_2 - oIndex) != 1) || (index_2 < oIndex && len + (index_2 - oIndex) == 1)) {
                    flag = true;
                }
            }
            slide(flag);
            intervaltimer = setInterval(slide, 3000);
        });
        $(".main_banner_box li").on("mousemove", function() {
            if ($(this).css("width") == "670px") {
                clearInterval(intervaltimer);
                intervaltimer = null;
            }
        }).on("mouseout", function() {
            clearInterval(intervaltimer);
            intervaltimer = null;
            intervaltimer = setInterval(slide, 3000);
        });
        $(".js_pre").click(function(event) {
            if (isMoving)
                return;
            clearInterval(intervaltimer);
            intervaltimer = null;
            slide(1);
            intervaltimer = setInterval(slide, 3000);
        });
        $(".js_next").click(function(event) {
            if (isMoving)
                return;
            clearInterval(intervaltimer);
            intervaltimer = null;
            slide();
            intervaltimer = setInterval(slide, 3000);
        });
        intervaltimer = setInterval(slide, 3000);
    } else {
        $(".js_pre").hide();
        $(".js_next").hide();
    }
    var index_3 = 0;
    var index_33 = 0;
    var index_333 = 0;
    var cont_1 = $(".index_mv_body .mvList");
    var cont_2 = $(".shoufa_mv_body .mvList");
    var cont_3 = $(".hot_mv_body .mvList");
    $(".index_mv_title ul li").click(function() {
        index_3 = $(this).index();
        mvSlide($(this), index_3, cont_1);
    });
    $(".shoufa_mv_title ul li").click(function() {
        index_33 = $(this).index();
        mvSlide($(this), index_33, cont_2);
    });
    $(".hot_mv_title ul li").click(function() {
        index_333 = $(this).index();
        mvSlide($(this), index_333, cont_3);
    });
    function mvSlide(btn, n, cont) {
        btn.find("a").addClass("cur").parent().siblings().find("a").removeClass("cur");
        cont.eq(n).fadeIn().siblings("div").fadeOut();
        cont.eq(n).addClass("curShow").siblings().removeClass("curShow");
    }
    var iHtml = "<b></b>";
    $(".index_mv_body .mvList ul.sb li").eq(0).append(iHtml);
    $(".index_mv_body .mvList ul.sb li").eq(1).append(iHtml);
    $(".shoufa_mv_body .mvList ul.sb li").eq(0).append(iHtml);
    $(".shoufa_mv_body .mvList ul.sb li").eq(1).append(iHtml);
    for (var r = 0; r < 9; r++) {
        $("#rank li").eq(r).find("a.musicName").prepend(" " + (r + 1) + "  ");
    }
    for (var k = 0; k < 9; k++) {
        $("#latest li").eq(k).find("a.musicName").prepend(" " + (k + 1) + "  ");
    }
    for (var p = 0; p < 9; p++) {
        $("#popular li").eq(p).find("a.musicName").prepend(" " + (p + 1) + "  ");
    }
    var oList_omnibus = document.getElementById("omnibus_list");
    var oI = oList_omnibus.getElementsByTagName("i")[0];
    var aSpan = oList_omnibus.getElementsByTagName("span");
    $("#omnibus_list .post_big a").hover(function() {
        $(this).find("i").stop(true, true).animate({
            left: "0px"
        }, 300);
    }, function() {
        $(this).find("i").stop(true, true).animate({
            left: "305px"
        }, 300, function() {
            oI.style.left = "-305px";
        });
    });
    $("#omnibus_list .post_small a").hover(function() {
        $(this).find("span").stop(true, true).animate({
            left: "0px"
        }, 300);
    }, function() {
        $(this).find("span").stop(true, true).animate({
            left: "130px"
        }, 300, function() {
            for (var i = 0; i < aSpan.length; i++) {
                aSpan[i].style.left = "-130px";
            }
        });
    });
});
$("#toTop").click(function() {
    $("html,body").animate({
        scrollTop: "0px"
    }, "slow");
    $("#audioPlayer").attr({
        "src": "/wp-content/uploads/2015/01/1.mp3"
    });
    $("#audioPlayer")[0].play();
});
$(".footer_cont_right a.twoCode").hover(function() {
    $(this).find("img.tCode").stop(true, true).fadeIn();
}, function() {
    $(this).find("img.tCode").stop(true, true).delay(800).fadeOut();
});
$("#mv_classify_list ul li").hover(function() {
    $(this).stop(true, true).animate({
        "opacity": "1"
    }, 350).siblings().stop(true, true).animate({
        "opacity": "0.5"
    }, 350);
}, function() {
    $("#mv_classify_list ul li").stop(true, true).animate({
        "opacity": "1"
    }, 350);
});
$("#mvList .mv_rcmd").click(function() {
    var index_mv_rcmd1 = $(this).index();
    $(this).find("span").addClass("active").parent().siblings("li").find("span").removeClass("active");
    $(this).find("i").addClass("on").parent().siblings("li").find("i").removeClass("on");
});
var arrSongs = ["http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4", "http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4", "http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4"]
$("#mvList li.mv_rcmd").click(function() {
    var _index_songs = $(this).index();
    video[0].src = arrSongs[_index_songs];
    video[0].play();
    $(".playPause").css({
        "backgroundPosition": "-54px -10px"
    });
});
$("#mv_rank_list ul li").click(function() {
    var index_mv_rcmd2 = $(this).index();
    video[0].src = arrSongs[index_mv_rcmd2];
    video[0].play();
    $(".playPause").css({
        "backgroundPosition": "-54px -10px"
    });
});
var video = $("#video");
$(".playPause").click(function() {
    if (video[0].paused) {
        video[0].play();
        $(this).css({
            "backgroundPosition": "-54px -10px"
        });
    } else {
        video[0].pause();
        $(this).css({
            "backgroundPosition": "-12px -10px"
        });
    }
    return false;
});
video.on("loadedmetadata", function() {
    var dur = changeTime(video[0].duration);
    $(".duration").text(dur);
});
video.on("timeupdate", function() {
    var cur = changeTime(video[0].currentTime);
    $(".current").text(cur);
    var cur_pos = video[0].currentTime;
    var dur_max = video[0].duration;
    var scale = 100 * cur_pos / dur_max;
    $(".timeBar").css("width", scale + "%");
});
function changeTime(time) {
    iNum = parseInt(time);
    var iM = toZero(Math.floor(time / 60));
    var iS = toZero(Math.floor(time % 60));
    return iM + ":" + iS;
}
function toZero(num) {
    return num <= 9 ? "0" + num : "" + num;
}
var timeDrag = false;
$(".progressBar").mousedown(function(e) {
    timeDrag = true;
    updatebar(e.pageX);
});
$(document).mouseup(function(e) {
    if (timeDrag) {
        timeDrag = false;
        updatebar(e.pageX);
    }
});
$(document).mousemove(function(e) {
    if (timeDrag) {
        updatebar(e.pageX);
    }
});
var updatebar = function(x) {
    var progress = $(".progressBar");
    var maxduration = video[0].duration;
    var position = x - progress.offset().left;
    var percentage = 100 * position / progress.width();
    if (percentage > 100) {
        percentage = 100;
    }
    if (percentage < 0) {
        percentage = 0;
    }
    $(".timeBar").css("width", percentage + "%");
    video[0].currentTime = maxduration * percentage / 100;
};
var startBuffer = function() {
    var maxduration = video[0].duration;
    var currentBuffer = video[0].buffered.end(0);
    var percentage = 100 * currentBuffer / maxduration;
    $(".bufferBar").css("width", percentage + "%");
    if (currentBuffer < maxduration) {
        setTimeout(startBuffer, 500);
    }
};
setTimeout(startBuffer, 500);
$(".muted").click(function() {
    if (video[0].muted) {
        $(this).css({
            "backgroundPosition": "-88px -10px"
        });
        video[0].muted = false;
    } else {
        $(this).css({
            "backgroundPosition": "-126px -10px"
        });
        video[0].muted = true;
    }
    return false;
});
var timeDrag2 = false;
$(".volumeBar").mousedown(function(e) {
    timeDrag2 = true;
    updatebar2(e.pageX);
});
$(document).mouseup(function(e) {
    if (timeDrag2) {
        timeDrag2 = false;
        updatebar2(e.pageX);
    }
});
$(document).mousemove(function(e) {
    if (timeDrag2) {
        updatebar2(e.pageX);
    }
});
var updatebar2 = function(x) {
    var progress = $(".volumeBar");
    var maxduration = video[0].duration;
    var position = x - progress.offset().left;
    var percentage = 100 * position / progress.width();
    if (percentage > 100) {
        percentage = 100;
    }
    if (percentage < 0) {
        percentage = 0;
    }
    $(".volume").css("width", percentage + "%");
    video[0].volume = percentage / 100;
};
$(".fullscreen").on("click", function() {
    video[0].RequestFullScreen = video[0].RequestFullScreen || video[0].webkitRequestFullScreen || video[0].mozRequestFullScreen;
    video[0].RequestFullScreen();
    return false;
});
