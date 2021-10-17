! function() {
  var e = jQuery.fn.revolution;
  jQuery.extend(!0, e, {
    stopKenBurn: function(e) {
      void 0 != e.data("kbtl") && e.data("kbtl").pause()
    }
    , startKenBurn: function(e, t, a) {
      var i = e.data()
        , o = e.find(".defaultimg")
        , n = o.data("lazyload") || o.data("src")
        , r = (i.owidth / i.oheight, "carousel" === t.sliderType ? t.carousel.slide_width : t.ul.width())
        , d = t.ul.height();
      e.data("kbtl") && e.data("kbtl").kill(), a = a || 0, 0 == e.find(".tp-kbimg").length && (e.append('<div class="tp-kbimg-wrap" style="z-index:2;width:100%;height:100%;top:0px;left:0px;position:absolute;"><img class="tp-kbimg" src="' + n + '" style="position:absolute;" width="' + i.owidth + '" height="' + i.oheight + '"></div>'), e.data("kenburn", e.find(".tp-kbimg")));
      var s = function(e, t, a, i, o, n, r) {
          var d = e * a
            , s = t * a
            , l = Math.abs(i - d)
            , p = Math.abs(o - s)
            , h = new Object;
          return h.l = (0 - n) * l, h.r = h.l + d, h.t = (0 - r) * p, h.b = h.t + s, h.h = n, h.v = r, h
        }
        , l = function(e, t, a, i, o) {
          var n = e.bgposition.split(" ") || "center center"
            , r = "center" == n[0] ? "50%" : "left" == n[0] || "left" == n[1] ? "0%" : "right" == n[0] || "right" == n[1] ? "100%" : n[0]
            , d = "center" == n[1] ? "50%" : "top" == n[0] || "top" == n[1] ? "0%" : "bottom" == n[0] || "bottom" == n[1] ? "100%" : n[1];
          r = parseInt(r, 0) / 100 || 0, d = parseInt(d, 0) / 100 || 0;
          var l = new Object;
          return l.start = s(o.start.width, o.start.height, o.start.scale, t, a, r, d), l.end = s(o.start.width, o.start.height, o.end.scale, t, a, r, d), l
        }
        , p = function(e, t, a) {
          var i = a.scalestart / 100
            , o = a.scaleend / 100
            , n = void 0 != a.oofsetstart ? a.offsetstart.split(" ") || [0, 0] : [0, 0]
            , r = void 0 != a.offsetend ? a.offsetend.split(" ") || [0, 0] : [0, 0];
          a.bgposition = "center center" == a.bgposition ? "50% 50%" : a.bgposition;
          var d = new Object
            , s = e * i
            , p = (s / a.owidth * a.oheight, e * o);
          if (p / a.owidth * a.oheight, d.start = new Object, d.starto = new Object, d.end = new Object, d.endo = new Object, d.start.width = e, d.start.height = d.start.width / a.owidth * a.oheight, d.start.height < t) {
            var h = t / d.start.height;
            d.start.height = t, d.start.width = d.start.width * h
          }
          d.start.transformOrigin = a.bgposition, d.start.scale = i, d.end.scale = o, d.start.rotation = a.rotatestart + "deg", d.end.rotation = a.rotateend + "deg";
          var c = l(a, e, t, n, d);
          n[0] = parseFloat(n[0]) + c.start.l, r[0] = parseFloat(r[0]) + c.end.l, n[1] = parseFloat(n[1]) + c.start.t, r[1] = parseFloat(r[1]) + c.end.t;
          var u = c.start.r - c.start.l
            , f = c.start.b - c.start.t
            , v = c.end.r - c.end.l
            , g = c.end.b - c.end.t;
          return n[0] = n[0] > 0 ? 0 : u + n[0] < e ? e - u : n[0], r[0] = r[0] > 0 ? 0 : v + r[0] < e ? e - v : r[0], n[1] = n[1] > 0 ? 0 : f + n[1] < t ? t - f : n[1], r[1] = r[1] > 0 ? 0 : g + r[1] < t ? t - g : r[1], d.starto.x = n[0] + "px", d.starto.y = n[1] + "px", d.endo.x = r[0] + "px", d.endo.y = r[1] + "px", d.end.ease = d.endo.ease = a.ease, d.end.force3D = d.endo.force3D = !0, d
        };
      void 0 != e.data("kbtl") && (e.data("kbtl").kill(), e.removeData("kbtl"));
      var h = e.data("kenburn")
        , c = h.parent()
        , u = p(r, d, i)
        , f = new punchgs.TimelineLite;
      f.pause(), u.start.transformOrigin = "0% 0%", u.starto.transformOrigin = "0% 0%", f.add(punchgs.TweenLite.fromTo(h, i.duration / 1e3, u.start, u.end), 0), f.add(punchgs.TweenLite.fromTo(c, i.duration / 1e3, u.starto, u.endo), 0), f.progress(a), f.play(), e.data("kbtl", f)
    }
  })
}(jQuery), ! function() {
  function e(e, t, a, i, o, n, r) {
    var d = e.find(t);
    d.css("borderWidth", n + "px"), d.css(a, 0 - n + "px"), d.css(i, "0px solid transparent"), d.css(o, r)
  }
  var t = jQuery.fn.revolution;
  jQuery.extend(!0, t, {
    animcompleted: function(e, a) {
      var i = e.data("videotype")
        , o = e.data("autoplay")
        , n = e.data("autoplayonlyfirsttime");
      void 0 != i && "none" != i && (1 == o || "true" == o || "on" == o || "1sttime" == o || n ? (t.playVideo(e, a), (n || "1sttime" == o) && (e.data("autoplayonlyfirsttime", !1), e.data("autoplay", "off"))) : "no1sttime" == o && e.data("autoplay", "on"))
    }
    , handleStaticLayers: function(e, t) {
      var a = parseInt(e.data("startslide"), 0)
        , i = parseInt(e.data("endslide"), 0);
      0 > a && (a = 0), 0 > i && (i = t.slideamount), 0 === a && i === t.slideamount - 1 && (i = t.slideamount + 1), e.data("startslide", a), e.data("endslide", i)
    }
    , animateTheCaptions: function(e, a, i, o) {
      var n = "carousel" === a.sliderType ? 0 : a.width / 2 - a.gridwidth[a.curWinRange] * a.bw / 2
        , r = 0
        , d = e.data("index");
      a.layers = a.layers || new Object, a.layers[d] = a.layers[d] || e.find(".tp-caption"), a.layers["static"] = a.layers["static"] || a.c.find(".tp-static-layers").find(".tp-caption");
      var s = new Array;
      if (a.conh = a.c.height(), a.conw = a.c.width(), a.ulw = a.ul.width(), a.ulh = a.ul.height(), a.debugMode) {
        e.addClass("indebugmode"), e.find(".helpgrid").remove(), a.c.find(".hglayerinfo").remove(), e.append('<div class="helpgrid" style="width:' + a.gridwidth[a.curWinRange] * a.bw + "px;height:" + a.gridheight[a.curWinRange] * a.bw + 'px;"></div>');
        var l = e.find(".helpgrid");
        l.append('<div class="hginfo">Zoom:' + Math.round(100 * a.bw) + "% &nbsp;&nbsp;&nbsp; Device Level:" + a.curWinRange + "&nbsp;&nbsp;&nbsp; Grid Preset:" + a.gridwidth[a.curWinRange] + "x" + a.gridheight[a.curWinRange] + "</div>"), a.c.append('<div class="hglayerinfo"></div>'), l.append('<div class="tlhg"></div>')
      }
      s && jQuery.each(s, function() {
        var e = jQuery(this);
        punchgs.TweenLite.set(e.find(".tp-videoposter"), {
          autoAlpha: 1
        }), punchgs.TweenLite.set(e.find("iframe"), {
          autoAlpha: 0
        })
      }), a.layers[d] && jQuery.each(a.layers[d], function(e, t) {
        s.push(t)
      }), a.layers["static"] && jQuery.each(a.layers["static"], function(e, t) {
        s.push(t)
      }), s && jQuery.each(s, function(e) {
        t.animateSingleCaption(jQuery(this), a, n, r, e, i)
      });
      var p = jQuery("body").find("#" + a.c.attr("id")).find(".tp-bannertimer");
      p.data("opt", a), void 0 != o && setTimeout(function() {
        o.resume()
      }, 30)
    }
    , animateSingleCaption: function(i, n, f, m, w, b, y) {
      var x = b
        , T = p(i, n, "in", !0)
        , L = i.data("_pw") || i.closest(".tp-parallax-wrap")
        , _ = i.data("_lw") || i.closest(".tp-loop-wrap")
        , k = i.data("_mw") || i.closest(".tp-mask-wrap")
        , j = i.data("responsive") || "on"
        , z = i.data("responsive_offset") || "on"
        , C = i.data("basealign") || "grid"
        , I = "grid" === C ? n.width : n.ulw
        , O = "grid" === C ? n.height : n.ulh
        , Q = jQuery("body").hasClass("rtl");
      if (i.data("_pw") || (i.data("_pw", L), i.data("_lw", _), i.data("_mw", k)), "fullscreen" == n.sliderLayout && (m = O / 2 - n.gridheight[n.curWinRange] * n.bh / 2), ("on" == n.autoHeight || void 0 != n.minHeight && n.minHeight > 0) && (m = n.conh / 2 - n.gridheight[n.curWinRange] * n.bh / 2), 0 > m && (m = 0), n.debugMode) {
        i.closest("li").find(".helpgrid").css({
          top: m + "px"
          , left: f + "px"
        });
        var M = n.c.find(".hglayerinfo");
        i.on("hover, mouseenter", function() {
          var e = "";
          i.data() && jQuery.each(i.data(), function(t, a) {
            "object" != typeof a && (e = e + '<span style="white-space:nowrap"><span style="color:#27ae60">' + t + ":</span>" + a + "</span>&nbsp; &nbsp; ")
          }), M.html(e)
        })
      }
      var S = l(i.data("visibility"), n)[n.curWinRange] || l(i.data("visibility"), n) || "on";
      if ("off" == S || I < n.hideCaptionAtLimit && "on" == i.data("captionhidden") || I < n.hideAllCaptionAtLimit ? i.addClass("tp-hidden-caption") : i.removeClass("tp-hidden-caption"), i.data("layertype", "html"), 0 > f && (f = 0), void 0 != i.data("thumbimage") && void 0 == i.data("videoposter") && i.data("videoposter", i.data("thumbimage")), i.hasClass("tp-videolayer") && void 0 != i.data("videoposter") && "on" == i.data("posterOnMobile") && _ISM) {
        var P = l(i.data("videowidth"), n)[n.curWinRange] || l(i.data("videowidth"), n) || "auto"
          , W = l(i.data("videoheight"), n)[n.curWinRange] || l(i.data("videoheight"), n) || "auto";
        P = parseFloat(A), W = parseFloat(H), i.append('<div class="tp-videoposter" style="position:absolute;top:0px;left:0px;width:100%;height:100%;background-image:url(' + i.data("videoposter") + '); background-size:cover;background-position:center center;"></div>'), i.css("100%" != P ? {
          minWidth: P + "px"
          , minHeight: W + "px"
        } : {
          width: "100%"
          , height: "100%"
        }), i.removeClass("tp-videolayer")
      }
      if (i.find("img").length > 0) {
        var D = i.find("img");
        i.data("layertype", "image"), 0 == D.width() && D.css({
          width: "auto"
        }), 0 == D.height() && D.css({
          height: "auto"
        }), void 0 == D.data("ww") && D.width() > 0 && D.data("ww", D.width()), void 0 == D.data("hh") && D.height() > 0 && D.data("hh", D.height());
        var A = D.data("ww")
          , H = D.data("hh")
          , R = "slide" == C ? n.ulw : n.gridwidth[n.curWinRange]
          , Y = "slide" == C ? n.ulh : n.gridheight[n.curWinRange]
          , A = l(D.data("ww"), n)[n.curWinRange] || l(D.data("ww"), n) || "auto"
          , H = l(D.data("hh"), n)[n.curWinRange] || l(D.data("hh"), n) || "auto"
          , X = "full" === A || "full-proportional" === A
          , V = "full" === H || "full-proportional" === H;
        if ("full-proportional" === A) {
          var F = D.data("owidth")
            , B = D.data("oheight");
          B / Y > F / R ? (A = R, H = B * (R / F)) : (H = Y, A = F * (Y / B))
        } else A = X ? R : parseFloat(A), H = V ? Y : parseFloat(H);
        void 0 == A && (A = 0), void 0 == H && (H = 0), "off" !== j ? (D.width("grid" != C && X ? A : A * n.bw), D.height("grid" != C && V ? H : H * n.bh)) : (D.width(A), D.height(H))
      }
      if ("slide" === C && (f = 0, m = 0), i.hasClass("tp-videolayer") || i.find("iframe").length > 0 || i.find("video").length > 0) {
        i.data("layertype", "video"), t.manageVideoLayer(i, n, b, x), b || x || (i.data("videotype"), t.resetVideo(i, n));
        var N = i.data("aspectratio");
        void 0 != N && N.split(":").length > 1 && t.prepareCoveredVideo(N, n, i);
        var D = i.find("iframe") ? i.find("iframe") : D = i.find("video")
          , E = i.find("iframe") ? !1 : !0
          , Z = i.hasClass("coverscreenvideo");
        D.css({
          display: "block"
        }), void 0 == i.data("videowidth") && (i.data("videowidth", D.width()), i.data("videoheight", D.height()));
        var $, A = l(i.data("videowidth"), n)[n.curWinRange] || l(i.data("videowidth"), n) || "auto"
          , H = l(i.data("videoheight"), n)[n.curWinRange] || l(i.data("videoheight"), n) || "auto";
        A = parseFloat(A), H = parseFloat(H), void 0 === i.data("cssobj") && ($ = c(i, 0), i.data("cssobj", $));
        var q = u(i.data("cssobj"), n);
        if ("auto" == q.lineHeight && (q.lineHeight = q.fontSize + 4), i.hasClass("fullscreenvideo") || Z) {
          f = 0, m = 0, i.data("x", 0), i.data("y", 0);
          var U = O;
          "on" == n.autoHeight && (U = n.conh), i.css({
            width: I
            , height: U
          })
        } else punchgs.TweenLite.set(i, {
          paddingTop: Math.round(q.paddingTop * n.bh) + "px"
          , paddingBottom: Math.round(q.paddingBottom * n.bh) + "px"
          , paddingLeft: Math.round(q.paddingLeft * n.bw) + "px"
          , paddingRight: Math.round(q.paddingRight * n.bw) + "px"
          , marginTop: q.marginTop * n.bh + "px"
          , marginBottom: q.marginBottom * n.bh + "px"
          , marginLeft: q.marginLeft * n.bw + "px"
          , marginRight: q.marginRight * n.bw + "px"
          , borderTopWidth: Math.round(q.borderTopWidth * n.bh) + "px"
          , borderBottomWidth: Math.round(q.borderBottomWidth * n.bh) + "px"
          , borderLeftWidth: Math.round(q.borderLeftWidth * n.bw) + "px"
          , borderRightWidth: Math.round(q.borderRightWidth * n.bw) + "px"
          , width: A * n.bw + "px"
          , height: H * n.bh + "px"
        });
        (0 == E && !Z || 1 != i.data("forcecover") && !i.hasClass("fullscreenvideo") && !Z) && (D.width(A * n.bw), D.height(H * n.bh))
      }
      i.find(".tp-resizeme, .tp-resizeme *").each(function() {
        v(jQuery(this), n, "rekursive", j)
      }), i.hasClass("tp-resizeme") && i.find("*").each(function() {
        v(jQuery(this), n, "rekursive", j)
      }), v(i, n, 0, j);
      var G = i.outerHeight()
        , K = i.css("backgroundColor");
      e(i, ".frontcorner", "left", "borderRight", "borderTopColor", G, K), e(i, ".frontcornertop", "left", "borderRight", "borderBottomColor", G, K), e(i, ".backcorner", "right", "borderLeft", "borderBottomColor", G, K), e(i, ".backcornertop", "right", "borderLeft", "borderTopColor", G, K), "on" == n.fullScreenAlignForce && (f = 0, m = 0);
      var J = i.data("arrobj");
      if (void 0 === J) {
        var J = new Object;
        J.voa = l(i.data("voffset"), n)[n.curWinRange] || l(i.data("voffset"), n)[0], J.hoa = l(i.data("hoffset"), n)[n.curWinRange] || l(i.data("hoffset"), n)[0], J.elx = l(i.data("x"), n)[n.curWinRange] || l(i.data("x"), n)[0], J.ely = l(i.data("y"), n)[n.curWinRange] || l(i.data("y"), n)[0]
      }
      var et = 0 == J.voa.length ? 0 : J.voa
        , tt = 0 == J.hoa.length ? 0 : J.hoa
        , at = 0 == J.elx.length ? 0 : J.elx
        , it = 0 == J.ely.length ? 0 : J.ely
        , ot = i.outerWidth(!0)
        , nt = i.outerHeight(!0);
      0 == ot && 0 == nt && (ot = n.ulw, nt = n.ulh);
      var rt = "off" !== z ? parseInt(et, 0) * n.bw : parseInt(et, 0)
        , dt = "off" !== z ? parseInt(tt, 0) * n.bw : parseInt(tt, 0)
        , st = "grid" === C ? n.gridwidth[n.curWinRange] * n.bw : I
        , lt = "grid" === C ? n.gridheight[n.curWinRange] * n.bw : O;
      "on" == n.fullScreenAlignForce && (st = n.ulw, lt = n.ulh), at = "center" === at || "middle" === at ? st / 2 - ot / 2 + dt : "left" === at ? dt : "right" === at ? st - ot - dt : "off" !== z ? at * n.bw : at, it = "center" == it || "middle" == it ? lt / 2 - nt / 2 + rt : "top" == it ? rt : "bottom" == it ? lt - nt - rt : "off" !== z ? it * n.bw : it, Q && (at += ot);
      var pt = i.data("lasttriggerstate")
        , ht = i.data("triggerstate")
        , ct = i.data("start") || 100
        , ut = i.data("end")
        , ft = y ? 0 : "bytrigger" === ct || "sliderenter" === ct ? 0 : parseFloat(ct) / 1e3
        , vt = at + f
        , gt = it + m
        , mt = i.css("z-Index");
      y || ("reset" == pt && "bytrigger" != ct ? (i.data("triggerstate", "on"), i.data("animdirection", "in"), ht = "on") : "reset" == pt && "bytrigger" == ct && (i.data("triggerstate", "off"), i.data("animdirection", "out"), ht = "off")), punchgs.TweenLite.set(L, {
        zIndex: mt
        , top: gt
        , left: vt
        , overwrite: "auto"
      }), 0 == T && (x = !0), void 0 == i.data("timeline") || x || (2 != T && i.data("timeline").gotoAndPlay(0), x = !0), !b && i.data("timeline_out") && 2 != T && 0 != T && (i.data("timeline_out").kill(), i.data("outstarted", 0)), y && void 0 != i.data("timeline") && (i.removeData("$anims"), i.data("timeline").pause(0), i.data("timeline").kill(), void 0 != i.data("newhoveranim") && (i.data("newhoveranim").progress(0), i.data("newhoveranim").kill()), i.removeData("timeline"), punchgs.TweenLite.killTweensOf(i), i.unbind("hover"), i.removeClass("rs-hover-ready"), i.removeData("newhoveranim"));
      var wt = i.data("timeline") ? i.data("timeline").time() : 0
        , bt = void 0 !== i.data("timeline") ? i.data("timeline").progress() : 0
        , yt = i.data("timeline") || new punchgs.TimelineLite({
          smoothChildTiming: !0
        });
      if (bt = jQuery.isNumeric(bt) ? bt : 0, yt.pause(), 1 > bt && 1 != i.data("outstarted") || 2 == T || y) {
        var xt = i;
        if (void 0 != i.data("mySplitText") && i.data("mySplitText").revert(), void 0 != i.data("splitin") && i.data("splitin").match(/chars|words|lines/g) || void 0 != i.data("splitout") && i.data("splitout").match(/chars|words|lines/g)) {
          var Tt = i.find("a").length > 0 ? i.find("a") : i;
          i.data("mySplitText", new punchgs.SplitText(Tt, {
            type: "lines,words,chars"
            , charsClass: "tp-splitted"
            , wordsClass: "tp-splitted"
            , linesClass: "tp-splitted"
          })), i.addClass("splitted")
        }
        void 0 !== i.data("mySplitText") && i.data("splitin") && i.data("splitin").match(/chars|words|lines/g) && (xt = i.data("mySplitText")[i.data("splitin")]);
        var Lt = new Object
          , _t = void 0 != i.data("transform_in") ? i.data("transform_in").match(/\(R\)/gi) : !1;
        if (!i.data("$anims") || y || _t) {
          var kt = a()
            , jt = a()
            , zt = o()
            , Ct = void 0 !== i.data("transform_hover") || void 0 !== i.data("style_hover");
          jt = d(jt, i.data("transform_idle")), kt = d(jt, i.data("transform_in"), 1 == n.sdir), Ct && (zt = d(zt, i.data("transform_hover")), zt = h(zt, i.data("style_hover")), i.data("hover", zt)), kt.elemdelay = void 0 == i.data("elementdelay") ? 0 : i.data("elementdelay"), jt.anim.ease = kt.anim.ease = kt.anim.ease || punchgs.Power1.easeInOut, Ct && !i.hasClass("rs-hover-ready") && (i.addClass("rs-hover-ready"), i.hover(function(e) {
            var t = jQuery(e.currentTarget)
              , a = t.data("hover")
              , i = t.data("timeline");
            i && 1 == i.progress() && (void 0 === t.data("newhoveranim") || "none" === t.data("newhoveranim") ? t.data("newhoveranim", punchgs.TweenLite.to(t, a.speed, a.anim)) : (t.data("newhoveranim").progress(0), t.data("newhoveranim").play()))
          }, function(e) {
            var t = jQuery(e.currentTarget)
              , a = t.data("timeline");
            a && 1 == a.progress() && void 0 != t.data("newhoveranim") && t.data("newhoveranim").reverse()
          })), Lt = new Object, Lt.f = kt, Lt.r = jt, i.data("$anims")
        } else Lt = i.data("$anims");
        var It = s(i.data("mask_in"))
          , Ot = new punchgs.TimelineLite;
        if (Lt.f.anim.x = Lt.f.anim.x * n.bw || r(Lt.f.anim.x, n, ot, nt, gt, vt, "horizontal"), Lt.f.anim.y = Lt.f.anim.y * n.bw || r(Lt.f.anim.y, n, ot, nt, gt, vt, "vertical"), 2 != T || y) {
          if (xt != i) {
            var Qt = Lt.r.anim.ease;
            yt.add(punchgs.TweenLite.set(i, Lt.r.anim)), Lt.r = a(), Lt.r.anim.ease = Qt
          }
          if (Lt.f.anim.visibility = "hidden", Ot.eventCallback("onStart", function() {
              punchgs.TweenLite.set(i, {
                visibility: "visible"
              }), i.data("iframes") && i.find("iframe").each(function() {
                punchgs.TweenLite.set(jQuery(this), {
                  autoAlpha: 1
                })
              }), punchgs.TweenLite.set(L, {
                visibility: "visible"
              });
              var e = {};
              e.layer = i, e.eventtype = "enterstage", e.layertype = i.data("layertype"), e.layersettings = i.data(), n.c.trigger("revolution.layeraction", e)
            }), Ot.eventCallback("onComplete", function() {
              var e = {};
              e.layer = i, e.eventtype = "enteredstage", e.layertype = i.data("layertype"), e.layersettings = i.data(), n.c.trigger("revolution.layeraction", e), t.animcompleted(i, n)
            }), "sliderenter" == ct && n.overcontainer && (ft = .6), yt.add(Ot.staggerFromTo(xt, Lt.f.speed, Lt.f.anim, Lt.r.anim, Lt.f.elemdelay), ft), It) {
            var Mt = new Object;
            Mt.ease = Lt.r.anim.ease, Mt.overflow = It.anim.overflow = "hidden", Mt.x = Mt.y = 0, It.anim.x = It.anim.x * n.bw || r(It.anim.x, n, ot, nt, gt, vt, "horizontal"), It.anim.y = It.anim.y * n.bw || r(It.anim.y, n, ot, nt, gt, vt, "vertical"), yt.add(punchgs.TweenLite.fromTo(k, Lt.f.speed, It.anim, Mt, kt.elemdelay), ft)
          } else yt.add(punchgs.TweenLite.set(k, {
            overflow: "visible"
          }, kt.elemdelay), 0)
        }
        i.data("timeline", yt), T = p(i, n, "in"), 0 !== bt && 2 != T || "bytrigger" === ut || y || "sliderleave" == ut || (void 0 == ut || -1 != T && 2 != T || "bytriger" === ut ? punchgs.TweenLite.delayedCall(999999, t.endMoveCaption, [i, k, L, n]) : punchgs.TweenLite.delayedCall(parseInt(i.data("end"), 0) / 1e3, t.endMoveCaption, [i, k, L, n])), yt = i.data("timeline"), "on" == i.data("loopanimation") && g(_, n.bw), ("sliderenter" != ct || "sliderenter" == ct && n.overcontainer) && (-1 == T || 1 == T || y || 0 == T && 1 > bt && i.hasClass("rev-static-visbile")) && (1 > bt && bt > 0 || 0 == bt && "bytrigger" != ct && "keep" != pt || 0 == bt && "bytrigger" != ct && "keep" == pt && "on" == ht || "bytrigger" == ct && "keep" == pt && "on" == ht) && yt.resume(wt)
      }
      "on" == i.data("loopanimation") && punchgs.TweenLite.set(_, {
        minWidth: ot
        , minHeight: nt
      }), 0 == i.data("slidelink") || 1 != i.data("slidelink") && !i.hasClass("slidelink") ? (punchgs.TweenLite.set(k, {
        width: "auto"
        , height: "auto"
      }), i.data("slidelink", 0)) : (punchgs.TweenLite.set(k, {
        width: "100%"
        , height: "100%"
      }), i.data("slidelink", 1))
    }
    , endMoveCaption: function(e, t, o, n) {
      if (t = t || e.data("_mw"), o = o || e.data("_pw"), e.data("outstarted", 1), e.data("timeline")) e.data("timeline").pause();
      else if (void 0 === e.data("_pw")) return;
      var l = new punchgs.TimelineLite
        , p = new punchgs.TimelineLite
        , h = new punchgs.TimelineLite
        , c = d(a(), e.data("transform_in"), 1 == n.sdir)
        , u = e.data("transform_out") ? d(i(), e.data("transform_out"), 1 == n.sdir) : d(i(), e.data("transform_in"), 1 == n.sdir)
        , f = e.data("splitout") && e.data("splitout").match(/words|chars|lines/g) ? e.data("mySplitText")[e.data("splitout")] : e
        , v = void 0 == e.data("endelementdelay") ? 0 : e.data("endelementdelay")
        , g = e.innerWidth()
        , m = e.innerHeight()
        , w = o.position();
      e.data("transform_out") && e.data("transform_out").match(/auto:auto/g) && (c.speed = u.speed, c.anim.ease = u.anim.ease, u = c);
      var b = s(e.data("mask_out"));
      u.anim.x = u.anim.x * n.bw || r(u.anim.x, n, g, m, w.top, w.left, "horizontal"), u.anim.y = u.anim.y * n.bw || r(u.anim.y, n, g, m, w.top, w.left, "vertical"), p.eventCallback("onStart", function() {
        var t = {};
        t.layer = e, t.eventtype = "leavestage", t.layertype = e.data("layertype"), t.layersettings = e.data(), n.c.trigger("revolution.layeraction", t)
      }), p.eventCallback("onComplete", function() {
        punchgs.TweenLite.set(e, {
          visibility: "hidden"
        }), punchgs.TweenLite.set(o, {
          visibility: "hidden"
        });
        var t = {};
        t.layer = e, t.eventtype = "leftstage", t.layertype = e.data("layertype"), t.layersettings = e.data(), n.c.trigger("revolution.layeraction", t)
      }), l.add(p.staggerTo(f, u.speed, u.anim, v), 0), b ? (b.anim.ease = u.anim.ease, b.anim.overflow = "hidden", b.anim.x = b.anim.x * n.bw || r(b.anim.x, n, g, m, w.top, w.left, "horizontal"), b.anim.y = b.anim.y * n.bw || r(b.anim.y, n, g, m, w.top, w.left, "vertical"), l.add(h.to(t, u.speed, b.anim, v), 0)) : l.add(h.set(t, {
        overflow: "visible"
        , overwrite: "auto"
      }, v), 0), e.data("timeline_out", l)
    }
    , removeTheCaptions: function(e, a) {
      var i = e.data("index")
        , o = new Array;
      a.layers[i] && jQuery.each(a.layers[i], function(e, t) {
        o.push(t)
      }), a.layers["static"] && jQuery.each(a.layers["static"], function(e, t) {
        o.push(t)
      }), punchgs.TweenLite.killDelayedCallsTo(t.endMoveCaption), o && jQuery.each(o, function() {
        var e = jQuery(this)
          , i = p(e, a, "out");
        0 != i && (m(e), clearTimeout(e.data("videoplaywait")), t.stopVideo && t.stopVideo(e, a), t.endMoveCaption(e, null, null, a), a.playingvideos = [], a.lastplayedvideos = [])
      })
    }
  });
  var a = function() {
      var e = new Object;
      return e.anim = new Object, e.anim.x = 0, e.anim.y = 0, e.anim.z = 0, e.anim.rotationX = 0, e.anim.rotationY = 0, e.anim.rotationZ = 0, e.anim.scaleX = 1, e.anim.scaleY = 1, e.anim.skewX = 0, e.anim.skewY = 0, e.anim.opacity = 1, e.anim.transformOrigin = "50% 50%", e.anim.transformPerspective = 600, e.anim.rotation = 0, e.anim.ease = punchgs.Power3.easeOut, e.anim.force3D = "auto", e.speed = .3, e.anim.autoAlpha = 1, e.anim.visibility = "visible", e.anim.overwrite = "all", e
    }
    , i = function() {
      var e = new Object;
      return e.anim = new Object, e.anim.x = 0, e.anim.y = 0, e.anim.z = 0, e
    }
    , o = function() {
      var e = new Object;
      return e.anim = new Object, e.speed = .2, e
    }
    , n = function(e, t) {
      if (jQuery.isNumeric(parseFloat(e))) return parseFloat(e);
      if (void 0 === e || "inherit" === e) return t;
      if (e.split("{").length > 1) {
        var a = e.split(",")
          , i = parseFloat(a[1].split("}")[0]);
        a = parseFloat(a[0].split("{")[1]), e = Math.random() * (i - a) + a
      }
      return e
    }
    , r = function(e, t, a, i, o, n, r) {
      return !jQuery.isNumeric(e) && e.match(/%]/g) ? (e = e.split("[")[1].split("]")[0], "horizontal" == r ? e = (a + 2) * parseInt(e, 0) / 100 : "vertical" == r && (e = (i + 2) * parseInt(e, 0) / 100)) : (e = "layer_left" === e ? 0 - a : "layer_right" === e ? a : e, e = "layer_top" === e ? 0 - i : "layer_bottom" === e ? i : e, e = "left" === e || "stage_left" === e ? 0 - a - n : "right" === e || "stage_right" === e ? t.conw - n : "center" === e || "stage_center" === e ? t.conw / 2 - a / 2 - n : e, e = "top" === e || "stage_top" === e ? 0 - i - o : "bottom" === e || "stage_bottom" === e ? t.conh - o : "middle" === e || "stage_middle" === e ? t.conh / 2 - i / 2 - o : e), e
    }
    , d = function(e, t, a) {
      var i = new Object;
      if (i = jQuery.extend(!0, {}, i, e), void 0 === t) return i;
      var o = t.split(";");
      return o && jQuery.each(o, function(e, t) {
        var o = t.split(":")
          , r = o[0]
          , d = o[1];
        a && void 0 != d && d.length > 0 && d.match(/\(R\)/) && (d = d.replace("(R)", ""), d = "right" === d ? "left" : "left" === d ? "right" : "top" === d ? "bottom" : "bottom" === d ? "top" : d, "[" === d[0] && "-" === d[1] ? d = d.replace("[-", "[") : "[" === d[0] && "-" !== d[1] ? d = d.replace("[", "[-") : "-" === d[0] ? d = d.replace("-", "") : d[0].match(/[1-9]/) && (d = "-" + d)), void 0 != d && (d = d.replace(/\(R\)/, ""), ("rotationX" == r || "rX" == r) && (i.anim.rotationX = n(d, i.anim.rotationX) + "deg"), ("rotationY" == r || "rY" == r) && (i.anim.rotationY = n(d, i.anim.rotationY) + "deg"), ("rotationZ" == r || "rZ" == r) && (i.anim.rotation = n(d, i.anim.rotationZ) + "deg"), ("scaleX" == r || "sX" == r) && (i.anim.scaleX = n(d, i.anim.scaleX)), ("scaleY" == r || "sY" == r) && (i.anim.scaleY = n(d, i.anim.scaleY)), ("opacity" == r || "o" == r) && (i.anim.opacity = n(d, i.anim.opacity)), ("skewX" == r || "skX" == r) && (i.anim.skewX = n(d, i.anim.skewX)), ("skewY" == r || "skY" == r) && (i.anim.skewY = n(d, i.anim.skewY)), "x" == r && (i.anim.x = n(d, i.anim.x)), "y" == r && (i.anim.y = n(d, i.anim.y)), "z" == r && (i.anim.z = n(d, i.anim.z)), ("transformOrigin" == r || "tO" == r) && (i.anim.transformOrigin = d.toString()), ("transformPerspective" == r || "tP" == r) && (i.anim.transformPerspective = parseInt(d, 0)), ("speed" == r || "s" == r) && (i.speed = parseFloat(d) / 1e3), ("ease" == r || "e" == r) && (i.anim.ease = d))
      }), i
    }
    , s = function(e) {
      if (void 0 === e) return !1;
      var t = new Object;
      t.anim = new Object;
      var a = e.split(";");
      return a && jQuery.each(a, function(e, a) {
        a = a.split(":");
        var i = a[0]
          , o = a[1];
        "x" == i && (t.anim.x = o), "y" == i && (t.anim.y = o), "s" == i && (t.speed = parseFloat(o) / 1e3), ("e" == i || "ease" == i) && (t.anim.ease = o)
      }), t
    }
    , l = function(e, t) {
      if (void 0 == e && (e = 0), !jQuery.isArray(e) && "string" === jQuery.type(e) && (e.split(",").length > 1 || e.split("[").length > 1)) {
        e = e.replace("[", ""), e = e.replace("]", "");
        var a = e.split(e.match(/'/g) ? "'," : ",");
        e = new Array, a && jQuery.each(a, function(t, a) {
          a = a.replace("'", ""), a = a.replace("'", ""), e.push(a)
        })
      } else {
        var i = e;
        jQuery.isArray(e) || (e = new Array, e.push(i))
      }
      var i = e[e.length - 1];
      if (e.length < t.rle)
        for (var o = 1; o <= t.curWinRange; o++) e.push(i);
      return e
    }
    , p = function(e, t, a, i) {
      var o = -1;
      if (e.hasClass("tp-static-layer")) {
        var n = parseInt(e.data("startslide"), 0)
          , r = parseInt(e.data("endslide"), 0)
          , d = t.c.find(".processing-revslide").index()
          , s = -1 != d ? d : t.c.find(".active-revslide").index();
        s = -1 == s ? 0 : s, "in" === a ? e.hasClass("rev-static-visbile") ? o = r == s || n > s || s > r ? 2 : 0 : s >= n && r >= s || n == s || r == s ? (i || (e.addClass("rev-static-visbile"), e.removeClass("rev-static-hidden")), o = 1) : o = 0 : e.hasClass("rev-static-visbile") ? n > s || s > r ? (o = 2, i || (e.removeClass("rev-static-visbile"), e.addClass("rev-static-hidden"))) : o = 0 : o = 2
      }
      return o
    }
    , h = function(e, t) {
      if (void 0 === t) return e;
      t = t.replace("c:", "color:"), t = t.replace("bg:", "background-color:"), t = t.replace("bw:", "border-width:"), t = t.replace("bc:", "border-color:"), t = t.replace("br:", "borderRadius:"), t = t.replace("bs:", "border-style:"), t = t.replace("td:", "text-decoration:");
      var a = t.split(";");
      return a && jQuery.each(a, function(t, a) {
        var i = a.split(":");
        i[0].length > 0 && (e.anim[i[0]] = i[1])
      }), e
    }
    , c = function(e, t) {
      var a, i = new Object
        , o = !1;
      if ("rekursive" == t && (a = e.closest(".tp-caption"), a && e.css("fontSize") === a.css("fontSize") && (o = !0)), i.basealign = e.data("basealign") || "grid", i.fontSize = o ? void 0 === a.data("fontsize") ? parseInt(a.css("fontSize"), 0) || 0 : a.data("fontsize") : void 0 === e.data("fontsize") ? parseInt(e.css("fontSize"), 0) || 0 : e.data("fontsize"), i.fontWeight = o ? void 0 === a.data("fontweight") ? parseInt(a.css("fontWeight"), 0) || 0 : a.data("fontweight") : void 0 === e.data("fontweight") ? parseInt(e.css("fontWeight"), 0) || 0 : e.data("fontweight"), i.whiteSpace = o ? void 0 === a.data("whitespace") ? a.css("whitespace") || "normal" : a.data("whitespace") : void 0 === e.data("whitespace") ? e.css("whitespace") || "normal" : e.data("whitespace"), i.lineHeight = o ? void 0 === a.data("lineheight") ? parseInt(a.css("lineHeight"), 0) || 0 : a.data("lineheight") : void 0 === e.data("lineheight") ? parseInt(e.css("lineHeight"), 0) || 0 : e.data("lineheight"), i.letterSpacing = o ? void 0 === a.data("letterspacing") ? parseFloat(a.css("letterSpacing"), 0) || 0 : a.data("letterspacing") : void 0 === e.data("letterspacing") ? parseFloat(e.css("letterSpacing")) || 0 : e.data("letterspacing"), i.paddingTop = void 0 === e.data("paddingtop") ? parseInt(e.css("paddingTop"), 0) || 0 : e.data("paddingtop"), i.paddingBottom = void 0 === e.data("paddingbottom") ? parseInt(e.css("paddingBottom"), 0) || 0 : e.data("paddingbottom"), i.paddingLeft = void 0 === e.data("paddingleft") ? parseInt(e.css("paddingLeft"), 0) || 0 : e.data("paddingleft"), i.paddingRight = void 0 === e.data("paddingright") ? parseInt(e.css("paddingRight"), 0) || 0 : e.data("paddingright"), i.marginTop = void 0 === e.data("margintop") ? parseInt(e.css("marginTop"), 0) || 0 : e.data("margintop"), i.marginBottom = void 0 === e.data("marginbottom") ? parseInt(e.css("marginBottom"), 0) || 0 : e.data("marginbottom"), i.marginLeft = void 0 === e.data("marginleft") ? parseInt(e.css("marginLeft"), 0) || 0 : e.data("marginleft"), i.marginRight = void 0 === e.data("marginright") ? parseInt(e.css("marginRight"), 0) || 0 : e.data("marginright"), i.borderTopWidth = void 0 === e.data("bordertopwidth") ? parseInt(e.css("borderTopWidth"), 0) || 0 : e.data("bordertopwidth"), i.borderBottomWidth = void 0 === e.data("borderbottomwidth") ? parseInt(e.css("borderBottomWidth"), 0) || 0 : e.data("borderbottomwidth"), i.borderLeftWidth = void 0 === e.data("borderleftwidth") ? parseInt(e.css("borderLeftWidth"), 0) || 0 : e.data("borderleftwidth"), i.borderRightWidth = void 0 === e.data("borderrightwidth") ? parseInt(e.css("borderRightWidth"), 0) || 0 : e.data("borderrightwidth"), "rekursive" != t) {
        if (i.color = void 0 === e.data("color") ? "nopredefinedcolor" : e.data("color"), i.whiteSpace = o ? void 0 === a.data("whitespace") ? a.css("whiteSpace") || "nowrap" : a.data("whitespace") : void 0 === e.data("whitespace") ? e.css("whiteSpace") || "nowrap" : e.data("whitespace"), i.minWidth = void 0 === e.data("width") ? parseInt(e.css("minWidth"), 0) || 0 : e.data("width"), i.minHeight = void 0 === e.data("height") ? parseInt(e.css("minHeight"), 0) || 0 : e.data("height"), void 0 != e.data("videowidth") && void 0 != e.data("videoheight")) {
          var n = e.data("videowidth")
            , r = e.data("videoheight");
          n = "100%" === n ? "none" : n, r = "100%" === r ? "none" : r, e.data("width", n), e.data("height", r)
        }
        i.maxWidth = void 0 === e.data("width") ? parseInt(e.css("maxWidth"), 0) || "none" : e.data("width"), i.maxHeight = void 0 === e.data("height") ? parseInt(e.css("maxHeight"), 0) || "none" : e.data("height"), i.wan = void 0 === e.data("wan") ? parseInt(e.css("-webkit-transition"), 0) || "none" : e.data("wan"), i.moan = void 0 === e.data("moan") ? parseInt(e.css("-moz-animation-transition"), 0) || "none" : e.data("moan"), i.man = void 0 === e.data("man") ? parseInt(e.css("-ms-animation-transition"), 0) || "none" : e.data("man"), i.ani = void 0 === e.data("ani") ? parseInt(e.css("transition"), 0) || "none" : e.data("ani")
      }
      return i.styleProps = e.css(["background-color", "border-top-color", "border-bottom-color", "border-right-color", "border-left-color", "border-top-style", "border-bottom-style", "border-left-style", "border-right-style", "border-left-width", "border-right-width", "border-bottom-width", "border-top-width", "color", "text-decoration", "font-style", "border-radius"]), i
    }
    , u = function(e, t) {
      var a = new Object;
      return e && jQuery.each(e, function(i, o) {
        a[i] = l(o, t)[t.curWinRange] || e[i]
      }), a
    }
    , f = function(e, t, a, i) {
      return e = jQuery.isNumeric(e) ? e * t + "px" : e, e = "full" === e ? i : "auto" === e || "none" === e ? a : e
    }
    , v = function(e, t, a, i) {
      var o;
      void 0 === e.data("cssobj") ? (o = c(e, a), e.data("cssobj", o)) : o = e.data("cssobj");
      var n = u(o, t)
        , r = t.bw
        , d = t.bh;
      if ("off" === i && (r = 1, d = 1), "auto" == n.lineHeight && (n.lineHeight = n.fontSize + 4), !e.hasClass("tp-splitted")) {
        e.css("-webkit-transition", "none"), e.css("-moz-transition", "none"), e.css("-ms-transition", "none"), e.css("transition", "none");
        var s = void 0 !== e.data("transform_hover") || void 0 !== e.data("style_hover");
        if (s && punchgs.TweenLite.set(e, n.styleProps), punchgs.TweenLite.set(e, {
            fontSize: Math.round(n.fontSize * r) + "px"
            , fontWeight: n.fontWeight
            , letterSpacing: Math.floor(n.letterSpacing * r) + "px"
            , paddingTop: Math.round(n.paddingTop * d) + "px"
            , paddingBottom: Math.round(n.paddingBottom * d) + "px"
            , paddingLeft: Math.round(n.paddingLeft * r) + "px"
            , paddingRight: Math.round(n.paddingRight * r) + "px"
            , marginTop: n.marginTop * d + "px"
            , marginBottom: n.marginBottom * d + "px"
            , marginLeft: n.marginLeft * r + "px"
            , marginRight: n.marginRight * r + "px"
            , borderTopWidth: Math.round(n.borderTopWidth * d) + "px"
            , borderBottomWidth: Math.round(n.borderBottomWidth * d) + "px"
            , borderLeftWidth: Math.round(n.borderLeftWidth * r) + "px"
            , borderRightWidth: Math.round(n.borderRightWidth * r) + "px"
            , lineHeight: Math.round(n.lineHeight * d) + "px"
            , overwrite: "auto"
          }), "rekursive" != a) {
          var l = "slide" == n.basealign ? t.ulw : t.gridwidth[t.curWinRange]
            , p = "slide" == n.basealign ? t.ulh : t.gridheight[t.curWinRange]
            , h = f(n.maxWidth, r, "none", l)
            , v = f(n.maxHeight, d, "none", p)
            , g = f(n.minWidth, r, "0px", l)
            , m = f(n.minHeight, d, "0px", p);
          punchgs.TweenLite.set(e, {
            maxWidth: h
            , maxHeight: v
            , minWidth: g
            , minHeight: m
            , whiteSpace: n.whiteSpace
            , overwrite: "auto"
          }), "nopredefinedcolor" != n.color && punchgs.TweenLite.set(e, {
            color: n.color
            , overwrite: "auto"
          })
        }
        setTimeout(function() {
          e.css("-webkit-transition", e.data("wan")), e.css("-moz-transition", e.data("moan")), e.css("-ms-transition", e.data("man")), e.css("transition", e.data("ani"))
        }, 30)
      }
    }
    , g = function(e, t) {
      if (e.hasClass("rs-pendulum") && void 0 == e.data("loop-timeline")) {
        e.data("loop-timeline", new punchgs.TimelineLite);
        var a = void 0 == e.data("startdeg") ? -20 : e.data("startdeg")
          , i = void 0 == e.data("enddeg") ? 20 : e.data("enddeg")
          , o = void 0 == e.data("speed") ? 2 : e.data("speed")
          , n = void 0 == e.data("origin") ? "50% 50%" : e.data("origin")
          , r = void 0 == e.data("easing") ? punchgs.Power2.easeInOut : e.data("ease");
        a *= t, i *= t, e.data("loop-timeline").append(new punchgs.TweenLite.fromTo(e, o, {
          force3D: "auto"
          , rotation: a
          , transformOrigin: n
        }, {
          rotation: i
          , ease: r
        })), e.data("loop-timeline").append(new punchgs.TweenLite.fromTo(e, o, {
          force3D: "auto"
          , rotation: i
          , transformOrigin: n
        }, {
          rotation: a
          , ease: r
          , onComplete: function() {
            e.data("loop-timeline").restart()
          }
        }))
      }
      if (e.hasClass("rs-rotate") && void 0 == e.data("loop-timeline")) {
        e.data("loop-timeline", new punchgs.TimelineLite);
        var a = void 0 == e.data("startdeg") ? 0 : e.data("startdeg")
          , i = void 0 == e.data("enddeg") ? 360 : e.data("enddeg");
        o = void 0 == e.data("speed") ? 2 : e.data("speed"), n = void 0 == e.data("origin") ? "50% 50%" : e.data("origin"), r = void 0 == e.data("easing") ? punchgs.Power2.easeInOut : e.data("easing"), a *= t, i *= t, e.data("loop-timeline").append(new punchgs.TweenLite.fromTo(e, o, {
          force3D: "auto"
          , rotation: a
          , transformOrigin: n
        }, {
          rotation: i
          , ease: r
          , onComplete: function() {
            e.data("loop-timeline").restart()
          }
        }))
      }
      if (e.hasClass("rs-slideloop") && void 0 == e.data("loop-timeline")) {
        e.data("loop-timeline", new punchgs.TimelineLite);
        var d = void 0 == e.data("xs") ? 0 : e.data("xs")
          , s = void 0 == e.data("ys") ? 0 : e.data("ys")
          , l = void 0 == e.data("xe") ? 0 : e.data("xe")
          , p = void 0 == e.data("ye") ? 0 : e.data("ye")
          , o = void 0 == e.data("speed") ? 2 : e.data("speed")
          , r = void 0 == e.data("easing") ? punchgs.Power2.easeInOut : e.data("easing");
        d *= t, s *= t, l *= t, p *= t, e.data("loop-timeline").append(new punchgs.TweenLite.fromTo(e, o, {
          force3D: "auto"
          , x: d
          , y: s
        }, {
          x: l
          , y: p
          , ease: r
        })), e.data("loop-timeline").append(new punchgs.TweenLite.fromTo(e, o, {
          force3D: "auto"
          , x: l
          , y: p
        }, {
          x: d
          , y: s
          , onComplete: function() {
            e.data("loop-timeline").restart()
          }
        }))
      }
      if (e.hasClass("rs-pulse") && void 0 == e.data("loop-timeline")) {
        e.data("loop-timeline", new punchgs.TimelineLite);
        var h = void 0 == e.data("zoomstart") ? 0 : e.data("zoomstart")
          , c = void 0 == e.data("zoomend") ? 0 : e.data("zoomend")
          , o = void 0 == e.data("speed") ? 2 : e.data("speed")
          , r = void 0 == e.data("easing") ? punchgs.Power2.easeInOut : e.data("easing");
        e.data("loop-timeline").append(new punchgs.TweenLite.fromTo(e, o, {
          force3D: "auto"
          , scale: h
        }, {
          scale: c
          , ease: r
        })), e.data("loop-timeline").append(new punchgs.TweenLite.fromTo(e, o, {
          force3D: "auto"
          , scale: c
        }, {
          scale: h
          , onComplete: function() {
            e.data("loop-timeline").restart()
          }
        }))
      }
      if (e.hasClass("rs-wave") && void 0 == e.data("loop-timeline")) {
        e.data("loop-timeline", new punchgs.TimelineLite);
        var u = void 0 == e.data("angle") ? 10 : parseInt(e.data("angle"), 0)
          , f = void 0 == e.data("radius") ? 10 : parseInt(e.data("radius"), 0)
          , o = void 0 == e.data("speed") ? -20 : e.data("speed")
          , n = void 0 == e.data("origin") ? "50% 50%" : e.data("origin")
          , v = n.split(" ")
          , g = new Object;
        v.length >= 1 ? (g.x = v[0], g.y = v[1]) : (g.x = "50%", g.y = "50%"), u *= t, f *= t;
        var m = 0 - e.height() / 2 + f * (-1 + parseInt(g.y, 0) / 100)
          , w = e.width() * (-.5 + parseInt(g.x, 0) / 100)
          , b = {
            a: 0
            , ang: u
            , element: e
            , unit: f
            , xoffset: w
            , yoffset: m
          };
        e.data("loop-timeline").append(new punchgs.TweenLite.fromTo(b, o, {
          a: 360
        }, {
          a: 0
          , force3D: "auto"
          , ease: punchgs.Linear.easeNone
          , onUpdate: function() {
            var e = b.a * (Math.PI / 180);
            punchgs.TweenLite.to(b.element, .1, {
              force3D: "auto"
              , x: b.xoffset + Math.cos(e) * b.unit
              , y: b.yoffset + b.unit * (1 - Math.sin(e))
            })
          }
          , onComplete: function() {
            e.data("loop-timeline").restart()
          }
        }))
      }
    }
    , m = function(e) {
      e.find(".rs-pendulum, .rs-slideloop, .rs-pulse, .rs-wave").each(function() {
        var e = jQuery(this);
        void 0 != e.data("loop-timeline") && (e.data("loop-timeline").pause(), e.data("loop-timeline", null))
      })
    }
}(jQuery), ! function() {
  var e = jQuery.fn.revolution
    , t = e.is_mobile();
  jQuery.extend(!0, e, {
    hideUnHideNav: function(e) {
      var t = e.c.width()
        , a = e.navigation.arrows
        , i = e.navigation.bullets
        , o = e.navigation.thumbnails
        , n = e.navigation.tabs;
      p(a) && T(e.c.find(".tparrows"), a.hide_under, t, a.hide_over), p(i) && T(e.c.find(".tp-bullets"), i.hide_under, t, i.hide_over), p(o) && T(e.c.parent().find(".tp-thumbs"), o.hide_under, t, o.hide_over), p(n) && T(e.c.parent().find(".tp-tabs"), n.hide_under, t, n.hide_over), x(e)
    }
    , resizeThumbsTabs: function(e) {
      if (e.navigation && e.navigation.tabs.enable || e.navigation && e.navigation.thumbnails.enable) {
        var t = (jQuery(window).width() - 480) / 500
          , a = new punchgs.TimelineLite
          , o = e.navigation.tabs
          , n = e.navigation.thumbnails;
        a.pause(), t = t > 1 ? 1 : 0 > t ? 0 : t, p(o) && o.width > o.min_width && i(t, a, e.c, o, e.slideamount, "tab"), p(n) && n.width > n.min_width && i(t, a, e.c, n, e.slideamount, "thumb"), a.play(), x(e)
      }
      return !0
    }
    , manageNavigation: function(t) {
      var i = e.getHorizontalOffset(t.c.parent(), "left")
        , o = e.getHorizontalOffset(t.c.parent(), "right");
      p(t.navigation.bullets) && ("fullscreen" != t.sliderLayout && "fullwidth" != t.sliderLayout && (t.navigation.bullets.h_offset_old = void 0 === t.navigation.bullets.h_offset_old ? t.navigation.bullets.h_offset : t.navigation.bullets.h_offset_old, t.navigation.bullets.h_offset = "center" === t.navigation.bullets.h_align ? t.navigation.bullets.h_offset_old + i / 2 - o / 2 : t.navigation.bullets.h_offset_old + i - o), m(t.c.find(".tp-bullets"), t.navigation.bullets)), p(t.navigation.thumbnails) && m(t.c.parent().find(".tp-thumbs"), t.navigation.thumbnails), p(t.navigation.tabs) && m(t.c.parent().find(".tp-tabs"), t.navigation.tabs), p(t.navigation.arrows) && ("fullscreen" != t.sliderLayout && "fullwidth" != t.sliderLayout && (t.navigation.arrows.left.h_offset_old = void 0 === t.navigation.arrows.left.h_offset_old ? t.navigation.arrows.left.h_offset : t.navigation.arrows.left.h_offset_old, t.navigation.arrows.left.h_offset = "right" === t.navigation.arrows.left.h_align ? t.navigation.arrows.left.h_offset_old + o : t.navigation.arrows.left.h_offset_old + i, t.navigation.arrows.right.h_offset_old = void 0 === t.navigation.arrows.right.h_offset_old ? t.navigation.arrows.right.h_offset : t.navigation.arrows.right.h_offset_old, t.navigation.arrows.right.h_offset = "right" === t.navigation.arrows.right.h_align ? t.navigation.arrows.right.h_offset_old + o : t.navigation.arrows.right.h_offset_old + i), m(t.c.find(".tp-leftarrow.tparrows"), t.navigation.arrows.left), m(t.c.find(".tp-rightarrow.tparrows"), t.navigation.arrows.right)), p(t.navigation.thumbnails) && a(t.c.parent().find(".tp-thumbs"), t.navigation.thumbnails), p(t.navigation.tabs) && a(t.c.parent().find(".tp-tabs"), t.navigation.tabs)
    }
    , createNavigation: function(e, i) {
      var o = e.parent()
        , d = i.navigation.arrows
        , h = i.navigation.bullets
        , v = i.navigation.thumbnails
        , g = i.navigation.tabs
        , m = p(d)
        , b = p(h)
        , x = p(v)
        , T = p(g);
      n(e, i), r(e, i), m && f(e, d, i), i.li.each(function() {
        var t = jQuery(this);
        b && w(e, h, t, i), x && y(e, v, t, "tp-thumb", i), T && y(e, g, t, "tp-tab", i)
      }), e.bind("revolution.slide.onafterswap revolution.nextslide.waiting", function() {
        var t = 0 == e.find(".next-revslide").length ? e.find(".active-revslide").data("index") : e.find(".next-revslide").data("index");
        e.find(".tp-bullet").each(function() {
          var e = jQuery(this);
          e.data("liref") === t ? e.addClass("selected") : e.removeClass("selected")
        }), o.find(".tp-thumb, .tp-tab").each(function() {
          var e = jQuery(this);
          e.data("liref") === t ? (e.addClass("selected"), e.hasClass("tp-tab") ? a(o.find(".tp-tabs"), g) : a(o.find(".tp-thumbs"), v)) : e.removeClass("selected")
        });
        var n = 0
          , r = !1;
        i.thumbs && jQuery.each(i.thumbs, function(e, a) {
          n = r === !1 ? e : n, r = a.id === t || e === t ? !0 : r
        });
        var s = n > 0 ? n - 1 : i.slideamount - 1
          , l = n + 1 == i.slideamount ? 0 : n + 1;
        if (d.enable === !0) {
          var p = d.tmp;
          jQuery.each(i.thumbs[s].params, function(e, t) {
            p = p.replace(t.from, t.to)
          }), d.left.j.html(p), p = d.tmp, jQuery.each(i.thumbs[l].params, function(e, t) {
            p = p.replace(t.from, t.to)
          }), d.right.j.html(p), punchgs.TweenLite.set(d.left.j.find(".tp-arr-imgholder"), {
            backgroundImage: "url(" + i.thumbs[s].src + ")"
          }), punchgs.TweenLite.set(d.right.j.find(".tp-arr-imgholder"), {
            backgroundImage: "url(" + i.thumbs[l].src + ")"
          })
        }
      }), l(d), l(h), l(v), l(g), o.on("mouseenter mousemove", function() {
        o.hasClass("tp-mouseover") || (o.addClass("tp-mouseover"), punchgs.TweenLite.killDelayedCallsTo(u), m && d.hide_onleave && u(o.find(".tparrows"), d, "show"), b && h.hide_onleave && u(o.find(".tp-bullets"), h, "show"), x && v.hide_onleave && u(o.find(".tp-thumbs"), v, "show"), T && g.hide_onleave && u(o.find(".tp-tabs"), g, "show"), t && (o.removeClass("tp-mouseover"), c(e, i)))
      }), o.on("mouseleave", function() {
        o.removeClass("tp-mouseover"), c(e, i)
      }), m && d.hide_onleave && u(o.find(".tparrows"), d, "hide", 0), b && h.hide_onleave && u(o.find(".tp-bullets"), h, "hide", 0), x && v.hide_onleave && u(o.find(".tp-thumbs"), v, "hide", 0), T && g.hide_onleave && u(o.find(".tp-tabs"), g, "hide", 0), x && s(o.find(".tp-thumbs"), i), T && s(o.find(".tp-tabs"), i), "carousel" === i.sliderType && s(e, i, !0), "on" == i.navigation.touch.touchenabled && s(e, i, "swipebased")
    }
  });
  var a = function(e, t) {
      var a = (e.hasClass("tp-thumbs") ? ".tp-thumbs" : ".tp-tabs", e.hasClass("tp-thumbs") ? ".tp-thumb-mask" : ".tp-tab-mask")
        , i = e.hasClass("tp-thumbs") ? ".tp-thumbs-inner-wrapper" : ".tp-tabs-inner-wrapper"
        , o = e.hasClass("tp-thumbs") ? ".tp-thumb" : ".tp-tab"
        , n = e.find(a)
        , r = n.find(i)
        , d = t.direction
        , s = "vertical" === d ? n.find(o).first().outerHeight(!0) + t.space : n.find(o).first().outerWidth(!0) + t.space
        , l = "vertical" === d ? n.height() : n.width()
        , p = parseInt(n.find(o + ".selected").data("liindex"), 0)
        , h = l / s
        , c = "vertical" === d ? n.height() : n.width()
        , u = 0 - p * s
        , f = "vertical" === d ? r.height() : r.width()
        , v = 0 - (f - c) > u ? 0 - (f - c) : v > 0 ? 0 : u
        , g = r.data("offset");
      h > 2 && (v = 0 >= u - (g + s) ? 0 - s > u - (g + s) ? g : v + s : v, v = s > u - s + g + l && u + (Math.round(h) - 2) * s < g ? u + (Math.round(h) - 2) * s : v), v = 0 - (f - c) > v ? 0 - (f - c) : v > 0 ? 0 : v, "vertical" !== d && n.width() >= r.width() && (v = 0), "vertical" === d && n.height() >= r.height() && (v = 0), e.hasClass("dragged") || ("vertical" === d ? r.data("tmmove", punchgs.TweenLite.to(r, .5, {
        top: v + "px"
        , ease: punchgs.Power3.easeInOut
      })) : r.data("tmmove", punchgs.TweenLite.to(r, .5, {
        left: v + "px"
        , ease: punchgs.Power3.easeInOut
      })), r.data("offset", v))
    }
    , i = function(e, t, a, i, o, n) {
      var r = a.parent().find(".tp-" + n + "s")
        , d = r.find(".tp-" + n + "s-inner-wrapper")
        , s = r.find(".tp-" + n + "-mask")
        , l = i.width * e < i.min_width ? i.min_width : Math.round(i.width * e)
        , p = Math.round(l / i.width * i.height)
        , h = "vertical" === i.direction ? l : l * o + i.space * (o - 1)
        , c = "vertical" === i.direction ? p * o + i.space * (o - 1) : p
        , u = "vertical" === i.direction ? {
          width: l + "px"
        } : {
          height: p + "px"
        };
      t.add(punchgs.TweenLite.set(r, u)), t.add(punchgs.TweenLite.set(d, {
        width: h + "px"
        , height: c + "px"
      })), t.add(punchgs.TweenLite.set(s, {
        width: h + "px"
        , height: c + "px"
      }));
      var f = d.find(".tp-" + n);
      return f && jQuery.each(f, function(e, a) {
        "vertical" === i.direction ? t.add(punchgs.TweenLite.set(a, {
          top: e * (p + parseInt(void 0 === i.space ? 0 : i.space, 0))
          , width: l + "px"
          , height: p + "px"
        })) : "horizontal" === i.direction && t.add(punchgs.TweenLite.set(a, {
          left: e * (l + parseInt(void 0 === i.space ? 0 : i.space, 0))
          , width: l + "px"
          , height: p + "px"
        }))
      }), t
    }
    , o = function(e) {
      var t = 0
        , a = 0
        , i = 0
        , o = 0
        , n = 1
        , r = 1
        , d = 1;
      return "detail" in e && (a = e.detail), "wheelDelta" in e && (a = -e.wheelDelta / 120), "wheelDeltaY" in e && (a = -e.wheelDeltaY / 120), "wheelDeltaX" in e && (t = -e.wheelDeltaX / 120), "axis" in e && e.axis === e.HORIZONTAL_AXIS && (t = a, a = 0), i = t * n, o = a * n, "deltaY" in e && (o = e.deltaY), "deltaX" in e && (i = e.deltaX), (i || o) && e.deltaMode && (1 == e.deltaMode ? (i *= r, o *= r) : (i *= d, o *= d)), i && !t && (t = 1 > i ? -1 : 1), o && !a && (a = 1 > o ? -1 : 1), o = navigator.userAgent.match(/mozilla/i) ? 10 * o : o, (o > 300 || -300 > o) && (o /= 10), {
        spinX: t
        , spinY: a
        , pixelX: i
        , pixelY: o
      }
    }
    , n = function(t, a) {
      "on" === a.navigation.keyboardNavigation && jQuery(document).keydown(function(i) {
        ("horizontal" == a.navigation.keyboard_direction && 39 == i.keyCode || "vertical" == a.navigation.keyboard_direction && 40 == i.keyCode) && (a.sc_indicator = "arrow", e.callingNewSlide(a, t, 1)), ("horizontal" == a.navigation.keyboard_direction && 37 == i.keyCode || "vertical" == a.navigation.keyboard_direction && 38 == i.keyCode) && (a.sc_indicator = "arrow", e.callingNewSlide(a, t, -1))
      })
    }
    , r = function(t, a) {
      if ("on" === a.navigation.mouseScrollNavigation) {
        var i = navigator.userAgent.match(/mozilla/i) ? -29 : -49
          , n = navigator.userAgent.match(/mozilla/i) ? 29 : 49;
        t.on("mousewheel DOMMouseScroll", function(r) {
          var d = o(r.originalEvent)
            , s = t.find(".tp-revslider-slidesli.active-revslide").index()
            , l = t.find(".tp-revslider-slidesli.processing-revslide").index()
            , p = -1 != s && 0 == s || -1 != l && 0 == l ? !0 : !1
            , h = -1 != s && s == a.slideamount - 1 || 1 != l && l == a.slideamount - 1 ? !0 : !1;
          if (-1 == l) {
            if (d.pixelY < i) {
              if (!p) return a.sc_indicator = "arrow", e.callingNewSlide(a, t, -1), !1
            } else if (d.pixelY > n && !h) return a.sc_indicator = "arrow", e.callingNewSlide(a, t, 1), !1
          } else if (!h) return !1;
          r.preventDefault()
        })
      }
    }
    , d = function(e, a, i) {
      return e = t ? jQuery(i.target).closest("." + e).length || jQuery(i.srcElement).closest("." + e).length : jQuery(i.toElement).closest("." + e).length || jQuery(i.originalTarget).closest("." + e).length, e === !0 || 1 === e ? 1 : 0
    }
    , s = function(a, i, o) {
      a.data("opt", i);
      var n = i.carousel;
      jQuery(".bullet, .bullets, .tp-bullets, .tparrows").addClass("noSwipe"), n.Limit = "endless";
      var r = (t || "Firefox" === e.get_browser(), a)
        , s = "vertical" === i.navigation.thumbnails.direction || "vertical" === i.navigation.tabs.direction ? "none" : "vertical"
        , l = i.navigation.touch.swipe_direction || "horizontal";
      s = "swipebased" == o && "vertical" == l ? "none" : o ? "vertical" : s, jQuery.fn.swipetp || (jQuery.fn.swipetp = jQuery.fn.swipe), jQuery.fn.swipetp.defaults && jQuery.fn.swipetp.defaults.excludedElements || (jQuery.fn.swipetp.defaults || (jQuery.fn.swipetp.defaults = new Object), jQuery.fn.swipetp.defaults.excludedElements = "label, button, input, select, textarea, a, .noSwipe"), r.swipetp({
        allowPageScroll: s
        , triggerOnTouchLeave: !0
        , excludeElements: jQuery.fn.swipetp.defaults.excludedElements
        , swipeStatus: function(t, o, r, s) {
          var p = d("rev_slider_wrapper", a, t)
            , h = d("tp-thumbs", a, t)
            , c = d("tp-tabs", a, t)
            , u = jQuery(this).attr("class")
            , f = u.match(/tp-tabs|tp-thumb/gi) ? !0 : !1;
          if ("carousel" === i.sliderType && (("move" === o || "end" === o || "cancel" == o) && i.dragStartedOverSlider && !i.dragStartedOverThumbs && !i.dragStartedOverTabs || "start" === o && p > 0 && 0 === h && 0 === c)) switch (i.dragStartedOverSlider = !0, s = r && r.match(/left|up/g) ? Math.round(-1 * s) : s = Math.round(1 * s), o) {
            case "start":
              void 0 !== n.positionanim && (n.positionanim.kill(), n.slide_globaloffset = "off" === n.infinity ? n.slide_offset : e.simp(n.slide_offset, n.maxwidth)), n.overpull = "none", n.wrap.addClass("dragged");
              break;
            case "move":
              if (n.slide_offset = "off" === n.infinity ? n.slide_globaloffset + s : e.simp(n.slide_globaloffset + s, n.maxwidth), "off" === n.infinity) {
                var v = "center" === n.horizontal_align ? (n.wrapwidth / 2 - n.slide_width / 2 - n.slide_offset) / n.slide_width : (0 - n.slide_offset) / n.slide_width;
                "none" !== n.overpull && 0 !== n.overpull || !(0 > v || v > i.slideamount - 1) ? v >= 0 && v <= i.slideamount - 1 && (v >= 0 && s > n.overpull || v <= i.slideamount - 1 && s < n.overpull) && (n.overpull = 0) : n.overpull = s, n.slide_offset = 0 > v ? n.slide_offset + (n.overpull - s) / 1.1 + Math.sqrt(Math.abs((n.overpull - s) / 1.1)) : v > i.slideamount - 1 ? n.slide_offset + (n.overpull - s) / 1.1 - Math.sqrt(Math.abs((n.overpull - s) / 1.1)) : n.slide_offset
              }
              e.organiseCarousel(i, r, !0, !0);
              break;
            case "end":
            case "cancel":
              n.slide_globaloffset = n.slide_offset, n.wrap.removeClass("dragged"), e.carouselToEvalPosition(i, r), i.dragStartedOverSlider = !1, i.dragStartedOverThumbs = !1, i.dragStartedOverTabs = !1
          } else {
            if (("move" !== o && "end" !== o && "cancel" != o || i.dragStartedOverSlider || !i.dragStartedOverThumbs && !i.dragStartedOverTabs) && !("start" === o && p > 0 && (h > 0 || c > 0))) {
              if ("end" == o && !f) {
                if (i.sc_indicator = "arrow", "horizontal" == l && "left" == r || "vertical" == l && "up" == r) return e.callingNewSlide(i, i.c, 1), !1;
                if ("horizontal" == l && "right" == r || "vertical" == l && "down" == r) return e.callingNewSlide(i, i.c, -1), !1
              }
              return i.dragStartedOverSlider = !1, i.dragStartedOverThumbs = !1, i.dragStartedOverTabs = !1, !0
            }
            h > 0 && (i.dragStartedOverThumbs = !0), c > 0 && (i.dragStartedOverTabs = !0);
            var g = i.dragStartedOverThumbs ? ".tp-thumbs" : ".tp-tabs"
              , m = i.dragStartedOverThumbs ? ".tp-thumb-mask" : ".tp-tab-mask"
              , w = i.dragStartedOverThumbs ? ".tp-thumbs-inner-wrapper" : ".tp-tabs-inner-wrapper"
              , b = i.dragStartedOverThumbs ? ".tp-thumb" : ".tp-tab"
              , y = i.dragStartedOverThumbs ? i.navigation.thumbnails : i.navigation.tabs;
            s = r && r.match(/left|up/g) ? Math.round(-1 * s) : s = Math.round(1 * s);
            var x = a.parent().find(m)
              , T = x.find(w)
              , L = y.direction
              , _ = "vertical" === L ? T.height() : T.width()
              , k = "vertical" === L ? x.height() : x.width()
              , j = "vertical" === L ? x.find(b).first().outerHeight(!0) + y.space : x.find(b).first().outerWidth(!0) + y.space
              , z = void 0 === T.data("offset") ? 0 : parseInt(T.data("offset"), 0)
              , C = 0;
            switch (o) {
              case "start":
                a.parent().find(g).addClass("dragged"), z = "vertical" === L ? T.position().top : T.position().left, T.data("offset", z), T.data("tmmove") && T.data("tmmove").pause();
                break;
              case "move":
                if (k >= _) return !1;
                C = z + s, C = C > 0 ? "horizontal" === L ? C - T.width() * (C / T.width() * C / T.width()) : C - T.height() * (C / T.height() * C / T.height()) : C;
                var I = "vertical" === L ? 0 - (T.height() - x.height()) : 0 - (T.width() - x.width());
                C = I > C ? "horizontal" === L ? C + T.width() * (C - I) / T.width() * (C - I) / T.width() : C + T.height() * (C - I) / T.height() * (C - I) / T.height() : C, "vertical" === L ? punchgs.TweenLite.set(T, {
                  top: C + "px"
                }) : punchgs.TweenLite.set(T, {
                  left: C + "px"
                });
                break;
              case "end":
              case "cancel":
                if (f) return C = z + s, C = "vertical" === L ? C < 0 - (T.height() - x.height()) ? 0 - (T.height() - x.height()) : C : C < 0 - (T.width() - x.width()) ? 0 - (T.width() - x.width()) : C, C = C > 0 ? 0 : C, C = Math.abs(s) > j / 10 ? 0 >= s ? Math.floor(C / j) * j : Math.ceil(C / j) * j : 0 > s ? Math.ceil(C / j) * j : Math.floor(C / j) * j, C = "vertical" === L ? C < 0 - (T.height() - x.height()) ? 0 - (T.height() - x.height()) : C : C < 0 - (T.width() - x.width()) ? 0 - (T.width() - x.width()) : C, C = C > 0 ? 0 : C, "vertical" === L ? punchgs.TweenLite.to(T, .5, {
                  top: C + "px"
                  , ease: punchgs.Power3.easeOut
                }) : punchgs.TweenLite.to(T, .5, {
                  left: C + "px"
                  , ease: punchgs.Power3.easeOut
                }), C = C ? C : "vertical" === L ? T.position().top : T.position().left, T.data("offset", C), T.data("distance", s), setTimeout(function() {
                  i.dragStartedOverSlider = !1, i.dragStartedOverThumbs = !1, i.dragStartedOverTabs = !1
                }, 100), a.parent().find(g).removeClass("dragged"), !1
            }
          }
        }
      })
    }
    , l = function(e) {
      e.hide_delay = jQuery.isNumeric(parseInt(e.hide_delay, 0)) ? e.hide_delay / 1e3 : .2, e.hide_delay_mobile = jQuery.isNumeric(parseInt(e.hide_delay_mobile, 0)) ? e.hide_delay_mobile / 1e3 : .2
    }
    , p = function(e) {
      return e && e.enable
    }
    , h = function(e) {
      return e && e.enable && e.hide_onleave === !0 && (void 0 === e.position ? !0 : !e.position.match(/outer/g))
    }
    , c = function(e, a) {
      var i = e.parent();
      h(a.navigation.arrows) && punchgs.TweenLite.delayedCall(t ? a.navigation.arrows.hide_delay_mobile : a.navigation.arrows.hide_delay, u, [i.find(".tparrows"), a.navigation.arrows, "hide"]), h(a.navigation.bullets) && punchgs.TweenLite.delayedCall(t ? a.navigation.bullets.hide_delay_mobile : a.navigation.bullets.hide_delay, u, [i.find(".tp-bullets"), a.navigation.bullets, "hide"]), h(a.navigation.thumbnails) && punchgs.TweenLite.delayedCall(t ? a.navigation.thumbnails.hide_delay_mobile : a.navigation.thumbnails.hide_delay, u, [i.find(".tp-thumbs"), a.navigation.thumbnails, "hide"]), h(a.navigation.tabs) && punchgs.TweenLite.delayedCall(t ? a.navigation.tabs.hide_delay_mobile : a.navigation.tabs.hide_delay, u, [i.find(".tp-tabs"), a.navigation.tabs, "hide"])
    }
    , u = function(e, t, a, i) {
      switch (i = void 0 === i ? .5 : i, a) {
        case "show":
          punchgs.TweenLite.to(e, i, {
            autoAlpha: 1
            , ease: punchgs.Power3.easeInOut
            , overwrite: "auto"
          });
          break;
        case "hide":
          punchgs.TweenLite.to(e, i, {
            autoAlpha: 0
            , ease: punchgs.Power3.easeInOu
            , overwrite: "auto"
          })
      }
    }
    , f = function(e, t, a) {
      t.style = void 0 === t.style ? "" : t.style, t.left.style = void 0 === t.left.style ? "" : t.left.style, t.right.style = void 0 === t.right.style ? "" : t.right.style, 0 === e.find(".tp-leftarrow.tparrows").length && e.append('<div class="tp-leftarrow tparrows ' + t.style + " " + t.left.style + '">' + t.tmp + "</div>"), 0 === e.find(".tp-rightarrow.tparrows").length && e.append('<div class="tp-rightarrow tparrows ' + t.style + " " + t.right.style + '">' + t.tmp + "</div>");
      var i = e.find(".tp-leftarrow.tparrows")
        , o = e.find(".tp-rightarrow.tparrows");
      o.click(function() {
        a.sc_indicator = "arrow", e.revnext()
      }), i.click(function() {
        a.sc_indicator = "arrow", e.revprev()
      }), t.right.j = e.find(".tp-rightarrow.tparrows"), t.left.j = e.find(".tp-leftarrow.tparrows"), t.padding_top = parseInt(a.carousel.padding_top || 0, 0), t.padding_bottom = parseInt(a.carousel.padding_bottom || 0, 0), m(i, t.left), m(o, t.right), ("outer-left" == t.position || "outer-right" == t.position) && (a.outernav = !0)
    }
    , v = function(e, t) {
      var a = e.outerHeight(!0)
        , i = (e.outerWidth(!0), "top" === t.v_align ? {
          top: "0px"
          , y: Math.round(t.v_offset) + "px"
        } : "center" === t.v_align ? {
          top: "50%"
          , y: Math.round(0 - a / 2 + t.v_offset) + "px"
        } : {
          top: "100%"
          , y: Math.round(0 - (a + t.v_offset)) + "px"
        });
      e.hasClass("outer-bottom") || punchgs.TweenLite.set(e, i)
    }
    , g = function(e, t) {
      var a = (e.outerHeight(!0), e.outerWidth(!0))
        , i = "left" === t.h_align ? {
          left: "0px"
          , x: Math.round(t.h_offset) + "px"
        } : "center" === t.h_align ? {
          left: "50%"
          , x: Math.round(0 - a / 2 + t.h_offset) + "px"
        } : {
          left: "100%"
          , x: Math.round(0 - (a + t.h_offset)) + "px"
        };
      punchgs.TweenLite.set(e, i)
    }
    , m = function(e, t) {
      var a = e.closest(".tp-simpleresponsive").length > 0 ? e.closest(".tp-simpleresponsive") : e.closest(".tp-revslider-mainul").length > 0 ? e.closest(".tp-revslider-mainul") : e.closest(".rev_slider_wrapper").length > 0 ? e.closest(".rev_slider_wrapper") : e.parent().find(".tp-revslider-mainul")
        , i = a.width()
        , o = a.height();
      if (v(e, t), g(e, t), "outer-left" !== t.position || "fullwidth" != t.sliderLayout && "fullscreen" != t.sliderLayout ? "outer-right" !== t.position || "fullwidth" != t.sliderLayout && "fullscreen" != t.sliderLayout || punchgs.TweenLite.set(e, {
          right: 0 - e.outerWidth() + "px"
          , x: t.h_offset + "px"
        }) : punchgs.TweenLite.set(e, {
          left: 0 - e.outerWidth() + "px"
          , x: t.h_offset + "px"
        }), e.hasClass("tp-thumbs") || e.hasClass("tp-tabs")) {
        var n = e.data("wr_padding")
          , r = e.data("maxw")
          , d = e.data("maxh")
          , s = e.find(e.hasClass("tp-thumbs") ? ".tp-thumb-mask" : ".tp-tab-mask")
          , l = parseInt(t.padding_top || 0, 0)
          , p = parseInt(t.padding_bottom || 0, 0);
        r > i && "outer-left" !== t.position && "outer-right" !== t.position ? (punchgs.TweenLite.set(e, {
          left: "0px"
          , x: 0
          , maxWidth: i - 2 * n + "px"
        }), punchgs.TweenLite.set(s, {
          maxWidth: i - 2 * n + "px"
        })) : (punchgs.TweenLite.set(e, {
          maxWidth: r + "px"
        }), punchgs.TweenLite.set(s, {
          maxWidth: r + "px"
        })), d + 2 * n > o && "outer-bottom" !== t.position && "outer-top" !== t.position ? (punchgs.TweenLite.set(e, {
          top: "0px"
          , y: 0
          , maxHeight: l + p + (o - 2 * n) + "px"
        }), punchgs.TweenLite.set(s, {
          maxHeight: l + p + (o - 2 * n) + "px"
        })) : (punchgs.TweenLite.set(e, {
          maxHeight: d + "px"
        }), punchgs.TweenLite.set(s, {
          maxHeight: d + "px"
        })), "outer-left" !== t.position && "outer-right" !== t.position && (l = 0, p = 0), t.span === !0 && "vertical" === t.direction ? (punchgs.TweenLite.set(e, {
          maxHeight: l + p + (o - 2 * n) + "px"
          , height: l + p + (o - 2 * n) + "px"
          , top: 0 - l
          , y: 0
        }), v(s, t)) : t.span === !0 && "horizontal" === t.direction && (punchgs.TweenLite.set(e, {
          maxWidth: "100%"
          , width: i - 2 * n + "px"
          , left: 0
          , x: 0
        }), g(s, t))
      }
    }
    , w = function(e, t, a, i) {
      0 === e.find(".tp-bullets").length && (t.style = void 0 === t.style ? "" : t.style, e.append('<div class="tp-bullets ' + t.style + " " + t.direction + '"></div>'));
      var o = e.find(".tp-bullets")
        , n = a.data("index")
        , r = t.tmp;
      jQuery.each(i.thumbs[a.index()].params, function(e, t) {
        r = r.replace(t.from, t.to)
      }), o.append('<div class="justaddedbullet tp-bullet">' + r + "</div>");
      var d = e.find(".justaddedbullet")
        , s = e.find(".tp-bullet").length
        , l = d.outerWidth() + parseInt(void 0 === t.space ? 0 : t.space, 0)
        , p = d.outerHeight() + parseInt(void 0 === t.space ? 0 : t.space, 0);
      "vertical" === t.direction ? (d.css({
        top: (s - 1) * p + "px"
        , left: "0px"
      }), o.css({
        height: (s - 1) * p + d.outerHeight()
        , width: d.outerWidth()
      })) : (d.css({
        left: (s - 1) * l + "px"
        , top: "0px"
      }), o.css({
        width: (s - 1) * l + d.outerWidth()
        , height: d.outerHeight()
      })), d.find(".tp-bullet-image").css({
        backgroundImage: "url(" + i.thumbs[a.index()].src + ")"
      }), d.data("liref", n), d.click(function() {
        i.sc_indicator = "bullet", e.revcallslidewithid(n), e.find(".tp-bullet").removeClass("selected"), jQuery(this).addClass("selected")
      }), d.removeClass("justaddedbullet"), t.padding_top = parseInt(i.carousel.padding_top || 0, 0), t.padding_bottom = parseInt(i.carousel.padding_bottom || 0, 0), ("outer-left" == t.position || "outer-right" == t.position) && (i.outernav = !0), m(o, t)
    }
    , b = function(e, t) {
      t = parseFloat(t), e = e.replace("#", "");
      var a = parseInt(e.substring(0, 2), 16)
        , i = parseInt(e.substring(2, 4), 16)
        , o = parseInt(e.substring(4, 6), 16)
        , n = "rgba(" + a + "," + i + "," + o + "," + t + ")";
      return n
    }
    , y = function(e, t, a, i, o) {
      var n = "tp-thumb" === i ? ".tp-thumbs" : ".tp-tabs"
        , r = "tp-thumb" === i ? ".tp-thumb-mask" : ".tp-tab-mask"
        , d = "tp-thumb" === i ? ".tp-thumbs-inner-wrapper" : ".tp-tabs-inner-wrapper"
        , s = "tp-thumb" === i ? ".tp-thumb" : ".tp-tab"
        , l = "tp-thumb" === i ? ".tp-thumb-image" : ".tp-tab-image";
      if (t.visibleAmount = t.visibleAmount > o.slideamount ? o.slideamount : t.visibleAmount, t.sliderLayout = o.sliderLayout, 0 === e.parent().find(n).length) {
        t.style = void 0 === t.style ? "" : t.style;
        var p = t.span === !0 ? "tp-span-wrapper" : ""
          , h = '<div class="' + i + "s " + p + " " + t.position + " " + t.style + '"><div class="' + i + '-mask"><div class="' + i + 's-inner-wrapper" style="position:relative;"></div></div></div>';
        "outer-top" === t.position ? e.parent().prepend(h) : "outer-bottom" === t.position ? e.after(h) : e.append(h), t.padding_top = parseInt(o.carousel.padding_top || 0, 0), t.padding_bottom = parseInt(o.carousel.padding_bottom || 0, 0), ("outer-left" == t.position || "outer-right" == t.position) && (o.outernav = !0)
      }
      var c = a.data("index")
        , u = e.parent().find(n)
        , f = u.find(r)
        , v = f.find(d)
        , g = "horizontal" === t.direction ? t.width * t.visibleAmount + t.space * (t.visibleAmount - 1) : t.width
        , w = "horizontal" === t.direction ? t.height : t.height * t.visibleAmount + t.space * (t.visibleAmount - 1)
        , y = t.tmp;
      jQuery.each(o.thumbs[a.index()].params, function(e, t) {
        y = y.replace(t.from, t.to)
      }), v.append('<div data-liindex="' + a.index() + '" data-liref="' + c + '" class="justaddedthumb ' + i + '" style="width:' + t.width + "px;height:" + t.height + 'px;">' + y + "</div>");
      var x = u.find(".justaddedthumb")
        , T = u.find(s).length
        , L = x.outerWidth() + parseInt(void 0 === t.space ? 0 : t.space, 0)
        , _ = x.outerHeight() + parseInt(void 0 === t.space ? 0 : t.space, 0);
      x.find(l).css({
        backgroundImage: "url(" + o.thumbs[a.index()].src + ")"
      }), "vertical" === t.direction ? (x.css({
        top: (T - 1) * _ + "px"
        , left: "0px"
      }), v.css({
        height: (T - 1) * _ + x.outerHeight()
        , width: x.outerWidth()
      })) : (x.css({
        left: (T - 1) * L + "px"
        , top: "0px"
      }), v.css({
        width: (T - 1) * L + x.outerWidth()
        , height: x.outerHeight()
      })), u.data("maxw", g), u.data("maxh", w), u.data("wr_padding", t.wrapper_padding);
      var k = "outer-top" === t.position || "outer-bottom" === t.position ? "relative" : "absolute"
        , j = "outer-top" !== t.position && "outer-bottom" !== t.position || "center" !== t.h_align ? "0" : "auto";
      f.css({
        maxWidth: g + "px"
        , maxHeight: w + "px"
        , overflow: "hidden"
        , position: "relative"
      }), u.css({
        maxWidth: g + "px"
        , margin: j
        , maxHeight: w + "px"
        , overflow: "visible"
        , position: k
        , background: b(t.wrapper_color, t.wrapper_opacity)
        , padding: t.wrapper_padding + "px"
        , boxSizing: "contet-box"
      }), x.click(function() {
        o.sc_indicator = "bullet";
        var t = e.parent().find(d).data("distance");
        t = void 0 === t ? 0 : t, Math.abs(t) < 10 && (e.revcallslidewithid(c), e.parent().find(n).removeClass("selected"), jQuery(this).addClass("selected"))
      }), x.removeClass("justaddedthumb"), m(u, t)
    }
    , x = function(e) {
      var t = e.c.parent().find(".outer-top")
        , a = e.c.parent().find(".outer-bottom");
      e.top_outer = t.hasClass("tp-forcenotvisible") ? 0 : t.outerHeight() || 0, e.bottom_outer = a.hasClass("tp-forcenotvisible") ? 0 : a.outerHeight() || 0
    }
    , T = function(e, t, a, i) {
      t > a || a > i ? e.addClass("tp-forcenotvisible") : e.removeClass("tp-forcenotvisible")
    }
}(jQuery), ! function() {
  var e = jQuery.fn.revolution
    , t = e.is_mobile();
  jQuery.extend(!0, e, {
    checkForParallax: function(a, i) {
      var o = i.parallax;
      return t && "on" == o.disable_onmobile ? !1 : (i.li.each(function() {
        for (var e = jQuery(this), t = 1; 10 >= t; t++) e.find(".rs-parallaxlevel-" + t).each(function() {
          var e = jQuery(this)
            , a = e.closest(".tp-parallax-wrap");
          a.data("parallaxlevel", o.levels[t - 1]), a.addClass("tp-parallax-container")
        })
      }), ("mouse" == o.type || "scroll+mouse" == o.type || "mouse+scroll" == o.type) && (a.mouseenter(function(e) {
        var t = a.find(".active-revslide")
          , i = a.offset().top
          , o = a.offset().left
          , n = e.pageX - o
          , r = e.pageY - i;
        t.data("enterx", n), t.data("entery", r)
      }), a.on("mousemove.hoverdir, mouseleave.hoverdir", function(e) {
        var t = a.find(".active-revslide");
        switch (e.type) {
          case "mousemove":
            if ("enterpoint" == o.origo) {
              var n = a.offset().top
                , r = a.offset().left;
              void 0 == t.data("enterx") && t.data("enterx", e.pageX - r), void 0 == t.data("entery") && t.data("entery", e.pageY - n);
              var d = t.data("enterx")
                , s = t.data("entery")
                , l = d - (e.pageX - r)
                , p = s - (e.pageY - n)
                , h = o.speed / 1e3 || .4
            } else var n = a.offset().top
              , r = a.offset().left
              , l = i.conw / 2 - (e.pageX - r)
              , p = i.conh / 2 - (e.pageY - n)
              , h = o.speed / 1e3 || 3;
            t.find(".tp-parallax-container").each(function() {
              var e = jQuery(this)
                , t = parseInt(e.data("parallaxlevel"), 0) / 100
                , a = l * t
                , i = p * t;
              "scroll+mouse" == o.type || "mouse+scroll" == o.type ? punchgs.TweenLite.to(e, h, {
                force3D: "auto"
                , x: a
                , ease: punchgs.Power3.easeOut
                , overwrite: "all"
              }) : punchgs.TweenLite.to(e, h, {
                force3D: "auto"
                , x: a
                , y: i
                , ease: punchgs.Power3.easeOut
                , overwrite: "all"
              })
            });
            break;
          case "mouseleave":
            t.find(".tp-parallax-container").each(function() {
              var e = jQuery(this);
              "scroll+mouse" == o.type || "mouse+scroll" == o.type ? punchgs.TweenLite.to(e, 1.5, {
                force3D: "auto"
                , x: 0
                , ease: punchgs.Power3.easeOut
              }) : punchgs.TweenLite.to(e, 1.5, {
                force3D: "auto"
                , x: 0
                , y: 0
                , ease: punchgs.Power3.easeOut
              })
            })
        }
      }), t && (window.ondeviceorientation = function(e) {
        var t = Math.round(e.beta || 0)
          , i = Math.round(e.gamma || 0)
          , o = a.find(".active-revslide");
        if (jQuery(window).width() > jQuery(window).height()) {
          var n = i;
          i = t, t = n
        }
        var r = 360 / a.width() * i
          , d = 180 / a.height() * t;
        o.find(".tp-parallax-container").each(function() {
          var e = jQuery(this)
            , t = parseInt(e.data("parallaxlevel"), 0) / 100
            , a = r * t
            , i = d * t;
          punchgs.TweenLite.to(e, .2, {
            force3D: "auto"
            , x: a
            , y: i
            , ease: punchgs.Power3.easeOut
          })
        })
      })), void e.scrollTicker(i, a))
    }
    , scrollTicker: function(t, a) {
      1 != t.scrollTicker && (t.scrollTicker = !0, punchgs.TweenLite.ticker.fps(150), punchgs.TweenLite.ticker.addEventListener("tick", function() {
        e.scrollHandling(t)
      }, a, !0, 1))
    }
    , scrollHandling: function(a) {
      a.lastwindowheight = a.lastwindowheight || jQuery(window).height();
      var i = a.c.offset().top
        , o = jQuery(window).scrollTop()
        , n = new Object
        , r = a.viewPort
        , d = a.parallax;
      if (a.lastscrolltop == o) return !1;
      a.lastscrolltop = o, n.top = i - o, n.h = 0 == a.conh ? a.c.height() : a.conh, n.bottom = i - o + n.h;
      var s = n.top < 0 ? n.top / n.h : n.bottom > a.lastwindowheight ? (n.bottom - a.lastwindowheight) / n.h : 0;
      a.scrollproc = s, e.callBackHandling && e.callBackHandling(a, "parallax", "start");
      var l = 1 - Math.abs(s);
      if (l = 0 > l ? 0 : l, r.enable && (1 - r.visible_area <= l ? a.inviewport || (a.inviewport = !0, e.enterInViewPort(a)) : a.inviewport && (a.inviewport = !1, e.leaveViewPort(a))), t && "on" == a.parallax.disable_onmobile) return !1;
      var p = new punchgs.TimelineLite;
      p.pause(), ("scroll" == d.type || "scroll+mouse" == d.type || "mouse+scroll" == d.type) && a.c.find(".tp-parallax-container").each(function() {
        var e = jQuery(this)
          , t = parseInt(e.data("parallaxlevel"), 0) / 100
          , i = s * -(t * a.conh);
        e.data("parallaxoffset", i), p.add(punchgs.TweenLite.set(e, {
          force3D: "auto"
          , y: i
        }), 0)
      }), a.c.find(".tp-revslider-slidesli .slotholder, .tp-revslider-slidesli .rs-background-video-layer").each(function() {
        var e = jQuery(this)
          , t = e.data("bgparallax") || a.parallax.bgparallax;
        if (t = "on" == t ? 1 : t, void 0 !== t || "off" !== t) {
          var i = a.parallax.levels[parseInt(t, 0) - 1] / 100
            , o = s * -(i * a.conh);
          jQuery.isNumeric(o) && p.add(punchgs.TweenLite.set(e, {
            position: "absolute"
            , top: "0px"
            , left: "0px"
            , backfaceVisibility: "hidden"
            , force3D: "true"
            , y: o + "px"
            , overwrite: "auto"
          }), 0)
        }
      }), e.callBackHandling && e.callBackHandling(a, "parallax", "end"), p.play(0)
    }
  })
}(jQuery), ! function() {
  var e = jQuery.fn.revolution;
  jQuery.extend(!0, e, {
    animateSlide: function(e, t, a, i, n, r, d, s, l) {
      return o(e, t, a, i, n, r, d, s, l)
    }
  });
  var t = function(t, a, i, o) {
      var n = t
        , r = n.find(".defaultimg")
        , d = n.data("zoomstart")
        , s = n.data("rotationstart");
      void 0 != r.data("currotate") && (s = r.data("currotate")), void 0 != r.data("curscale") && "box" == o ? d = 100 * r.data("curscale") : void 0 != r.data("curscale") && (d = r.data("curscale")), e.slotSize(r, a);
      var l = r.attr("src")
        , p = r.css("backgroundColor")
        , h = a.width
        , c = a.height
        , u = r.data("fxof")
        , f = 0;
      "on" == a.autoHeight && (c = a.c.height()), void 0 == u && (u = 0);
      var v = 0
        , g = r.data("bgfit")
        , m = r.data("bgrepeat")
        , w = r.data("bgposition");
      switch (void 0 == g && (g = "cover"), void 0 == m && (m = "no-repeat"), void 0 == w && (w = "center center"), o) {
        case "box":
          var b = 0
            , y = 0
            , x = 0;
          if (b = a.sloth > a.slotw ? a.sloth : a.slotw, !i) var v = 0 - b;
          a.slotw = b, a.sloth = b;
          for (var y = 0, x = 0, T = 0; T < a.slots; T++) {
            x = 0;
            for (var L = 0; L < a.slots; L++) n.append('<div class="slot" style="position:absolute;top:' + (f + x) + "px;left:" + (u + y) + "px;width:" + b + "px;height:" + b + 'px;overflow:hidden;"><div class="slotslide" data-x="' + y + '" data-y="' + x + '" style="position:absolute;top:0px;left:0px;width:' + b + "px;height:" + b + 'px;overflow:hidden;"><div style="position:absolute;top:' + (0 - x) + "px;left:" + (0 - y) + "px;width:" + h + "px;height:" + c + "px;background-color:" + p + ";background-image:url(" + l + ");background-repeat:" + m + ";background-size:" + g + ";background-position:" + w + ';"></div></div></div>'), x += b, void 0 != d && void 0 != s && punchgs.TweenLite.set(n.find(".slot").last(), {
              rotationZ: s
            });
            y += b
          }
          break;
        case "vertical":
        case "horizontal":
          if ("horizontal" == o) {
            if (!i) var v = 0 - a.slotw;
            for (var L = 0; L < a.slots; L++) n.append('<div class="slot" style="position:absolute;top:' + (0 + f) + "px;left:" + (u + L * a.slotw) + "px;overflow:hidden;width:" + (a.slotw + .6) + "px;height:" + c + 'px"><div class="slotslide" style="position:absolute;top:0px;left:' + v + "px;width:" + (a.slotw + .6) + "px;height:" + c + 'px;overflow:hidden;"><div style="background-color:' + p + ";position:absolute;top:0px;left:" + (0 - L * a.slotw) + "px;width:" + h + "px;height:" + c + "px;background-image:url(" + l + ");background-repeat:" + m + ";background-size:" + g + ";background-position:" + w + ';"></div></div></div>'), void 0 != d && void 0 != s && punchgs.TweenLite.set(n.find(".slot").last(), {
              rotationZ: s
            })
          } else {
            if (!i) var v = 0 - a.sloth;
            for (var L = 0; L < a.slots + 2; L++) n.append('<div class="slot" style="position:absolute;top:' + (f + L * a.sloth) + "px;left:" + u + "px;overflow:hidden;width:" + h + "px;height:" + a.sloth + 'px"><div class="slotslide" style="position:absolute;top:' + v + "px;left:0px;width:" + h + "px;height:" + a.sloth + 'px;overflow:hidden;"><div style="background-color:' + p + ";position:absolute;top:" + (0 - L * a.sloth) + "px;left:0px;width:" + h + "px;height:" + c + "px;background-image:url(" + l + ");background-repeat:" + m + ";background-size:" + g + ";background-position:" + w + ';"></div></div></div>'), void 0 != d && void 0 != s && punchgs.TweenLite.set(n.find(".slot").last(), {
              rotationZ: s
            })
          }
      }
    }
    , a = function(e, t, a, i, o) {
      function n() {
        jQuery.each(y, function(e, t) {
          (t[0] == a || t[8] == a) && (g = t[1], m = t[2], w = b), b += 1
        })
      }
      var r = punchgs.Power1.easeIn
        , d = punchgs.Power1.easeOut
        , s = punchgs.Power1.easeInOut
        , l = punchgs.Power2.easeIn
        , p = punchgs.Power2.easeOut
        , h = punchgs.Power2.easeInOut
        , c = (punchgs.Power3.easeIn, punchgs.Power3.easeOut)
        , u = punchgs.Power3.easeInOut
        , f = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45]
        , v = [16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 27]
        , g = 0
        , m = 1
        , w = 0
        , b = 0
        , y = (new Array, [
          ["boxslide", 0, 1, 10, 0, "box", !1, null, 0, d, d, 500, 6]
          , ["boxfade", 1, 0, 10, 0, "box", !1, null, 1, s, s, 700, 5]
          , ["slotslide-horizontal", 2, 0, 0, 200, "horizontal", !0, !1, 2, h, h, 700, 3]
          , ["slotslide-vertical", 3, 0, 0, 200, "vertical", !0, !1, 3, h, h, 700, 3]
          , ["curtain-1", 4, 3, 0, 0, "horizontal", !0, !0, 4, d, d, 300, 5]
          , ["curtain-2", 5, 3, 0, 0, "horizontal", !0, !0, 5, d, d, 300, 5]
          , ["curtain-3", 6, 3, 25, 0, "horizontal", !0, !0, 6, d, d, 300, 5]
          , ["slotzoom-horizontal", 7, 0, 0, 400, "horizontal", !0, !0, 7, d, d, 300, 7]
          , ["slotzoom-vertical", 8, 0, 0, 0, "vertical", !0, !0, 8, p, p, 500, 8]
          , ["slotfade-horizontal", 9, 0, 0, 500, "horizontal", !0, null, 9, p, p, 500, 25]
          , ["slotfade-vertical", 10, 0, 0, 500, "vertical", !0, null, 10, p, p, 500, 25]
          , ["fade", 11, 0, 1, 300, "horizontal", !0, null, 11, h, h, 1e3, 1]
          , ["slideleft", 12, 0, 1, 0, "horizontal", !0, !0, 12, u, u, 1e3, 1]
          , ["slideup", 13, 0, 1, 0, "horizontal", !0, !0, 13, u, u, 1e3, 1]
          , ["slidedown", 14, 0, 1, 0, "horizontal", !0, !0, 14, u, u, 1e3, 1]
          , ["slideright", 15, 0, 1, 0, "horizontal", !0, !0, 15, u, u, 1e3, 1]
          , ["slideoverleft", 12, 7, 1, 0, "horizontal", !0, !0, 12, u, u, 1e3, 1]
          , ["slideoverup", 13, 7, 1, 0, "horizontal", !0, !0, 13, u, u, 1e3, 1]
          , ["slideoverdown", 14, 7, 1, 0, "horizontal", !0, !0, 14, u, u, 1e3, 1]
          , ["slideoverright", 15, 7, 1, 0, "horizontal", !0, !0, 15, u, u, 1e3, 1]
          , ["slideremoveleft", 12, 8, 1, 0, "horizontal", !0, !0, 12, u, u, 1e3, 1]
          , ["slideremoveup", 13, 8, 1, 0, "horizontal", !0, !0, 13, u, u, 1e3, 1]
          , ["slideremovedown", 14, 8, 1, 0, "horizontal", !0, !0, 14, u, u, 1e3, 1]
          , ["slideremoveright", 15, 8, 1, 0, "horizontal", !0, !0, 15, u, u, 1e3, 1]
          , ["papercut", 16, 0, 0, 600, "", null, null, 16, u, u, 1e3, 2]
          , ["3dcurtain-horizontal", 17, 0, 20, 100, "vertical", !1, !0, 17, s, s, 500, 7]
          , ["3dcurtain-vertical", 18, 0, 10, 100, "horizontal", !1, !0, 18, s, s, 500, 5]
          , ["cubic", 19, 0, 20, 600, "horizontal", !1, !0, 19, u, u, 500, 1]
          , ["cube", 19, 0, 20, 600, "horizontal", !1, !0, 20, u, u, 500, 1]
          , ["flyin", 20, 0, 4, 600, "vertical", !1, !0, 21, c, u, 500, 1]
          , ["turnoff", 21, 0, 1, 500, "horizontal", !1, !0, 22, u, u, 500, 1]
          , ["incube", 22, 0, 20, 200, "horizontal", !1, !0, 23, h, h, 500, 1]
          , ["cubic-horizontal", 23, 0, 20, 500, "vertical", !1, !0, 24, p, p, 500, 1]
          , ["cube-horizontal", 23, 0, 20, 500, "vertical", !1, !0, 25, p, p, 500, 1]
          , ["incube-horizontal", 24, 0, 20, 500, "vertical", !1, !0, 26, h, h, 500, 1]
          , ["turnoff-vertical", 25, 0, 1, 200, "horizontal", !1, !0, 27, h, h, 500, 1]
          , ["fadefromright", 12, 1, 1, 0, "horizontal", !0, !0, 28, h, h, 1e3, 1]
          , ["fadefromleft", 15, 1, 1, 0, "horizontal", !0, !0, 29, h, h, 1e3, 1]
          , ["fadefromtop", 14, 1, 1, 0, "horizontal", !0, !0, 30, h, h, 1e3, 1]
          , ["fadefrombottom", 13, 1, 1, 0, "horizontal", !0, !0, 31, h, h, 1e3, 1]
          , ["fadetoleftfadefromright", 12, 2, 1, 0, "horizontal", !0, !0, 32, h, h, 1e3, 1]
          , ["fadetorightfadefromleft", 15, 2, 1, 0, "horizontal", !0, !0, 33, h, h, 1e3, 1]
          , ["fadetobottomfadefromtop", 14, 2, 1, 0, "horizontal", !0, !0, 34, h, h, 1e3, 1]
          , ["fadetotopfadefrombottom", 13, 2, 1, 0, "horizontal", !0, !0, 35, h, h, 1e3, 1]
          , ["parallaxtoright", 12, 3, 1, 0, "horizontal", !0, !0, 36, h, l, 1500, 1]
          , ["parallaxtoleft", 15, 3, 1, 0, "horizontal", !0, !0, 37, h, l, 1500, 1]
          , ["parallaxtotop", 14, 3, 1, 0, "horizontal", !0, !0, 38, h, r, 1500, 1]
          , ["parallaxtobottom", 13, 3, 1, 0, "horizontal", !0, !0, 39, h, r, 1500, 1]
          , ["scaledownfromright", 12, 4, 1, 0, "horizontal", !0, !0, 40, h, l, 1e3, 1]
          , ["scaledownfromleft", 15, 4, 1, 0, "horizontal", !0, !0, 41, h, l, 1e3, 1]
          , ["scaledownfromtop", 14, 4, 1, 0, "horizontal", !0, !0, 42, h, l, 1e3, 1]
          , ["scaledownfrombottom", 13, 4, 1, 0, "horizontal", !0, !0, 43, h, l, 1e3, 1]
          , ["zoomout", 13, 5, 1, 0, "horizontal", !0, !0, 44, h, l, 1e3, 1]
          , ["zoomin", 13, 6, 1, 0, "horizontal", !0, !0, 45, h, l, 1e3, 1]
          , ["notransition", 26, 0, 1, 0, "horizontal", !0, null, 46, h, l, 1e3, 1]
        ]);
      "slidehorizontal" == a && (a = "slideleft", 1 == o && (a = "slideright")), "slidevertical" == a && (a = "slideup", 1 == o && (a = "slidedown")), "slideoverhorizontal" == a && (a = "slideoverleft", 1 == o && (a = "slideoverright")), "slideoververtical" == a && (a = "slideoverup", 1 == o && (a = "slideoverdown")), "slideremovehorizontal" == a && (a = "slideremoveleft", 1 == o && (a = "slideremoveright")), "slideremovevertical" == a && (a = "slideremoveup", 1 == o && (a = "slideremovedown")), "parallaxhorizontal" == a && (a = "parallaxtoleft", 1 == o && (a = "parallaxtoright")), "parallaxvertical" == a && (a = "parallaxtotop", 1 == o && (a = "parallaxtobottom")), "random" == a && (a = Math.round(Math.random() * y.length - 1), a > y.length - 1 && (a = y.length - 1)), "random-static" == a && (a = Math.round(Math.random() * f.length - 1), a > f.length - 1 && (a = f.length - 1), a = f[a]), "random-premium" == a && (a = Math.round(Math.random() * v.length - 1), a > v.length - 1 && (a = v.length - 1), a = v[a]);
      var x = [12, 13, 14, 15, 16, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45];
      if (1 == t.isJoomla && void 0 != window.MooTools && -1 != x.indexOf(a)) {
        var T = Math.round(Math.random() * (v.length - 2)) + 1;
        T > v.length - 1 && (T = v.length - 1), 0 == T && (T = 1), a = v[T]
      }
      n(), g > 26 && (g = 26), 0 > g && (g = 0);
      var L = new Object;
      return L.nexttrans = g, L.STA = y[w], L.specials = m, L
    }
    , i = function(e, t) {
      return void 0 == t || jQuery.isNumeric(e) ? e : void 0 == e ? e : e.split(",")[t]
    }
    , o = function(e, o, n, r, d, s, l, p, h) {
      var c = s.index()
        , u = d.index()
        , f = c > u ? 1 : 0;
      "arrow" == r.sc_indicator && (0 == c && u == r.slideamount - 1 && (f = 1), c == r.slideamount - 1 && 0 == u && (f = 0));
      var v = a(n, r, o, l, f)
        , g = v.STA
        , m = v.specials
        , e = v.nexttrans;
      "on" == l.data("kenburns") && (e = 11);
      var w = d.data("nexttransid") || 0
        , b = i(d.data("masterspeed"), w);
      b = "default" === b ? g[11] : "random" === b ? Math.round(1e3 * Math.random() + 300) : void 0 != b ? parseInt(b, 0) : g[11], b = b > r.delay ? r.delay : b, b += g[4], r.slots = i(d.data("slotamount"), w), r.slots = void 0 == r.slots || "default" == r.slots ? g[12] : "random" == r.slots ? Math.round(12 * Math.random() + 4) : g[12], r.slots = r.slots < 1 ? "boxslide" == o ? Math.round(6 * Math.random() + 3) : "flyin" == o ? Math.round(4 * Math.random() + 1) : r.slots : r.slots, r.slots = (4 == e || 5 == e || 6 == e) && r.slots < 3 ? 3 : r.slots, r.slots = 0 != g[3] ? Math.min(r.slots, g[3]) : r.slots, r.slots = 9 == e ? r.width / 20 : 10 == e ? r.height / 20 : r.slots, r.rotate = i(d.data("rotate"), w), r.rotate = void 0 == r.rotate || "default" == r.rotate ? 0 : 999 == r.rotate || "random" == r.rotate ? Math.round(360 * Math.random()) : r.rotate, r.rotate = !jQuery.support.transition || r.ie || r.ie9 ? 0 : r.rotate, 11 != e && (null != g[7] && t(p, r, g[7], g[5]), null != g[6] && t(l, r, g[6], g[5])), h.add(punchgs.TweenLite.set(l, {
        autoAlpha: 1
      }), 0), h.add(punchgs.TweenLite.set(p, {
        autoAlpha: 1
      }), 0);
      var y = i(d.data("easein"), w)
        , x = i(d.data("easeout"), w);
      if (y = "default" === y ? g[9] || punchgs.Power2.easeInOut : y || g[9] || punchgs.Power2.easeInOut, x = "default" === x ? g[10] || punchgs.Power2.easeInOut : x || g[10] || punchgs.Power2.easeInOut, 0 == e) {
        var T = Math.ceil(r.height / r.sloth)
          , L = 0;
        l.find(".slotslide").each(function(e) {
          var t = jQuery(this);
          L += 1, L == T && (L = 0), h.add(punchgs.TweenLite.from(t, b / 600, {
            opacity: 0
            , top: 0 - r.sloth
            , left: 0 - r.slotw
            , rotation: r.rotate
            , force3D: "auto"
            , ease: y
          }), (15 * e + 30 * L) / 1500)
        })
      }
      if (1 == e) {
        var _, k = 0;
        l.find(".slotslide").each(function(e) {
          var t = jQuery(this)
            , a = Math.random() * b + 300
            , i = 500 * Math.random() + 200;
          a + i > _ && (_ = i + i, k = e), h.add(punchgs.TweenLite.from(t, a / 1e3, {
            autoAlpha: 0
            , force3D: "auto"
            , rotation: r.rotate
            , ease: y
          }), i / 1e3)
        })
      }
      if (2 == e) {
        var j = new punchgs.TimelineLite;
        p.find(".slotslide").each(function() {
          var e = jQuery(this);
          j.add(punchgs.TweenLite.to(e, b / 1e3, {
            left: r.slotw
            , ease: y
            , force3D: "auto"
            , rotation: 0 - r.rotate
          }), 0), h.add(j, 0)
        }), l.find(".slotslide").each(function() {
          var e = jQuery(this);
          j.add(punchgs.TweenLite.from(e, b / 1e3, {
            left: 0 - r.slotw
            , ease: y
            , force3D: "auto"
            , rotation: r.rotate
          }), 0), h.add(j, 0)
        })
      }
      if (3 == e) {
        var j = new punchgs.TimelineLite;
        p.find(".slotslide").each(function() {
          var e = jQuery(this);
          j.add(punchgs.TweenLite.to(e, b / 1e3, {
            top: r.sloth
            , ease: y
            , rotation: r.rotate
            , force3D: "auto"
            , transformPerspective: 600
          }), 0), h.add(j, 0)
        }), l.find(".slotslide").each(function() {
          var e = jQuery(this);
          j.add(punchgs.TweenLite.from(e, b / 1e3, {
            top: 0 - r.sloth
            , rotation: r.rotate
            , ease: x
            , force3D: "auto"
            , transformPerspective: 600
          }), 0), h.add(j, 0)
        })
      }
      if (4 == e || 5 == e) {
        setTimeout(function() {
          p.find(".defaultimg").css({
            opacity: 0
          })
        }, 100);
        var z = b / 1e3
          , j = new punchgs.TimelineLite;
        p.find(".slotslide").each(function(t) {
          var a = jQuery(this)
            , i = t * z / r.slots;
          5 == e && (i = (r.slots - t - 1) * z / r.slots / 1.5), j.add(punchgs.TweenLite.to(a, 3 * z, {
            transformPerspective: 600
            , force3D: "auto"
            , top: 0 + r.height
            , opacity: .5
            , rotation: r.rotate
            , ease: y
            , delay: i
          }), 0), h.add(j, 0)
        }), l.find(".slotslide").each(function(t) {
          var a = jQuery(this)
            , i = t * z / r.slots;
          5 == e && (i = (r.slots - t - 1) * z / r.slots / 1.5), j.add(punchgs.TweenLite.from(a, 3 * z, {
            top: 0 - r.height
            , opacity: .5
            , rotation: r.rotate
            , force3D: "auto"
            , ease: punchgs.eo
            , delay: i
          }), 0), h.add(j, 0)
        })
      }
      if (6 == e) {
        r.slots < 2 && (r.slots = 2), r.slots % 2 && (r.slots = r.slots + 1);
        var j = new punchgs.TimelineLite;
        setTimeout(function() {
          p.find(".defaultimg").css({
            opacity: 0
          })
        }, 100), p.find(".slotslide").each(function(e) {
          var t = jQuery(this);
          if (e + 1 < r.slots / 2) var a = 90 * (e + 2);
          else var a = 90 * (2 + r.slots - e);
          j.add(punchgs.TweenLite.to(t, (b + a) / 1e3, {
            top: 0 + r.height
            , opacity: 1
            , force3D: "auto"
            , rotation: r.rotate
            , ease: y
          }), 0), h.add(j, 0)
        }), l.find(".slotslide").each(function(e) {
          var t = jQuery(this);
          if (e + 1 < r.slots / 2) var a = 90 * (e + 2);
          else var a = 90 * (2 + r.slots - e);
          j.add(punchgs.TweenLite.from(t, (b + a) / 1e3, {
            top: 0 - r.height
            , opacity: 1
            , force3D: "auto"
            , rotation: r.rotate
            , ease: x
          }), 0), h.add(j, 0)
        })
      }
      if (7 == e) {
        b = 2 * b, b > r.delay && (b = r.delay);
        var j = new punchgs.TimelineLite;
        setTimeout(function() {
          p.find(".defaultimg").css({
            opacity: 0
          })
        }, 100), p.find(".slotslide").each(function() {
          var e = jQuery(this).find("div");
          j.add(punchgs.TweenLite.to(e, b / 1e3, {
            left: 0 - r.slotw / 2 + "px"
            , top: 0 - r.height / 2 + "px"
            , width: 2 * r.slotw + "px"
            , height: 2 * r.height + "px"
            , opacity: 0
            , rotation: r.rotate
            , force3D: "auto"
            , ease: y
          }), 0), h.add(j, 0)
        }), l.find(".slotslide").each(function(e) {
          var t = jQuery(this).find("div");
          j.add(punchgs.TweenLite.fromTo(t, b / 1e3, {
            left: 0
            , top: 0
            , opacity: 0
            , transformPerspective: 600
          }, {
            left: 0 - e * r.slotw + "px"
            , ease: x
            , force3D: "auto"
            , top: "0px"
            , width: r.width
            , height: r.height
            , opacity: 1
            , rotation: 0
            , delay: .1
          }), 0), h.add(j, 0)
        })
      }
      if (8 == e) {
        b = 3 * b, b > r.delay && (b = r.delay);
        var j = new punchgs.TimelineLite;
        p.find(".slotslide").each(function() {
          var e = jQuery(this).find("div");
          j.add(punchgs.TweenLite.to(e, b / 1e3, {
            left: 0 - r.width / 2 + "px"
            , top: 0 - r.sloth / 2 + "px"
            , width: 2 * r.width + "px"
            , height: 2 * r.sloth + "px"
            , force3D: "auto"
            , ease: y
            , opacity: 0
            , rotation: r.rotate
          }), 0), h.add(j, 0)
        }), l.find(".slotslide").each(function(e) {
          var t = jQuery(this).find("div");
          j.add(punchgs.TweenLite.fromTo(t, b / 1e3, {
            left: 0
            , top: 0
            , opacity: 0
            , force3D: "auto"
          }, {
            left: "0px"
            , top: 0 - e * r.sloth + "px"
            , width: l.find(".defaultimg").data("neww") + "px"
            , height: l.find(".defaultimg").data("newh") + "px"
            , opacity: 1
            , ease: x
            , rotation: 0
          }), 0), h.add(j, 0)
        })
      }
      if (9 == e || 10 == e) {
        var C = 0;
        l.find(".slotslide").each(function(e) {
          var t = jQuery(this);
          C++, h.add(punchgs.TweenLite.fromTo(t, b / 1e3, {
            autoAlpha: 0
            , force3D: "auto"
            , transformPerspective: 600
          }, {
            autoAlpha: 1
            , ease: y
            , delay: 5 * e / 1e3
          }), 0)
        })
      }
      if (11 == e || 26 == e) {
        var C = 0;
        26 == e && (b = 0), h.add(punchgs.TweenLite.fromTo(l, b / 1e3, {
          autoAlpha: 0
        }, {
          autoAlpha: 1
          , force3D: "auto"
          , ease: y
        }), 0), h.add(punchgs.TweenLite.to(p, b / 1e3, {
          autoAlpha: 0
          , force3D: "auto"
          , ease: y
        }), 0), h.add(punchgs.TweenLite.set(l.find(".defaultimg"), {
          autoAlpha: 1
        }), 0), h.add(punchgs.TweenLite.set(p.find("defaultimg"), {
          autoAlpha: 1
        }), 0)
      }
      if (12 == e || 13 == e || 14 == e || 15 == e) {
        b = b, b > r.delay && (b = r.delay), setTimeout(function() {
          punchgs.TweenLite.set(p.find(".defaultimg"), {
            autoAlpha: 0
          })
        }, 100);
        var I = r.width
          , O = r.height
          , Q = l.find(".slotslide")
          , M = 0
          , S = 0
          , P = 1
          , W = 1
          , D = 1
          , A = b / 1e3
          , H = A;
        ("fullwidth" == r.sliderLayout || "fullscreen" == r.sliderLayout) && (I = Q.width(), O = Q.height()), 12 == e ? M = I : 15 == e ? M = 0 - I : 13 == e ? S = O : 14 == e && (S = 0 - O), 1 == m && (P = 0), 2 == m && (P = 0), 3 == m && (A = b / 1300), (4 == m || 5 == m) && (W = .6), 6 == m && (W = 1.4), (5 == m || 6 == m) && (D = 1.4, P = 0, I = 0, O = 0, M = 0, S = 0), 6 == m && (D = .6), 7 == m && (I = 0, O = 0);
        var R = l.find(".slotslide")
          , Y = p.find(".slotslide");
        if (h.add(punchgs.TweenLite.set(s, {
            zIndex: 15
          }), 0), h.add(punchgs.TweenLite.set(d, {
            zIndex: 20
          }), 0), 8 == m ? (h.add(punchgs.TweenLite.set(s, {
            zIndex: 20
          }), 0), h.add(punchgs.TweenLite.set(d, {
            zIndex: 15
          }), 0), h.add(punchgs.TweenLite.set(R, {
            left: 0
            , top: 0
            , scale: 1
            , opacity: 1
            , rotation: 0
            , ease: y
            , force3D: "auto"
          }), 0)) : h.add(punchgs.TweenLite.from(R, A, {
            left: M
            , top: S
            , scale: D
            , opacity: P
            , rotation: r.rotate
            , ease: y
            , force3D: "auto"
          }), 0), (4 == m || 5 == m) && (I = 0, O = 0), 1 != m) switch (e) {
          case 12:
            h.add(punchgs.TweenLite.to(Y, H, {
              left: 0 - I + "px"
              , force3D: "auto"
              , scale: W
              , opacity: P
              , rotation: r.rotate
              , ease: x
            }), 0);
            break;
          case 15:
            h.add(punchgs.TweenLite.to(Y, H, {
              left: I + "px"
              , force3D: "auto"
              , scale: W
              , opacity: P
              , rotation: r.rotate
              , ease: x
            }), 0);
            break;
          case 13:
            h.add(punchgs.TweenLite.to(Y, H, {
              top: 0 - O + "px"
              , force3D: "auto"
              , scale: W
              , opacity: P
              , rotation: r.rotate
              , ease: x
            }), 0);
            break;
          case 14:
            h.add(punchgs.TweenLite.to(Y, H, {
              top: O + "px"
              , force3D: "auto"
              , scale: W
              , opacity: P
              , rotation: r.rotate
              , ease: x
            }), 0)
        }
      }
      if (16 == e) {
        var j = new punchgs.TimelineLite;
        h.add(punchgs.TweenLite.set(s, {
          position: "absolute"
          , "z-index": 20
        }), 0), h.add(punchgs.TweenLite.set(d, {
          position: "absolute"
          , "z-index": 15
        }), 0), s.wrapInner('<div class="tp-half-one" style="position:relative; width:100%;height:100%"></div>'), s.find(".tp-half-one").clone(!0).appendTo(s).addClass("tp-half-two"), s.find(".tp-half-two").removeClass("tp-half-one");
        var I = r.width
          , O = r.height;
        "on" == r.autoHeight && (O = n.height()), s.find(".tp-half-one .defaultimg").wrap('<div class="tp-papercut" style="width:' + I + "px;height:" + O + 'px;"></div>'), s.find(".tp-half-two .defaultimg").wrap('<div class="tp-papercut" style="width:' + I + "px;height:" + O + 'px;"></div>'), s.find(".tp-half-two .defaultimg").css({
          position: "absolute"
          , top: "-50%"
        }), s.find(".tp-half-two .tp-caption").wrapAll('<div style="position:absolute;top:-50%;left:0px;"></div>'), h.add(punchgs.TweenLite.set(s.find(".tp-half-two"), {
          width: I
          , height: O
          , overflow: "hidden"
          , zIndex: 15
          , position: "absolute"
          , top: O / 2
          , left: "0px"
          , transformPerspective: 600
          , transformOrigin: "center bottom"
        }), 0), h.add(punchgs.TweenLite.set(s.find(".tp-half-one"), {
          width: I
          , height: O / 2
          , overflow: "visible"
          , zIndex: 10
          , position: "absolute"
          , top: "0px"
          , left: "0px"
          , transformPerspective: 600
          , transformOrigin: "center top"
        }), 0);
        var X = (s.find(".defaultimg"), Math.round(20 * Math.random() - 10))
          , V = Math.round(20 * Math.random() - 10)
          , F = Math.round(20 * Math.random() - 10)
          , B = .4 * Math.random() - .2
          , N = .4 * Math.random() - .2
          , E = 1 * Math.random() + 1
          , Z = 1 * Math.random() + 1
          , $ = .3 * Math.random() + .3;
        h.add(punchgs.TweenLite.set(s.find(".tp-half-one"), {
          overflow: "hidden"
        }), 0), h.add(punchgs.TweenLite.fromTo(s.find(".tp-half-one"), b / 800, {
          width: I
          , height: O / 2
          , position: "absolute"
          , top: "0px"
          , left: "0px"
          , force3D: "auto"
          , transformOrigin: "center top"
        }, {
          scale: E
          , rotation: X
          , y: 0 - O - O / 4
          , autoAlpha: 0
          , ease: y
        }), 0), h.add(punchgs.TweenLite.fromTo(s.find(".tp-half-two"), b / 800, {
          width: I
          , height: O
          , overflow: "hidden"
          , position: "absolute"
          , top: O / 2
          , left: "0px"
          , force3D: "auto"
          , transformOrigin: "center bottom"
        }, {
          scale: Z
          , rotation: V
          , y: O + O / 4
          , ease: y
          , autoAlpha: 0
          , onComplete: function() {
            punchgs.TweenLite.set(s, {
              position: "absolute"
              , "z-index": 15
            }), punchgs.TweenLite.set(d, {
              position: "absolute"
              , "z-index": 20
            }), s.find(".tp-half-one").length > 0 && (s.find(".tp-half-one .defaultimg").unwrap(), s.find(".tp-half-one .slotholder").unwrap()), s.find(".tp-half-two").remove()
          }
        }), 0), j.add(punchgs.TweenLite.set(l.find(".defaultimg"), {
          autoAlpha: 1
        }), 0), null != s.html() && h.add(punchgs.TweenLite.fromTo(d, (b - 200) / 1e3, {
          scale: $
          , x: r.width / 4 * B
          , y: O / 4 * N
          , rotation: F
          , force3D: "auto"
          , transformOrigin: "center center"
          , ease: x
        }, {
          autoAlpha: 1
          , scale: 1
          , x: 0
          , y: 0
          , rotation: 0
        }), 0), h.add(j, 0)
      }
      if (17 == e && l.find(".slotslide").each(function(e) {
          var t = jQuery(this);
          h.add(punchgs.TweenLite.fromTo(t, b / 800, {
            opacity: 0
            , rotationY: 0
            , scale: .9
            , rotationX: -110
            , force3D: "auto"
            , transformPerspective: 600
            , transformOrigin: "center center"
          }, {
            opacity: 1
            , top: 0
            , left: 0
            , scale: 1
            , rotation: 0
            , rotationX: 0
            , force3D: "auto"
            , rotationY: 0
            , ease: y
            , delay: .06 * e
          }), 0)
        }), 18 == e && l.find(".slotslide").each(function(e) {
          var t = jQuery(this);
          h.add(punchgs.TweenLite.fromTo(t, b / 500, {
            autoAlpha: 0
            , rotationY: 110
            , scale: .9
            , rotationX: 10
            , force3D: "auto"
            , transformPerspective: 600
            , transformOrigin: "center center"
          }, {
            autoAlpha: 1
            , top: 0
            , left: 0
            , scale: 1
            , rotation: 0
            , rotationX: 0
            , force3D: "auto"
            , rotationY: 0
            , ease: y
            , delay: .06 * e
          }), 0)
        }), 19 == e || 22 == e) {
        var j = new punchgs.TimelineLite;
        h.add(punchgs.TweenLite.set(s, {
          zIndex: 20
        }), 0), h.add(punchgs.TweenLite.set(d, {
          zIndex: 20
        }), 0), setTimeout(function() {
          p.find(".defaultimg").css({
            opacity: 0
          })
        }, 100);
        var q = 90
          , P = 1
          , U = "center center ";
        1 == f && (q = -90), 19 == e ? (U = U + "-" + r.height / 2, P = 0) : U += r.height / 2, punchgs.TweenLite.set(n, {
          transformStyle: "flat"
          , backfaceVisibility: "hidden"
          , transformPerspective: 600
        }), l.find(".slotslide").each(function(e) {
          var t = jQuery(this);
          j.add(punchgs.TweenLite.fromTo(t, b / 1e3, {
            transformStyle: "flat"
            , backfaceVisibility: "hidden"
            , left: 0
            , rotationY: r.rotate
            , z: 10
            , top: 0
            , scale: 1
            , force3D: "auto"
            , transformPerspective: 600
            , transformOrigin: U
            , rotationX: q
          }, {
            left: 0
            , rotationY: 0
            , top: 0
            , z: 0
            , scale: 1
            , force3D: "auto"
            , rotationX: 0
            , delay: 50 * e / 1e3
            , ease: y
          }), 0), j.add(punchgs.TweenLite.to(t, .1, {
            autoAlpha: 1
            , delay: 50 * e / 1e3
          }), 0), h.add(j)
        }), p.find(".slotslide").each(function(e) {
          var t = jQuery(this)
            , a = -90;
          1 == f && (a = 90), j.add(punchgs.TweenLite.fromTo(t, b / 1e3, {
            transformStyle: "flat"
            , backfaceVisibility: "hidden"
            , autoAlpha: 1
            , rotationY: 0
            , top: 0
            , z: 0
            , scale: 1
            , force3D: "auto"
            , transformPerspective: 600
            , transformOrigin: U
            , rotationX: 0
          }, {
            autoAlpha: 1
            , rotationY: r.rotate
            , top: 0
            , z: 10
            , scale: 1
            , rotationX: a
            , delay: 50 * e / 1e3
            , force3D: "auto"
            , ease: x
          }), 0), h.add(j)
        }), h.add(punchgs.TweenLite.set(s, {
          zIndex: 18
        }), 0)
      }
      if (20 == e) {
        if (setTimeout(function() {
            p.find(".defaultimg").css({
              opacity: 0
            })
          }, 100), 1 == f) var G = -r.width
          , q = 80
          , U = "20% 70% -" + r.height / 2;
        else var G = r.width
          , q = -80
          , U = "80% 70% -" + r.height / 2;
        l.find(".slotslide").each(function(e) {
          var t = jQuery(this)
            , a = 50 * e / 1e3;
          h.add(punchgs.TweenLite.fromTo(t, b / 1e3, {
            left: G
            , rotationX: 40
            , z: -600
            , opacity: P
            , top: 0
            , scale: 1
            , force3D: "auto"
            , transformPerspective: 600
            , transformOrigin: U
            , transformStyle: "flat"
            , rotationY: q
          }, {
            left: 0
            , rotationX: 0
            , opacity: 1
            , top: 0
            , z: 0
            , scale: 1
            , rotationY: 0
            , delay: a
            , ease: y
          }), 0)
        }), p.find(".slotslide").each(function(e) {
          var t = jQuery(this)
            , a = 50 * e / 1e3;
          if (a = e > 0 ? a + b / 9e3 : 0, 1 != f) var i = -r.width / 2
            , o = 30
            , n = "20% 70% -" + r.height / 2;
          else var i = r.width / 2
            , o = -30
            , n = "80% 70% -" + r.height / 2;
          x = punchgs.Power2.easeInOut, h.add(punchgs.TweenLite.fromTo(t, b / 1e3, {
            opacity: 1
            , rotationX: 0
            , top: 0
            , z: 0
            , scale: 1
            , left: 0
            , force3D: "auto"
            , transformPerspective: 600
            , transformOrigin: n
            , transformStyle: "flat"
            , rotationY: 0
          }, {
            opacity: 1
            , rotationX: 20
            , top: 0
            , z: -600
            , left: i
            , force3D: "auto"
            , rotationY: o
            , delay: a
            , ease: x
          }), 0)
        })
      }
      if (21 == e || 25 == e) {
        setTimeout(function() {
          p.find(".defaultimg").css({
            opacity: 0
          })
        }, 100);
        var q = 90
          , G = -r.width
          , K = -q;
        if (1 == f)
          if (25 == e) {
            var U = "center top 0";
            q = r.rotate
          } else {
            var U = "left center 0";
            K = r.rotate
          } else if (G = r.width, q = -90, 25 == e) {
          var U = "center bottom 0";
          K = -q, q = r.rotate
        } else {
          var U = "right center 0";
          K = r.rotate
        }
        l.find(".slotslide").each(function() {
          var e = jQuery(this)
            , t = b / 1.5 / 3;
          h.add(punchgs.TweenLite.fromTo(e, 2 * t / 1e3, {
            left: 0
            , transformStyle: "flat"
            , rotationX: K
            , z: 0
            , autoAlpha: 0
            , top: 0
            , scale: 1
            , force3D: "auto"
            , transformPerspective: 1200
            , transformOrigin: U
            , rotationY: q
          }, {
            left: 0
            , rotationX: 0
            , top: 0
            , z: 0
            , autoAlpha: 1
            , scale: 1
            , rotationY: 0
            , force3D: "auto"
            , delay: t / 1e3
            , ease: y
          }), 0)
        }), 1 != f ? (G = -r.width, q = 90, 25 == e ? (U = "center top 0", K = -q, q = r.rotate) : (U = "left center 0", K = r.rotate)) : (G = r.width, q = -90, 25 == e ? (U = "center bottom 0", K = -q, q = r.rotate) : (U = "right center 0", K = r.rotate)), p.find(".slotslide").each(function() {
          var e = jQuery(this);
          h.add(punchgs.TweenLite.fromTo(e, b / 1e3, {
            left: 0
            , transformStyle: "flat"
            , rotationX: 0
            , z: 0
            , autoAlpha: 1
            , top: 0
            , scale: 1
            , force3D: "auto"
            , transformPerspective: 1200
            , transformOrigin: U
            , rotationY: 0
          }, {
            left: 0
            , rotationX: K
            , top: 0
            , z: 0
            , autoAlpha: 1
            , force3D: "auto"
            , scale: 1
            , rotationY: q
            , ease: x
          }), 0)
        })
      }
      if (23 == e || 24 == e) {
        setTimeout(function() {
          p.find(".defaultimg").css({
            opacity: 0
          })
        }, 100);
        var q = -90
          , P = 1
          , J = 0;
        if (1 == f && (q = 90), 23 == e) {
          var U = "center center -" + r.width / 2;
          P = 0
        } else var U = "center center " + r.width / 2;
        punchgs.TweenLite.set(n, {
          transformStyle: "preserve-3d"
          , backfaceVisibility: "hidden"
          , perspective: 2500
        }), l.find(".slotslide").each(function(e) {
          var t = jQuery(this);
          h.add(punchgs.TweenLite.fromTo(t, b / 1e3, {
            left: J
            , rotationX: r.rotate
            , force3D: "auto"
            , opacity: P
            , top: 0
            , scale: 1
            , transformPerspective: 1200
            , transformOrigin: U
            , rotationY: q
          }, {
            left: 0
            , rotationX: 0
            , autoAlpha: 1
            , top: 0
            , z: 0
            , scale: 1
            , rotationY: 0
            , delay: 50 * e / 500
            , ease: y
          }), 0)
        }), q = 90, 1 == f && (q = -90), p.find(".slotslide").each(function(t) {
          var a = jQuery(this);
          h.add(punchgs.TweenLite.fromTo(a, b / 1e3, {
            left: 0
            , rotationX: 0
            , top: 0
            , z: 0
            , scale: 1
            , force3D: "auto"
            , transformStyle: "flat"
            , transformPerspective: 1200
            , transformOrigin: U
            , rotationY: 0
          }, {
            left: J
            , rotationX: r.rotate
            , top: 0
            , scale: 1
            , rotationY: q
            , delay: 50 * t / 500
            , ease: x
          }), 0), 23 == e && h.add(punchgs.TweenLite.fromTo(a, b / 2e3, {
            autoAlpha: 1
          }, {
            autoAlpha: 0
            , delay: 50 * t / 500 + b / 3e3
            , ease: x
          }), 0)
        })
      }
      return h
    }
}(jQuery), ! function() {
  function e(e) {
    return void 0 == e ? -1 : jQuery.isNumeric(e) ? e : e.split(":").length > 1 ? 60 * parseInt(e.split(":")[0], 0) + parseInt(e.split(":")[1], 0) : e
  }
  var t = jQuery.fn.revolution
    , a = t.is_mobile();
  jQuery.extend(!0, t, {
    resetVideo: function(t) {
      switch (t.data("videotype")) {
        case "youtube":
          t.data("player");
          try {
            if ("on" == t.data("forcerewind") && !a) {
              var i = e(t.data("videostartat"));
              i = -1 == i ? 0 : i, t.data("player").seekTo(i), t.data("player").pauseVideo()
            }
          } catch (o) {}
          0 == t.find(".tp-videoposter").length && punchgs.TweenLite.to(t.find("iframe"), .3, {
            autoAlpha: 1
            , display: "block"
            , ease: punchgs.Power3.easeInOut
          });
          break;
        case "vimeo":
          var n = $f(t.find("iframe").attr("id"));
          try {
            if ("on" == t.data("forcerewind") && !a) {
              var i = e(t.data("videostartat"));
              i = -1 == i ? 0 : i, n.api("seekTo", i), n.api("pause")
            }
          } catch (o) {}
          0 == t.find(".tp-videoposter").length && punchgs.TweenLite.to(t.find("iframe"), .3, {
            autoAlpha: 1
            , display: "block"
            , ease: punchgs.Power3.easeInOut
          });
          break;
        case "html5":
          if (a && 1 == t.data("disablevideoonmobile")) return !1;
          var r = t.find("video")
            , d = r[0];
          if (punchgs.TweenLite.to(r, .3, {
              autoAlpha: 1
              , display: "block"
              , ease: punchgs.Power3.easeInOut
            }), "on" == t.data("forcerewind") && !t.hasClass("videoisplaying")) try {
            var i = e(t.data("videostartat"));
            d.currentTime = -1 == i ? 0 : i
          } catch (o) {}
          "mute" == t.data("volume") && (d.muted = !0)
      }
    }
    , stopVideo: function(e) {
      switch (e.data("videotype")) {
        case "youtube":
          try {
            var t = e.data("player");
            t.pauseVideo()
          } catch (a) {}
          break;
        case "vimeo":
          try {
            var i = $f(e.find("iframe").attr("id"));
            i.api("pause")
          } catch (a) {}
          break;
        case "html5":
          var o = e.find("video")
            , n = o[0];
          n.pause()
      }
    }
    , playVideo: function(o, r) {
      switch (clearTimeout(o.data("videoplaywait")), o.data("videotype")) {
        case "youtube":
          if (0 == o.find("iframe").length) o.append(o.data("videomarkup")), n(o, r, !0);
          else if (void 0 != o.data("player").playVideo) {
            o.data("player").playVideo();
            var d = e(o.data("videostartat")); - 1 != d && o.data("player").seekTo(d)
          } else o.data("videoplaywait", setTimeout(function() {
            t.playVideo(o, r)
          }, 50));
          break;
        case "vimeo":
          if (0 == o.find("iframe").length) o.append(o.data("videomarkup")), n(o, r, !0);
          else if (o.hasClass("rs-apiready")) {
            var s = o.find("iframe").attr("id")
              , l = $f(s);
            void 0 == l.api("play") ? o.data("videoplaywait", setTimeout(function() {
              t.playVideo(o, r)
            }, 50)) : setTimeout(function() {
              l.api("play");
              var t = e(o.data("videostartat")); - 1 != t && l.api("seekTo", t)
            }, 510)
          } else o.data("videoplaywait", setTimeout(function() {
            t.playVideo(o, r)
          }, 50));
          break;
        case "html5":
          if (a && 1 == o.data("disablevideoonmobile")) return !1;
          var p = o.find("video")
            , h = p[0]
            , c = p.parent();
          if (1 != c.data("metaloaded")) i(h, "loadedmetadata", function(a) {
            t.resetVideo(a, r), h.play();
            var i = e(a.data("videostartat")); - 1 != i && (h.currentTime = i)
          }(o));
          else {
            h.play();
            var d = e(o.data("videostartat")); - 1 != d && (h.currentTime = d)
          }
      }
    }
    , isVideoPlaying: function(e, t) {
      var a = !1;
      return void 0 != t.playingvideos && jQuery.each(t.playingvideos, function(t, i) {
        e.attr("id") == i.attr("id") && (a = !0)
      }), a
    }
    , prepareCoveredVideo: function(e, t, a) {
      var i = a.find("iframe, video")
        , o = e.split(":")[0]
        , n = e.split(":")[1]
        , r = t.width / t.height
        , d = o / n
        , s = r / d * 100
        , l = d / r * 100;
      r > d ? punchgs.TweenLite.to(i, .001, {
        height: s + "%"
        , width: "100%"
        , top: -(s - 100) / 2 + "%"
        , left: "0px"
        , position: "absolute"
      }) : punchgs.TweenLite.to(i, .001, {
        width: l + "%"
        , height: "100%"
        , left: -(l - 100) / 2 + "%"
        , top: "0px"
        , position: "absolute"
      })
    }
    , checkVideoApis: function(e, t, a) {
      var i = "https:" === location.protocol ? "https" : "http";
      if ((void 0 != e.data("ytid") || e.find("iframe").length > 0 && e.find("iframe").attr("src").toLowerCase().indexOf("youtube") > 0) && (t.youtubeapineeded = !0), (void 0 != e.data("ytid") || e.find("iframe").length > 0 && e.find("iframe").attr("src").toLowerCase().indexOf("youtube") > 0) && 0 == a.addedyt) {
        a.addedyt = 1;
        var o = document.createElement("script");
        o.src = "https://www.youtube.com/iframe_api";
        var n = document.getElementsByTagName("script")[0]
          , r = !0;
        jQuery("head").find("*").each(function() {
          "https://www.youtube.com/iframe_api" == jQuery(this).attr("src") && (r = !1)
        }), r && n.parentNode.insertBefore(o, n)
      }
      if ((void 0 != e.data("vimeoid") || e.find("iframe").length > 0 && e.find("iframe").attr("src").toLowerCase().indexOf("vimeo") > 0) && (t.vimeoapineeded = !0), (void 0 != e.data("vimeoid") || e.find("iframe").length > 0 && e.find("iframe").attr("src").toLowerCase().indexOf("vimeo") > 0) && 0 == a.addedvim) {
        a.addedvim = 1;
        var d = document.createElement("script")
          , n = document.getElementsByTagName("script")[0]
          , r = !0;
        d.src = i + "://f.vimeocdn.com/js/froogaloop2.min.js", jQuery("head").find("*").each(function() {
          jQuery(this).attr("src") == i + "://a.vimeocdn.com/js/froogaloop2.min.js" && (r = !1)
        }), r && n.parentNode.insertBefore(d, n)
      }
      return a
    }
    , manageVideoLayer: function(o, d) {
      var s = o.data("videoattributes")
        , l = o.data("ytid")
        , p = o.data("vimeoid")
        , h = o.data("videpreload")
        , c = o.data("videomp4")
        , u = o.data("videowebm")
        , f = o.data("videoogv")
        , v = o.data("videocontrols")
        , g = "http"
        , m = "loop" == o.data("videoloop") ? "loop" : "loopandnoslidestop" == o.data("videoloop") ? "loop" : ""
        , w = void 0 != c || void 0 != u ? "html5" : void 0 != l && String(l).length > 1 ? "youtube" : void 0 != p && String(p).length > 1 ? "vimeo" : "none"
        , b = "html5" == w && 0 == o.find("video").length ? "html5" : "youtube" == w && 0 == o.find("iframe").length ? "youtube" : "vimeo" == w && 0 == o.find("iframe").length ? "vimeo" : "none";
      switch (o.data("videotype", w), b) {
        case "html5":
          "controls" != v && (v = "");
          var y = '<video style="object-fit:cover;background-size:cover;visible:hidden;width:100%; height:100%" class="" ' + m + ' preload="' + h + '"';
          void 0 != u && "firefox" == t.get_browser().toLowerCase() && (y = y + '<source src="' + u + '" type="video/webm" />'), void 0 != c && (y = y + '<source src="' + c + '" type="video/mp4" />'), void 0 != f && (y = y + '<source src="' + f + '" type="video/ogg" />'), y += "</video>", "controls" == v && (y += '<div class="tp-video-controls"><div class="tp-video-button-wrap"><button type="button" class="tp-video-button tp-vid-play-pause">Play</button></div><div class="tp-video-seek-bar-wrap"><input  type="range" class="tp-seek-bar" value="0"></div><div class="tp-video-button-wrap"><button  type="button" class="tp-video-button tp-vid-mute">Mute</button></div><div class="tp-video-vol-bar-wrap"><input  type="range" class="tp-volume-bar" min="0" max="1" step="0.1" value="1"></div><div class="tp-video-button-wrap"><button  type="button" class="tp-video-button tp-vid-full-screen">Full-Screen</button></div></div>'), o.data("videomarkup", y), o.append(y), (a && 1 == o.data("disablevideoonmobile") || t.isIE(8)) && o.find("video").remove(), o.find("video").each(function() {
            var e = this
              , a = jQuery(this);
            a.parent().hasClass("html5vid") || a.wrap('<div class="html5vid" style="position:relative;top:0px;left:0px;width:100%;height:100%; overflow:hidden;"></div>');
            var n = a.parent();
            1 != n.data("metaloaded") && i(e, "loadedmetadata", function(e) {
              r(e, d), t.resetVideo(e, d)
            }(o))
          });
          break;
        case "youtube":
          g = "http", "https:" === location.protocol && (g = "https"), "none" == v && (s = s.replace("controls=1", "controls=0"), -1 == s.toLowerCase().indexOf("controls") && (s += "&controls=0"));
          var x = e(o.data("videostartat"))
            , T = e(o.data("videoendat")); - 1 != x && (s = s + "&start=" + x), -1 != T && (s = s + "&end=" + T), o.data("videomarkup", '<iframe style="visible:hidden" src="' + g + "://www.youtube.com/embed/" + l + "?" + s + '" width="100%" height="100%" style="width:100%;height:100%"></iframe>');
          break;
        case "vimeo":
          "https:" === location.protocol && (g = "https"), o.data("videomarkup", '<iframe style="visible:hidden" src="' + g + "://player.vimeo.com/video/" + p + "?" + s + '" width="100%" height="100%" style="100%;height:100%"></iframe>')
      }
      void 0 != o.data("videoposter") && o.data("videoposter").length > 2 ? (0 == o.find(".tp-videoposter").length && o.append('<div class="tp-videoposter noSwipe" style="cursor:pointer; position:absolute;top:0px;left:0px;width:100%;height:100%;z-index:3;background-image:url(' + o.data("videoposter") + '); background-size:cover;background-position:center center;"></div>'), 0 == o.find("iframe").length && o.find(".tp-videoposter").click(function() {
        if (t.playVideo(o, d), a) {
          if (1 == o.data("disablevideoonmobile")) return !1;
          punchgs.TweenLite.to(o.find(".tp-videoposter"), .3, {
            autoAlpha: 0
            , force3D: "auto"
            , ease: punchgs.Power3.easeInOut
          }), punchgs.TweenLite.to(o.find("iframe"), .3, {
            autoAlpha: 1
            , display: "block"
            , ease: punchgs.Power3.easeInOut
          })
        }
      })) : 0 != o.find("iframe").length || "youtube" != w && "vimeo" != w || (o.append(o.data("videomarkup")), n(o, d, !1)), "none" != o.data("dottedoverlay") && void 0 != o.data("dottedoverlay") && 1 != o.find(".tp-dottedoverlay").length && o.append('<div class="tp-dottedoverlay ' + o.data("dottedoverlay") + '"></div>'), o.addClass("HasListener"), 1 == o.data("bgvideo") && punchgs.TweenLite.set(o.find("video, iframe"), {
        autoAlpha: 0
      })
    }
  });
  var i = function(e, t, a) {
      e.addEventListener ? e.addEventListener(t, a, !1) : e.attachEvent(t, a, !1)
    }
    , o = function(e, t, a) {
      var i = {};
      return i.video = e, i.videotype = t, i.settings = a, i
    }
    , n = function(i, n, r) {
      var l = i.find("iframe")
        , p = "iframe" + Math.round(1e5 * Math.random() + 1)
        , h = i.data("videoloop")
        , c = "loopandnoslidestop" != h;
      if (h = "loop" == h || "loopandnoslidestop" == h, 1 == i.data("forcecover")) {
        i.removeClass("fullscreenvideo").addClass("coverscreenvideo");
        var u = i.data("aspectratio");
        void 0 != u && u.split(":").length > 1 && t.prepareCoveredVideo(u, n, i)
      }
      if (l.attr("id", p), r && i.data("startvideonow", !0), 1 !== i.data("videolistenerexist")) switch (i.data("videotype")) {
        case "youtube":
          var f = new YT.Player(p, {
            events: {
              onStateChange: function(t) {
                var a = t.target.getVideoEmbedCode()
                  , i = jQuery("#" + a.split('id="')[1].split('"')[0])
                  , r = i.closest(".tp-simpleresponsive")
                  , l = i.parent()
                  , p = i.parent().data("player");
                if (t.data == YT.PlayerState.PLAYING) punchgs.TweenLite.to(l.find(".tp-videoposter"), .3, {
                  autoAlpha: 0
                  , force3D: "auto"
                  , ease: punchgs.Power3.easeInOut
                }), punchgs.TweenLite.to(l.find("iframe"), .3, {
                  autoAlpha: 1
                  , display: "block"
                  , ease: punchgs.Power3.easeInOut
                }), "mute" == l.data("volume") ? p.mute() : (p.unMute(), p.setVolume(parseInt(l.data("volume"), 0) || 75)), n.videoplaying = !0, d(l, n), r.trigger("stoptimer"), n.c.trigger("revolution.slide.onvideoplay", o(p, "youtube", l.data()));
                else {
                  if (0 == t.data && h) {
                    p.playVideo();
                    var c = e(l.data("videostartat")); - 1 != c && p.seekTo(c)
                  }(0 == t.data || 2 == t.data) && "on" == l.data("showcoveronpause") && l.find(".tp-videoposter").length > 0 && (punchgs.TweenLite.to(l.find(".tp-videoposter"), .3, {
                    autoAlpha: 1
                    , force3D: "auto"
                    , ease: punchgs.Power3.easeInOut
                  }), punchgs.TweenLite.to(l.find("iframe"), .3, {
                    autoAlpha: 0
                    , ease: punchgs.Power3.easeInOut
                  })), -1 != t.data && 3 != t.data && (n.videoplaying = !1, s(l, n), r.trigger("starttimer"), n.c.trigger("revolution.slide.onvideostop", o(p, "youtube", l.data()))), 0 == t.data && 1 == l.data("nextslideatend") ? (n.c.revnext(), s(l, n)) : (s(l, n), n.videoplaying = !1, r.trigger("starttimer"), n.c.trigger("revolution.slide.onvideostop", o(p, "youtube", l.data())))
                }
              }
              , onReady: function(t) {
                var i = t.target.getVideoEmbedCode()
                  , o = jQuery("#" + i.split('id="')[1].split('"')[0])
                  , n = o.parent()
                  , r = n.data("videorate");
                if (n.data("videostart"), n.addClass("rs-apiready"), void 0 != r && t.target.setPlaybackRate(parseFloat(r)), n.find(".tp-videoposter").unbind("click"), n.find(".tp-videoposter").click(function() {
                    a || f.playVideo()
                  }), n.data("startvideonow")) {
                  n.data("player").playVideo();
                  var d = e(n.data("videostartat")); - 1 != d && n.data("player").seekTo(d)
                }
                n.data("videolistenerexist", 1)
              }
            }
          });
          i.data("player", f);
          break;
        case "vimeo":
          for (var v, g = l.attr("src"), m = {}, w = g, b = /([^&=]+)=([^&]*)/g; v = b.exec(w);) m[decodeURIComponent(v[1])] = decodeURIComponent(v[2]);
          g = void 0 != m.player_id ? g.replace(m.player_id, p) : g + "&player_id=" + p;
          try {
            g = g.replace("api=0", "api=1")
          } catch (y) {}
          g += "&api=1", l.attr("src", g);
          var f = i.find("iframe")[0]
            , x = (jQuery("#" + p), $f(p));
          x.addEvent("ready", function() {
            if (i.addClass("rs-apiready"), x.addEvent("play", function() {
                i.data("nextslidecalled", 0), punchgs.TweenLite.to(i.find(".tp-videoposter"), .3, {
                  autoAlpha: 0
                  , force3D: "auto"
                  , ease: punchgs.Power3.easeInOut
                }), punchgs.TweenLite.to(i.find("iframe"), .3, {
                  autoAlpha: 1
                  , display: "block"
                  , ease: punchgs.Power3.easeInOut
                }), n.c.trigger("revolution.slide.onvideoplay", o(x, "vimeo", i.data())), n.videoplaying = !0, d(i, n), c && n.c.trigger("stoptimer"), "mute" == i.data("volume") ? x.api("setVolume", "0") : x.api("setVolume", parseInt(i.data("volume"), 0) / 100 || .75)
              }), x.addEvent("playProgress", function(t) {
                var a = e(i.data("videoendat"));
                if (0 != a && Math.abs(a - t.seconds) < .3 && a > t.seconds && 1 != i.data("nextslidecalled"))
                  if (h) {
                    x.api("play");
                    var o = e(i.data("videostartat")); - 1 != o && x.api("seekTo", o)
                  } else 1 == i.data("nextslideatend") && (i.data("nextslidecalled", 1), n.c.revnext()), x.api("pause")
              }), x.addEvent("finish", function() {
                s(i, n), n.videoplaying = !1, n.c.trigger("starttimer"), n.c.trigger("revolution.slide.onvideostop", o(x, "vimeo", i.data())), 1 == i.data("nextslideatend") && n.c.revnext()
              }), x.addEvent("pause", function() {
                i.find(".tp-videoposter").length > 0 && "on" == i.data("showcoveronpause") && (punchgs.TweenLite.to(i.find(".tp-videoposter"), .3, {
                  autoAlpha: 1
                  , force3D: "auto"
                  , ease: punchgs.Power3.easeInOut
                }), punchgs.TweenLite.to(i.find("iframe"), .3, {
                  autoAlpha: 0
                  , ease: punchgs.Power3.easeInOut
                })), n.videoplaying = !1, s(i, n), n.c.trigger("starttimer"), n.c.trigger("revolution.slide.onvideostop", o(x, "vimeo", i.data()))
              }), i.find(".tp-videoposter").unbind("click"), i.find(".tp-videoposter").click(function() {
                return a ? void 0 : (x.api("play"), !1)
              }), i.data("startvideonow")) {
              x.api("play");
              var t = e(i.data("videostartat")); - 1 != t && x.api("seekTo", t)
            }
            i.data("videolistenerexist", 1)
          })
      } else {
        var T = e(i.data("videostartat"));
        switch (i.data("videotype")) {
          case "youtube":
            r && (i.data("player").playVideo(), -1 != T && i.data("player").seekTo());
            break;
          case "vimeo":
            if (r) {
              var x = $f(i.find("iframe").attr("id"));
              x.api("play"), -1 != T && x.api("seekTo", T)
            }
        }
      }
    }
    , r = function(n, r) {
      if (a && 1 == n.data("disablevideoonmobile")) return !1;
      var l = n.find("video")
        , p = l[0]
        , h = l.parent()
        , c = n.data("videoloop")
        , u = "loopandnoslidestop" != c;
      if (c = "loop" == c || "loopandnoslidestop" == c, h.data("metaloaded", 1), void 0 == l.attr("control") && (0 != n.find(".tp-video-play-button").length || a || n.append('<div class="tp-video-play-button"><i class="revicon-right-dir"></i><span class="tp-revstop">&nbsp;</span></div>'), n.find("video, .tp-poster, .tp-video-play-button").click(function() {
          n.hasClass("videoisplaying") ? p.pause() : p.play()
        })), 1 == n.data("forcecover") || n.hasClass("fullscreenvideo"))
        if (1 == n.data("forcecover")) {
          h.addClass("fullcoveredvideo");
          var f = n.data("aspectratio");
          t.prepareCoveredVideo(f, r, n)
        } else h.addClass("fullscreenvideo");
      var v = n.find(".tp-vid-play-pause")[0]
        , g = n.find(".tp-vid-mute")[0]
        , m = n.find(".tp-vid-full-screen")[0]
        , w = n.find(".tp-seek-bar")[0]
        , b = n.find(".tp-volume-bar")[0];
      void 0 != v && (i(v, "click", function() {
        1 == p.paused ? p.play() : p.pause()
      }), i(g, "click", function() {
        0 == p.muted ? (p.muted = !0, g.innerHTML = "Unmute") : (p.muted = !1, g.innerHTML = "Mute")
      }), i(m, "click", function() {
        p.requestFullscreen ? p.requestFullscreen() : p.mozRequestFullScreen ? p.mozRequestFullScreen() : p.webkitRequestFullscreen && p.webkitRequestFullscreen()
      }), i(w, "change", function() {
        var e = p.duration * (w.value / 100);
        p.currentTime = e
      }), i(p, "timeupdate", function() {
        var t = 100 / p.duration * p.currentTime
          , a = e(n.data("videoendat"))
          , i = p.currentTime;
        if (w.value = t, 0 != a && Math.abs(a - i) <= .3 && a > i && 1 != n.data("nextslidecalled"))
          if (c) {
            p.play();
            var o = e(n.data("videostartat")); - 1 != o && (p.currentTime = o)
          } else 1 == n.data("nextslideatend") && (n.data("nextslidecalled", 1), r.c.revnext()), p.pause()
      }), i(w, "mousedown", function() {
        n.addClass("seekbardragged"), p.pause()
      }), i(w, "mouseup", function() {
        n.removeClass("seekbardragged"), p.play()
      }), i(b, "change", function() {
        p.volume = b.value
      })), i(p, "play", function() {
        n.data("nextslidecalled", 0), "mute" == n.data("volume") && (p.muted = !0), n.addClass("videoisplaying"), d(n, r), u ? (r.videoplaying = !0, r.c.trigger("stoptimer"), r.c.trigger("revolution.slide.onvideoplay", o(p, "html5", n.data()))) : (r.videoplaying = !1, r.c.trigger("starttimer"), r.c.trigger("revolution.slide.onvideostop", o(p, "html5", n.data()))), punchgs.TweenLite.to(n.find(".tp-videoposter"), .3, {
          autoAlpha: 0
          , force3D: "auto"
          , ease: punchgs.Power3.easeInOut
        }), punchgs.TweenLite.to(n.find("video"), .3, {
          autoAlpha: 1
          , display: "block"
          , ease: punchgs.Power3.easeInOut
        });
        var e = n.find(".tp-vid-play-pause")[0]
          , t = n.find(".tp-vid-mute")[0];
        void 0 != e && (e.innerHTML = "Pause"), void 0 != t && p.muted && (t.innerHTML = "Unmute")
      }), i(p, "pause", function() {
        n.find(".tp-videoposter").length > 0 && "on" == n.data("showcoveronpause") && !n.hasClass("seekbardragged") && (punchgs.TweenLite.to(n.find(".tp-videoposter"), .3, {
          autoAlpha: 1
          , force3D: "auto"
          , ease: punchgs.Power3.easeInOut
        }), punchgs.TweenLite.to(n.find("video"), .3, {
          autoAlpha: 0
          , ease: punchgs.Power3.easeInOut
        })), n.removeClass("videoisplaying"), r.videoplaying = !1, s(n, r), r.c.trigger("starttimer"), r.c.trigger("revolution.slide.onvideostop", o(p, "html5", n.data()));
        var e = n.find(".tp-vid-play-pause")[0];
        void 0 != e && (e.innerHTML = "Play")
      }), i(p, "ended", function() {
        s(n, r), r.videoplaying = !1, s(n, r), r.c.trigger("starttimer"), r.c.trigger("revolution.slide.onvideostop", o(p, "html5", n.data())), 1 == n.data("nextslideatend") && r.c.revnext(), n.removeClass("videoisplaying")
      })
    }
    , d = function(e, a) {
      void 0 == a.playingvideos && (a.playingvideos = new Array), e.data("stopallvideos") && void 0 != a.playingvideos && a.playingvideos.length > 0 && (a.lastplayedvideos = jQuery.extend(!0, [], a.playingvideos), jQuery.each(a.playingvideos, function(e, i) {
        t.stopVideo(i, a)
      })), a.playingvideos.push(e)
    }
    , s = function(e, t) {
      void 0 != t.playingvideos && t.playingvideos.splice(jQuery.inArray(e, t.playingvideos), 1)
    }
}(jQuery);

					var tpj=jQuery;					
					var revapi116;
					tpj(document).ready(function() {
						if(tpj("#rev_slider_116_1").revolution == undefined){
							revslider_showDoubleJqueryError("#rev_slider_116_1");
						}else{
							revapi116 = tpj("#rev_slider_116_1").show().revolution({
								sliderType:"standard",
								jsFileLocation:"../../revolution/js/",
								sliderLayout:"auto",
								dottedOverlay:"none",
								delay:9000,
	                            navigation: {
	                                keyboardNavigation: "on",
	                                keyboard_direction: "horizontal",
	                                mouseScrollNavigation: "off",
	                                onHoverStop: "off",
	                                touch: {
	                                    touchenabled: "on",
	                                    swipe_threshold: 75,
	                                    swipe_min_touches: 1,
	                                    swipe_direction: "horizontal",
	                                    drag_block_vertical: false
	                                },
	                                arrows: {
	                                    style: "hebe",
	                                    enable: true,
	                                    hide_onmobile: true,
	                                    hide_onleave: false,
	                                    tmp: '<div class="tp-title-wrap">	<span class="tp-arr-titleholder">{{title}}</span>    <span class="tp-arr-imgholder"></span> </div>',
	                                    left: {
	                                        h_align: "left",
	                                        v_align: "bottom",
	                                        h_offset: 10,
	                                        v_offset: 70
	                                    },
	                                    right: {
	                                        h_align: "right",
	                                        v_align: "bottom",
	                                        h_offset: 10,
	                                        v_offset: 70
	                                    }
	                                },
	                            },
								viewPort: {
									enable:true,
									outof:"pause",
									visible_area:"80%"
								},
								gridwidth:1240,
								gridheight:768,
								lazyType:"none",
								shadow:0,
								spinner:"off",
								stopLoop:"off",
								stopAfterLoops:-1,
								stopAtSlide:-1,
								shuffle:"off",
								autoHeight:"off",
								hideThumbsOnMobile:"off",
								hideSliderAtLimit:0,
								hideCaptionAtLimit:0,
								hideAllCaptionAtLilmit:0,
								debugMode:false,
								fallbacks: {
									simplifyAll:"off",
									nextSlideOnWindowFocus:"off",
									disableFocusListener:false,
								}
							});
						}
					});	/*ready*/
