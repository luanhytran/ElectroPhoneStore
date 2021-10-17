/************************
*************************
    Mobile Nav 
************************
************************/
! function(s) {
    "use strict";
    s.fn.mobileMenu = function(e) {
        var i = {
            MenuWidth: 250,
            SlideSpeed: 300,
            WindowsMaxWidth: 767,
            PagePush: !0,
            FromRight: !0,
            Overlay: !0,
            CollapseMenu: !0,
            ClassName: "mobile-menu"
        };
        return this.each(function() {
            function n() {
                1 == d.FromRight ? c.css("right", -d.MenuWidth) : c.css("left", -d.MenuWidth), c.find("ul:first").addClass(d.ClassName), g = d.ClassName, c.css("width", d.MenuWidth), c.find("." + g + " ul").css("display", "none");
                var e = '<span class="expand fa fa-plus"></span>';
                c.find("li ul").parent().prepend(e), s("." + g).append('<li style="height: 30px;"></li>'), s("." + g + " li:has(span)").each(function() {
                    s(this).find("a:first").css("padding-right", 55)
                })
            }

            function a() {
                var e = 0,
                    i = s(document).height();
                return c.find("." + g + " > li").each(function() {
                    var i = s(this).height();
                    e += i
                }), i >= e && (e = i), e
            }

            function l(e) {
                C = s("." + g + " span.expand").height(), 1 === e && c.find("." + g + " > li:has(span)").each(function() {
                    var e = s(this).height(),
                        i = (e - C) / 2;
                    s(this).find("span").css({
                        "padding-bottom": i,
                        "padding-top": i
                    })
                }), 2 === e && c.find("." + g + " > li > ul > li:has(span)").each(function() {
                    var e = s(this).height(),
                        i = (e - C) / 2;
                    s(this).find("span").css({
                        "padding-bottom": i,
                        "padding-top": i
                    })
                })
            }

            function t() {
                u.addClass("mmPushBody"), 1 == d.Overlay ? h.addClass("overlay") : h.addClass("overlay").css("opacity", 0), c.css({
                    display: "block",
                    overflow: "hidden"
                }), 1 == d.FromRight ? (1 == d.PagePush && p.animate({
                    right: d.MenuWidth
                }, d.SlideSpeed, "linear"), c.animate({
                    right: "0"
                }, d.SlideSpeed, "linear", function() {
                    c.css("height", a()), r = !0
                })) : (1 == d.PagePush && p.animate({
                    right: -d.MenuWidth
                }, d.SlideSpeed, "linear"), c.animate({
                    left: "0"
                }, d.SlideSpeed, "linear", function() {
                    c.css("height", a()), r = !0
                })), m || (l(1), m = !0)
            }

            function o() {
                1 == d.FromRight ? (1 == d.PagePush && p.animate({
                    right: "0"
                }, d.SlideSpeed, "linear"), c.animate({
                    right: -d.MenuWidth
                }, d.SlideSpeed, "linear", function() {
                    u.removeClass("mmPushBody"), h.css("height", 0).removeClass("overlay"), c.css("display", "none"), r = !1
                })) : (1 == d.PagePush && p.animate({
                    right: "0"
                }, d.SlideSpeed, "linear"), c.animate({
                    left: -d.MenuWidth
                }, d.SlideSpeed, "linear", function() {
                    u.removeClass("mmPushBody"), h.css("height", 0).removeClass("overlay"), c.css("display", "none"), r = !1
                }))
            }
            var d = s.extend({}, i, e),
                c = s(this),
                h = s("#overlay"),
                u = s("body"),
                p = s("#page"),
                r = !1,

                m = !1,
                f = !1,
                C = 0,
                g = "";
            n(), s(".mm-toggle").click(function() {
                c.css("height", s(document).height()), 1 == d.Overlay && h.css("height", s(document).height()), r ? o() : t()
            }), s(window).resize(function() {
                s(window).width() >= d.WindowsMaxWidth && r && c.css("right") != -d.MenuWidth && o()
            }), s("." + g + " > li > span.expand").click(function() {
                if (1 == d.CollapseMenu) {
                    var e = s("." + g + " li span");
                    e.hasClass("open") && "none" === s(this).next().next().css("display") && (s("." + g + " li ul").slideUp(), e.hasClass("open") ? e.removeClass("fa fa-minus").addClass("fa fa-plus") : e.removeClass("fa fa-plus").addClass("fa fa-minus"), e.removeClass("open"))
                }
                s(this).nextAll("." + g + " ul").slideToggle(function() {
                    1 == d.CollapseMenu ? s(this).promise().done(function() {
                        c.css("height", a())
                    }) : c.css("height", a())
                }), s(this).hasClass("fa fa-plus") ? s(this).removeClass("fa fa-plus").addClass("fa fa-minus") : s(this).removeClass("fa fa-minus").addClass("fa fa-plus"), s(this).toggleClass("open"), f || (l(2), f = !0)
            }), s("." + g + " > li > ul > li > span.expand").click(function() {
                if (1 == d.CollapseMenu) {
                    var e = s("." + g + " li ul li span");
                    e.hasClass("open") && "none" === s(this).next().next().css("display") && (s("." + g + " li ul ul").slideUp(), e.hasClass("open") ? e.removeClass("fa fa-minus").addClass("fa fa-plus") : e.removeClass("fa fa-plus").addClass("fa fa-minus"), e.removeClass("open"))
                }
                s(this).nextAll("." + g + " ul ul").slideToggle(function() {
                    1 == d.CollapseMenu ? s(this).promise().done(function() {
                        c.css("height", a())
                    }) : c.css("height", a())
                }), s(this).hasClass("fa fa-plus") ? s(this).removeClass("fa fa-plus").addClass("fa fa-minus") : s(this).removeClass("fa fa-minus").addClass("fa fa-plus"), s(this).toggleClass("open")
            }), s("." + g + " li a").click(function() {
                s("." + g + " li a").removeClass("active"), s(this).addClass("active"), o()
            }), h.click(function() {
                o()
            }), s("." + g + " li a.active").parent().children(".expand").removeClass("fa fa-plus").addClass("fa fa-minus open"), s("." + g + " li a.active").parent().children("ul").css("display", "block")
        })
    }
}(jQuery);