/**
 * @version: v1.7
 * @author: xgc-whj
 * @date: 2018-05-25 21:40:00
 * @license: MIT license release
 * @jq22 address: http://www.jq22.com/jquery-info17548
 * @GitHub: https://github.com/w0624/jquery-pagination
 * @description: jQuery分页插件，可自定义样式，默认有五套样式，可自定义插件选项，简单方便，兼容IE8
 */
(function() {
    $.fn.extend({
        whjPaging: function(b, r) {
            var g = $(this);
            if (b === "getPage") {
                return {
                    totalSize: g.get(0).pageText.totalSize,
                    currPage: g.get(0).pageText.staticCurrPage,
                    pageSize: g.get(0).pageText.staticPageSize,
                    totalPage: g.get(0).pageText.staticTotalPage
                }
            } else {
                if (b === "setPage") {
                    g.get(0).pageText.currPage = r.currPage != null ? r.currPage : null;
                    g.get(0).pageText.totalPage = r.totalPage != null ? r.totalPage : null;
                    g.get(0).pageText.totalSize = r.totalSize != null ? r.totalSize : null;
                    if (g.get(0).pageText.isShowPageSizeOpt) {
                        c()
                    }
                } else {
                    if (b != null) {
                        var o = [{
                            value: 5,
                            text: "5条/页",
                            selected: true
                        }, {
                            value: 10,
                            text: "10条/页"
                        }, {
                            value: 15,
                            text: "15条/页"
                        }, {
                            value: 20,
                            text: "20条/页"
                        }];
                        if (b.pageSizeOpt != null) {
                            o = b.pageSizeOpt
                        }
                        var s = o[0].value;
                        var x = o.length;
                        for (var m = 0; m < x; m++) {
                            if (o[m].selected) {
                                s = o[m].value;
                                break
                            }
                            if (m + 1 == x) {
                                o[0].selected = true
                            }
                        }
                        var d = "whj_jqueryPaginationCss-1";
                        if (b.css != null) {
                            switch (b.css) {
                            case "css-1":
                                d = "whj_jqueryPaginationCss-1";
                                break;
                            case "css-2":
                                d = "whj_jqueryPaginationCss-2";
                                break;
                            case "css-3":
                                d = "whj_jqueryPaginationCss-3";
                                break;
                            case "css-4":
                                d = "whj_jqueryPaginationCss-4";
                                break;
                            case "css-5":
                                d = "whj_jqueryPaginationCss-5";
                                break;
                            default:
                                d = b.css;
                                break
                            }
                        }
                        g.get(0).pageText = {
                            css: d,
                            pageSizeOpt: o,
                            totalPage: b.totalPage != null ? b.totalPage : null,
                            showPageNum: b.showPageNum != null ? b.showPageNum : 5,
                            firstPage: b.firstPage != null ? b.firstPage : "首页",
                            previousPage: b.previousPage != null ? b.previousPage : "上一页",
                            nextPage: b.nextPage != null ? b.nextPage : "下一页",
                            lastPage: b.lastPage != null ? b.lastPage : "尾页",
                            skip: b.skip != null ? b.skip : "跳至",
                            confirm: b.confirm != null ? b.confirm : "确认",
                            refresh: b.refresh != null ? b.refresh : "刷新",
                            totalPageText: b.totalPageText != null ? b.totalPageText : "共{}页",
                            isShowFL: b.isShowFL === false ? false : true,
                            isShowPageSizeOpt: b.isShowPageSizeOpt === false ? false : true,
                            isShowSkip: b.isShowSkip === false ? false : true,
                            isShowRefresh: b.isShowRefresh === false ? false : true,
                            isShowTotalPage: b.isShowTotalPage === false ? false : true,
                            isResetPage: b.isResetPage === true ? true : false,
                            callBack: b.callBack,
                            currPage: 1,
                            pageSize: b.isShowPageSizeOpt === false ? null : s,
                            totalSize: b.totalSize != null ? b.totalSize : null,
                            isShowTotalSize: b.isShowTotalSize === false ? false : true,
                            totalSizeText: b.totalSizeText != null ? b.totalSizeText : "共{}条记录"
                        }
                    }
                }
            }
            if (g.get(0).pageText.totalPage == null || g.get(0).pageText.totalPage < 1) {
                g.empty();
                return
            }
            if (g.get(0).pageText.currPage < 1) {
                g.get(0).pageText.currPage = 1
            } else {
                if (g.get(0).pageText.currPage > g.get(0).pageText.totalPage) {
                    g.get(0).pageText.currPage = g.get(0).pageText.totalPage
                }
            }
            g.get(0).pageText.staticCurrPage = g.get(0).pageText.currPage;
            g.get(0).pageText.staticPageSize = g.get(0).pageText.pageSize;
            g.get(0).pageText.staticTotalPage = g.get(0).pageText.totalPage;
            var h = g.get(0).pageText.currPage < 2 ? "whj_hoverDisable" : "whj_hover";
            var e = g.get(0).pageText.currPage >= g.get(0).pageText.totalPage ? "whj_hoverDisable" : "whj_hover";
            var q = 0;
            var f = 0;
            var y = parseInt(g.get(0).pageText.showPageNum / 2);
            if (g.get(0).pageText.showPageNum < 2) {
                f = g.get(0).pageText.currPage
            } else {
                if (g.get(0).pageText.totalPage <= g.get(0).pageText.showPageNum) {
                    f = 1
                } else {
                    if (g.get(0).pageText.currPage + y > g.get(0).pageText.totalPage) {
                        f = g.get(0).pageText.totalPage - g.get(0).pageText.showPageNum + 1
                    } else {
                        if (g.get(0).pageText.currPage - y < 1) {
                            f = 1
                        } else {
                            f = g.get(0).pageText.currPage - y
                        }
                    }
                }
            }
            var t = '<div class="' + g.get(0).pageText.css + '">';
            if (g.get(0).pageText.isShowFL) {
                t += '<div class="whj_border whj_padding whj_bgc ' + h + '" name="whj_firstPage">' + g.get(0).pageText.firstPage + "</div>"
            }
            t += '<div class="whj_border whj_padding whj_bgc ' + h + '" name="whj_previousPage">' + g.get(0).pageText.previousPage + "</div>";
            if (g.get(0).pageText.showPageNum > 0) {
                for (var n = f; n <= g.get(0).pageText.totalPage; n++) {
                    q++;
                    var v = g.get(0).pageText.currPage == n ? "whj_checked" : "whj_hover";
                    t += '<div class="whj_border whj_padding whj_bgc ' + v + '" name="whj_page" data-page="' + n + '">' + n + "</div>";
                    if (q >= g.get(0).pageText.showPageNum) {
                        break
                    }
                }
            }
            t += '<div class="whj_border whj_padding whj_bgc ' + e + '" name="whj_nextPage">' + g.get(0).pageText.nextPage + "</div>";
            if (g.get(0).pageText.isShowFL) {
                t += '<div class="whj_border whj_padding whj_bgc ' + e + '" name="whj_lastPage">' + g.get(0).pageText.lastPage + "</div>"
            }
            if (g.get(0).pageText.isShowPageSizeOpt) {
                t += '<select class="whj_border whj_bgc whj_hover" name="whj_pageSize">';
                for (var w in g.get(0).pageText.pageSizeOpt) {
                    var j = g.get(0).pageText.pageSizeOpt[w].selected ? "selected" : "";
                    t += '<option value="' + g.get(0).pageText.pageSizeOpt[w].value + '" ' + j + ">" + g.get(0).pageText.pageSizeOpt[w].text + "</option>"
                }
                t += "</select>"
            }
            if (g.get(0).pageText.isShowSkip) {
                t += '<div class="whj_padding whj_color">' + g.get(0).pageText.skip + '</div><input type="text" class="whj_border whj_color" name="whj_toPage"/><div class="whj_border whj_padding whj_bgc whj_hover" name="whj_confirm">' + g.get(0).pageText.confirm + "</div>"
            }
            if (g.get(0).pageText.isShowRefresh) {
                t += '<div class="whj_border whj_padding whj_bgc whj_hover" name="whj_refresh">' + g.get(0).pageText.refresh + "</div>"
            }
            if (g.get(0).pageText.isShowTotalPage) {
                var p = g.get(0).pageText.totalPageText.replace("{}", g.get(0).pageText.totalPage);
                t += '<div class="whj_padding whj_color">' + p + "</div>"
            }
            if (g.get(0).pageText.isShowTotalSize) {
                var a = g.get(0).pageText.isShowTotalPage ? "whj_totalSizeSingle" : "";
                var l = g.get(0).pageText.totalSizeText.replace("{}", g.get(0).pageText.totalSize);
                t += '<div class="whj_padding whj_color ' + a + '">' + l + "</div>"
            }
            t += "</div>";
            g.html(t);
            if (g.get(0).pageText.isShowFL) {
                if (h == "whj_hover") {
                    g.find("div[name='whj_firstPage']").click(function() {
                        if (g.get(0).pageText.isResetPage) {
                            g.get(0).pageText.pageSize = g.get(0).pageText.staticPageSize
                        }
                        g.get(0).pageText.currPage = 1;
                        u()
                    })
                }
                if (e == "whj_hover") {
                    g.find("div[name='whj_lastPage']").click(function() {
                        if (g.get(0).pageText.isResetPage) {
                            g.get(0).pageText.pageSize = g.get(0).pageText.staticPageSize;
                            g.get(0).pageText.currPage = g.get(0).pageText.staticTotalPage
                        } else {
                            g.get(0).pageText.currPage = g.get(0).pageText.totalPage
                        }
                        u()
                    })
                }
            }
            if (h == "whj_hover") {
                g.find("div[name='whj_previousPage']").click(function() {
                    if (g.get(0).pageText.isResetPage) {
                        g.get(0).pageText.pageSize = g.get(0).pageText.staticPageSize;
                        g.get(0).pageText.currPage = g.get(0).pageText.staticCurrPage - 1
                    } else {
                        g.get(0).pageText.currPage = g.get(0).pageText.currPage - 1
                    }
                    u()
                })
            }
            if (e == "whj_hover") {
                g.find("div[name='whj_nextPage']").click(function() {
                    if (g.get(0).pageText.isResetPage) {
                        g.get(0).pageText.pageSize = g.get(0).pageText.staticPageSize;
                        g.get(0).pageText.currPage = g.get(0).pageText.staticCurrPage + 1
                    } else {
                        g.get(0).pageText.currPage = g.get(0).pageText.currPage + 1
                    }
                    u()
                })
            }
            if (g.find("div[name='whj_page']").length > 0) {
                g.find("div[name='whj_page']").click(function() {
                    if (!$(this).hasClass("whj_checked")) {
                        if (g.get(0).pageText.isResetPage) {
                            g.get(0).pageText.pageSize = g.get(0).pageText.staticPageSize
                        }
                        g.get(0).pageText.currPage = +$(this).data("page");
                        u()
                    }
                })
            }
            if (g.get(0).pageText.isShowPageSizeOpt) {
                g.find("select[name='whj_pageSize']").change(function() {
                    var i = +$(this).val();
                    if (g.get(0).pageText.isResetPage) {
                        $(this).find("option[value='" + g.get(0).pageText.staticPageSize + "']").prop("selected", true)
                    }
                    var k = parseInt(g.get(0).pageText.totalSize / i);
                    if (k * i < g.get(0).pageText.totalSize) {
                        k++
                    }
                    g.get(0).pageText.currPage = 1;
                    g.get(0).pageText.pageSize = i;
                    g.get(0).pageText.totalPage = k;
                    if (!g.get(0).pageText.isResetPage) {
                        c()
                    }
                    u()
                })
            }
            if (g.get(0).pageText.isShowSkip) {
                g.find("input[name='whj_toPage']").on("input", function() {
                    var k = $(this).val();
                    var i = $(this).val().replace(/\D/g, "");
                    if (k.length != i.length) {
                        $(this).val(i)
                    }
                });
                g.find("div[name='whj_confirm']").click(function() {
                    var i = g.find("input[name='whj_toPage']").val();
                    if (i.length > 0) {
                        i = +i;
                        if (i < 1) {
                            i = 1
                        } else {
                            if (i > g.get(0).pageText.totalPage) {
                                i = g.get(0).pageText.totalPage
                            }
                        }
                        if (g.get(0).pageText.isResetPage) {
                            g.get(0).pageText.pageSize = g.get(0).pageText.staticPageSize
                        }
                        g.get(0).pageText.currPage = i;
                        u()
                    }
                })
            }
            if (g.get(0).pageText.isShowRefresh) {
                g.find("div[name='whj_refresh']").click(function() {
                    if (g.get(0).pageText.isResetPage) {
                        g.get(0).pageText.pageSize = g.get(0).pageText.staticPageSize;
                        g.get(0).pageText.currPage = g.get(0).pageText.staticCurrPage
                    }
                    u()
                })
            }
            function u() {
                if (!g.get(0).pageText.isResetPage) {
                    g.whjPaging()
                }
                g.get(0).pageText.callBack(g.get(0).pageText.currPage, g.get(0).pageText.pageSize)
            }
            function c() {
                var k = [];
                var z = g.get(0).pageText.pageSizeOpt;
                for (var i in z) {
                    if (z[i].value == g.get(0).pageText.pageSize) {
                        k.push({
                            value: z[i].value,
                            text: z[i].text,
                            selected: true
                        })
                    } else {
                        k.push({
                            value: z[i].value,
                            text: z[i].text
                        })
                    }
                }
                g.get(0).pageText.pageSizeOpt = k
            }
        }
    })
}
)();
