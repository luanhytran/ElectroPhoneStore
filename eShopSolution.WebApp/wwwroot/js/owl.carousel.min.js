/*
 *	jQuery OwlCarousel v1.31
 *  
 *	Copyright (c) 2013 Bartosz Wojciechowski
 *	http://www.owlgraphic.com/owlcarousel
 *
 *	Licensed under MIT
 *
 */
if (typeof Object.create !== "function") {"use strict"
    Object.create = function(e) {
        function t() {}
        t.prototype = e;
        return new t
    }
}(function(e, t, n, r) {
    var i = {
        init: function(t, n) {
            var r = this;
            r.$elem = e(n);
            r.options = e.extend({}, e.fn.owlCarousel.options, r.$elem.data(), t);
            r.userOptions = t;
            r.loadContent()
        },
        loadContent: function() {
            var t = this;
            if (typeof t.options.beforeInit === "function") {
                t.options.beforeInit.apply(this, [t.$elem])
            }
            if (typeof t.options.jsonPath === "string") {
                var n = t.options.jsonPath;

                function r(e) {
                    if (typeof t.options.jsonSuccess === "function") {
                        t.options.jsonSuccess.apply(this, [e])
                    } else {
                        var n = "";
                        for (var r in e["owl"]) {
                            n += e["owl"][r]["item"]
                        }
                        t.$elem.html(n)
                    }
                    t.logIn()
                }
                e.getJSON(n, r)
            } else {
                t.logIn()
            }
        },
        logIn: function(e) {
            var t = this;
            t.$elem.data("owl-originalStyles", t.$elem.attr("style")).data("owl-originalClasses", t.$elem.attr("class"));
            t.$elem.css({
                opacity: 0
            });
            t.orignalItems = t.options.items;
            t.checkBrowser();
            t.wrapperWidth = 0;
            t.checkVisible;
            t.setVars()
        },
        setVars: function() {
            var e = this;
            if (e.$elem.children().length === 0) {
                return false
            }
            e.baseClass();
            e.eventTypes();
            e.$userItems = e.$elem.children();
            e.itemsAmount = e.$userItems.length;
            e.wrapItems();
            e.$owlItems = e.$elem.find(".owl-item");
            e.$owlWrapper = e.$elem.find(".owl-wrapper");
            e.playDirection = "next";
            e.prevItem = 0;
            e.prevArr = [0];
            e.currentItem = 0;
            e.customEvents();
            e.onStartup()
        },
        onStartup: function() {
            var e = this;
            e.updateItems();
            e.calculateAll();
            e.buildControls();
            e.updateControls();
            e.response();
            e.moveEvents();
            e.stopOnHover();
            e.owlStatus();
            if (e.options.transitionStyle !== false) {
                e.transitionTypes(e.options.transitionStyle)
            }
            if (e.options.autoPlay === true) {
                e.options.autoPlay = 5e3
            }
            e.play();
            e.$elem.find(".owl-wrapper").css("display", "block");
            if (!e.$elem.is(":visible")) {
                e.watchVisibility()
            } else {
                e.$elem.css("opacity", 1)
            }
            e.onstartup = false;
            e.eachMoveUpdate();
            if (typeof e.options.afterInit === "function") {
                e.options.afterInit.apply(this, [e.$elem])
            }
        },
        eachMoveUpdate: function() {
            var e = this;
            if (e.options.lazyLoad === true) {
                e.lazyLoad()
            }
            if (e.options.autoHeight === true) {
                e.autoHeight()
            }
            e.onVisibleItems();
            if (typeof e.options.afterAction === "function") {
                e.options.afterAction.apply(this, [e.$elem])
            }
        },
        updateVars: function() {
            var e = this;
            if (typeof e.options.beforeUpdate === "function") {
                e.options.beforeUpdate.apply(this, [e.$elem])
            }
            e.watchVisibility();
            e.updateItems();
            e.calculateAll();
            e.updatePosition();
            e.updateControls();
            e.eachMoveUpdate();
            if (typeof e.options.afterUpdate === "function") {
                e.options.afterUpdate.apply(this, [e.$elem])
            }
        },
        reload: function(e) {
            var t = this;
            setTimeout(function() {
                t.updateVars()
            }, 0)
        },
        watchVisibility: function() {
            var e = this;
            if (e.$elem.is(":visible") === false) {
                e.$elem.css({
                    opacity: 0
                });
                clearInterval(e.autoPlayInterval);
                clearInterval(e.checkVisible)
            } else {
                return false
            }
            e.checkVisible = setInterval(function() {
                if (e.$elem.is(":visible")) {
                    e.reload();
                    e.$elem.animate({
                        opacity: 1
                    }, 200);
                    clearInterval(e.checkVisible)
                }
            }, 500)
        },
        wrapItems: function() {
            var e = this;
            e.$userItems.wrapAll('<div class="owl-wrapper">').wrap('<div class="owl-item"></div>');
            e.$elem.find(".owl-wrapper").wrap('<div class="owl-wrapper-outer">');
            e.wrapperOuter = e.$elem.find(".owl-wrapper-outer");
            e.$elem.css("display", "block")
        },
        baseClass: function() {
            var e = this;
            var t = e.$elem.hasClass(e.options.baseClass);
            var n = e.$elem.hasClass(e.options.theme);
            if (!t) {
                e.$elem.addClass(e.options.baseClass)
            }
            if (!n) {
                e.$elem.addClass(e.options.theme)
            }
        },
        updateItems: function() {
            var t = this;
            if (t.options.responsive === false) {
                return false
            }
            if (t.options.singleItem === true) {
                t.options.items = t.orignalItems = 1;
                t.options.itemsCustom = false;
                t.options.itemsDesktop = false;
                t.options.itemsDesktopSmall = false;
                t.options.itemsTablet = false;
                t.options.itemsTabletSmall = false;
                t.options.itemsMobile = false;
                return false
            }
            var n = e(t.options.responsiveBaseWidth).width();
            if (n > (t.options.itemsDesktop[0] || t.orignalItems)) {
                t.options.items = t.orignalItems
            }
            if (typeof t.options.itemsCustom !== "undefined" && t.options.itemsCustom !== false) {
                t.options.itemsCustom.sort(function(e, t) {
                    return e[0] - t[0]
                });
                for (var r in t.options.itemsCustom) {
                    if (typeof t.options.itemsCustom[r] !== "undefined" && t.options.itemsCustom[r][0] <= n) {
                        t.options.items = t.options.itemsCustom[r][1]
                    }
                }
            } else {
                if (n <= t.options.itemsDesktop[0] && t.options.itemsDesktop !== false) {
                    t.options.items = t.options.itemsDesktop[1]
                }
                if (n <= t.options.itemsDesktopSmall[0] && t.options.itemsDesktopSmall !== false) {
                    t.options.items = t.options.itemsDesktopSmall[1]
                }
                if (n <= t.options.itemsTablet[0] && t.options.itemsTablet !== false) {
                    t.options.items = t.options.itemsTablet[1]
                }
                if (n <= t.options.itemsTabletSmall[0] && t.options.itemsTabletSmall !== false) {
                    t.options.items = t.options.itemsTabletSmall[1]
                }
                if (n <= t.options.itemsMobile[0] && t.options.itemsMobile !== false) {
                    t.options.items = t.options.itemsMobile[1]
                }
            }
            if (t.options.items > t.itemsAmount && t.options.itemsScaleUp === true) {
                t.options.items = t.itemsAmount
            }
        },
        response: function() {
            var n = this,
                r;
            if (n.options.responsive !== true) {
                return false
            }
            var i = e(t).width();
            n.resizer = function() {
                if (e(t).width() !== i) {
                    if (n.options.autoPlay !== false) {
                        clearInterval(n.autoPlayInterval)
                    }
                    clearTimeout(r);
                    r = setTimeout(function() {
                        i = e(t).width();
                        n.updateVars()
                    }, n.options.responsiveRefreshRate)
                }
            };
            e(t).resize(n.resizer)
        },
        updatePosition: function() {
            var e = this;
            e.jumpTo(e.currentItem);
            if (e.options.autoPlay !== false) {
                e.checkAp()
            }
        },
        appendItemsSizes: function() {
            var t = this;
            var n = 0;
            var r = t.itemsAmount - t.options.items;
            t.$owlItems.each(function(i) {
                var s = e(this);
                s.css({
                    width: t.itemWidth
                }).data("owl-item", Number(i));
                if (i % t.options.items === 0 || i === r) {
                    if (!(i > r)) {
                        n += 1
                    }
                }
                s.data("owl-roundPages", n)
            })
        },
        appendWrapperSizes: function() {
            var e = this;
            var t = 0;
            var t = e.$owlItems.length * e.itemWidth;
            e.$owlWrapper.css({
                width: t * 2,
                left: 0
            });
            e.appendItemsSizes()
        },
        calculateAll: function() {
            var e = this;
            e.calculateWidth();
            e.appendWrapperSizes();
            e.loops();
            e.max()
        },
        calculateWidth: function() {
            var e = this;
            e.itemWidth = Math.round(e.$elem.width() / e.options.items)
        },
        max: function() {
            var e = this;
            var t = (e.itemsAmount * e.itemWidth - e.options.items * e.itemWidth) * -1;
            if (e.options.items > e.itemsAmount) {
                e.maximumItem = 0;
                t = 0;
                e.maximumPixels = 0
            } else {
                e.maximumItem = e.itemsAmount - e.options.items;
                e.maximumPixels = t
            }
            return t
        },
        min: function() {
            return 0
        },
        loops: function() {
            var t = this;
            t.positionsInArray = [0];
            t.pagesInArray = [];
            var n = 0;
            var r = 0;
            for (var i = 0; i < t.itemsAmount; i++) {
                r += t.itemWidth;
                t.positionsInArray.push(-r);
                if (t.options.scrollPerPage === true) {
                    var s = e(t.$owlItems[i]);
                    var o = s.data("owl-roundPages");
                    if (o !== n) {
                        t.pagesInArray[n] = t.positionsInArray[i];
                        n = o
                    }
                }
            }
        },
        buildControls: function() {
            var t = this;
            if (t.options.navigation === true || t.options.pagination === true) {
                t.owlControls = e('<div class="owl-controls"/>').toggleClass("clickable", !t.browser.isTouch).appendTo(t.$elem)
            }
            if (t.options.pagination === true) {
                t.buildPagination()
            }
            if (t.options.navigation === true) {
                t.buildButtons()
            }
        },
        buildButtons: function() {
            var t = this;
            var n = e('<div class="owl-buttons"/>');
            t.owlControls.append(n);
            t.buttonPrev = e("<div/>", {
                "class": "owl-prev",
                html: t.options.navigationText[0] || ""
            });
            t.buttonNext = e("<div/>", {
                "class": "owl-next",
                html: t.options.navigationText[1] || ""
            });
            n.append(t.buttonPrev).append(t.buttonNext);
            n.on("touchstart.owlControls mousedown.owlControls", 'div[class^="owl"]', function(e) {
                e.preventDefault()
            });
            n.on("touchend.owlControls mouseup.owlControls", 'div[class^="owl"]', function(n) {
                n.preventDefault();
                if (e(this).hasClass("owl-next")) {
                    t.next()
                } else {
                    t.prev()
                }
            })
        },
        buildPagination: function() {
            var t = this;
            t.paginationWrapper = e('<div class="owl-pagination"/>');
            t.owlControls.append(t.paginationWrapper);
            t.paginationWrapper.on("touchend.owlControls mouseup.owlControls", ".owl-page", function(n) {
                n.preventDefault();
                if (Number(e(this).data("owl-page")) !== t.currentItem) {
                    t.goTo(Number(e(this).data("owl-page")), true)
                }
            })
        },
        updatePagination: function() {
            var t = this;
            if (t.options.pagination === false) {
                return false
            }
            t.paginationWrapper.html("");
            var n = 0;
            var r = t.itemsAmount - t.itemsAmount % t.options.items;
            for (var i = 0; i < t.itemsAmount; i++) {
                if (i % t.options.items === 0) {
                    n += 1;
                    if (r === i) {
                        var s = t.itemsAmount - t.options.items
                    }
                    var o = e("<div/>", {
                        "class": "owl-page"
                    });
                    var u = e("<span></span>", {
                        text: t.options.paginationNumbers === true ? n : "",
                        "class": t.options.paginationNumbers === true ? "owl-numbers" : ""
                    });
                    o.append(u);
                    o.data("owl-page", r === i ? s : i);
                    o.data("owl-roundPages", n);
                    t.paginationWrapper.append(o)
                }
            }
            t.checkPagination()
        },
        checkPagination: function() {
            var t = this;
            if (t.options.pagination === false) {
                return false
            }
            t.paginationWrapper.find(".owl-page").each(function(n, r) {
                if (e(this).data("owl-roundPages") === e(t.$owlItems[t.currentItem]).data("owl-roundPages")) {
                    t.paginationWrapper.find(".owl-page").removeClass("active");
                    e(this).addClass("active")
                }
            })
        },
        checkNavigation: function() {
            var e = this;
            if (e.options.navigation === false) {
                return false
            }
            if (e.options.rewindNav === false) {
                if (e.currentItem === 0 && e.maximumItem === 0) {
                    e.buttonPrev.addClass("disabled");
                    e.buttonNext.addClass("disabled")
                } else if (e.currentItem === 0 && e.maximumItem !== 0) {
                    e.buttonPrev.addClass("disabled");
                    e.buttonNext.removeClass("disabled")
                } else if (e.currentItem === e.maximumItem) {
                    e.buttonPrev.removeClass("disabled");
                    e.buttonNext.addClass("disabled")
                } else if (e.currentItem !== 0 && e.currentItem !== e.maximumItem) {
                    e.buttonPrev.removeClass("disabled");
                    e.buttonNext.removeClass("disabled")
                }
            }
        },
        updateControls: function() {
            var e = this;
            e.updatePagination();
            e.checkNavigation();
            if (e.owlControls) {
                if (e.options.items >= e.itemsAmount) {
                    e.owlControls.hide()
                } else {
                    e.owlControls.show()
                }
            }
        },
        destroyControls: function() {
            var e = this;
            if (e.owlControls) {
                e.owlControls.remove()
            }
        },
        next: function(e) {
            var t = this;
            if (t.isTransition) {
                return false
            }
            t.currentItem += t.options.scrollPerPage === true ? t.options.items : 1;
            if (t.currentItem > t.maximumItem + (t.options.scrollPerPage == true ? t.options.items - 1 : 0)) {
                if (t.options.rewindNav === true) {
                    t.currentItem = 0;
                    e = "rewind"
                } else {
                    t.currentItem = t.maximumItem;
                    return false
                }
            }
            t.goTo(t.currentItem, e)
        },
        prev: function(e) {
            var t = this;
            if (t.isTransition) {
                return false
            }
            if (t.options.scrollPerPage === true && t.currentItem > 0 && t.currentItem < t.options.items) {
                t.currentItem = 0
            } else {
                t.currentItem -= t.options.scrollPerPage === true ? t.options.items : 1
            }
            if (t.currentItem < 0) {
                if (t.options.rewindNav === true) {
                    t.currentItem = t.maximumItem;
                    e = "rewind"
                } else {
                    t.currentItem = 0;
                    return false
                }
            }
            t.goTo(t.currentItem, e)
        },
        goTo: function(e, t, n) {
            var r = this;
            if (r.isTransition) {
                return false
            }
            if (typeof r.options.beforeMove === "function") {
                r.options.beforeMove.apply(this, [r.$elem])
            }
            if (e >= r.maximumItem) {
                e = r.maximumItem
            } else if (e <= 0) {
                e = 0
            }
            r.currentItem = r.owl.currentItem = e;
            if (r.options.transitionStyle !== false && n !== "drag" && r.options.items === 1 && r.browser.support3d === true) {
                r.swapSpeed(0);
                if (r.browser.support3d === true) {
                    r.transition3d(r.positionsInArray[e])
                } else {
                    r.css2slide(r.positionsInArray[e], 1)
                }
                r.afterGo();
                r.singleItemTransition();
                return false
            }
            var i = r.positionsInArray[e];
            if (r.browser.support3d === true) {
                r.isCss3Finish = false;
                if (t === true) {
                    r.swapSpeed("paginationSpeed");
                    setTimeout(function() {
                        r.isCss3Finish = true
                    }, r.options.paginationSpeed)
                } else if (t === "rewind") {
                    r.swapSpeed(r.options.rewindSpeed);
                    setTimeout(function() {
                        r.isCss3Finish = true
                    }, r.options.rewindSpeed)
                } else {
                    r.swapSpeed("slideSpeed");
                    setTimeout(function() {
                        r.isCss3Finish = true
                    }, r.options.slideSpeed)
                }
                r.transition3d(i)
            } else {
                if (t === true) {
                    r.css2slide(i, r.options.paginationSpeed)
                } else if (t === "rewind") {
                    r.css2slide(i, r.options.rewindSpeed)
                } else {
                    r.css2slide(i, r.options.slideSpeed)
                }
            }
            r.afterGo()
        },
        jumpTo: function(e) {
            var t = this;
            if (typeof t.options.beforeMove === "function") {
                t.options.beforeMove.apply(this, [t.$elem])
            }
            if (e >= t.maximumItem || e === -1) {
                e = t.maximumItem
            } else if (e <= 0) {
                e = 0
            }
            t.swapSpeed(0);
            if (t.browser.support3d === true) {
                t.transition3d(t.positionsInArray[e])
            } else {
                t.css2slide(t.positionsInArray[e], 1)
            }
            t.currentItem = t.owl.currentItem = e;
            t.afterGo()
        },
        afterGo: function() {
            var e = this;
            e.prevArr.push(e.currentItem);
            e.prevItem = e.owl.prevItem = e.prevArr[e.prevArr.length - 2];
            e.prevArr.shift(0);
            if (e.prevItem !== e.currentItem) {
                e.checkPagination();
                e.checkNavigation();
                e.eachMoveUpdate();
                if (e.options.autoPlay !== false) {
                    e.checkAp()
                }
            }
            if (typeof e.options.afterMove === "function" && e.prevItem !== e.currentItem) {
                e.options.afterMove.apply(this, [e.$elem])
            }
        },
        stop: function() {
            var e = this;
            e.apStatus = "stop";
            clearInterval(e.autoPlayInterval)
        },
        checkAp: function() {
            var e = this;
            if (e.apStatus !== "stop") {
                e.play()
            }
        },
        play: function() {
            var e = this;
            e.apStatus = "play";
            if (e.options.autoPlay === false) {
                return false
            }
            clearInterval(e.autoPlayInterval);
            e.autoPlayInterval = setInterval(function() {
                e.next(true)
            }, e.options.autoPlay)
        },
        swapSpeed: function(e) {
            var t = this;
            if (e === "slideSpeed") {
                t.$owlWrapper.css(t.addCssSpeed(t.options.slideSpeed))
            } else if (e === "paginationSpeed") {
                t.$owlWrapper.css(t.addCssSpeed(t.options.paginationSpeed))
            } else if (typeof e !== "string") {
                t.$owlWrapper.css(t.addCssSpeed(e))
            }
        },
        addCssSpeed: function(e) {
            var t = this;
            return {
                "-webkit-transition": "all " + e + "ms ease",
                "-moz-transition": "all " + e + "ms ease",
                "-o-transition": "all " + e + "ms ease",
                transition: "all " + e + "ms ease"
            }
        },
        removeTransition: function() {
            return {
                "-webkit-transition": "",
                "-moz-transition": "",
                "-o-transition": "",
                transition: ""
            }
        },
        doTranslate: function(e) {
            return {
                "-webkit-transform": "translate3d(" + e + "px, 0px, 0px)",
                "-moz-transform": "translate3d(" + e + "px, 0px, 0px)",
                "-o-transform": "translate3d(" + e + "px, 0px, 0px)",
                "-ms-transform": "translate3d(" + e + "px, 0px, 0px)",
                transform: "translate3d(" + e + "px, 0px,0px)"
            }
        },
        transition3d: function(e) {
            var t = this;
            t.$owlWrapper.css(t.doTranslate(e))
        },
        css2move: function(e) {
            var t = this;
            t.$owlWrapper.css({
                left: e
            })
        },
        css2slide: function(e, t) {
            var n = this;
            n.isCssFinish = false;
            n.$owlWrapper.stop(true, true).animate({
                left: e
            }, {
                duration: t || n.options.slideSpeed,
                complete: function() {
                    n.isCssFinish = true
                }
            })
        },
        checkBrowser: function() {
            var e = this;
            var r = "translate3d(0px, 0px, 0px)",
                i = n.createElement("div");
            i.style.cssText = "  -moz-transform:" + r + "; -ms-transform:" + r + "; -o-transform:" + r + "; -webkit-transform:" + r + "; transform:" + r;
            var s = /translate3d\(0px, 0px, 0px\)/g,
                o = i.style.cssText.match(s),
                u = o !== null && o.length === 1;
            var a = "ontouchstart" in t || navigator.msMaxTouchPoints;
            e.browser = {
                support3d: u,
                isTouch: a
            }
        },
        moveEvents: function() {
            var e = this;
            if (e.options.mouseDrag !== false || e.options.touchDrag !== false) {
                e.gestures();
                e.disabledEvents()
            }
        },
        eventTypes: function() {
            var e = this;
            var t = ["s", "e", "x"];
            e.ev_types = {};
            if (e.options.mouseDrag === true && e.options.touchDrag === true) {
                t = ["touchstart.owl mousedown.owl", "touchmove.owl mousemove.owl", "touchend.owl touchcancel.owl mouseup.owl"]
            } else if (e.options.mouseDrag === false && e.options.touchDrag === true) {
                t = ["touchstart.owl", "touchmove.owl", "touchend.owl touchcancel.owl"]
            } else if (e.options.mouseDrag === true && e.options.touchDrag === false) {
                t = ["mousedown.owl", "mousemove.owl", "mouseup.owl"]
            }
            e.ev_types["start"] = t[0];
            e.ev_types["move"] = t[1];
            e.ev_types["end"] = t[2]
        },
        disabledEvents: function() {
            var t = this;
            t.$elem.on("dragstart.owl", function(e) {
                e.preventDefault()
            });
            t.$elem.on("mousedown.disableTextSelect", function(t) {
                return e(t.target).is("input, textarea, select, option")
            })
        },
        gestures: function() {
            function o(e) {
                if (e.touches) {
                    return {
                        x: e.touches[0].pageX,
                        y: e.touches[0].pageY
                    }
                } else {
                    if (e.pageX !== r) {
                        return {
                            x: e.pageX,
                            y: e.pageY
                        }
                    } else {
                        return {
                            x: e.clientX,
                            y: e.clientY
                        }
                    }
                }
            }

            function u(t) {
                if (t === "on") {
                    e(n).on(i.ev_types["move"], f);
                    e(n).on(i.ev_types["end"], l)
                } else if (t === "off") {
                    e(n).off(i.ev_types["move"]);
                    e(n).off(i.ev_types["end"])
                }
            }

            function a(n) {
                var n = n.originalEvent || n || t.event;
                if (n.which === 3) {
                    return false
                }
                if (i.itemsAmount <= i.options.items) {
                    return
                }
                if (i.isCssFinish === false && !i.options.dragBeforeAnimFinish) {
                    return false
                }
                if (i.isCss3Finish === false && !i.options.dragBeforeAnimFinish) {
                    return false
                }
                if (i.options.autoPlay !== false) {
                    clearInterval(i.autoPlayInterval)
                }
                if (i.browser.isTouch !== true && !i.$owlWrapper.hasClass("grabbing")) {
                    i.$owlWrapper.addClass("grabbing")
                }
                i.newPosX = 0;
                i.newRelativeX = 0;
                e(this).css(i.removeTransition());
                var r = e(this).position();
                s.relativePos = r.left;
                s.offsetX = o(n).x - r.left;
                s.offsetY = o(n).y - r.top;
                u("on");
                s.sliding = false;
                s.targetElement = n.target || n.srcElement
            }

            function f(r) {
                var r = r.originalEvent || r || t.event;
                i.newPosX = o(r).x - s.offsetX;
                i.newPosY = o(r).y - s.offsetY;
                i.newRelativeX = i.newPosX - s.relativePos;
                if (typeof i.options.startDragging === "function" && s.dragging !== true && i.newRelativeX !== 0) {
                    s.dragging = true;
                    i.options.startDragging.apply(i, [i.$elem])
                }
                if (i.newRelativeX > 8 || i.newRelativeX < -8 && i.browser.isTouch === true) {
                    r.preventDefault ? r.preventDefault() : r.returnValue = false;
                    s.sliding = true
                }
                if ((i.newPosY > 10 || i.newPosY < -10) && s.sliding === false) {
                    e(n).off("touchmove.owl")
                }
                var u = function() {
                    return i.newRelativeX / 5
                };
                var a = function() {
                    return i.maximumPixels + i.newRelativeX / 5
                };
                i.newPosX = Math.max(Math.min(i.newPosX, u()), a());
                if (i.browser.support3d === true) {
                    i.transition3d(i.newPosX)
                } else {
                    i.css2move(i.newPosX)
                }
            }

            function l(n) {
                var n = n.originalEvent || n || t.event;
                n.target = n.target || n.srcElement;
                s.dragging = false;
                if (i.browser.isTouch !== true) {
                    i.$owlWrapper.removeClass("grabbing")
                }
                if (i.newRelativeX < 0) {
                    i.dragDirection = i.owl.dragDirection = "left"
                } else {
                    i.dragDirection = i.owl.dragDirection = "right"
                }
                if (i.newRelativeX !== 0) {
                    var r = i.getNewPosition();
                    i.goTo(r, false, "drag");
                    if (s.targetElement === n.target && i.browser.isTouch !== true) {
                        e(n.target).on("click.disable", function(t) {
                            t.stopImmediatePropagation();
                            t.stopPropagation();
                            t.preventDefault();
                            e(n.target).off("click.disable")
                        });
                        var o = e._data(n.target, "events")["click"];
                        var a = o.pop();
                        o.splice(0, 0, a)
                    }
                }
                u("off")
            }
            var i = this;
            var s = {
                offsetX: 0,
                offsetY: 0,
                baseElWidth: 0,
                relativePos: 0,
                position: null,
                minSwipe: null,
                maxSwipe: null,
                sliding: null,
                dargging: null,
                targetElement: null
            };
            i.isCssFinish = true;
            i.$elem.on(i.ev_types["start"], ".owl-wrapper", a)
        },
        getNewPosition: function() {
            var e = this,
                t;
            t = e.closestItem();
            if (t > e.maximumItem) {
                e.currentItem = e.maximumItem;
                t = e.maximumItem
            } else if (e.newPosX >= 0) {
                t = 0;
                e.currentItem = 0
            }
            return t
        },
        closestItem: function() {
            var t = this,
                n = t.options.scrollPerPage === true ? t.pagesInArray : t.positionsInArray,
                r = t.newPosX,
                i = null;
            e.each(n, function(s, o) {
                if (r - t.itemWidth / 20 > n[s + 1] && r - t.itemWidth / 20 < o && t.moveDirection() === "left") {
                    i = o;
                    if (t.options.scrollPerPage === true) {
                        t.currentItem = e.inArray(i, t.positionsInArray)
                    } else {
                        t.currentItem = s
                    }
                } else if (r + t.itemWidth / 20 < o && r + t.itemWidth / 20 > (n[s + 1] || n[s] - t.itemWidth) && t.moveDirection() === "right") {
                    if (t.options.scrollPerPage === true) {
                        i = n[s + 1] || n[n.length - 1];
                        t.currentItem = e.inArray(i, t.positionsInArray)
                    } else {
                        i = n[s + 1];
                        t.currentItem = s + 1
                    }
                }
            });
            return t.currentItem
        },
        moveDirection: function() {
            var e = this,
                t;
            if (e.newRelativeX < 0) {
                t = "right";
                e.playDirection = "next"
            } else {
                t = "left";
                e.playDirection = "prev"
            }
            return t
        },
        customEvents: function() {
            var e = this;
            e.$elem.on("owl.next", function() {
                e.next()
            });
            e.$elem.on("owl.prev", function() {
                e.prev()
            });
            e.$elem.on("owl.play", function(t, n) {
                e.options.autoPlay = n;
                e.play();
                e.hoverStatus = "play"
            });
            e.$elem.on("owl.stop", function() {
                e.stop();
                e.hoverStatus = "stop"
            });
            e.$elem.on("owl.goTo", function(t, n) {
                e.goTo(n)
            });
            e.$elem.on("owl.jumpTo", function(t, n) {
                e.jumpTo(n)
            })
        },
        stopOnHover: function() {
            var e = this;
            if (e.options.stopOnHover === true && e.browser.isTouch !== true && e.options.autoPlay !== false) {
                e.$elem.on("mouseover", function() {
                    e.stop()
                });
                e.$elem.on("mouseout", function() {
                    if (e.hoverStatus !== "stop") {
                        e.play()
                    }
                })
            }
        },
        lazyLoad: function() {
            var t = this;
            if (t.options.lazyLoad === false) {
                return false
            }
            for (var n = 0; n < t.itemsAmount; n++) {
                var i = e(t.$owlItems[n]);
                if (i.data("owl-loaded") === "loaded") {
                    continue
                }
                var s = i.data("owl-item"),
                    o = i.find(".lazyOwl"),
                    u;
                if (typeof o.data("src") !== "string") {
                    i.data("owl-loaded", "loaded");
                    continue
                }
                if (i.data("owl-loaded") === r) {
                    o.hide();
                    i.addClass("loading").data("owl-loaded", "checked")
                }
                if (t.options.lazyFollow === true) {
                    u = s >= t.currentItem
                } else {
                    u = true
                }
                if (u && s < t.currentItem + t.options.items && o.length) {
                    t.lazyPreload(i, o)
                }
            }
        },
        lazyPreload: function(e, t) {
            function s() {
                r += 1;
                if (n.completeImg(t.get(0)) || i === true) {
                    o()
                } else if (r <= 100) {
                    setTimeout(s, 100)
                } else {
                    o()
                }
            }

            function o() {
                e.data("owl-loaded", "loaded").removeClass("loading");
                t.removeAttr("data-src");
                n.options.lazyEffect === "fade" ? t.fadeIn(400) : t.show();
                if (typeof n.options.afterLazyLoad === "function") {
                    n.options.afterLazyLoad.apply(this, [n.$elem])
                }
            }
            var n = this,
                r = 0;
            if (t.prop("tagName") === "DIV") {
                t.css("background-image", "url(" + t.data("src") + ")");
                var i = true
            } else {
                t[0].src = t.data("src")
            }
            s()
        },
        autoHeight: function() {
            function s() {
                i += 1;
                if (t.completeImg(n.get(0))) {
                    o()
                } else if (i <= 100) {
                    setTimeout(s, 100)
                } else {
                    t.wrapperOuter.css("height", "")
                }
            }

            function o() {
                var n = e(t.$owlItems[t.currentItem]).height();
                t.wrapperOuter.css("height", n + "px");
                if (!t.wrapperOuter.hasClass("autoHeight")) {
                    setTimeout(function() {
                        t.wrapperOuter.addClass("autoHeight")
                    }, 0)
                }
            }
            var t = this;
            var n = e(t.$owlItems[t.currentItem]).find("img");
            if (n.get(0) !== r) {
                var i = 0;
                s()
            } else {
                o()
            }
        },
        completeImg: function(e) {
            if (!e.complete) {
                return false
            }
            if (typeof e.naturalWidth !== "undefined" && e.naturalWidth == 0) {
                return false
            }
            return true
        },
        onVisibleItems: function() {
            var t = this;
            if (t.options.addClassActive === true) {
                t.$owlItems.removeClass("active")
            }
            t.visibleItems = [];
            for (var n = t.currentItem; n < t.currentItem + t.options.items; n++) {
                t.visibleItems.push(n);
                if (t.options.addClassActive === true) {
                    e(t.$owlItems[n]).addClass("active")
                }
            }
            t.owl.visibleItems = t.visibleItems
        },
        transitionTypes: function(e) {
            var t = this;
            t.outClass = "owl-" + e + "-out";
            t.inClass = "owl-" + e + "-in"
        },
        singleItemTransition: function() {
            function u(e, t) {
                return {
                    position: "relative",
                    left: e + "px"
                }
            }
            var e = this;
            e.isTransition = true;
            var t = e.outClass,
                n = e.inClass,
                r = e.$owlItems.eq(e.currentItem),
                i = e.$owlItems.eq(e.prevItem),
                s = Math.abs(e.positionsInArray[e.currentItem]) + e.positionsInArray[e.prevItem],
                o = Math.abs(e.positionsInArray[e.currentItem]) + e.itemWidth / 2;
            e.$owlWrapper.addClass("owl-origin").css({
                "-webkit-transform-origin": o + "px",
                "-moz-perspective-origin": o + "px",
                "perspective-origin": o + "px"
            });
            var a = "webkitAnimationEnd oAnimationEnd MSAnimationEnd animationend";
            i.css(u(s, 10)).addClass(t).on(a, function() {
                e.endPrev = true;
                i.off(a);
                e.clearTransStyle(i, t)
            });
            r.addClass(n).on(a, function() {
                e.endCurrent = true;
                r.off(a);
                e.clearTransStyle(r, n)
            })
        },
        clearTransStyle: function(e, t) {
            var n = this;
            e.css({
                position: "",
                left: ""
            }).removeClass(t);
            if (n.endPrev && n.endCurrent) {
                n.$owlWrapper.removeClass("owl-origin");
                n.endPrev = false;
                n.endCurrent = false;
                n.isTransition = false
            }
        },
        owlStatus: function() {
            var e = this;
            e.owl = {
                userOptions: e.userOptions,
                baseElement: e.$elem,
                userItems: e.$userItems,
                owlItems: e.$owlItems,
                currentItem: e.currentItem,
                prevItem: e.prevItem,
                visibleItems: e.visibleItems,
                isTouch: e.browser.isTouch,
                browser: e.browser,
                dragDirection: e.dragDirection
            }
        },
        clearEvents: function() {
            var r = this;
            r.$elem.off(".owl owl mousedown.disableTextSelect");
            e(n).off(".owl owl");
            e(t).off("resize", r.resizer)
        },
        unWrap: function() {
            var e = this;
            if (e.$elem.children().length !== 0) {
                e.$owlWrapper.unwrap();
                e.$userItems.unwrap().unwrap();
                if (e.owlControls) {
                    e.owlControls.remove()
                }
            }
            e.clearEvents();
            e.$elem.attr("style", e.$elem.data("owl-originalStyles") || "").attr("class", e.$elem.data("owl-originalClasses"))
        },
        destroy: function() {
            var e = this;
            e.stop();
            clearInterval(e.checkVisible);
            e.unWrap();
            e.$elem.removeData()
        },
        reinit: function(t) {
            var n = this;
            var r = e.extend({}, n.userOptions, t);
            n.unWrap();
            n.init(r, n.$elem)
        },
        addItem: function(e, t) {
            var n = this,
                i;
            if (!e) {
                return false
            }
            if (n.$elem.children().length === 0) {
                n.$elem.append(e);
                n.setVars();
                return false
            }
            n.unWrap();
            if (t === r || t === -1) {
                i = -1
            } else {
                i = t
            }
            if (i >= n.$userItems.length || i === -1) {
                n.$userItems.eq(-1).after(e)
            } else {
                n.$userItems.eq(i).before(e)
            }
            n.setVars()
        },
        removeItem: function(e) {
            var t = this,
                n;
            if (t.$elem.children().length === 0) {
                return false
            }
            if (e === r || e === -1) {
                n = -1
            } else {
                n = e
            }
            t.unWrap();
            t.$userItems.eq(n).remove();
            t.setVars()
        }
    };
    e.fn.owlCarousel = function(t) {
        return this.each(function() {
            if (e(this).data("owl-init") === true) {
                return false
            }
            e(this).data("owl-init", true);
            var n = Object.create(i);
            n.init(t, this);
            e.data(this, "owlCarousel", n)
        })
    };
    e.fn.owlCarousel.options = {
        items: 5,
        itemsCustom: false,
        itemsDesktop: [1199, 4],
        itemsDesktopSmall: [979, 3],
        itemsTablet: [768, 2],
        itemsTabletSmall: false,
        itemsMobile: [479, 1],
        singleItem: false,
        itemsScaleUp: false,
        slideSpeed: 200,
        paginationSpeed: 800,
        rewindSpeed: 1e3,
        autoPlay: false,
        stopOnHover: false,
        navigation: false,
        navigationText: ["prev", "next"],
        rewindNav: true,
        scrollPerPage: false,
        pagination: true,
        paginationNumbers: false,
        responsive: true,
        responsiveRefreshRate: 200,
        responsiveBaseWidth: t,
        baseClass: "owl-carousel",
        theme: "owl-theme",
        lazyLoad: false,
        lazyFollow: true,
        lazyEffect: "fade",
        autoHeight: false,
        jsonPath: false,
        jsonSuccess: false,
        dragBeforeAnimFinish: true,
        mouseDrag: true,
        touchDrag: true,
        addClassActive: false,
        transitionStyle: false,
        beforeUpdate: false,
        afterUpdate: false,
        beforeInit: false,
        afterInit: false,
        beforeMove: false,
        afterMove: false,
        afterAction: false,
        startDragging: false,
        afterLazyLoad: false
    }
})(jQuery, window, document)