jQuery(function() {
        "use strict"
        jQuery(".zoom-img").imagezoomsl({
            zoomrange: [0, 3]
        })
    }),
    function(A) {
        var e = !0,
            t = !1;
        A.fn.imagezoomsl = function(t) {
            return t = t || {}, this.each(function() {
                if (!A(this).is("img")) return e;
                var i = this;
                setTimeout(function() {
                    A(new Image).on("load", function() {
                        a.F(A(i), t)
                    }).attr("src", A(i).attr("src"))
                }, 30)
            })
        };
        var a = {};
        A.extend(a, {
            dsetting: {
                loadinggif: "",
                loadopacity: .1,
                loadbackground: "#878787",
                cursorshade: e,
                magnifycursor: "crosshair",
                cursorshadecolor: "#fff",
                cursorshadeopacity: .3,
                cursorshadeborder: "1px solid black",
                zindex: "",
                stepzoom: .5,
                zoomrange: [2, 2],
                zoomstart: 2,
                disablewheel: e,
                showstatus: e,
                showstatustime: 2e3,
                statusdivborder: "1px solid black",
                statusdivbackground: "#C0C0C0",
                statusdivpadding: "4px",
                statusdivfont: "bold 13px Arial",
                statusdivopacity: .8,
                magnifierpos: "right",
                magnifiersize: [0, 0],
                magnifiereffectanimate: "showIn",
                innerzoom: t,
                innerzoommagnifier: t,
                descarea: t,
                leftoffset: 15,
                rightoffset: 15,
                switchsides: e,
                magnifierborder: "1px solid #ddd",
                textdnbackground: "#fff",
                textdnpadding: "10px",
                textdnfont: "13px/20px cursive",
                scrollspeedanimate: 5,
                zoomspeedanimate: 7,
                loopspeedanimate: 2.5,
                magnifierspeedanimate: 350,
                classmagnifier: "magnifier",
                classcursorshade: "cursorshade",
                classstatusdiv: "statusdiv",
                classtextdn: "textdn"
            },
            T: function(e) {
                var t, a = 0;
                return e.parents().add(e).each(function() {
                    t = A(this).css("zIndex"), t = isNaN(t) ? 0 : +t, a = Math.max(a, t)
                }), a
            },
            L: function(A, e, t) {
                return "left" == A ? (A = -t.f.c * t.k + t.e.c, e > 0 ? 0 : A > e ? A : e) : (A = -t.f.d * t.k + t.e.d, e > 0 ? 0 : A > e ? A : e)
            },
            H: function(A) {
                var e = this,
                    t = A.data("specs");
                if (t) {
                    var a = t.r.offsetsl(),
                        i = e.a.g - a.left,
                        o = e.a.j - a.top;
                    e.a.B += (e.a.g - e.a.B) / 2.45342, e.a.C += (e.a.j - e.a.C) / 2.45342, t.G.css({
                        left: e.a.B - 10,
                        top: e.a.C + 20
                    });
                    var s = Math.round(t.e.c / t.k),
                        r = Math.round(t.e.d / t.k);
                    e.a.z += (i - e.a.z) / t.b.loopspeedanimate, e.a.A += (o - e.a.A) / t.b.loopspeedanimate, t.K.css({
                        left: t.f.c > s ? Math.min(t.f.c - s, Math.max(0, e.a.z - s / 2)) + a.left - t.w.t.N : a.left - t.w.t.N,
                        top: t.f.d > r ? Math.min(t.f.d - r, Math.max(0, e.a.A - r / 2)) + a.top - t.w.t.R : a.top - t.w.t.R
                    }), t.b.innerzoommagnifier && (e.a.p += (e.a.g - e.a.p) / t.b.loopspeedanimate, e.a.q += (e.a.j - e.a.q) / t.b.loopspeedanimate, t.l.css({
                        left: e.a.p - Math.round(t.e.c / 2),
                        top: e.a.q - Math.round(t.e.d / 2)
                    }), t.s.css({
                        left: e.a.p - Math.round(t.e.c / 2),
                        top: e.a.q + t.e.d / 2
                    })), e.a.u += (i - e.a.u) / t.b.scrollspeedanimate, e.a.v += (o - e.a.v) / t.b.scrollspeedanimate, t.J.css({
                        left: e.L("left", -e.a.u * t.k + t.e.c / 2, t),
                        top: e.L("top", -e.a.v * t.k + t.e.d / 2, t)
                    }), e.a.n = setTimeout(function() {
                        e.H(A)
                    }, 30)
                }
            },
            I: function(A) {
                var e = this,
                    t = A.data("specs");
                t && (t.h += (t.k - t.h) / t.b.zoomspeedanimate, t.h = Math.round(1e3 * t.h) / 1e3, t.K.css({
                    width: t.f.c > Math.round(t.e.c / t.h) ? Math.round(t.e.c / t.h) : t.f.c,
                    height: t.f.d > Math.round(t.e.d / t.h) ? Math.round(t.e.d / t.h) : t.f.d
                }), t.J.css({
                    width: Math.round(t.h * t.m.c * (t.f.c / t.m.c)),
                    height: Math.round(t.h * t.m.d * (t.f.d / t.m.d))
                }), e.a.o = setTimeout(function() {
                    e.I(A)
                }, 30))
            },
            a: {},
            P: function(t) {
                function a() {}
                var i = t.data("specs");
                t = i.b.magnifiersize[0];
                var o, s = i.b.magnifiersize[1],
                    r = i.r.offsetsl(),
                    n = 0,
                    l = 0;
                switch (o = r.left + ("left" === i.b.magnifierpos ? -i.e.c - i.b.leftoffset : i.f.c + i.b.rightoffset), i.b.switchsides && !i.b.innerzoom && ("left" !== i.b.magnifierpos && o + i.e.c + i.b.leftoffset >= A(window).width() && r.left - i.e.c >= i.b.leftoffset ? o = r.left - i.e.c - i.b.leftoffset : "left" === i.b.magnifierpos && 0 > o && (o = r.left + i.f.c + i.b.rightoffset)), n = o, l = r.top, i.l.css({
                    visibility: "visible",
                    display: "none"
                }), i.b.descarea && (n = A(i.b.descarea).offsetsl().left, l = A(i.b.descarea).offsetsl().top), i.b.innerzoommagnifier && (n = this.a.g - Math.round(i.e.c / 2), l = this.a.j - Math.round(i.e.d / 2)), a = function() {
                    i.s.stop(e, e).fadeIn(i.b.magnifierspeedanimate), i.b.innerzoommagnifier || i.s.css({
                        left: n,
                        top: l + s
                    })
                }, i.b.innerzoom && (n = r.left, l = r.top, a = function() {
                    i.r.css({
                        visibility: "hidden"
                    }), i.s.css({
                        left: n,
                        top: l + s
                    }).stop(e, e).fadeIn(i.b.magnifierspeedanimate)
                }), i.b.magnifiereffectanimate) {
                    case "slideIn":
                        i.l.css({
                            left: n,
                            top: l - s / 3,
                            width: t,
                            height: s
                        }).stop(e, e).show().animate({
                            top: l
                        }, i.b.magnifierspeedanimate, "easeOutBounceSL", a);
                        break;
                    case "showIn":
                        i.l.css({
                            left: r.left + Math.round(i.f.c / 2),
                            top: r.top + Math.round(i.f.d / 2),
                            width: Math.round(i.e.c / 5),
                            height: Math.round(i.e.d / 5)
                        }).stop(e, e).show().css({
                            opacity: "0.1"
                        }).animate({
                            left: n,
                            top: l,
                            opacity: "1",
                            width: t,
                            height: s
                        }, i.b.magnifierspeedanimate, a);
                        break;
                    default:
                        i.l.css({
                            left: n,
                            top: l,
                            width: t,
                            height: s
                        }).stop(e, e).fadeIn(i.b.magnifierspeedanimate, a)
                }
                i.b.showstatus && (i.Q || i.M) ? i.G.html(i.Q + '<div style="font-size:80%">' + i.M + "</div>").stop(e, e).fadeIn().delay(i.b.showstatustime).fadeOut("slow") : i.G.hide()
            },
            S: function(A) {
                var t = A.data("specs");
                switch (A = t.r.offsetsl(), t.b.magnifiereffectanimate) {
                    case "showIn":
                        t.l.stop(e, e).animate({
                            left: A.left + Math.round(t.f.c / 2),
                            top: A.top + Math.round(t.f.d / 2),
                            opacity: "0.1",
                            width: Math.round(t.e.c / 5),
                            height: Math.round(t.e.d / 5)
                        }, t.b.magnifierspeedanimate, function() {
                            t.l.hide()
                        });
                        break;
                    default:
                        t.l.stop(e, e).fadeOut(t.b.magnifierspeedanimate)
                }
            },
            F: function(a, i) {
                function o() {
                    this.j = this.g = 0
                }

                function s(A) {
                    m.data("specs", {
                        b: f,
                        Q: q,
                        M: C,
                        r: a,
                        l: d,
                        J: A,
                        G: c,
                        K: u,
                        s: p,
                        f: g,
                        m: {
                            c: A.width(),
                            d: A.height()
                        },
                        e: {
                            c: d.width(),
                            d: d.height()
                        },
                        w: {
                            c: u.width(),
                            d: u.height(),
                            t: {
                                N: parseInt(u.css("border-left-width")) || 0,
                                R: parseInt(u.css("border-top-width")) || 0
                            }
                        },
                        h: n,
                        k: n
                    })
                }

                function r(A) {
                    return !A.complete || "undefined" != typeof A.naturalWidth && 0 === A.naturalWidth ? t : e
                }
                var n, l, d, u, c, m, p, f = A.extend({}, this.dsetting, i),
                    h = f.zindex || this.T(a),
                    g = {
                        c: a.width(),
                        d: a.height()
                    },
                    o = new o,
                    q = a.attr("data-title") ? a.attr("data-title") : "",
                    C = a.attr("data-help") ? a.attr("data-help") : "",
                    v = a.attr("data-text-bottom") ? a.attr("data-text-bottom") : "",
                    I = this;
                if (0 === g.d || 0 === g.c) A(new Image).on("load", function() {
                    I.F(a, i)
                }).attr("src", a.attr("src"));
                else {
                    a.css({
                        visibility: "visible"
                    }), f.i = a.attr("data-large") || a.attr("src");
                    for (l in f) "" === f[l] && (f[l] = this.dsetting[l]);
                    n = f.zoomrange[0] < f.zoomstart ? f.zoomstart : f.zoomrange[0], ("0,0" === f.magnifiersize.toString() || "" === f.magnifiersize.toString()) && (f.magnifiersize = f.innerzoommagnifier ? [g.c / 2, g.d / 2] : [g.c, g.d]), f.descarea && A(f.descarea).length ? 0 === A(f.descarea).width() || 0 === A(f.descarea).height() ? f.descarea = t : f.magnifiersize = [A(f.descarea).width(), A(f.descarea).height()] : f.descarea = t, f.innerzoom && (f.magnifiersize = [g.c, g.d], i.cursorshade || (f.cursorshade = t), i.scrollspeedanimate || (f.scrollspeedanimate = 10)), f.innerzoommagnifier && (i.magnifycursor || !window.chrome && !window.sidebar || (f.magnifycursor = "none"), f.cursorshade = t, f.magnifiereffectanimate = "fadeIn"), l = ["wheel", "mousewheel", "DOMMouseScroll", "MozMousePixelScroll"];
                    var Q = "onwheel" in document || 9 <= document.documentMode ? ["wheel"] : ["mousewheel", "DomMouseScroll", "MozMousePixelScroll"];
                    if (A.event.fixHooks)
                        for (var K = l.length; K;) A.event.fixHooks[l[--K]] = A.event.mouseHooks;
                    A.event.special.mousewheel = {
                        setup: function() {},
                        teardown: function() {
                            if (this.removeEventListener)
                                for (var A = Q.length; A;) this.removeEventListener(Q[--A], k, t);
                            else this.onmousewheel = null
                        }
                    }, A.fn.offsetsl = function() {
                        var A = this.get(0);
                        if (A.getBoundingClientRect) A = this.offset();
                        else {
                            for (var e = 0, t = 0; A;) e += parseInt(A.offsetTop), t += parseInt(A.offsetLeft), A = A.offsetParent;
                            A = {
                                top: e,
                                left: t
                            }
                        }
                        return A
                    }, A.easing.easeOutBounceSL = function(A, e, t, a, i) {
                        return (e /= i) < 1 / 2.75 ? 7.5625 * a * e * e + t : 2 / 2.75 > e ? a * (7.5625 * (e -= 1.5 / 2.75) * e + .75) + t : 2.5 / 2.75 > e ? a * (7.5625 * (e -= 2.25 / 2.75) * e + .9375) + t : a * (7.5625 * (e -= 2.625 / 2.75) * e + .984375) + t
                    }, d = A("<div />").attr({
                        "class": f.classmagnifier
                    }).css({
                        position: "absolute",
                        zIndex: h,
                        width: f.magnifiersize[0],
                        height: f.magnifiersize[1],
                        left: -1e4,
                        top: -1e4,
                        visibility: "hidden",
                        overflow: "hidden"
                    }).appendTo(document.body), i.classmagnifier || d.css({
                        border: f.magnifierborder
                    }), u = A("<div />"), f.cursorshade && (u.attr({
                        "class": f.classcursorshade
                    }).css({
                        zIndex: h,
                        display: "none",
                        position: "absolute",
                        width: Math.round(f.magnifiersize[0] / f.zoomstart),
                        height: Math.round(f.magnifiersize[1] / f.zoomstart),
                        top: 0,
                        left: 0
                    }).appendTo(document.body), i.classcursorshade || u.css({
                        border: f.cursorshadeborder,
                        opacity: f.cursorshadeopacity,
                        backgroundColor: f.cursorshadecolor
                    })), c = A("<div />").attr({}).css({
                        position: "absolute",
                        display: "none",
                        zIndex: h,
                        top: 0,
                        left: 0
                    }).html('<img src="' + f.loadinggif + '" />').appendTo(document.body), m = A("<div />").attr({
                        "class": "tracker"
                    }).css({
                        zIndex: h,
                        backgroundImage: "url(cannotbe)",
                        position: "absolute",
                        width: g.c,
                        height: g.d,
                        left: a.offsetsl().left,
                        top: a.offsetsl().top
                    }).appendTo(document.body), p = A("<div />"), v && (p.attr({
                        "class": f.classtextdn
                    }).css({
                        position: "absolute",
                        zIndex: h,
                        left: 0,
                        top: 0,
                        display: "none"
                    }).html(v).appendTo(document.body), i.classtextdn || p.css({
                        border: f.magnifierborder,
                        background: f.textdnbackground,
                        padding: f.textdnpadding,
                        font: f.textdnfont
                    }), p.css({
                        width: f.magnifiersize[0] - parseInt(p.css("padding-left")) - parseInt(p.css("padding-right"))
                    })), m.data("largeimage", f.i), A(window).bind("load resize", function() {
                        var A = a.offsetsl();
                        m.css({
                            left: A.left,
                            top: A.top
                        })
                    }), A(document).mousemove(function(A) {
                        I.a.D = A.pageX, I.a.g !== I.a.D && (clearTimeout(I.a.n), clearTimeout(I.a.o), a.css({
                            visibility: "visible"
                        }))
                    }), a.mouseover(function() {
                        var A = a.offsetsl();
                        m.css({
                            left: A.left,
                            top: A.top
                        })
                    }), m.mouseover(function(e) {
                        I.a.g = e.pageX, I.a.j = e.pageY, o.g = e.pageX, o.j = e.pageY, I.a.D = e.pageX, e = a.offsetsl();
                        var s = I.a.g - e.left,
                            r = I.a.j - e.top;
                        I.a.z = s, I.a.A = r, I.a.u = s, I.a.v = r, I.a.p = I.a.g, I.a.q = I.a.j, I.a.B = I.a.g - 10, I.a.C = I.a.j + 20, m.css({
                            left: e.left,
                            top: e.top,
                            cursor: f.magnifycursor
                        }), f.i = a.attr("data-large") || a.attr("src"), f.i !== m.data("largeimage") && (A(new Image).on("load", function() {
                            A(u).remove(), A(c).remove(), A(d).remove(), A(m).remove(), A(p).remove()
                        }).attr("src", f.i), m.data("loadevt", t), m.data("largeimage", f.i), I.F(a, i)), c.show(), clearTimeout(I.a.n), clearTimeout(I.a.o)
                    }), m.mousemove(function(e) {
                        f.i = a.attr("data-large") || a.attr("src"), f.i !== m.data("largeimage") && (A(new Image).on("load", function() {
                            A(u).remove(), A(c).remove(), A(d).remove(), A(m).remove(), A(p).remove()
                        }).attr("src", f.i), m.data("loadevt", t), m.data("largeimage", f.i), I.F(a, i)), I.a.g = e.pageX, I.a.j = e.pageY, o.g = e.pageX, o.j = e.pageY, I.a.D = e.pageX
                    }), m.mouseout(function() {
                        clearTimeout(I.a.n), clearTimeout(I.a.o), a.css({
                            visibility: "visible"
                        }), p.hide(), u.add(c.not(".preloadevt")).stop(e, e).hide()
                    }), m.one("mouseover", function() {
                        var t = a.offsetsl(),
                            n = A('<img src="' + f.i + '"/>').css({
                                position: "relative"
                            }).appendTo(d);
                        I.O[f.i] || (m.css({
                            left: t.left,
                            top: t.top,
                            opacity: f.loadopacity,
                            background: f.loadbackground
                        }), c.css({
                            left: t.left + g.c / 2 - c.width() / 2,
                            top: t.top + g.d / 2 - c.height() / 2,
                            visibility: "visible"
                        })), n.bind("loadevt", function(A, t) {
                            if ("error" !== t.type) {
                                m.mouseout(function() {
                                    I.S(m), clearTimeout(I.a.n), clearTimeout(I.a.o), a.css({
                                        visibility: "visible"
                                    }), p.hide()
                                }), m.mouseover(function() {
                                    m.data("loadevt") && (r.h = r.k, u.fadeIn(), I.P(m), clearTimeout(I.a.n), clearTimeout(I.a.o), I.H(m), I.I(m))
                                }), m.css({
                                    opacity: 0,
                                    cursor: f.magnifycursor
                                }), c.empty(), i.classstatusdiv || c.css({
                                    border: f.statusdivborder,
                                    background: f.statusdivbackground,
                                    padding: f.statusdivpadding,
                                    font: f.statusdivfont,
                                    opacity: f.statusdivopacity
                                }), c.hide().removeClass("preloadevt"), I.O[f.i] = e, s(n), o.g == I.a.D && (u.fadeIn(), I.P(m), clearTimeout(I.a.n), clearTimeout(I.a.o), I.H(m), I.I(m));
                                var r = m.data("specs");
                                n.css({
                                    width: f.zoomstart * r.m.c * (g.c / r.m.c),
                                    height: f.zoomstart * r.m.d * (g.d / r.m.d)
                                }), m.data("loadevt", e), f.zoomrange && f.zoomrange[1] > f.zoomrange[0] ? m.bind("mousewheel", function(A, e) {
                                    var t = r.k,
                                        t = "in" == (0 > e ? "out" : "in") ? Math.min(t + f.stepzoom, f.zoomrange[1]) : Math.max(t - f.stepzoom, f.zoomrange[0]);
                                    r.k = t, r.U = e, A.preventDefault()
                                }) : f.disablewheel && m.bind("mousewheel", function(A) {
                                    A.preventDefault()
                                })
                            }
                        }), r(n.get(0)) ? n.trigger("loadevt", {
                            type: "load"
                        }) : n.bind("load error", function(A) {
                            n.trigger("loadevt", A)
                        })
                    })
                }
            },
            O: {}
        })
    }(jQuery, window),
    function(jQuery) {
        function format(A) {
            for (var e = 1; e < arguments.length; e++) A = A.replace("%" + (e - 1), arguments[e]);
            return A
        }

        function CloudZoom(A) {
            jQuery("img", A);
            this.removeBits = function() {
                lens && (lens.remove(), lens = null), jQuerytint && (jQuerytint.remove(), jQuerytint = null), softFocus && (softFocus.remove(), softFocus = null), ie6FixRemove(), jQuery(".cloud-zoom-loading", A.parent()).remove()
            }, this.destroy = function() {}
        }
        jQuery(document).on("ready", function() {
            jQuery(".cloud-zoom, .cloud-zoom-gallery").CloudZoom()
        }), jQuery.fn.CloudZoom = function(options) {
            try {
                document.execCommand("BackgroundImageCache", !1, !0)
            } catch (e) {}
            return this.each(function() {
                var relOpts, opts;
                eval("var	a = {" + jQuery(this).attr("rel") + "}"), relOpts = a, jQuery(this).is(".cloud-zoom") ? (opts = jQuery.extend({}, jQuery.fn.CloudZoom.defaults, options), opts = jQuery.extend({}, opts, relOpts), jQuery(this).css({
                    position: "relative",
                    display: "block"
                }), jQuery("img", jQuery(this)).css({
                    display: "block"
                }), !jQuery(this).parent().hasClass("cloud-zoom-wrap") && opts.useWrapper && jQuery(this).wrap('<div class="cloud-zoom-wrap"></div>'), jQuery(this).data("zoom", new CloudZoom(jQuery(this), opts))) : jQuery(this).is(".cloud-zoom-gallery") && (opts = jQuery.extend({}, relOpts, options), jQuery(this).data("relOpts", opts), jQuery(this).bind("click", jQuery(this), function(A) {
                    var e = A.data.data("relOpts");
                    return jQuery("#" + e.useZoom).data("zoom").destroy(), jQuery("#" + e.useZoom).attr("href", A.data.attr("href")), jQuery("#" + e.useZoom + " img").attr("src", A.data.data("relOpts").smallImage), jQuery("#" + A.data.data("relOpts").useZoom).CloudZoom(), !1
                }))
            }), this
        }
    }(jQuery), jQuery(function(A) {
        "use strict";
        var e = (A(".container"), A(".products-list"), A(".quick-view:not(.fancybox)"), A(".product-view-ajax")),
            t = (A(".product-view-container", e), A(".ajax-loader", e), A(".layar", e), function(e) {
                {
                    var t = A(".flexslider-large", e),
                        a = A(".flexslider-thumb", e),
                        i = A(".flexslider-thumb-vertical", e);
                    A(".close-view", e)
                }
                e && e.length && A.initSelect(e.find(".btn-select")), i.each(function() {
                    var e = A(this).find("ul li").size();
                    e > 2 && A(this).flexVSlider({
                        animation: "slide",
                        direction: "vertical",
                        move: 1,
                        keyboard: !1,
                        controlNav: !1,
                        animationLoop: !1,
                        slideshow: !1,
                        prevText: "",
                        nextText: ""
                    })
                }), a.each(function() {
                    var e = A(this).find("ul li").size();
                    e > 2 && A(this).flexslider({
                        animation: "slide",
                        keyboard: !1,
                        controlNav: !1,
                        animationLoop: !1,
                        slideshow: !1,
                        prevText: "",
                        nextText: "",
                        itemWidth: 100,
                        itemMargin: 15
                    })
                }), t.flexslider({})
            });
        t(); {
            var a = A(".product-carousel");
            A(".container")
        }
        a.length > 0 && a.each(function() {});
        var i = A(".products-list-small .slides");
        i.length > 0
    });