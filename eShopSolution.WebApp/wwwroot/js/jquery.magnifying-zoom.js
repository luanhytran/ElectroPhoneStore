(function(d) {
    "use strict";

    function r(e) {
        if ("string" === typeof e) {
            var c = e.indexOf("_"); - 1 != c && (e = e.substr(c + 1))
        }
        return e
    }
    var p = [],
        l = 0,
        s = {
            init: function(e) {
                this.each(function() {
                    var c = d(this),
                        a = c.data("mlens"),
                        a = d(),
                        f = d(),
                        q = d(),
                        h = d(),
                        m = d(),
                        g = d(),
                        b = "auto",
                        a = d.extend({
                            lensShape: "square",
                            lensSize: 60,
                            borderSize: 3,
                            borderColor: "#888",
                            borderRadius: 0,
                            imgSrc: "",
                            imgSrc2x: "",
                            lensCss: "",
                            imgOverlay: "",
                            overlayAdapt: !0
                        }, e);
                    "" == a.imgSrc && (g = c.attr("src"));
                    "" != a.imgSrc2x && 1 < window.devicePixelRatio ? (g = a.imgSrc2x, h = new Image, h.onload =
                        function() {
                            b = String(parseInt(this.width / 2)) + "px";
                            f.css({
                                backgroundSize: b + " auto"
                            });
                            m.css({
                                width: b
                            })
                        }, h.src = g) : g = a.imgSrc;
                    var n = "background-position: 0px 0px;width: " + String(a.lensSize) + "px;height: " + String(a.lensSize) + "px;float: left;display: none;border: " + String(a.borderSize) + "px solid " + a.borderColor + ";background-repeat: no-repeat;position: absolute;",
                        k = "position: absolute; width: 100%; height: 100%; left: 0; top: 0; background-position: center center; background-repeat: no-repeat; z-index: 1;";
                    !0 === a.overlayAdapt && (k += "background-position: center center fixed; -webkit-background-size: cover; -moz-background-size: cover; -o-background-size: cover; background-size: cover;");
                    switch (a.lensShape) {
                        default: n = n + "border-radius:" + String(a.borderRadius) + "px;";k = k + "border-radius:" + String(a.borderRadius) + "px;";
                        break;
                        case "circle":
                                n = n + "border-radius: " + String(a.lensSize / 2 + a.borderSize) + "px;",
                            k = k + "border-radius: " + String(a.lensSize / 2 + a.borderSize) + "px;"
                    }
                    c.wrap("<div id='mlens_wrapper_" + l + "' />");
                    h = c.parent();
                    h.css({
                        width: c.width()
                    });
                    f = d("<div id='mlens_target_" + l + "' style='" + n + "' class='" + a.lensCss + "'>&nbsp;</div>").appendTo(h);
                    m = d("<img style='display:none;width:" + b + ";height:auto;max-width:none;max-height;none;' src='" + g + "' />").appendTo(h);
                    f.css({
                        backgroundImage: "url('" + g + "')",
                        backgroundSize: b + " auto",
                        cursor: "none"
                    });
                    "" != a.imgOverlay && (q = d("<div id='mlens_overlay_" + l + "' style='" + k + "'>&nbsp;</div>"), q.css({
                        backgroundImage: "url('" + a.imgOverlay + "')",
                        cursor: "none"
                    }), q.appendTo(f));
                    c.attr("data-id", "mlens_" +
                        l);
                    c.data("mlens", {
                        lens: c,
                        options: a,
                        target: f,
                        imageTag: m,
                        imgSrc: g,
                        parentDiv: h,
                        overlay: q,
                        instance: l
                    });
                    a = c.data("mlens");
                    p[l] = a;
                    f.mousemove(function(a) {
                        d.fn.mlens("move", c.attr("data-id"), a)
                    });
                    c.mousemove(function(a) {
                        d.fn.mlens("move", c.attr("data-id"), a)
                    });
                    f.on("touchmove", function(a) {
                        a.preventDefault();
                        a = a.originalEvent.touches[0] || a.originalEvent.changedTouches[0];
                        d.fn.mlens("move", c.attr("data-id"), a)
                    });
                    c.on("touchmove", function(a) {
                        a.preventDefault();
                        a = a.originalEvent.touches[0] || a.originalEvent.changedTouches[0];
                        d.fn.mlens("move", c.attr("data-id"), a)
                    });
                    c.hover(function() {
                        f.show()
                    }, function() {
                        f.hide()
                    });
                    f.hover(function() {
                        f.show()
                    }, function() {
                        f.hide()
                    });
                    c.on("touchstart", function(a) {
                        a.preventDefault();
                        f.show()
                    });
                    c.on("touchend", function(a) {
                        a.preventDefault();
                        f.hide()
                    });
                    f.on("touchstart", function(a) {
                        a.preventDefault();
                        f.show()
                    });
                    f.on("touchend", function(a) {
                        a.preventDefault();
                        f.hide()
                    });
                    l++;
                    return p
                })
            },
            move: function(e, c) {
                e = r(e);
                var a = p[e],
                    f = a.lens,
                    d = a.target,
                    h = a.imageTag,
                    m = f.offset(),
                    g = parseInt(c.pageX - m.left),
                    b = parseInt(c.pageY - m.top),
                    n = h.width() / f.width(),
                    h = h.height() / f.height();
                0 < g && 0 < b && g < f.width() && b < f.height() && (g = String(-((c.pageX - m.left) * n - d.width() / 2)), b = String(-((c.pageY - m.top) * h - d.height() / 2)), d.css({
                    backgroundPosition: g + "px " + b + "px"
                }), g = String(c.pageX - m.left - d.width() / 2), b = String(c.pageY - m.top - d.height() / 2), d.css({
                    left: g + "px",
                    top: b + "px"
                }));
                a.target = d;
                p[e] = a;
                return p
            },
            update: function(e, c) {
                e = r(e);
                var a = p[e],
                    f = a.lens,
                    q = a.target,
                    h = a.overlay,
                    m = a.imageTag,
                    g = a.imgSrc,
                    b = d.extend(a.options, c),
                    n = "auto";
                "" == b.imgSrc && (g = f.attr("src"));
                if ("" != b.imgSrc2x && 1 < window.devicePixelRatio) {
                    var g = b.imgSrc2x,
                        k = new Image;
                    k.onload = function() {
                        n = String(parseInt(this.width / 2)) + "px";
                        q.css({
                            backgroundSize: n + " auto"
                        });
                        m.css({
                            width: n
                        })
                    };
                    k.src = g
                } else g = b.imgSrc;
                var k = "background-position: 0px 0px;width: " + String(b.lensSize) + "px;height: " + String(b.lensSize) + "px;float: left;display: none;border: " + String(b.borderSize) + "px solid " + b.borderColor + ";background-repeat: no-repeat;position: absolute;",
                    l = "position: absolute; width: 100%; height: 100%; left: 0; top: 0; background-position: center center; background-repeat: no-repeat; z-index: 1;";
                !0 === b.overlayAdapt && (l += "background-position: center center fixed; -webkit-background-size: cover; -moz-background-size: cover; -o-background-size: cover; background-size: cover;");
                switch (b.lensShape) {
                    default: k = k + "border-radius:" + String(b.borderRadius) + "px;";l = l + "border-radius:" + String(b.borderRadius) + "px;";
                    break;
                    case "circle":
                            k = k + "border-radius: " + String(b.lensSize / 2 + b.borderSize) + "px;",
                        l = l + "border-radius: " + String(b.lensSize / 2 + b.borderSize) + "px;"
                }
                q.attr("style", k);
                m.attr("src", g);
                m.css({
                    width: n
                });
                q.css({
                    backgroundImage: "url('" + g + "')",
                    backgroundSize: n + " auto",
                    cursor: "none"
                });
                h.attr("style", l);
                h.css({
                    backgroundImage: "url('" + b.imgOverlay + "')",
                    cursor: "none"
                });
                a.lens = f;
                a.target = q;
                a.overlay = h;
                a.options = b;
                a.imgSrc = g;
                a.imageTag = m;
                p[e] = a;
                return p
            },
            destroy: function(e) {
                e = r(e);
                d.removeData(p[e], this.name);
                this.removeClass(this.name);
                this.unbind();
                this.element = null
            }
        };
    d.fn.mlens = function(e) {
        if (s[e]) return s[e].apply(this, Array.prototype.slice.call(arguments, 1));
        if ("object" !== typeof e && e) d.error("Method " +
            e + " does not exist on jQuery.mlens");
        else return s.init.apply(this, arguments)
    }
})(jQuery);

// ************************ //
// Magnifying Glass
// ************************ //
(function() {
    "use strict";
    jQuery("#magni_img").mlens({
        imgSrc: jQuery("#magni_img").attr("data-big"), // path of the hi-res version of the image
        imgSrc2x: jQuery("#magni_img").attr("data-big2x"), // path of the hi-res @2x version of the image
        //for retina displays (optional)
        lensShape: "circle", // shape of the lens (circle/square)
        lensSize: 180, // size of the lens (in px)
        borderSize: 0, // size of the lens border (in px)
        borderColor: "#0e0f10", // color of the lens border (#hex)
        borderRadius: 0, // border radius (optional, only if the shape is square)
        imgOverlay: jQuery("#magni_img").attr("data-overlay"), // path of the overlay image (optional)
        overlayAdapt: true // true if the overlay image has to adapt to the lens size (true/false)
    });
})(jQuery);


jQuery(".cloud-zoom-gallery").click(function() {
    var galimg = jQuery(this).attr('href');
    jQuery("#magni_img").attr("data-big", galimg);
    jQuery("#mlens_target_0").css('background-image', 'url(' + galimg + ')');
});
