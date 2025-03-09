!function(e) {
    "use strict";
    "function" == typeof define && define.amd ? define(["jquery"], e) : "undefined" != typeof exports ? module.exports = e(require("jquery")) : e(jQuery)
}(function(d) {
    "use strict";
    var a, o = window.Slick || {};
    (a = 0,
    o = function(e, t) {
        var i, s = this;
        s.defaults = {
            accessibility: !0,
            adaptiveHeight: !1,
            appendArrows: d(e),
            appendDots: d(e),
            arrows: !0,
            asNavFor: null,
            prevArrow: '<button class="slick-prev" aria-label="Previous" type="button">Previous</button>',
            nextArrow: '<button class="slick-next" aria-label="Next" type="button">Next</button>',
            autoplay: !1,
            autoplaySpeed: 3e3,
            centerMode: !1,
            centerPadding: "50px",
            cssEase: "ease",
            customPaging: function(e, t) {
                return d('<button type="button" />').text(t + 1)
            },
            dots: !1,
            dotsClass: "slick-dots",
            draggable: !0,
            easing: "linear",
            edgeFriction: .35,
            fade: !1,
            focusOnSelect: !1,
            focusOnChange: !1,
            infinite: !0,
            initialSlide: 0,
            lazyLoad: "ondemand",
            mobileFirst: !1,
            pauseOnHover: !0,
            pauseOnFocus: !0,
            pauseOnDotsHover: !1,
            respondTo: "window",
            responsive: null,
            rows: 1,
            rtl: !1,
            slide: "",
            slidesPerRow: 1,
            slidesToShow: 1,
            slidesToScroll: 1,
            speed: 500,
            swipe: !0,
            swipeToSlide: !1,
            touchMove: !0,
            touchThreshold: 5,
            useCSS: !0,
            useTransform: !0,
            variableWidth: !1,
            vertical: !1,
            verticalSwiping: !1,
            waitForAnimate: !0,
            zIndex: 1e3
        },
        s.initials = {
            animating: !1,
            dragging: !1,
            autoPlayTimer: null,
            currentDirection: 0,
            currentLeft: null,
            currentSlide: 0,
            direction: 1,
            $dots: null,
            listWidth: null,
            listHeight: null,
            loadIndex: 0,
            $nextArrow: null,
            $prevArrow: null,
            scrolling: !1,
            slideCount: null,
            slideWidth: null,
            $slideTrack: null,
            $slides: null,
            sliding: !1,
            slideOffset: 0,
            swipeLeft: null,
            swiping: !1,
            $list: null,
            touchObject: {},
            transformsEnabled: !1,
            unslicked: !1
        },
        d.extend(s, s.initials),
        s.activeBreakpoint = null,
        s.animType = null,
        s.animProp = null,
        s.breakpoints = [],
        s.breakpointSettings = [],
        s.cssTransitions = !1,
        s.focussed = !1,
        s.interrupted = !1,
        s.hidden = "hidden",
        s.paused = !0,
        s.positionProp = null,
        s.respondTo = null,
        s.rowCount = 1,
        s.shouldClick = !0,
        s.$slider = d(e),
        s.$slidesCache = null,
        s.transformType = null,
        s.transitionType = null,
        s.visibilityChange = "visibilitychange",
        s.windowWidth = 0,
        s.windowTimer = null,
        i = d(e).data("slick") || {},
        s.options = d.extend({}, s.defaults, t, i),
        s.currentSlide = s.options.initialSlide,
        s.originalSettings = s.options,
        void 0 !== document.mozHidden ? (s.hidden = "mozHidden",
        s.visibilityChange = "mozvisibilitychange") : void 0 !== document.webkitHidden && (s.hidden = "webkitHidden",
        s.visibilityChange = "webkitvisibilitychange"),
        s.autoPlay = d.proxy(s.autoPlay, s),
        s.autoPlayClear = d.proxy(s.autoPlayClear, s),
        s.autoPlayIterator = d.proxy(s.autoPlayIterator, s),
        s.changeSlide = d.proxy(s.changeSlide, s),
        s.clickHandler = d.proxy(s.clickHandler, s),
        s.selectHandler = d.proxy(s.selectHandler, s),
        s.setPosition = d.proxy(s.setPosition, s),
        s.swipeHandler = d.proxy(s.swipeHandler, s),
        s.dragHandler = d.proxy(s.dragHandler, s),
        s.keyHandler = d.proxy(s.keyHandler, s),
        s.instanceUid = a++,
        s.htmlExpr = /^(?:\s*(<[\w\W]+>)[^>]*)$/,
        s.registerBreakpoints(),
        s.init(!0)
    }
    ).prototype.activateADA = function() {
        this.$slideTrack.find(".slick-active").attr({
            "aria-hidden": "false"
        }).find("a, input, button, select").attr({
            tabindex: "0"
        })
    }
    ,
    o.prototype.addSlide = o.prototype.slickAdd = function(e, t, i) {
        var s = this;
        if ("boolean" == typeof t)
            i = t,
            t = null;
        else if (t < 0 || t >= s.slideCount)
            return !1;
        s.unload(),
        "number" == typeof t ? 0 === t && 0 === s.$slides.length ? d(e).appendTo(s.$slideTrack) : i ? d(e).insertBefore(s.$slides.eq(t)) : d(e).insertAfter(s.$slides.eq(t)) : !0 === i ? d(e).prependTo(s.$slideTrack) : d(e).appendTo(s.$slideTrack),
        s.$slides = s.$slideTrack.children(this.options.slide),
        s.$slideTrack.children(this.options.slide).detach(),
        s.$slideTrack.append(s.$slides),
        s.$slides.each(function(e, t) {
            d(t).attr("data-slick-index", e)
        }),
        s.$slidesCache = s.$slides,
        s.reinit()
    }
    ,
    o.prototype.animateHeight = function() {
        var e = this;
        if (1 === e.options.slidesToShow && !0 === e.options.adaptiveHeight && !1 === e.options.vertical) {
            var t = e.$slides.eq(e.currentSlide).outerHeight(!0);
            e.$list.animate({
                height: t
            }, e.options.speed)
        }
    }
    ,
    o.prototype.animateSlide = function(e, t) {
        var i = {}
          , s = this;
        s.animateHeight(),
        !0 === s.options.rtl && !1 === s.options.vertical && (e = -e),
        !1 === s.transformsEnabled ? !1 === s.options.vertical ? s.$slideTrack.animate({
            left: e
        }, s.options.speed, s.options.easing, t) : s.$slideTrack.animate({
            top: e
        }, s.options.speed, s.options.easing, t) : !1 === s.cssTransitions ? (!0 === s.options.rtl && (s.currentLeft = -s.currentLeft),
        d({
            animStart: s.currentLeft
        }).animate({
            animStart: e
        }, {
            duration: s.options.speed,
            easing: s.options.easing,
            step: function(e) {
                e = Math.ceil(e),
                !1 === s.options.vertical ? i[s.animType] = "translate(" + e + "px, 0px)" : i[s.animType] = "translate(0px," + e + "px)",
                s.$slideTrack.css(i)
            },
            complete: function() {
                t && t.call()
            }
        })) : (s.applyTransition(),
        e = Math.ceil(e),
        !1 === s.options.vertical ? i[s.animType] = "translate3d(" + e + "px, 0px, 0px)" : i[s.animType] = "translate3d(0px," + e + "px, 0px)",
        s.$slideTrack.css(i),
        t && setTimeout(function() {
            s.disableTransition(),
            t.call()
        }, s.options.speed))
    }
    ,
    o.prototype.getNavTarget = function() {
        var e = this.options.asNavFor;
        return e && null !== e && (e = d(e).not(this.$slider)),
        e
    }
    ,
    o.prototype.asNavFor = function(t) {
        var e = this.getNavTarget();
        null !== e && "object" == typeof e && e.each(function() {
            var e = d(this).slick("getSlick");
            e.unslicked || e.slideHandler(t, !0)
        })
    }
    ,
    o.prototype.applyTransition = function(e) {
        var t = this
          , i = {};
        !1 === t.options.fade ? i[t.transitionType] = t.transformType + " " + t.options.speed + "ms " + t.options.cssEase : i[t.transitionType] = "opacity " + t.options.speed + "ms " + t.options.cssEase,
        !1 === t.options.fade ? t.$slideTrack.css(i) : t.$slides.eq(e).css(i)
    }
    ,
    o.prototype.autoPlay = function() {
        var e = this;
        e.autoPlayClear(),
        e.slideCount > e.options.slidesToShow && (e.autoPlayTimer = setInterval(e.autoPlayIterator, e.options.autoplaySpeed))
    }
    ,
    o.prototype.autoPlayClear = function() {
        this.autoPlayTimer && clearInterval(this.autoPlayTimer)
    }
    ,
    o.prototype.autoPlayIterator = function() {
        var e = this
          , t = e.currentSlide + e.options.slidesToScroll;
        e.paused || e.interrupted || e.focussed || (!1 === e.options.infinite && (1 === e.direction && e.currentSlide + 1 === e.slideCount - 1 ? e.direction = 0 : 0 === e.direction && (t = e.currentSlide - e.options.slidesToScroll,
        e.currentSlide - 1 == 0 && (e.direction = 1))),
        e.slideHandler(t))
    }
    ,
    o.prototype.buildArrows = function() {
        var e = this;
        !0 === e.options.arrows && (e.$prevArrow = d(e.options.prevArrow).addClass("slick-arrow"),
        e.$nextArrow = d(e.options.nextArrow).addClass("slick-arrow"),
        e.slideCount > e.options.slidesToShow ? (e.$prevArrow.removeClass("slick-hidden").removeAttr("aria-hidden tabindex"),
        e.$nextArrow.removeClass("slick-hidden").removeAttr("aria-hidden tabindex"),
        e.htmlExpr.test(e.options.prevArrow) && e.$prevArrow.prependTo(e.options.appendArrows),
        e.htmlExpr.test(e.options.nextArrow) && e.$nextArrow.appendTo(e.options.appendArrows),
        !0 !== e.options.infinite && e.$prevArrow.addClass("slick-disabled").attr("aria-disabled", "true")) : e.$prevArrow.add(e.$nextArrow).addClass("slick-hidden").attr({
            "aria-disabled": "true",
            tabindex: "-1"
        }))
    }
    ,
    o.prototype.buildDots = function() {
        var e, t, i = this;
        if (!0 === i.options.dots) {
            for (i.$slider.addClass("slick-dotted"),
            t = d("<ul />").addClass(i.options.dotsClass),
            e = 0; e <= i.getDotCount(); e += 1)
                t.append(d("<li />").append(i.options.customPaging.call(this, i, e)));
            i.$dots = t.appendTo(i.options.appendDots),
            i.$dots.find("li").first().addClass("slick-active")
        }
    }
    ,
    o.prototype.buildOut = function() {
        var e = this;
        e.$slides = e.$slider.children(e.options.slide + ":not(.slick-cloned)").addClass("slick-slide"),
        e.slideCount = e.$slides.length,
        e.$slides.each(function(e, t) {
            d(t).attr("data-slick-index", e).data("originalStyling", d(t).attr("style") || "")
        }),
        e.$slider.addClass("slick-slider"),
        e.$slideTrack = 0 === e.slideCount ? d('<div class="slick-track"/>').appendTo(e.$slider) : e.$slides.wrapAll('<div class="slick-track"/>').parent(),
        e.$list = e.$slideTrack.wrap('<div class="slick-list"/>').parent(),
        e.$slideTrack.css("opacity", 0),
        !0 !== e.options.centerMode && !0 !== e.options.swipeToSlide || (e.options.slidesToScroll = 1),
        d("img[data-lazy]", e.$slider).not("[src]").addClass("slick-loading"),
        e.setupInfinite(),
        e.buildArrows(),
        e.buildDots(),
        e.updateDots(),
        e.setSlideClasses("number" == typeof e.currentSlide ? e.currentSlide : 0),
        !0 === e.options.draggable && e.$list.addClass("draggable")
    }
    ,
    o.prototype.buildRows = function() {
        var e, t, i, s, a, n, o, r = this;
        if (s = document.createDocumentFragment(),
        n = r.$slider.children(),
        1 < r.options.rows) {
            for (o = r.options.slidesPerRow * r.options.rows,
            a = Math.ceil(n.length / o),
            e = 0; e < a; e++) {
                var l = document.createElement("div");
                for (t = 0; t < r.options.rows; t++) {
                    var d = document.createElement("div");
                    for (i = 0; i < r.options.slidesPerRow; i++) {
                        var c = e * o + (t * r.options.slidesPerRow + i);
                        n.get(c) && d.appendChild(n.get(c))
                    }
                    l.appendChild(d)
                }
                s.appendChild(l)
            }
            r.$slider.empty().append(s),
            r.$slider.children().children().children().css({
                width: 100 / r.options.slidesPerRow + "%",
                display: "inline-block"
            })
        }
    }
    ,
    o.prototype.checkResponsive = function(e, t) {
        var i, s, a, n = this, o = !1, r = n.$slider.width(), l = window.innerWidth || d(window).width();
        if ("window" === n.respondTo ? a = l : "slider" === n.respondTo ? a = r : "min" === n.respondTo && (a = Math.min(l, r)),
        n.options.responsive && n.options.responsive.length && null !== n.options.responsive) {
            for (i in s = null,
            n.breakpoints)
                n.breakpoints.hasOwnProperty(i) && (!1 === n.originalSettings.mobileFirst ? a < n.breakpoints[i] && (s = n.breakpoints[i]) : a > n.breakpoints[i] && (s = n.breakpoints[i]));
            null !== s ? null !== n.activeBreakpoint ? (s !== n.activeBreakpoint || t) && (n.activeBreakpoint = s,
            "unslick" === n.breakpointSettings[s] ? n.unslick(s) : (n.options = d.extend({}, n.originalSettings, n.breakpointSettings[s]),
            !0 === e && (n.currentSlide = n.options.initialSlide),
            n.refresh(e)),
            o = s) : (n.activeBreakpoint = s,
            "unslick" === n.breakpointSettings[s] ? n.unslick(s) : (n.options = d.extend({}, n.originalSettings, n.breakpointSettings[s]),
            !0 === e && (n.currentSlide = n.options.initialSlide),
            n.refresh(e)),
            o = s) : null !== n.activeBreakpoint && (n.activeBreakpoint = null,
            n.options = n.originalSettings,
            !0 === e && (n.currentSlide = n.options.initialSlide),
            n.refresh(e),
            o = s),
            e || !1 === o || n.$slider.trigger("breakpoint", [n, o])
        }
    }
    ,
    o.prototype.changeSlide = function(e, t) {
        var i, s, a = this, n = d(e.currentTarget);
        switch (n.is("a") && e.preventDefault(),
        n.is("li") || (n = n.closest("li")),
        i = a.slideCount % a.options.slidesToScroll != 0 ? 0 : (a.slideCount - a.currentSlide) % a.options.slidesToScroll,
        e.data.message) {
        case "previous":
            s = 0 === i ? a.options.slidesToScroll : a.options.slidesToShow - i,
            a.slideCount > a.options.slidesToShow && a.slideHandler(a.currentSlide - s, !1, t);
            break;
        case "next":
            s = 0 === i ? a.options.slidesToScroll : i,
            a.slideCount > a.options.slidesToShow && a.slideHandler(a.currentSlide + s, !1, t);
            break;
        case "index":
            var o = 0 === e.data.index ? 0 : e.data.index || n.index() * a.options.slidesToScroll;
            a.slideHandler(a.checkNavigable(o), !1, t),
            n.children().trigger("focus");
            break;
        default:
            return
        }
    }
    ,
    o.prototype.checkNavigable = function(e) {
        var t, i;
        if (i = 0,
        e > (t = this.getNavigableIndexes())[t.length - 1])
            e = t[t.length - 1];
        else
            for (var s in t) {
                if (e < t[s]) {
                    e = i;
                    break
                }
                i = t[s]
            }
        return e
    }
    ,
    o.prototype.cleanUpEvents = function() {
        var e = this;
        e.options.dots && null !== e.$dots && (d("li", e.$dots).off("click.slick", e.changeSlide).off("mouseenter.slick", d.proxy(e.interrupt, e, !0)).off("mouseleave.slick", d.proxy(e.interrupt, e, !1)),
        !0 === e.options.accessibility && e.$dots.off("keydown.slick", e.keyHandler)),
        e.$slider.off("focus.slick blur.slick"),
        !0 === e.options.arrows && e.slideCount > e.options.slidesToShow && (e.$prevArrow && e.$prevArrow.off("click.slick", e.changeSlide),
        e.$nextArrow && e.$nextArrow.off("click.slick", e.changeSlide),
        !0 === e.options.accessibility && (e.$prevArrow && e.$prevArrow.off("keydown.slick", e.keyHandler),
        e.$nextArrow && e.$nextArrow.off("keydown.slick", e.keyHandler))),
        e.$list.off("touchstart.slick mousedown.slick", e.swipeHandler),
        e.$list.off("touchmove.slick mousemove.slick", e.swipeHandler),
        e.$list.off("touchend.slick mouseup.slick", e.swipeHandler),
        e.$list.off("touchcancel.slick mouseleave.slick", e.swipeHandler),
        e.$list.off("click.slick", e.clickHandler),
        d(document).off(e.visibilityChange, e.visibility),
        e.cleanUpSlideEvents(),
        !0 === e.options.accessibility && e.$list.off("keydown.slick", e.keyHandler),
        !0 === e.options.focusOnSelect && d(e.$slideTrack).children().off("click.slick", e.selectHandler),
        d(window).off("orientationchange.slick.slick-" + e.instanceUid, e.orientationChange),
        d(window).off("resize.slick.slick-" + e.instanceUid, e.resize),
        d("[draggable!=true]", e.$slideTrack).off("dragstart", e.preventDefault),
        d(window).off("load.slick.slick-" + e.instanceUid, e.setPosition)
    }
    ,
    o.prototype.cleanUpSlideEvents = function() {
        var e = this;
        e.$list.off("mouseenter.slick", d.proxy(e.interrupt, e, !0)),
        e.$list.off("mouseleave.slick", d.proxy(e.interrupt, e, !1))
    }
    ,
    o.prototype.cleanUpRows = function() {
        var e;
        1 < this.options.rows && ((e = this.$slides.children().children()).removeAttr("style"),
        this.$slider.empty().append(e))
    }
    ,
    o.prototype.clickHandler = function(e) {
        !1 === this.shouldClick && (e.stopImmediatePropagation(),
        e.stopPropagation(),
        e.preventDefault())
    }
    ,
    o.prototype.destroy = function(e) {
        var t = this;
        t.autoPlayClear(),
        t.touchObject = {},
        t.cleanUpEvents(),
        d(".slick-cloned", t.$slider).detach(),
        t.$dots && t.$dots.remove(),
        t.$prevArrow && t.$prevArrow.length && (t.$prevArrow.removeClass("slick-disabled slick-arrow slick-hidden").removeAttr("aria-hidden aria-disabled tabindex").css("display", ""),
        t.htmlExpr.test(t.options.prevArrow) && t.$prevArrow.remove()),
        t.$nextArrow && t.$nextArrow.length && (t.$nextArrow.removeClass("slick-disabled slick-arrow slick-hidden").removeAttr("aria-hidden aria-disabled tabindex").css("display", ""),
        t.htmlExpr.test(t.options.nextArrow) && t.$nextArrow.remove()),
        t.$slides && (t.$slides.removeClass("slick-slide slick-active slick-center slick-visible slick-current").removeAttr("aria-hidden").removeAttr("data-slick-index").each(function() {
            d(this).attr("style", d(this).data("originalStyling"))
        }),
        t.$slideTrack.children(this.options.slide).detach(),
        t.$slideTrack.detach(),
        t.$list.detach(),
        t.$slider.append(t.$slides)),
        t.cleanUpRows(),
        t.$slider.removeClass("slick-slider"),
        t.$slider.removeClass("slick-initialized"),
        t.$slider.removeClass("slick-dotted"),
        t.unslicked = !0,
        e || t.$slider.trigger("destroy", [t])
    }
    ,
    o.prototype.disableTransition = function(e) {
        var t = {};
        t[this.transitionType] = "",
        !1 === this.options.fade ? this.$slideTrack.css(t) : this.$slides.eq(e).css(t)
    }
    ,
    o.prototype.fadeSlide = function(e, t) {
        var i = this;
        !1 === i.cssTransitions ? (i.$slides.eq(e).css({
            zIndex: i.options.zIndex
        }),
        i.$slides.eq(e).animate({
            opacity: 1
        }, i.options.speed, i.options.easing, t)) : (i.applyTransition(e),
        i.$slides.eq(e).css({
            opacity: 1,
            zIndex: i.options.zIndex
        }),
        t && setTimeout(function() {
            i.disableTransition(e),
            t.call()
        }, i.options.speed))
    }
    ,
    o.prototype.fadeSlideOut = function(e) {
        var t = this;
        !1 === t.cssTransitions ? t.$slides.eq(e).animate({
            opacity: 0,
            zIndex: t.options.zIndex - 2
        }, t.options.speed, t.options.easing) : (t.applyTransition(e),
        t.$slides.eq(e).css({
            opacity: 0,
            zIndex: t.options.zIndex - 2
        }))
    }
    ,
    o.prototype.filterSlides = o.prototype.slickFilter = function(e) {
        var t = this;
        null !== e && (t.$slidesCache = t.$slides,
        t.unload(),
        t.$slideTrack.children(this.options.slide).detach(),
        t.$slidesCache.filter(e).appendTo(t.$slideTrack),
        t.reinit())
    }
    ,
    o.prototype.focusHandler = function() {
        var i = this;
        i.$slider.off("focus.slick blur.slick").on("focus.slick blur.slick", "*", function(e) {
            e.stopImmediatePropagation();
            var t = d(this);
            setTimeout(function() {
                i.options.pauseOnFocus && (i.focussed = t.is(":focus"),
                i.autoPlay())
            }, 0)
        })
    }
    ,
    o.prototype.getCurrent = o.prototype.slickCurrentSlide = function() {
        return this.currentSlide
    }
    ,
    o.prototype.getDotCount = function() {
        var e = this
          , t = 0
          , i = 0
          , s = 0;
        if (!0 === e.options.infinite)
            if (e.slideCount <= e.options.slidesToShow)
                ++s;
            else
                for (; t < e.slideCount; )
                    ++s,
                    t = i + e.options.slidesToScroll,
                    i += e.options.slidesToScroll <= e.options.slidesToShow ? e.options.slidesToScroll : e.options.slidesToShow;
        else if (!0 === e.options.centerMode)
            s = e.slideCount;
        else if (e.options.asNavFor)
            for (; t < e.slideCount; )
                ++s,
                t = i + e.options.slidesToScroll,
                i += e.options.slidesToScroll <= e.options.slidesToShow ? e.options.slidesToScroll : e.options.slidesToShow;
        else
            s = 1 + Math.ceil((e.slideCount - e.options.slidesToShow) / e.options.slidesToScroll);
        return s - 1
    }
    ,
    o.prototype.getLeft = function(e) {
        var t, i, s, a, n = this, o = 0;
        return n.slideOffset = 0,
        i = n.$slides.first().outerHeight(!0),
        !0 === n.options.infinite ? (n.slideCount > n.options.slidesToShow && (n.slideOffset = n.slideWidth * n.options.slidesToShow * -1,
        a = -1,
        !0 === n.options.vertical && !0 === n.options.centerMode && (2 === n.options.slidesToShow ? a = -1.5 : 1 === n.options.slidesToShow && (a = -2)),
        o = i * n.options.slidesToShow * a),
        n.slideCount % n.options.slidesToScroll != 0 && e + n.options.slidesToScroll > n.slideCount && n.slideCount > n.options.slidesToShow && (e > n.slideCount ? (n.slideOffset = (n.options.slidesToShow - (e - n.slideCount)) * n.slideWidth * -1,
        o = (n.options.slidesToShow - (e - n.slideCount)) * i * -1) : (n.slideOffset = n.slideCount % n.options.slidesToScroll * n.slideWidth * -1,
        o = n.slideCount % n.options.slidesToScroll * i * -1))) : e + n.options.slidesToShow > n.slideCount && (n.slideOffset = (e + n.options.slidesToShow - n.slideCount) * n.slideWidth,
        o = (e + n.options.slidesToShow - n.slideCount) * i),
        n.slideCount <= n.options.slidesToShow && (o = n.slideOffset = 0),
        !0 === n.options.centerMode && n.slideCount <= n.options.slidesToShow ? n.slideOffset = n.slideWidth * Math.floor(n.options.slidesToShow) / 2 - n.slideWidth * n.slideCount / 2 : !0 === n.options.centerMode && !0 === n.options.infinite ? n.slideOffset += n.slideWidth * Math.floor(n.options.slidesToShow / 2) - n.slideWidth : !0 === n.options.centerMode && (n.slideOffset = 0,
        n.slideOffset += n.slideWidth * Math.floor(n.options.slidesToShow / 2)),
        t = !1 === n.options.vertical ? e * n.slideWidth * -1 + n.slideOffset : e * i * -1 + o,
        !0 === n.options.variableWidth && (s = n.slideCount <= n.options.slidesToShow || !1 === n.options.infinite ? n.$slideTrack.children(".slick-slide").eq(e) : n.$slideTrack.children(".slick-slide").eq(e + n.options.slidesToShow),
        t = !0 === n.options.rtl ? s[0] ? -1 * (n.$slideTrack.width() - s[0].offsetLeft - s.width()) : 0 : s[0] ? -1 * s[0].offsetLeft : 0,
        !0 === n.options.centerMode && (s = n.slideCount <= n.options.slidesToShow || !1 === n.options.infinite ? n.$slideTrack.children(".slick-slide").eq(e) : n.$slideTrack.children(".slick-slide").eq(e + n.options.slidesToShow + 1),
        t = !0 === n.options.rtl ? s[0] ? -1 * (n.$slideTrack.width() - s[0].offsetLeft - s.width()) : 0 : s[0] ? -1 * s[0].offsetLeft : 0,
        t += (n.$list.width() - s.outerWidth()) / 2)),
        t
    }
    ,
    o.prototype.getOption = o.prototype.slickGetOption = function(e) {
        return this.options[e]
    }
    ,
    o.prototype.getNavigableIndexes = function() {
        var e, t = this, i = 0, s = 0, a = [];
        for (!1 === t.options.infinite ? e = t.slideCount : (i = -1 * t.options.slidesToScroll,
        s = -1 * t.options.slidesToScroll,
        e = 2 * t.slideCount); i < e; )
            a.push(i),
            i = s + t.options.slidesToScroll,
            s += t.options.slidesToScroll <= t.options.slidesToShow ? t.options.slidesToScroll : t.options.slidesToShow;
        return a
    }
    ,
    o.prototype.getSlick = function() {
        return this
    }
    ,
    o.prototype.getSlideCount = function() {
        var i, s, a = this;
        return s = !0 === a.options.centerMode ? a.slideWidth * Math.floor(a.options.slidesToShow / 2) : 0,
        !0 === a.options.swipeToSlide ? (a.$slideTrack.find(".slick-slide").each(function(e, t) {
            if (t.offsetLeft - s + d(t).outerWidth() / 2 > -1 * a.swipeLeft)
                return i = t,
                !1
        }),
        Math.abs(d(i).attr("data-slick-index") - a.currentSlide) || 1) : a.options.slidesToScroll
    }
    ,
    o.prototype.goTo = o.prototype.slickGoTo = function(e, t) {
        this.changeSlide({
            data: {
                message: "index",
                index: parseInt(e)
            }
        }, t)
    }
    ,
    o.prototype.init = function(e) {
        var t = this;
        d(t.$slider).hasClass("slick-initialized") || (d(t.$slider).addClass("slick-initialized"),
        t.buildRows(),
        t.buildOut(),
        t.setProps(),
        t.startLoad(),
        t.loadSlider(),
        t.initializeEvents(),
        t.updateArrows(),
        t.updateDots(),
        t.checkResponsive(!0),
        t.focusHandler()),
        e && t.$slider.trigger("init", [t]),
        !0 === t.options.accessibility && t.initADA(),
        t.options.autoplay && (t.paused = !1,
        t.autoPlay())
    }
    ,
    o.prototype.initADA = function() {
        var i = this
          , s = Math.ceil(i.slideCount / i.options.slidesToShow)
          , a = i.getNavigableIndexes().filter(function(e) {
            return 0 <= e && e < i.slideCount
        });
        i.$slides.add(i.$slideTrack.find(".slick-cloned")).attr({
            "aria-hidden": "true",
            tabindex: "-1"
        }).find("a, input, button, select").attr({
            tabindex: "-1"
        }),
        null !== i.$dots && (i.$slides.not(i.$slideTrack.find(".slick-cloned")).each(function(e) {
            var t = a.indexOf(e);
            d(this).attr({
                role: "tabpanel",
                id: "slick-slide" + i.instanceUid + e,
                tabindex: -1
            }),
            -1 !== t && d(this).attr({
                "aria-describedby": "slick-slide-control" + i.instanceUid + t
            })
        }),
        i.$dots.attr("role", "tablist").find("li").each(function(e) {
            var t = a[e];
            d(this).attr({
                role: "presentation"
            }),
            d(this).find("button").first().attr({
                role: "tab",
                id: "slick-slide-control" + i.instanceUid + e,
                "aria-controls": "slick-slide" + i.instanceUid + t,
                "aria-label": e + 1 + " of " + s,
                "aria-selected": null,
                tabindex: "-1"
            })
        }).eq(i.currentSlide).find("button").attr({
            "aria-selected": "true",
            tabindex: "0"
        }).end());
        for (var e = i.currentSlide, t = e + i.options.slidesToShow; e < t; e++)
            i.$slides.eq(e).attr("tabindex", 0);
        i.activateADA()
    }
    ,
    o.prototype.initArrowEvents = function() {
        var e = this;
        !0 === e.options.arrows && e.slideCount > e.options.slidesToShow && (e.$prevArrow.off("click.slick").on("click.slick", {
            message: "previous"
        }, e.changeSlide),
        e.$nextArrow.off("click.slick").on("click.slick", {
            message: "next"
        }, e.changeSlide),
        !0 === e.options.accessibility && (e.$prevArrow.on("keydown.slick", e.keyHandler),
        e.$nextArrow.on("keydown.slick", e.keyHandler)))
    }
    ,
    o.prototype.initDotEvents = function() {
        var e = this;
        !0 === e.options.dots && (d("li", e.$dots).on("click.slick", {
            message: "index"
        }, e.changeSlide),
        !0 === e.options.accessibility && e.$dots.on("keydown.slick", e.keyHandler)),
        !0 === e.options.dots && !0 === e.options.pauseOnDotsHover && d("li", e.$dots).on("mouseenter.slick", d.proxy(e.interrupt, e, !0)).on("mouseleave.slick", d.proxy(e.interrupt, e, !1))
    }
    ,
    o.prototype.initSlideEvents = function() {
        var e = this;
        e.options.pauseOnHover && (e.$list.on("mouseenter.slick", d.proxy(e.interrupt, e, !0)),
        e.$list.on("mouseleave.slick", d.proxy(e.interrupt, e, !1)))
    }
    ,
    o.prototype.initializeEvents = function() {
        var e = this;
        e.initArrowEvents(),
        e.initDotEvents(),
        e.initSlideEvents(),
        e.$list.on("touchstart.slick mousedown.slick", {
            action: "start"
        }, e.swipeHandler),
        e.$list.on("touchmove.slick mousemove.slick", {
            action: "move"
        }, e.swipeHandler),
        e.$list.on("touchend.slick mouseup.slick", {
            action: "end"
        }, e.swipeHandler),
        e.$list.on("touchcancel.slick mouseleave.slick", {
            action: "end"
        }, e.swipeHandler),
        e.$list.on("click.slick", e.clickHandler),
        d(document).on(e.visibilityChange, d.proxy(e.visibility, e)),
        !0 === e.options.accessibility && e.$list.on("keydown.slick", e.keyHandler),
        !0 === e.options.focusOnSelect && d(e.$slideTrack).children().on("click.slick", e.selectHandler),
        d(window).on("orientationchange.slick.slick-" + e.instanceUid, d.proxy(e.orientationChange, e)),
        d(window).on("resize.slick.slick-" + e.instanceUid, d.proxy(e.resize, e)),
        d("[draggable!=true]", e.$slideTrack).on("dragstart", e.preventDefault),
        d(window).on("load.slick.slick-" + e.instanceUid, e.setPosition),
        d(e.setPosition)
    }
    ,
    o.prototype.initUI = function() {
        var e = this;
        !0 === e.options.arrows && e.slideCount > e.options.slidesToShow && (e.$prevArrow.show(),
        e.$nextArrow.show()),
        !0 === e.options.dots && e.slideCount > e.options.slidesToShow && e.$dots.show()
    }
    ,
    o.prototype.keyHandler = function(e) {
        var t = this;
        e.target.tagName.match("TEXTAREA|INPUT|SELECT") || (37 === e.keyCode && !0 === t.options.accessibility ? t.changeSlide({
            data: {
                message: !0 === t.options.rtl ? "next" : "previous"
            }
        }) : 39 === e.keyCode && !0 === t.options.accessibility && t.changeSlide({
            data: {
                message: !0 === t.options.rtl ? "previous" : "next"
            }
        }))
    }
    ,
    o.prototype.lazyLoad = function() {
        function e(e) {
            d("img[data-lazy]", e).each(function() {
                var e = d(this)
                  , t = d(this).attr("data-lazy")
                  , i = d(this).attr("data-srcset")
                  , s = d(this).attr("data-sizes") || n.$slider.attr("data-sizes")
                  , a = document.createElement("img");
                a.onload = function() {
                    e.animate({
                        opacity: 0
                    }, 100, function() {
                        i && (e.attr("srcset", i),
                        s && e.attr("sizes", s)),
                        e.attr("src", t).animate({
                            opacity: 1
                        }, 200, function() {
                            e.removeAttr("data-lazy data-srcset data-sizes").removeClass("slick-loading")
                        }),
                        n.$slider.trigger("lazyLoaded", [n, e, t])
                    })
                }
                ,
                a.onerror = function() {
                    e.removeAttr("data-lazy").removeClass("slick-loading").addClass("slick-lazyload-error"),
                    n.$slider.trigger("lazyLoadError", [n, e, t])
                }
                ,
                a.src = t
            })
        }
        var t, i, s, n = this;
        if (!0 === n.options.centerMode ? !0 === n.options.infinite ? s = (i = n.currentSlide + (n.options.slidesToShow / 2 + 1)) + n.options.slidesToShow + 2 : (i = Math.max(0, n.currentSlide - (n.options.slidesToShow / 2 + 1)),
        s = n.options.slidesToShow / 2 + 1 + 2 + n.currentSlide) : (i = n.options.infinite ? n.options.slidesToShow + n.currentSlide : n.currentSlide,
        s = Math.ceil(i + n.options.slidesToShow),
        !0 === n.options.fade && (0 < i && i--,
        s <= n.slideCount && s++)),
        t = n.$slider.find(".slick-slide").slice(i, s),
        "anticipated" === n.options.lazyLoad)
            for (var a = i - 1, o = s, r = n.$slider.find(".slick-slide"), l = 0; l < n.options.slidesToScroll; l++)
                a < 0 && (a = n.slideCount - 1),
                t = (t = t.add(r.eq(a))).add(r.eq(o)),
                a--,
                o++;
        e(t),
        n.slideCount <= n.options.slidesToShow ? e(n.$slider.find(".slick-slide")) : n.currentSlide >= n.slideCount - n.options.slidesToShow ? e(n.$slider.find(".slick-cloned").slice(0, n.options.slidesToShow)) : 0 === n.currentSlide && e(n.$slider.find(".slick-cloned").slice(-1 * n.options.slidesToShow))
    }
    ,
    o.prototype.loadSlider = function() {
        var e = this;
        e.setPosition(),
        e.$slideTrack.css({
            opacity: 1
        }),
        e.$slider.removeClass("slick-loading"),
        e.initUI(),
        "progressive" === e.options.lazyLoad && e.progressiveLazyLoad()
    }
    ,
    o.prototype.next = o.prototype.slickNext = function() {
        this.changeSlide({
            data: {
                message: "next"
            }
        })
    }
    ,
    o.prototype.orientationChange = function() {
        this.checkResponsive(),
        this.setPosition()
    }
    ,
    o.prototype.pause = o.prototype.slickPause = function() {
        this.autoPlayClear(),
        this.paused = !0
    }
    ,
    o.prototype.play = o.prototype.slickPlay = function() {
        var e = this;
        e.autoPlay(),
        e.options.autoplay = !0,
        e.paused = !1,
        e.focussed = !1,
        e.interrupted = !1
    }
    ,
    o.prototype.postSlide = function(e) {
        var t = this;
        t.unslicked || (t.$slider.trigger("afterChange", [t, e]),
        t.animating = !1,
        t.slideCount > t.options.slidesToShow && t.setPosition(),
        t.swipeLeft = null,
        t.options.autoplay && t.autoPlay(),
        !0 === t.options.accessibility && (t.initADA(),
        t.options.focusOnChange && d(t.$slides.get(t.currentSlide)).attr("tabindex", 0).focus()))
    }
    ,
    o.prototype.prev = o.prototype.slickPrev = function() {
        this.changeSlide({
            data: {
                message: "previous"
            }
        })
    }
    ,
    o.prototype.preventDefault = function(e) {
        e.preventDefault()
    }
    ,
    o.prototype.progressiveLazyLoad = function(e) {
        e = e || 1;
        var t, i, s, a, n, o = this, r = d("img[data-lazy]", o.$slider);
        r.length ? (t = r.first(),
        i = t.attr("data-lazy"),
        s = t.attr("data-srcset"),
        a = t.attr("data-sizes") || o.$slider.attr("data-sizes"),
        (n = document.createElement("img")).onload = function() {
            s && (t.attr("srcset", s),
            a && t.attr("sizes", a)),
            t.attr("src", i).removeAttr("data-lazy data-srcset data-sizes").removeClass("slick-loading"),
            !0 === o.options.adaptiveHeight && o.setPosition(),
            o.$slider.trigger("lazyLoaded", [o, t, i]),
            o.progressiveLazyLoad()
        }
        ,
        n.onerror = function() {
            e < 3 ? setTimeout(function() {
                o.progressiveLazyLoad(e + 1)
            }, 500) : (t.removeAttr("data-lazy").removeClass("slick-loading").addClass("slick-lazyload-error"),
            o.$slider.trigger("lazyLoadError", [o, t, i]),
            o.progressiveLazyLoad())
        }
        ,
        n.src = i) : o.$slider.trigger("allImagesLoaded", [o])
    }
    ,
    o.prototype.refresh = function(e) {
        var t, i, s = this;
        i = s.slideCount - s.options.slidesToShow,
        !s.options.infinite && s.currentSlide > i && (s.currentSlide = i),
        s.slideCount <= s.options.slidesToShow && (s.currentSlide = 0),
        t = s.currentSlide,
        s.destroy(!0),
        d.extend(s, s.initials, {
            currentSlide: t
        }),
        s.init(),
        e || s.changeSlide({
            data: {
                message: "index",
                index: t
            }
        }, !1)
    }
    ,
    o.prototype.registerBreakpoints = function() {
        var e, t, i, s = this, a = s.options.responsive || null;
        if ("array" === d.type(a) && a.length) {
            for (e in s.respondTo = s.options.respondTo || "window",
            a)
                if (i = s.breakpoints.length - 1,
                a.hasOwnProperty(e)) {
                    for (t = a[e].breakpoint; 0 <= i; )
                        s.breakpoints[i] && s.breakpoints[i] === t && s.breakpoints.splice(i, 1),
                        i--;
                    s.breakpoints.push(t),
                    s.breakpointSettings[t] = a[e].settings
                }
            s.breakpoints.sort(function(e, t) {
                return s.options.mobileFirst ? e - t : t - e
            })
        }
    }
    ,
    o.prototype.reinit = function() {
        var e = this;
        e.$slides = e.$slideTrack.children(e.options.slide).addClass("slick-slide"),
        e.slideCount = e.$slides.length,
        e.currentSlide >= e.slideCount && 0 !== e.currentSlide && (e.currentSlide = e.currentSlide - e.options.slidesToScroll),
        e.slideCount <= e.options.slidesToShow && (e.currentSlide = 0),
        e.registerBreakpoints(),
        e.setProps(),
        e.setupInfinite(),
        e.buildArrows(),
        e.updateArrows(),
        e.initArrowEvents(),
        e.buildDots(),
        e.updateDots(),
        e.initDotEvents(),
        e.cleanUpSlideEvents(),
        e.initSlideEvents(),
        e.checkResponsive(!1, !0),
        !0 === e.options.focusOnSelect && d(e.$slideTrack).children().on("click.slick", e.selectHandler),
        e.setSlideClasses("number" == typeof e.currentSlide ? e.currentSlide : 0),
        e.setPosition(),
        e.focusHandler(),
        e.paused = !e.options.autoplay,
        e.autoPlay(),
        e.$slider.trigger("reInit", [e])
    }
    ,
    o.prototype.resize = function() {
        var e = this;
        d(window).width() !== e.windowWidth && (clearTimeout(e.windowDelay),
        e.windowDelay = window.setTimeout(function() {
            e.windowWidth = d(window).width(),
            e.checkResponsive(),
            e.unslicked || e.setPosition()
        }, 50))
    }
    ,
    o.prototype.removeSlide = o.prototype.slickRemove = function(e, t, i) {
        var s = this;
        if (e = "boolean" == typeof e ? !0 === (t = e) ? 0 : s.slideCount - 1 : !0 === t ? --e : e,
        s.slideCount < 1 || e < 0 || e > s.slideCount - 1)
            return !1;
        s.unload(),
        !0 === i ? s.$slideTrack.children().remove() : s.$slideTrack.children(this.options.slide).eq(e).remove(),
        s.$slides = s.$slideTrack.children(this.options.slide),
        s.$slideTrack.children(this.options.slide).detach(),
        s.$slideTrack.append(s.$slides),
        s.$slidesCache = s.$slides,
        s.reinit()
    }
    ,
    o.prototype.setCSS = function(e) {
        var t, i, s = this, a = {};
        !0 === s.options.rtl && (e = -e),
        t = "left" == s.positionProp ? Math.ceil(e) + "px" : "0px",
        i = "top" == s.positionProp ? Math.ceil(e) + "px" : "0px",
        a[s.positionProp] = e,
        !1 === s.transformsEnabled || (!(a = {}) === s.cssTransitions ? a[s.animType] = "translate(" + t + ", " + i + ")" : a[s.animType] = "translate3d(" + t + ", " + i + ", 0px)"),
        s.$slideTrack.css(a)
    }
    ,
    o.prototype.setDimensions = function() {
        var e = this;
        !1 === e.options.vertical ? !0 === e.options.centerMode && e.$list.css({
            padding: "0px " + e.options.centerPadding
        }) : (e.$list.height(e.$slides.first().outerHeight(!0) * e.options.slidesToShow),
        !0 === e.options.centerMode && e.$list.css({
            padding: e.options.centerPadding + " 0px"
        })),
        e.listWidth = e.$list.width(),
        e.listHeight = e.$list.height(),
        !1 === e.options.vertical && !1 === e.options.variableWidth ? (e.slideWidth = Math.ceil(e.listWidth / e.options.slidesToShow),
        e.$slideTrack.width(Math.ceil(e.slideWidth * e.$slideTrack.children(".slick-slide").length))) : !0 === e.options.variableWidth ? e.$slideTrack.width(5e3 * e.slideCount) : (e.slideWidth = Math.ceil(e.listWidth),
        e.$slideTrack.height(Math.ceil(e.$slides.first().outerHeight(!0) * e.$slideTrack.children(".slick-slide").length)));
        var t = e.$slides.first().outerWidth(!0) - e.$slides.first().width();
        !1 === e.options.variableWidth && e.$slideTrack.children(".slick-slide").width(e.slideWidth - t)
    }
    ,
    o.prototype.setFade = function() {
        var i, s = this;
        s.$slides.each(function(e, t) {
            i = s.slideWidth * e * -1,
            !0 === s.options.rtl ? d(t).css({
                position: "relative",
                right: i,
                top: 0,
                zIndex: s.options.zIndex - 2,
                opacity: 0
            }) : d(t).css({
                position: "relative",
                left: i,
                top: 0,
                zIndex: s.options.zIndex - 2,
                opacity: 0
            })
        }),
        s.$slides.eq(s.currentSlide).css({
            zIndex: s.options.zIndex - 1,
            opacity: 1
        })
    }
    ,
    o.prototype.setHeight = function() {
        var e = this;
        if (1 === e.options.slidesToShow && !0 === e.options.adaptiveHeight && !1 === e.options.vertical) {
            var t = e.$slides.eq(e.currentSlide).outerHeight(!0);
            e.$list.css("height", t)
        }
    }
    ,
    o.prototype.setOption = o.prototype.slickSetOption = function() {
        var e, t, i, s, a, n = this, o = !1;
        if ("object" === d.type(arguments[0]) ? (i = arguments[0],
        o = arguments[1],
        a = "multiple") : "string" === d.type(arguments[0]) && (i = arguments[0],
        s = arguments[1],
        o = arguments[2],
        "responsive" === arguments[0] && "array" === d.type(arguments[1]) ? a = "responsive" : void 0 !== arguments[1] && (a = "single")),
        "single" === a)
            n.options[i] = s;
        else if ("multiple" === a)
            d.each(i, function(e, t) {
                n.options[e] = t
            });
        else if ("responsive" === a)
            for (t in s)
                if ("array" !== d.type(n.options.responsive))
                    n.options.responsive = [s[t]];
                else {
                    for (e = n.options.responsive.length - 1; 0 <= e; )
                        n.options.responsive[e].breakpoint === s[t].breakpoint && n.options.responsive.splice(e, 1),
                        e--;
                    n.options.responsive.push(s[t])
                }
        o && (n.unload(),
        n.reinit())
    }
    ,
    o.prototype.setPosition = function() {
        var e = this;
        e.setDimensions(),
        e.setHeight(),
        !1 === e.options.fade ? e.setCSS(e.getLeft(e.currentSlide)) : e.setFade(),
        e.$slider.trigger("setPosition", [e])
    }
    ,
    o.prototype.setProps = function() {
        var e = this
          , t = document.body.style;
        e.positionProp = !0 === e.options.vertical ? "top" : "left",
        "top" === e.positionProp ? e.$slider.addClass("slick-vertical") : e.$slider.removeClass("slick-vertical"),
        void 0 === t.WebkitTransition && void 0 === t.MozTransition && void 0 === t.msTransition || !0 === e.options.useCSS && (e.cssTransitions = !0),
        e.options.fade && ("number" == typeof e.options.zIndex ? e.options.zIndex < 3 && (e.options.zIndex = 3) : e.options.zIndex = e.defaults.zIndex),
        void 0 !== t.OTransform && (e.animType = "OTransform",
        e.transformType = "-o-transform",
        e.transitionType = "OTransition",
        void 0 === t.perspectiveProperty && void 0 === t.webkitPerspective && (e.animType = !1)),
        void 0 !== t.MozTransform && (e.animType = "MozTransform",
        e.transformType = "-moz-transform",
        e.transitionType = "MozTransition",
        void 0 === t.perspectiveProperty && void 0 === t.MozPerspective && (e.animType = !1)),
        void 0 !== t.webkitTransform && (e.animType = "webkitTransform",
        e.transformType = "-webkit-transform",
        e.transitionType = "webkitTransition",
        void 0 === t.perspectiveProperty && void 0 === t.webkitPerspective && (e.animType = !1)),
        void 0 !== t.msTransform && (e.animType = "msTransform",
        e.transformType = "-ms-transform",
        e.transitionType = "msTransition",
        void 0 === t.msTransform && (e.animType = !1)),
        void 0 !== t.transform && !1 !== e.animType && (e.animType = "transform",
        e.transformType = "transform",
        e.transitionType = "transition"),
        e.transformsEnabled = e.options.useTransform && null !== e.animType && !1 !== e.animType
    }
    ,
    o.prototype.setSlideClasses = function(e) {
        var t, i, s, a, n = this;
        if (i = n.$slider.find(".slick-slide").removeClass("slick-active slick-center slick-current").attr("aria-hidden", "true"),
        n.$slides.eq(e).addClass("slick-current"),
        !0 === n.options.centerMode) {
            var o = n.options.slidesToShow % 2 == 0 ? 1 : 0;
            t = Math.floor(n.options.slidesToShow / 2),
            !0 === n.options.infinite && (t <= e && e <= n.slideCount - 1 - t ? n.$slides.slice(e - t + o, e + t + 1).addClass("slick-active").attr("aria-hidden", "false") : (s = n.options.slidesToShow + e,
            i.slice(s - t + 1 + o, s + t + 2).addClass("slick-active").attr("aria-hidden", "false")),
            0 === e ? i.eq(i.length - 1 - n.options.slidesToShow).addClass("slick-center") : e === n.slideCount - 1 && i.eq(n.options.slidesToShow).addClass("slick-center")),
            n.$slides.eq(e).addClass("slick-center")
        } else
            0 <= e && e <= n.slideCount - n.options.slidesToShow ? n.$slides.slice(e, e + n.options.slidesToShow).addClass("slick-active").attr("aria-hidden", "false") : i.length <= n.options.slidesToShow ? i.addClass("slick-active").attr("aria-hidden", "false") : (a = n.slideCount % n.options.slidesToShow,
            s = !0 === n.options.infinite ? n.options.slidesToShow + e : e,
            n.options.slidesToShow == n.options.slidesToScroll && n.slideCount - e < n.options.slidesToShow ? i.slice(s - (n.options.slidesToShow - a), s + a).addClass("slick-active").attr("aria-hidden", "false") : i.slice(s, s + n.options.slidesToShow).addClass("slick-active").attr("aria-hidden", "false"));
        "ondemand" !== n.options.lazyLoad && "anticipated" !== n.options.lazyLoad || n.lazyLoad()
    }
    ,
    o.prototype.setupInfinite = function() {
        var e, t, i, s = this;
        if (!0 === s.options.fade && (s.options.centerMode = !1),
        !0 === s.options.infinite && !1 === s.options.fade && (t = null,
        s.slideCount > s.options.slidesToShow)) {
            for (i = !0 === s.options.centerMode ? s.options.slidesToShow + 1 : s.options.slidesToShow,
            e = s.slideCount; e > s.slideCount - i; e -= 1)
                t = e - 1,
                d(s.$slides[t]).clone(!0).attr("id", "").attr("data-slick-index", t - s.slideCount).prependTo(s.$slideTrack).addClass("slick-cloned");
            for (e = 0; e < i + s.slideCount; e += 1)
                t = e,
                d(s.$slides[t]).clone(!0).attr("id", "").attr("data-slick-index", t + s.slideCount).appendTo(s.$slideTrack).addClass("slick-cloned");
            s.$slideTrack.find(".slick-cloned").find("[id]").each(function() {
                d(this).attr("id", "")
            })
        }
    }
    ,
    o.prototype.interrupt = function(e) {
        e || this.autoPlay(),
        this.interrupted = e
    }
    ,
    o.prototype.selectHandler = function(e) {
        var t = d(e.target).is(".slick-slide") ? d(e.target) : d(e.target).parents(".slick-slide")
          , i = parseInt(t.attr("data-slick-index"));
        i || (i = 0),
        this.slideCount <= this.options.slidesToShow ? this.slideHandler(i, !1, !0) : this.slideHandler(i)
    }
    ,
    o.prototype.slideHandler = function(e, t, i) {
        var s, a, n, o, r, l = null, d = this;
        if (t = t || !1,
        !(!0 === d.animating && !0 === d.options.waitForAnimate || !0 === d.options.fade && d.currentSlide === e))
            if (!1 === t && d.asNavFor(e),
            s = e,
            l = d.getLeft(s),
            o = d.getLeft(d.currentSlide),
            d.currentLeft = null === d.swipeLeft ? o : d.swipeLeft,
            !1 === d.options.infinite && !1 === d.options.centerMode && (e < 0 || e > d.getDotCount() * d.options.slidesToScroll))
                !1 === d.options.fade && (s = d.currentSlide,
                !0 !== i ? d.animateSlide(o, function() {
                    d.postSlide(s)
                }) : d.postSlide(s));
            else if (!1 === d.options.infinite && !0 === d.options.centerMode && (e < 0 || e > d.slideCount - d.options.slidesToScroll))
                !1 === d.options.fade && (s = d.currentSlide,
                !0 !== i ? d.animateSlide(o, function() {
                    d.postSlide(s)
                }) : d.postSlide(s));
            else {
                if (d.options.autoplay && clearInterval(d.autoPlayTimer),
                a = s < 0 ? d.slideCount % d.options.slidesToScroll != 0 ? d.slideCount - d.slideCount % d.options.slidesToScroll : d.slideCount + s : s >= d.slideCount ? d.slideCount % d.options.slidesToScroll != 0 ? 0 : s - d.slideCount : s,
                d.animating = !0,
                d.$slider.trigger("beforeChange", [d, d.currentSlide, a]),
                n = d.currentSlide,
                d.currentSlide = a,
                d.setSlideClasses(d.currentSlide),
                d.options.asNavFor && (r = (r = d.getNavTarget()).slick("getSlick")).slideCount <= r.options.slidesToShow && r.setSlideClasses(d.currentSlide),
                d.updateDots(),
                d.updateArrows(),
                !0 === d.options.fade)
                    return !0 !== i ? (d.fadeSlideOut(n),
                    d.fadeSlide(a, function() {
                        d.postSlide(a)
                    })) : d.postSlide(a),
                    void d.animateHeight();
                !0 !== i ? d.animateSlide(l, function() {
                    d.postSlide(a)
                }) : d.postSlide(a)
            }
    }
    ,
    o.prototype.startLoad = function() {
        var e = this;
        !0 === e.options.arrows && e.slideCount > e.options.slidesToShow && (e.$prevArrow.hide(),
        e.$nextArrow.hide()),
        !0 === e.options.dots && e.slideCount > e.options.slidesToShow && e.$dots.hide(),
        e.$slider.addClass("slick-loading")
    }
    ,
    o.prototype.swipeDirection = function() {
        var e, t, i, s, a = this;
        return e = a.touchObject.startX - a.touchObject.curX,
        t = a.touchObject.startY - a.touchObject.curY,
        i = Math.atan2(t, e),
        (s = Math.round(180 * i / Math.PI)) < 0 && (s = 360 - Math.abs(s)),
        s <= 45 && 0 <= s ? !1 === a.options.rtl ? "left" : "right" : s <= 360 && 315 <= s ? !1 === a.options.rtl ? "left" : "right" : 135 <= s && s <= 225 ? !1 === a.options.rtl ? "right" : "left" : !0 === a.options.verticalSwiping ? 35 <= s && s <= 135 ? "down" : "up" : "vertical"
    }
    ,
    o.prototype.swipeEnd = function(e) {
        var t, i, s = this;
        if (s.dragging = !1,
        s.swiping = !1,
        s.scrolling)
            return s.scrolling = !1;
        if (s.interrupted = !1,
        s.shouldClick = !(10 < s.touchObject.swipeLength),
        void 0 === s.touchObject.curX)
            return !1;
        if (!0 === s.touchObject.edgeHit && s.$slider.trigger("edge", [s, s.swipeDirection()]),
        s.touchObject.swipeLength >= s.touchObject.minSwipe) {
            switch (i = s.swipeDirection()) {
            case "left":
            case "down":
                t = s.options.swipeToSlide ? s.checkNavigable(s.currentSlide + s.getSlideCount()) : s.currentSlide + s.getSlideCount(),
                s.currentDirection = 0;
                break;
            case "right":
            case "up":
                t = s.options.swipeToSlide ? s.checkNavigable(s.currentSlide - s.getSlideCount()) : s.currentSlide - s.getSlideCount(),
                s.currentDirection = 1
            }
            "vertical" != i && (s.slideHandler(t),
            s.touchObject = {},
            s.$slider.trigger("swipe", [s, i]))
        } else
            s.touchObject.startX !== s.touchObject.curX && (s.slideHandler(s.currentSlide),
            s.touchObject = {})
    }
    ,
    o.prototype.swipeHandler = function(e) {
        var t = this;
        if (!(!1 === t.options.swipe || "ontouchend"in document && !1 === t.options.swipe || !1 === t.options.draggable && -1 !== e.type.indexOf("mouse")))
            switch (t.touchObject.fingerCount = e.originalEvent && void 0 !== e.originalEvent.touches ? e.originalEvent.touches.length : 1,
            t.touchObject.minSwipe = t.listWidth / t.options.touchThreshold,
            !0 === t.options.verticalSwiping && (t.touchObject.minSwipe = t.listHeight / t.options.touchThreshold),
            e.data.action) {
            case "start":
                t.swipeStart(e);
                break;
            case "move":
                t.swipeMove(e);
                break;
            case "end":
                t.swipeEnd(e)
            }
    }
    ,
    o.prototype.swipeMove = function(e) {
        var t, i, s, a, n, o, r = this;
        return n = void 0 !== e.originalEvent ? e.originalEvent.touches : null,
        !(!r.dragging || r.scrolling || n && 1 !== n.length) && (t = r.getLeft(r.currentSlide),
        r.touchObject.curX = void 0 !== n ? n[0].pageX : e.clientX,
        r.touchObject.curY = void 0 !== n ? n[0].pageY : e.clientY,
        r.touchObject.swipeLength = Math.round(Math.sqrt(Math.pow(r.touchObject.curX - r.touchObject.startX, 2))),
        o = Math.round(Math.sqrt(Math.pow(r.touchObject.curY - r.touchObject.startY, 2))),
        !r.options.verticalSwiping && !r.swiping && 4 < o ? !(r.scrolling = !0) : (!0 === r.options.verticalSwiping && (r.touchObject.swipeLength = o),
        i = r.swipeDirection(),
        void 0 !== e.originalEvent && 4 < r.touchObject.swipeLength && (r.swiping = !0,
        e.preventDefault()),
        a = (!1 === r.options.rtl ? 1 : -1) * (r.touchObject.curX > r.touchObject.startX ? 1 : -1),
        !0 === r.options.verticalSwiping && (a = r.touchObject.curY > r.touchObject.startY ? 1 : -1),
        s = r.touchObject.swipeLength,
        (r.touchObject.edgeHit = !1) === r.options.infinite && (0 === r.currentSlide && "right" === i || r.currentSlide >= r.getDotCount() && "left" === i) && (s = r.touchObject.swipeLength * r.options.edgeFriction,
        r.touchObject.edgeHit = !0),
        !1 === r.options.vertical ? r.swipeLeft = t + s * a : r.swipeLeft = t + s * (r.$list.height() / r.listWidth) * a,
        !0 === r.options.verticalSwiping && (r.swipeLeft = t + s * a),
        !0 !== r.options.fade && !1 !== r.options.touchMove && (!0 === r.animating ? (r.swipeLeft = null,
        !1) : void r.setCSS(r.swipeLeft))))
    }
    ,
    o.prototype.swipeStart = function(e) {
        var t, i = this;
        if (i.interrupted = !0,
        1 !== i.touchObject.fingerCount || i.slideCount <= i.options.slidesToShow)
            return !(i.touchObject = {});
        void 0 !== e.originalEvent && void 0 !== e.originalEvent.touches && (t = e.originalEvent.touches[0]),
        i.touchObject.startX = i.touchObject.curX = void 0 !== t ? t.pageX : e.clientX,
        i.touchObject.startY = i.touchObject.curY = void 0 !== t ? t.pageY : e.clientY,
        i.dragging = !0
    }
    ,
    o.prototype.unfilterSlides = o.prototype.slickUnfilter = function() {
        var e = this;
        null !== e.$slidesCache && (e.unload(),
        e.$slideTrack.children(this.options.slide).detach(),
        e.$slidesCache.appendTo(e.$slideTrack),
        e.reinit())
    }
    ,
    o.prototype.unload = function() {
        var e = this;
        d(".slick-cloned", e.$slider).remove(),
        e.$dots && e.$dots.remove(),
        e.$prevArrow && e.htmlExpr.test(e.options.prevArrow) && e.$prevArrow.remove(),
        e.$nextArrow && e.htmlExpr.test(e.options.nextArrow) && e.$nextArrow.remove(),
        e.$slides.removeClass("slick-slide slick-active slick-visible slick-current").attr("aria-hidden", "true").css("width", "")
    }
    ,
    o.prototype.unslick = function(e) {
        this.$slider.trigger("unslick", [this, e]),
        this.destroy()
    }
    ,
    o.prototype.updateArrows = function() {
        var e = this;
        Math.floor(e.options.slidesToShow / 2),
        !0 === e.options.arrows && e.slideCount > e.options.slidesToShow && !e.options.infinite && (e.$prevArrow.removeClass("slick-disabled").attr("aria-disabled", "false"),
        e.$nextArrow.removeClass("slick-disabled").attr("aria-disabled", "false"),
        0 === e.currentSlide ? (e.$prevArrow.addClass("slick-disabled").attr("aria-disabled", "true"),
        e.$nextArrow.removeClass("slick-disabled").attr("aria-disabled", "false")) : e.currentSlide >= e.slideCount - e.options.slidesToShow && !1 === e.options.centerMode ? (e.$nextArrow.addClass("slick-disabled").attr("aria-disabled", "true"),
        e.$prevArrow.removeClass("slick-disabled").attr("aria-disabled", "false")) : e.currentSlide >= e.slideCount - 1 && !0 === e.options.centerMode && (e.$nextArrow.addClass("slick-disabled").attr("aria-disabled", "true"),
        e.$prevArrow.removeClass("slick-disabled").attr("aria-disabled", "false")))
    }
    ,
    o.prototype.updateDots = function() {
        var e = this;
        null !== e.$dots && (e.$dots.find("li").removeClass("slick-active").end(),
        e.$dots.find("li").eq(Math.floor(e.currentSlide / e.options.slidesToScroll)).addClass("slick-active"))
    }
    ,
    o.prototype.visibility = function() {
        this.options.autoplay && (document[this.hidden] ? this.interrupted = !0 : this.interrupted = !1)
    }
    ,
    d.fn.slick = function() {
        var e, t, i = this, s = arguments[0], a = Array.prototype.slice.call(arguments, 1), n = i.length;
        for (e = 0; e < n; e++)
            if ("object" == typeof s || void 0 === s ? i[e].slick = new o(i[e],s) : t = i[e].slick[s].apply(i[e].slick, a),
            void 0 !== t)
                return t;
        return i
    }
}),
function(e, t) {
    "object" == typeof exports && "undefined" != typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define(t) : (e = e || self).Swiper = t()
}(this, function() {
    "use strict";
    function L(e, t) {
        var i = []
          , s = 0;
        if (e && !t && e instanceof d)
            return e;
        if (e)
            if ("string" == typeof e) {
                var a, n, o = e.trim();
                if (0 <= o.indexOf("<") && 0 <= o.indexOf(">")) {
                    var r = "div";
                    for (0 === o.indexOf("<li") && (r = "ul"),
                    0 === o.indexOf("<tr") && (r = "tbody"),
                    0 !== o.indexOf("<td") && 0 !== o.indexOf("<th") || (r = "tr"),
                    0 === o.indexOf("<tbody") && (r = "table"),
                    0 === o.indexOf("<option") && (r = "select"),
                    (n = v.createElement(r)).innerHTML = o,
                    s = 0; s < n.childNodes.length; s += 1)
                        i.push(n.childNodes[s])
                } else
                    for (a = t || "#" !== e[0] || e.match(/[ .<>:~]/) ? (t || v).querySelectorAll(e.trim()) : [v.getElementById(e.trim().split("#")[1])],
                    s = 0; s < a.length; s += 1)
                        a[s] && i.push(a[s])
            } else if (e.nodeType || e === J || e === v)
                i.push(e);
            else if (0 < e.length && e[0].nodeType)
                for (s = 0; s < e.length; s += 1)
                    i.push(e[s]);
        return new d(i)
    }
    function n(e) {
        for (var t = [], i = 0; i < e.length; i += 1)
            -1 === t.indexOf(e[i]) && t.push(e[i]);
        return t
    }
    function l() {
        var e = this
          , t = e.params
          , i = e.el;
        if (!i || 0 !== i.offsetWidth) {
            t.breakpoints && e.setBreakpoint();
            var s = e.allowSlideNext
              , a = e.allowSlidePrev
              , n = e.snapGrid;
            if (e.allowSlideNext = !0,
            e.allowSlidePrev = !0,
            e.updateSize(),
            e.updateSlides(),
            t.freeMode) {
                var o = Math.min(Math.max(e.translate, e.maxTranslate()), e.minTranslate());
                e.setTranslate(o),
                e.updateActiveIndex(),
                e.updateSlidesClasses(),
                t.autoHeight && e.updateAutoHeight()
            } else
                e.updateSlidesClasses(),
                ("auto" === t.slidesPerView || 1 < t.slidesPerView) && e.isEnd && !e.params.centeredSlides ? e.slideTo(e.slides.length - 1, 0, !1, !0) : e.slideTo(e.activeIndex, 0, !1, !0);
            e.allowSlidePrev = a,
            e.allowSlideNext = s,
            e.params.watchOverflow && n !== e.snapGrid && e.checkOverflow()
        }
    }
    var v = "undefined" == typeof document ? {
        body: {},
        addEventListener: function() {},
        removeEventListener: function() {},
        activeElement: {
            blur: function() {},
            nodeName: ""
        },
        querySelector: function() {
            return null
        },
        querySelectorAll: function() {
            return []
        },
        getElementById: function() {
            return null
        },
        createEvent: function() {
            return {
                initEvent: function() {}
            }
        },
        createElement: function() {
            return {
                children: [],
                childNodes: [],
                style: {},
                setAttribute: function() {},
                getElementsByTagName: function() {
                    return []
                }
            }
        },
        location: {
            hash: ""
        }
    } : document
      , J = "undefined" == typeof window ? {
        document: v,
        navigator: {
            userAgent: ""
        },
        location: {},
        history: {},
        CustomEvent: function() {
            return this
        },
        addEventListener: function() {},
        removeEventListener: function() {},
        getComputedStyle: function() {
            return {
                getPropertyValue: function() {
                    return ""
                }
            }
        },
        Image: function() {},
        Date: function() {},
        screen: {},
        setTimeout: function() {},
        clearTimeout: function() {}
    } : window
      , d = function(e) {
        for (var t = 0; t < e.length; t += 1)
            this[t] = e[t];
        return this.length = e.length,
        this
    };
    L.fn = d.prototype,
    L.Class = d,
    L.Dom7 = d;
    var t = {
        addClass: function(e) {
            if (void 0 === e)
                return this;
            for (var t = e.split(" "), i = 0; i < t.length; i += 1)
                for (var s = 0; s < this.length; s += 1)
                    void 0 !== this[s] && void 0 !== this[s].classList && this[s].classList.add(t[i]);
            return this
        },
        removeClass: function(e) {
            for (var t = e.split(" "), i = 0; i < t.length; i += 1)
                for (var s = 0; s < this.length; s += 1)
                    void 0 !== this[s] && void 0 !== this[s].classList && this[s].classList.remove(t[i]);
            return this
        },
        hasClass: function(e) {
            return !!this[0] && this[0].classList.contains(e)
        },
        toggleClass: function(e) {
            for (var t = e.split(" "), i = 0; i < t.length; i += 1)
                for (var s = 0; s < this.length; s += 1)
                    void 0 !== this[s] && void 0 !== this[s].classList && this[s].classList.toggle(t[i]);
            return this
        },
        attr: function(e, t) {
            var i = arguments;
            if (1 === arguments.length && "string" == typeof e)
                return this[0] ? this[0].getAttribute(e) : void 0;
            for (var s = 0; s < this.length; s += 1)
                if (2 === i.length)
                    this[s].setAttribute(e, t);
                else
                    for (var a in e)
                        this[s][a] = e[a],
                        this[s].setAttribute(a, e[a]);
            return this
        },
        removeAttr: function(e) {
            for (var t = 0; t < this.length; t += 1)
                this[t].removeAttribute(e);
            return this
        },
        data: function(e, t) {
            var i;
            if (void 0 !== t) {
                for (var s = 0; s < this.length; s += 1)
                    (i = this[s]).dom7ElementDataStorage || (i.dom7ElementDataStorage = {}),
                    i.dom7ElementDataStorage[e] = t;
                return this
            }
            if (i = this[0]) {
                if (i.dom7ElementDataStorage && e in i.dom7ElementDataStorage)
                    return i.dom7ElementDataStorage[e];
                var a = i.getAttribute("data-" + e);
                return a || void 0
            }
        },
        transform: function(e) {
            for (var t = 0; t < this.length; t += 1) {
                var i = this[t].style;
                i.webkitTransform = e,
                i.transform = e
            }
            return this
        },
        transition: function(e) {
            "string" != typeof e && (e += "ms");
            for (var t = 0; t < this.length; t += 1) {
                var i = this[t].style;
                i.webkitTransitionDuration = e,
                i.transitionDuration = e
            }
            return this
        },
        on: function() {
            function e(e) {
                var t = e.target;
                if (t) {
                    var i = e.target.dom7EventData || [];
                    if (i.indexOf(e) < 0 && i.unshift(e),
                    L(t).is(o))
                        r.apply(t, i);
                    else
                        for (var s = L(t).parents(), a = 0; a < s.length; a += 1)
                            L(s[a]).is(o) && r.apply(s[a], i)
                }
            }
            function t(e) {
                var t = e && e.target && e.target.dom7EventData || [];
                t.indexOf(e) < 0 && t.unshift(e),
                r.apply(this, t)
            }
            for (var i, s = [], a = arguments.length; a--; )
                s[a] = arguments[a];
            var n = s[0]
              , o = s[1]
              , r = s[2]
              , l = s[3];
            "function" == typeof s[1] && (n = (i = s)[0],
            r = i[1],
            l = i[2],
            o = void 0),
            l || (l = !1);
            for (var d, c = n.split(" "), p = 0; p < this.length; p += 1) {
                var u = this[p];
                if (o)
                    for (d = 0; d < c.length; d += 1) {
                        var h = c[d];
                        u.dom7LiveListeners || (u.dom7LiveListeners = {}),
                        u.dom7LiveListeners[h] || (u.dom7LiveListeners[h] = []),
                        u.dom7LiveListeners[h].push({
                            listener: r,
                            proxyListener: e
                        }),
                        u.addEventListener(h, e, l)
                    }
                else
                    for (d = 0; d < c.length; d += 1) {
                        var f = c[d];
                        u.dom7Listeners || (u.dom7Listeners = {}),
                        u.dom7Listeners[f] || (u.dom7Listeners[f] = []),
                        u.dom7Listeners[f].push({
                            listener: r,
                            proxyListener: t
                        }),
                        u.addEventListener(f, t, l)
                    }
            }
            return this
        },
        off: function() {
            for (var e, t = [], i = arguments.length; i--; )
                t[i] = arguments[i];
            var s = t[0]
              , a = t[1]
              , n = t[2]
              , o = t[3];
            "function" == typeof t[1] && (s = (e = t)[0],
            n = e[1],
            o = e[2],
            a = void 0),
            o || (o = !1);
            for (var r = s.split(" "), l = 0; l < r.length; l += 1)
                for (var d = r[l], c = 0; c < this.length; c += 1) {
                    var p = this[c]
                      , u = void 0;
                    if (!a && p.dom7Listeners ? u = p.dom7Listeners[d] : a && p.dom7LiveListeners && (u = p.dom7LiveListeners[d]),
                    u && u.length)
                        for (var h = u.length - 1; 0 <= h; h -= 1) {
                            var f = u[h];
                            n && f.listener === n ? (p.removeEventListener(d, f.proxyListener, o),
                            u.splice(h, 1)) : n && f.listener && f.listener.dom7proxy && f.listener.dom7proxy === n ? (p.removeEventListener(d, f.proxyListener, o),
                            u.splice(h, 1)) : n || (p.removeEventListener(d, f.proxyListener, o),
                            u.splice(h, 1))
                        }
                }
            return this
        },
        trigger: function() {
            for (var e = [], t = arguments.length; t--; )
                e[t] = arguments[t];
            for (var i = e[0].split(" "), s = e[1], a = 0; a < i.length; a += 1)
                for (var n = i[a], o = 0; o < this.length; o += 1) {
                    var r = this[o]
                      , l = void 0;
                    try {
                        l = new J.CustomEvent(n,{
                            detail: s,
                            bubbles: !0,
                            cancelable: !0
                        })
                    } catch (e) {
                        (l = v.createEvent("Event")).initEvent(n, !0, !0),
                        l.detail = s
                    }
                    r.dom7EventData = e.filter(function(e, t) {
                        return 0 < t
                    }),
                    r.dispatchEvent(l),
                    r.dom7EventData = [],
                    delete r.dom7EventData
                }
            return this
        },
        transitionEnd: function(t) {
            function i(e) {
                if (e.target === this)
                    for (t.call(this, e),
                    s = 0; s < a.length; s += 1)
                        n.off(a[s], i)
            }
            var s, a = ["webkitTransitionEnd", "transitionend"], n = this;
            if (t)
                for (s = 0; s < a.length; s += 1)
                    n.on(a[s], i);
            return this
        },
        outerWidth: function(e) {
            if (0 < this.length) {
                if (e) {
                    var t = this.styles();
                    return this[0].offsetWidth + parseFloat(t.getPropertyValue("margin-right")) + parseFloat(t.getPropertyValue("margin-left"))
                }
                return this[0].offsetWidth
            }
            return null
        },
        outerHeight: function(e) {
            if (0 < this.length) {
                if (e) {
                    var t = this.styles();
                    return this[0].offsetHeight + parseFloat(t.getPropertyValue("margin-top")) + parseFloat(t.getPropertyValue("margin-bottom"))
                }
                return this[0].offsetHeight
            }
            return null
        },
        offset: function() {
            if (0 < this.length) {
                var e = this[0]
                  , t = e.getBoundingClientRect()
                  , i = v.body
                  , s = e.clientTop || i.clientTop || 0
                  , a = e.clientLeft || i.clientLeft || 0
                  , n = e === J ? J.scrollY : e.scrollTop
                  , o = e === J ? J.scrollX : e.scrollLeft;
                return {
                    top: t.top + n - s,
                    left: t.left + o - a
                }
            }
            return null
        },
        css: function(e, t) {
            var i;
            if (1 === arguments.length) {
                if ("string" != typeof e) {
                    for (i = 0; i < this.length; i += 1)
                        for (var s in e)
                            this[i].style[s] = e[s];
                    return this
                }
                if (this[0])
                    return J.getComputedStyle(this[0], null).getPropertyValue(e)
            }
            if (2 === arguments.length && "string" == typeof e) {
                for (i = 0; i < this.length; i += 1)
                    this[i].style[e] = t;
                return this
            }
            return this
        },
        each: function(e) {
            if (!e)
                return this;
            for (var t = 0; t < this.length; t += 1)
                if (!1 === e.call(this[t], t, this[t]))
                    return this;
            return this
        },
        html: function(e) {
            if (void 0 === e)
                return this[0] ? this[0].innerHTML : void 0;
            for (var t = 0; t < this.length; t += 1)
                this[t].innerHTML = e;
            return this
        },
        text: function(e) {
            if (void 0 === e)
                return this[0] ? this[0].textContent.trim() : null;
            for (var t = 0; t < this.length; t += 1)
                this[t].textContent = e;
            return this
        },
        is: function(e) {
            var t, i, s = this[0];
            if (!s || void 0 === e)
                return !1;
            if ("string" == typeof e) {
                if (s.matches)
                    return s.matches(e);
                if (s.webkitMatchesSelector)
                    return s.webkitMatchesSelector(e);
                if (s.msMatchesSelector)
                    return s.msMatchesSelector(e);
                for (t = L(e),
                i = 0; i < t.length; i += 1)
                    if (t[i] === s)
                        return !0;
                return !1
            }
            if (e === v)
                return s === v;
            if (e === J)
                return s === J;
            if (e.nodeType || e instanceof d) {
                for (t = e.nodeType ? [e] : e,
                i = 0; i < t.length; i += 1)
                    if (t[i] === s)
                        return !0;
                return !1
            }
            return !1
        },
        index: function() {
            var e, t = this[0];
            if (t) {
                for (e = 0; null !== (t = t.previousSibling); )
                    1 === t.nodeType && (e += 1);
                return e
            }
        },
        eq: function(e) {
            if (void 0 === e)
                return this;
            var t, i = this.length;
            return new d(i - 1 < e ? [] : e < 0 ? (t = i + e) < 0 ? [] : [this[t]] : [this[e]])
        },
        append: function() {
            for (var e, t = [], i = arguments.length; i--; )
                t[i] = arguments[i];
            for (var s = 0; s < t.length; s += 1) {
                e = t[s];
                for (var a = 0; a < this.length; a += 1)
                    if ("string" == typeof e) {
                        var n = v.createElement("div");
                        for (n.innerHTML = e; n.firstChild; )
                            this[a].appendChild(n.firstChild)
                    } else if (e instanceof d)
                        for (var o = 0; o < e.length; o += 1)
                            this[a].appendChild(e[o]);
                    else
                        this[a].appendChild(e)
            }
            return this
        },
        prepend: function(e) {
            var t, i;
            for (t = 0; t < this.length; t += 1)
                if ("string" == typeof e) {
                    var s = v.createElement("div");
                    for (s.innerHTML = e,
                    i = s.childNodes.length - 1; 0 <= i; i -= 1)
                        this[t].insertBefore(s.childNodes[i], this[t].childNodes[0])
                } else if (e instanceof d)
                    for (i = 0; i < e.length; i += 1)
                        this[t].insertBefore(e[i], this[t].childNodes[0]);
                else
                    this[t].insertBefore(e, this[t].childNodes[0]);
            return this
        },
        next: function(e) {
            return 0 < this.length ? e ? this[0].nextElementSibling && L(this[0].nextElementSibling).is(e) ? new d([this[0].nextElementSibling]) : new d([]) : this[0].nextElementSibling ? new d([this[0].nextElementSibling]) : new d([]) : new d([])
        },
        nextAll: function(e) {
            var t = []
              , i = this[0];
            if (!i)
                return new d([]);
            for (; i.nextElementSibling; ) {
                var s = i.nextElementSibling;
                e ? L(s).is(e) && t.push(s) : t.push(s),
                i = s
            }
            return new d(t)
        },
        prev: function(e) {
            if (0 < this.length) {
                var t = this[0];
                return e ? t.previousElementSibling && L(t.previousElementSibling).is(e) ? new d([t.previousElementSibling]) : new d([]) : t.previousElementSibling ? new d([t.previousElementSibling]) : new d([])
            }
            return new d([])
        },
        prevAll: function(e) {
            var t = []
              , i = this[0];
            if (!i)
                return new d([]);
            for (; i.previousElementSibling; ) {
                var s = i.previousElementSibling;
                e ? L(s).is(e) && t.push(s) : t.push(s),
                i = s
            }
            return new d(t)
        },
        parent: function(e) {
            for (var t = [], i = 0; i < this.length; i += 1)
                null !== this[i].parentNode && (e ? L(this[i].parentNode).is(e) && t.push(this[i].parentNode) : t.push(this[i].parentNode));
            return L(n(t))
        },
        parents: function(e) {
            for (var t = [], i = 0; i < this.length; i += 1)
                for (var s = this[i].parentNode; s; )
                    e ? L(s).is(e) && t.push(s) : t.push(s),
                    s = s.parentNode;
            return L(n(t))
        },
        closest: function(e) {
            var t = this;
            return void 0 === e ? new d([]) : (t.is(e) || (t = t.parents(e).eq(0)),
            t)
        },
        find: function(e) {
            for (var t = [], i = 0; i < this.length; i += 1)
                for (var s = this[i].querySelectorAll(e), a = 0; a < s.length; a += 1)
                    t.push(s[a]);
            return new d(t)
        },
        children: function(e) {
            for (var t = [], i = 0; i < this.length; i += 1)
                for (var s = this[i].childNodes, a = 0; a < s.length; a += 1)
                    e ? 1 === s[a].nodeType && L(s[a]).is(e) && t.push(s[a]) : 1 === s[a].nodeType && t.push(s[a]);
            return new d(n(t))
        },
        remove: function() {
            for (var e = 0; e < this.length; e += 1)
                this[e].parentNode && this[e].parentNode.removeChild(this[e]);
            return this
        },
        add: function() {
            for (var e = [], t = arguments.length; t--; )
                e[t] = arguments[t];
            var i, s;
            for (i = 0; i < e.length; i += 1) {
                var a = L(e[i]);
                for (s = 0; s < a.length; s += 1)
                    this[this.length] = a[s],
                    this.length += 1
            }
            return this
        },
        styles: function() {
            return this[0] ? J.getComputedStyle(this[0], null) : {}
        }
    };
    Object.keys(t).forEach(function(e) {
        L.fn[e] = t[e]
    });
    var e, i, s, a, ee = {
        deleteProps: function(e) {
            var t = e;
            Object.keys(t).forEach(function(e) {
                try {
                    t[e] = null
                } catch (e) {}
                try {
                    delete t[e]
                } catch (e) {}
            })
        },
        nextTick: function(e, t) {
            return void 0 === t && (t = 0),
            setTimeout(e, t)
        },
        now: function() {
            return Date.now()
        },
        getTranslate: function(e, t) {
            var i, s, a;
            void 0 === t && (t = "x");
            var n = J.getComputedStyle(e, null);
            return J.WebKitCSSMatrix ? (6 < (s = n.transform || n.webkitTransform).split(",").length && (s = s.split(", ").map(function(e) {
                return e.replace(",", ".")
            }).join(", ")),
            a = new J.WebKitCSSMatrix("none" === s ? "" : s)) : i = (a = n.MozTransform || n.OTransform || n.MsTransform || n.msTransform || n.transform || n.getPropertyValue("transform").replace("translate(", "matrix(1, 0, 0, 1,")).toString().split(","),
            "x" === t && (s = J.WebKitCSSMatrix ? a.m41 : 16 === i.length ? parseFloat(i[12]) : parseFloat(i[4])),
            "y" === t && (s = J.WebKitCSSMatrix ? a.m42 : 16 === i.length ? parseFloat(i[13]) : parseFloat(i[5])),
            s || 0
        },
        parseUrlQuery: function(e) {
            var t, i, s, a, n = {}, o = e || J.location.href;
            if ("string" == typeof o && o.length)
                for (a = (i = (o = -1 < o.indexOf("?") ? o.replace(/\S*\?/, "") : "").split("&").filter(function(e) {
                    return "" !== e
                })).length,
                t = 0; t < a; t += 1)
                    s = i[t].replace(/#\S+/g, "").split("="),
                    n[decodeURIComponent(s[0])] = void 0 === s[1] ? void 0 : decodeURIComponent(s[1]) || "";
            return n
        },
        isObject: function(e) {
            return "object" == typeof e && null !== e && e.constructor && e.constructor === Object
        },
        extend: function() {
            for (var e = [], t = arguments.length; t--; )
                e[t] = arguments[t];
            for (var i = Object(e[0]), s = 1; s < e.length; s += 1) {
                var a = e[s];
                if (null != a)
                    for (var n = Object.keys(Object(a)), o = 0, r = n.length; o < r; o += 1) {
                        var l = n[o]
                          , d = Object.getOwnPropertyDescriptor(a, l);
                        void 0 !== d && d.enumerable && (ee.isObject(i[l]) && ee.isObject(a[l]) ? ee.extend(i[l], a[l]) : !ee.isObject(i[l]) && ee.isObject(a[l]) ? (i[l] = {},
                        ee.extend(i[l], a[l])) : i[l] = a[l])
                    }
            }
            return i
        }
    }, te = (s = v.createElement("div"),
    {
        touch: J.Modernizr && !0 === J.Modernizr.touch || !!(0 < J.navigator.maxTouchPoints || "ontouchstart"in J || J.DocumentTouch && v instanceof J.DocumentTouch),
        pointerEvents: !!(J.navigator.pointerEnabled || J.PointerEvent || "maxTouchPoints"in J.navigator && 0 < J.navigator.maxTouchPoints),
        prefixedPointerEvents: !!J.navigator.msPointerEnabled,
        transition: (i = s.style,
        "transition"in i || "webkitTransition"in i || "MozTransition"in i),
        transforms3d: J.Modernizr && !0 === J.Modernizr.csstransforms3d || (e = s.style,
        "webkitPerspective"in e || "MozPerspective"in e || "OPerspective"in e || "MsPerspective"in e || "perspective"in e),
        flexbox: function() {
            for (var e = s.style, t = "alignItems webkitAlignItems webkitBoxAlign msFlexAlign mozBoxAlign webkitFlexDirection msFlexDirection mozBoxDirection mozBoxOrient webkitBoxDirection webkitBoxOrient".split(" "), i = 0; i < t.length; i += 1)
                if (t[i]in e)
                    return !0;
            return !1
        }(),
        observer: "MutationObserver"in J || "WebkitMutationObserver"in J,
        passiveListener: function() {
            var e = !1;
            try {
                var t = Object.defineProperty({}, "passive", {
                    get: function() {
                        e = !0
                    }
                });
                J.addEventListener("testPassiveListener", null, t)
            } catch (e) {}
            return e
        }(),
        gestures: "ongesturestart"in J
    }), I = {
        isIE: !!J.navigator.userAgent.match(/Trident/g) || !!J.navigator.userAgent.match(/MSIE/g),
        isEdge: !!J.navigator.userAgent.match(/Edge/g),
        isSafari: (a = J.navigator.userAgent.toLowerCase(),
        0 <= a.indexOf("safari") && a.indexOf("chrome") < 0 && a.indexOf("android") < 0),
        isUiWebView: /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(J.navigator.userAgent)
    }, o = function(e) {
        void 0 === e && (e = {});
        var t = this;
        t.params = e,
        t.eventsListeners = {},
        t.params && t.params.on && Object.keys(t.params.on).forEach(function(e) {
            t.on(e, t.params.on[e])
        })
    }, r = {
        components: {
            configurable: !0
        }
    };
    o.prototype.on = function(e, t, i) {
        var s = this;
        if ("function" != typeof t)
            return s;
        var a = i ? "unshift" : "push";
        return e.split(" ").forEach(function(e) {
            s.eventsListeners[e] || (s.eventsListeners[e] = []),
            s.eventsListeners[e][a](t)
        }),
        s
    }
    ,
    o.prototype.once = function(i, s, e) {
        function a() {
            for (var e = [], t = arguments.length; t--; )
                e[t] = arguments[t];
            s.apply(n, e),
            n.off(i, a),
            a.f7proxy && delete a.f7proxy
        }
        var n = this;
        return "function" != typeof s ? n : (a.f7proxy = s,
        n.on(i, a, e))
    }
    ,
    o.prototype.off = function(e, s) {
        var a = this;
        return a.eventsListeners && e.split(" ").forEach(function(i) {
            void 0 === s ? a.eventsListeners[i] = [] : a.eventsListeners[i] && a.eventsListeners[i].length && a.eventsListeners[i].forEach(function(e, t) {
                (e === s || e.f7proxy && e.f7proxy === s) && a.eventsListeners[i].splice(t, 1)
            })
        }),
        a
    }
    ,
    o.prototype.emit = function() {
        for (var e = [], t = arguments.length; t--; )
            e[t] = arguments[t];
        var i, s, a, n = this;
        return n.eventsListeners && ("string" == typeof e[0] || Array.isArray(e[0]) ? (i = e[0],
        s = e.slice(1, e.length),
        a = n) : (i = e[0].events,
        s = e[0].data,
        a = e[0].context || n),
        (Array.isArray(i) ? i : i.split(" ")).forEach(function(e) {
            if (n.eventsListeners && n.eventsListeners[e]) {
                var t = [];
                n.eventsListeners[e].forEach(function(e) {
                    t.push(e)
                }),
                t.forEach(function(e) {
                    e.apply(a, s)
                })
            }
        })),
        n
    }
    ,
    o.prototype.useModulesParams = function(i) {
        var s = this;
        s.modules && Object.keys(s.modules).forEach(function(e) {
            var t = s.modules[e];
            t.params && ee.extend(i, t.params)
        })
    }
    ,
    o.prototype.useModules = function(s) {
        void 0 === s && (s = {});
        var a = this;
        a.modules && Object.keys(a.modules).forEach(function(e) {
            var i = a.modules[e]
              , t = s[e] || {};
            i.instance && Object.keys(i.instance).forEach(function(e) {
                var t = i.instance[e];
                a[e] = "function" == typeof t ? t.bind(a) : t
            }),
            i.on && a.on && Object.keys(i.on).forEach(function(e) {
                a.on(e, i.on[e])
            }),
            i.create && i.create.bind(a)(t)
        })
    }
    ,
    r.components.set = function(e) {
        this.use && this.use(e)
    }
    ,
    o.installModule = function(t) {
        for (var e = [], i = arguments.length - 1; 0 < i--; )
            e[i] = arguments[i + 1];
        var s = this;
        s.prototype.modules || (s.prototype.modules = {});
        var a = t.name || Object.keys(s.prototype.modules).length + "_" + ee.now();
        return (s.prototype.modules[a] = t).proto && Object.keys(t.proto).forEach(function(e) {
            s.prototype[e] = t.proto[e]
        }),
        t.static && Object.keys(t.static).forEach(function(e) {
            s[e] = t.static[e]
        }),
        t.install && t.install.apply(s, e),
        s
    }
    ,
    o.use = function(e) {
        for (var t = [], i = arguments.length - 1; 0 < i--; )
            t[i] = arguments[i + 1];
        var s = this;
        return Array.isArray(e) ? (e.forEach(function(e) {
            return s.installModule(e)
        }),
        s) : s.installModule.apply(s, [e].concat(t))
    }
    ,
    Object.defineProperties(o, r);
    var c = {
        updateSize: function() {
            var e, t, i = this, s = i.$el;
            e = void 0 !== i.params.width ? i.params.width : s[0].clientWidth,
            t = void 0 !== i.params.height ? i.params.height : s[0].clientHeight,
            0 === e && i.isHorizontal() || 0 === t && i.isVertical() || (e = e - parseInt(s.css("padding-left"), 10) - parseInt(s.css("padding-right"), 10),
            t = t - parseInt(s.css("padding-top"), 10) - parseInt(s.css("padding-bottom"), 10),
            ee.extend(i, {
                width: e,
                height: t,
                size: i.isHorizontal() ? e : t
            }))
        },
        updateSlides: function() {
            var e = this
              , t = e.params
              , i = e.$wrapperEl
              , s = e.size
              , a = e.rtlTranslate
              , n = e.wrongRTL
              , o = e.virtual && t.virtual.enabled
              , r = o ? e.virtual.slides.length : e.slides.length
              , l = i.children("." + e.params.slideClass)
              , d = o ? e.virtual.slides.length : l.length
              , c = []
              , p = []
              , u = []
              , h = t.slidesOffsetBefore;
            "function" == typeof h && (h = t.slidesOffsetBefore.call(e));
            var f = t.slidesOffsetAfter;
            "function" == typeof f && (f = t.slidesOffsetAfter.call(e));
            var v = e.snapGrid.length
              , g = e.snapGrid.length
              , m = t.spaceBetween
              , b = -h
              , y = 0
              , w = 0;
            if (void 0 !== s) {
                var x, T;
                "string" == typeof m && 0 <= m.indexOf("%") && (m = parseFloat(m.replace("%", "")) / 100 * s),
                e.virtualSize = -m,
                a ? l.css({
                    marginLeft: "",
                    marginTop: ""
                }) : l.css({
                    marginRight: "",
                    marginBottom: ""
                }),
                1 < t.slidesPerColumn && (x = Math.floor(d / t.slidesPerColumn) === d / e.params.slidesPerColumn ? d : Math.ceil(d / t.slidesPerColumn) * t.slidesPerColumn,
                "auto" !== t.slidesPerView && "row" === t.slidesPerColumnFill && (x = Math.max(x, t.slidesPerView * t.slidesPerColumn)));
                for (var S, C = t.slidesPerColumn, $ = x / C, E = Math.floor(d / t.slidesPerColumn), k = 0; k < d; k += 1) {
                    T = 0;
                    var P = l.eq(k);
                    if (1 < t.slidesPerColumn) {
                        var M = void 0
                          , z = void 0
                          , L = void 0;
                        "column" === t.slidesPerColumnFill ? (L = k - (z = Math.floor(k / C)) * C,
                        (E < z || z === E && L === C - 1) && C <= (L += 1) && (L = 0,
                        z += 1),
                        M = z + L * x / C,
                        P.css({
                            "-webkit-box-ordinal-group": M,
                            "-moz-box-ordinal-group": M,
                            "-ms-flex-order": M,
                            "-webkit-order": M,
                            order: M
                        })) : z = k - (L = Math.floor(k / $)) * $,
                        P.css("margin-" + (e.isHorizontal() ? "top" : "left"), 0 !== L && t.spaceBetween && t.spaceBetween + "px").attr("data-swiper-column", z).attr("data-swiper-row", L)
                    }
                    if ("none" !== P.css("display")) {
                        if ("auto" === t.slidesPerView) {
                            var I = J.getComputedStyle(P[0], null)
                              , A = P[0].style.transform
                              , O = P[0].style.webkitTransform;
                            if (A && (P[0].style.transform = "none"),
                            O && (P[0].style.webkitTransform = "none"),
                            t.roundLengths)
                                T = e.isHorizontal() ? P.outerWidth(!0) : P.outerHeight(!0);
                            else if (e.isHorizontal()) {
                                var D = parseFloat(I.getPropertyValue("width"))
                                  , H = parseFloat(I.getPropertyValue("padding-left"))
                                  , F = parseFloat(I.getPropertyValue("padding-right"))
                                  , B = parseFloat(I.getPropertyValue("margin-left"))
                                  , X = parseFloat(I.getPropertyValue("margin-right"))
                                  , Y = I.getPropertyValue("box-sizing");
                                T = Y && "border-box" === Y ? D + B + X : D + H + F + B + X
                            } else {
                                var N = parseFloat(I.getPropertyValue("height"))
                                  , R = parseFloat(I.getPropertyValue("padding-top"))
                                  , j = parseFloat(I.getPropertyValue("padding-bottom"))
                                  , q = parseFloat(I.getPropertyValue("margin-top"))
                                  , V = parseFloat(I.getPropertyValue("margin-bottom"))
                                  , W = I.getPropertyValue("box-sizing");
                                T = W && "border-box" === W ? N + q + V : N + R + j + q + V
                            }
                            A && (P[0].style.transform = A),
                            O && (P[0].style.webkitTransform = O),
                            t.roundLengths && (T = Math.floor(T))
                        } else
                            T = (s - (t.slidesPerView - 1) * m) / t.slidesPerView,
                            t.roundLengths && (T = Math.floor(T)),
                            l[k] && (e.isHorizontal() ? l[k].style.width = T + "px" : l[k].style.height = T + "px");
                        l[k] && (l[k].swiperSlideSize = T),
                        u.push(T),
                        t.centeredSlides ? (b = b + T / 2 + y / 2 + m,
                        0 === y && 0 !== k && (b = b - s / 2 - m),
                        0 === k && (b = b - s / 2 - m),
                        Math.abs(b) < .001 && (b = 0),
                        t.roundLengths && (b = Math.floor(b)),
                        w % t.slidesPerGroup == 0 && c.push(b),
                        p.push(b)) : (t.roundLengths && (b = Math.floor(b)),
                        w % t.slidesPerGroup == 0 && c.push(b),
                        p.push(b),
                        b = b + T + m),
                        e.virtualSize += T + m,
                        y = T,
                        w += 1
                    }
                }
                if (e.virtualSize = Math.max(e.virtualSize, s) + f,
                a && n && ("slide" === t.effect || "coverflow" === t.effect) && i.css({
                    width: e.virtualSize + t.spaceBetween + "px"
                }),
                te.flexbox && !t.setWrapperSize || (e.isHorizontal() ? i.css({
                    width: e.virtualSize + t.spaceBetween + "px"
                }) : i.css({
                    height: e.virtualSize + t.spaceBetween + "px"
                })),
                1 < t.slidesPerColumn && (e.virtualSize = (T + t.spaceBetween) * x,
                e.virtualSize = Math.ceil(e.virtualSize / t.slidesPerColumn) - t.spaceBetween,
                e.isHorizontal() ? i.css({
                    width: e.virtualSize + t.spaceBetween + "px"
                }) : i.css({
                    height: e.virtualSize + t.spaceBetween + "px"
                }),
                t.centeredSlides)) {
                    S = [];
                    for (var G = 0; G < c.length; G += 1) {
                        var _ = c[G];
                        t.roundLengths && (_ = Math.floor(_)),
                        c[G] < e.virtualSize + c[0] && S.push(_)
                    }
                    c = S
                }
                if (!t.centeredSlides) {
                    S = [];
                    for (var U = 0; U < c.length; U += 1) {
                        var K = c[U];
                        t.roundLengths && (K = Math.floor(K)),
                        c[U] <= e.virtualSize - s && S.push(K)
                    }
                    c = S,
                    1 < Math.floor(e.virtualSize - s) - Math.floor(c[c.length - 1]) && c.push(e.virtualSize - s)
                }
                if (0 === c.length && (c = [0]),
                0 !== t.spaceBetween && (e.isHorizontal() ? a ? l.css({
                    marginLeft: m + "px"
                }) : l.css({
                    marginRight: m + "px"
                }) : l.css({
                    marginBottom: m + "px"
                })),
                t.centerInsufficientSlides) {
                    var Z = 0;
                    if (u.forEach(function(e) {
                        Z += e + (t.spaceBetween ? t.spaceBetween : 0)
                    }),
                    (Z -= t.spaceBetween) < s) {
                        var Q = (s - Z) / 2;
                        c.forEach(function(e, t) {
                            c[t] = e - Q
                        }),
                        p.forEach(function(e, t) {
                            p[t] = e + Q
                        })
                    }
                }
                ee.extend(e, {
                    slides: l,
                    snapGrid: c,
                    slidesGrid: p,
                    slidesSizesGrid: u
                }),
                d !== r && e.emit("slidesLengthChange"),
                c.length !== v && (e.params.watchOverflow && e.checkOverflow(),
                e.emit("snapGridLengthChange")),
                p.length !== g && e.emit("slidesGridLengthChange"),
                (t.watchSlidesProgress || t.watchSlidesVisibility) && e.updateSlidesOffset()
            }
        },
        updateAutoHeight: function(e) {
            var t, i = this, s = [], a = 0;
            if ("number" == typeof e ? i.setTransition(e) : !0 === e && i.setTransition(i.params.speed),
            "auto" !== i.params.slidesPerView && 1 < i.params.slidesPerView)
                for (t = 0; t < Math.ceil(i.params.slidesPerView); t += 1) {
                    var n = i.activeIndex + t;
                    if (n > i.slides.length)
                        break;
                    s.push(i.slides.eq(n)[0])
                }
            else
                s.push(i.slides.eq(i.activeIndex)[0]);
            for (t = 0; t < s.length; t += 1)
                if (void 0 !== s[t]) {
                    var o = s[t].offsetHeight;
                    a = a < o ? o : a
                }
            a && i.$wrapperEl.css("height", a + "px")
        },
        updateSlidesOffset: function() {
            for (var e = this.slides, t = 0; t < e.length; t += 1)
                e[t].swiperSlideOffset = this.isHorizontal() ? e[t].offsetLeft : e[t].offsetTop
        },
        updateSlidesProgress: function(e) {
            void 0 === e && (e = this && this.translate || 0);
            var t = this
              , i = t.params
              , s = t.slides
              , a = t.rtlTranslate;
            if (0 !== s.length) {
                void 0 === s[0].swiperSlideOffset && t.updateSlidesOffset();
                var n = -e;
                a && (n = e),
                s.removeClass(i.slideVisibleClass),
                t.visibleSlidesIndexes = [],
                t.visibleSlides = [];
                for (var o = 0; o < s.length; o += 1) {
                    var r = s[o]
                      , l = (n + (i.centeredSlides ? t.minTranslate() : 0) - r.swiperSlideOffset) / (r.swiperSlideSize + i.spaceBetween);
                    if (i.watchSlidesVisibility) {
                        var d = -(n - r.swiperSlideOffset)
                          , c = d + t.slidesSizesGrid[o];
                        (0 <= d && d < t.size || 0 < c && c <= t.size || d <= 0 && c >= t.size) && (t.visibleSlides.push(r),
                        t.visibleSlidesIndexes.push(o),
                        s.eq(o).addClass(i.slideVisibleClass))
                    }
                    r.progress = a ? -l : l
                }
                t.visibleSlides = L(t.visibleSlides)
            }
        },
        updateProgress: function(e) {
            void 0 === e && (e = this && this.translate || 0);
            var t = this
              , i = t.params
              , s = t.maxTranslate() - t.minTranslate()
              , a = t.progress
              , n = t.isBeginning
              , o = t.isEnd
              , r = n
              , l = o;
            0 === s ? o = n = !(a = 0) : (n = (a = (e - t.minTranslate()) / s) <= 0,
            o = 1 <= a),
            ee.extend(t, {
                progress: a,
                isBeginning: n,
                isEnd: o
            }),
            (i.watchSlidesProgress || i.watchSlidesVisibility) && t.updateSlidesProgress(e),
            n && !r && t.emit("reachBeginning toEdge"),
            o && !l && t.emit("reachEnd toEdge"),
            (r && !n || l && !o) && t.emit("fromEdge"),
            t.emit("progress", a)
        },
        updateSlidesClasses: function() {
            var e, t = this, i = t.slides, s = t.params, a = t.$wrapperEl, n = t.activeIndex, o = t.realIndex, r = t.virtual && s.virtual.enabled;
            i.removeClass(s.slideActiveClass + " " + s.slideNextClass + " " + s.slidePrevClass + " " + s.slideDuplicateActiveClass + " " + s.slideDuplicateNextClass + " " + s.slideDuplicatePrevClass),
            (e = r ? t.$wrapperEl.find("." + s.slideClass + '[data-swiper-slide-index="' + n + '"]') : i.eq(n)).addClass(s.slideActiveClass),
            s.loop && (e.hasClass(s.slideDuplicateClass) ? a.children("." + s.slideClass + ":not(." + s.slideDuplicateClass + ')[data-swiper-slide-index="' + o + '"]').addClass(s.slideDuplicateActiveClass) : a.children("." + s.slideClass + "." + s.slideDuplicateClass + '[data-swiper-slide-index="' + o + '"]').addClass(s.slideDuplicateActiveClass));
            var l = e.nextAll("." + s.slideClass).eq(0).addClass(s.slideNextClass);
            s.loop && 0 === l.length && (l = i.eq(0)).addClass(s.slideNextClass);
            var d = e.prevAll("." + s.slideClass).eq(0).addClass(s.slidePrevClass);
            s.loop && 0 === d.length && (d = i.eq(-1)).addClass(s.slidePrevClass),
            s.loop && (l.hasClass(s.slideDuplicateClass) ? a.children("." + s.slideClass + ":not(." + s.slideDuplicateClass + ')[data-swiper-slide-index="' + l.attr("data-swiper-slide-index") + '"]').addClass(s.slideDuplicateNextClass) : a.children("." + s.slideClass + "." + s.slideDuplicateClass + '[data-swiper-slide-index="' + l.attr("data-swiper-slide-index") + '"]').addClass(s.slideDuplicateNextClass),
            d.hasClass(s.slideDuplicateClass) ? a.children("." + s.slideClass + ":not(." + s.slideDuplicateClass + ')[data-swiper-slide-index="' + d.attr("data-swiper-slide-index") + '"]').addClass(s.slideDuplicatePrevClass) : a.children("." + s.slideClass + "." + s.slideDuplicateClass + '[data-swiper-slide-index="' + d.attr("data-swiper-slide-index") + '"]').addClass(s.slideDuplicatePrevClass))
        },
        updateActiveIndex: function(e) {
            var t, i = this, s = i.rtlTranslate ? i.translate : -i.translate, a = i.slidesGrid, n = i.snapGrid, o = i.params, r = i.activeIndex, l = i.realIndex, d = i.snapIndex, c = e;
            if (void 0 === c) {
                for (var p = 0; p < a.length; p += 1)
                    void 0 !== a[p + 1] ? s >= a[p] && s < a[p + 1] - (a[p + 1] - a[p]) / 2 ? c = p : s >= a[p] && s < a[p + 1] && (c = p + 1) : s >= a[p] && (c = p);
                o.normalizeSlideIndex && (c < 0 || void 0 === c) && (c = 0)
            }
            if ((t = 0 <= n.indexOf(s) ? n.indexOf(s) : Math.floor(c / o.slidesPerGroup)) >= n.length && (t = n.length - 1),
            c !== r) {
                var u = parseInt(i.slides.eq(c).attr("data-swiper-slide-index") || c, 10);
                ee.extend(i, {
                    snapIndex: t,
                    realIndex: u,
                    previousIndex: r,
                    activeIndex: c
                }),
                i.emit("activeIndexChange"),
                i.emit("snapIndexChange"),
                l !== u && i.emit("realIndexChange"),
                i.emit("slideChange")
            } else
                t !== d && (i.snapIndex = t,
                i.emit("snapIndexChange"))
        },
        updateClickedSlide: function(e) {
            var t = this
              , i = t.params
              , s = L(e.target).closest("." + i.slideClass)[0]
              , a = !1;
            if (s)
                for (var n = 0; n < t.slides.length; n += 1)
                    t.slides[n] === s && (a = !0);
            if (!s || !a)
                return t.clickedSlide = void 0,
                void (t.clickedIndex = void 0);
            t.clickedSlide = s,
            t.virtual && t.params.virtual.enabled ? t.clickedIndex = parseInt(L(s).attr("data-swiper-slide-index"), 10) : t.clickedIndex = L(s).index(),
            i.slideToClickedSlide && void 0 !== t.clickedIndex && t.clickedIndex !== t.activeIndex && t.slideToClickedSlide()
        }
    }
      , p = {
        getTranslate: function(e) {
            void 0 === e && (e = this.isHorizontal() ? "x" : "y");
            var t = this.params
              , i = this.rtlTranslate
              , s = this.translate
              , a = this.$wrapperEl;
            if (t.virtualTranslate)
                return i ? -s : s;
            var n = ee.getTranslate(a[0], e);
            return i && (n = -n),
            n || 0
        },
        setTranslate: function(e, t) {
            var i = this
              , s = i.rtlTranslate
              , a = i.params
              , n = i.$wrapperEl
              , o = i.progress
              , r = 0
              , l = 0;
            i.isHorizontal() ? r = s ? -e : e : l = e,
            a.roundLengths && (r = Math.floor(r),
            l = Math.floor(l)),
            a.virtualTranslate || (te.transforms3d ? n.transform("translate3d(" + r + "px, " + l + "px, 0px)") : n.transform("translate(" + r + "px, " + l + "px)")),
            i.previousTranslate = i.translate,
            i.translate = i.isHorizontal() ? r : l;
            var d = i.maxTranslate() - i.minTranslate();
            (0 === d ? 0 : (e - i.minTranslate()) / d) !== o && i.updateProgress(e),
            i.emit("setTranslate", i.translate, t)
        },
        minTranslate: function() {
            return -this.snapGrid[0]
        },
        maxTranslate: function() {
            return -this.snapGrid[this.snapGrid.length - 1]
        }
    }
      , u = {
        setTransition: function(e, t) {
            this.$wrapperEl.transition(e),
            this.emit("setTransition", e, t)
        },
        transitionStart: function(e, t) {
            void 0 === e && (e = !0);
            var i = this
              , s = i.activeIndex
              , a = i.params
              , n = i.previousIndex;
            a.autoHeight && i.updateAutoHeight();
            var o = t;
            if (o || (o = n < s ? "next" : s < n ? "prev" : "reset"),
            i.emit("transitionStart"),
            e && s !== n) {
                if ("reset" === o)
                    return void i.emit("slideResetTransitionStart");
                i.emit("slideChangeTransitionStart"),
                "next" === o ? i.emit("slideNextTransitionStart") : i.emit("slidePrevTransitionStart")
            }
        },
        transitionEnd: function(e, t) {
            void 0 === e && (e = !0);
            var i = this
              , s = i.activeIndex
              , a = i.previousIndex;
            i.animating = !1,
            i.setTransition(0);
            var n = t;
            if (n || (n = a < s ? "next" : s < a ? "prev" : "reset"),
            i.emit("transitionEnd"),
            e && s !== a) {
                if ("reset" === n)
                    return void i.emit("slideResetTransitionEnd");
                i.emit("slideChangeTransitionEnd"),
                "next" === n ? i.emit("slideNextTransitionEnd") : i.emit("slidePrevTransitionEnd")
            }
        }
    }
      , h = {
        slideTo: function(e, t, i, s) {
            void 0 === e && (e = 0),
            void 0 === t && (t = this.params.speed),
            void 0 === i && (i = !0);
            var a = this
              , n = e;
            n < 0 && (n = 0);
            var o = a.params
              , r = a.snapGrid
              , l = a.slidesGrid
              , d = a.previousIndex
              , c = a.activeIndex
              , p = a.rtlTranslate;
            if (a.animating && o.preventInteractionOnTransition)
                return !1;
            var u = Math.floor(n / o.slidesPerGroup);
            u >= r.length && (u = r.length - 1),
            (c || o.initialSlide || 0) === (d || 0) && i && a.emit("beforeSlideChangeStart");
            var h, f = -r[u];
            if (a.updateProgress(f),
            o.normalizeSlideIndex)
                for (var v = 0; v < l.length; v += 1)
                    -Math.floor(100 * f) >= Math.floor(100 * l[v]) && (n = v);
            if (a.initialized && n !== c) {
                if (!a.allowSlideNext && f < a.translate && f < a.minTranslate())
                    return !1;
                if (!a.allowSlidePrev && f > a.translate && f > a.maxTranslate() && (c || 0) !== n)
                    return !1
            }
            return h = c < n ? "next" : n < c ? "prev" : "reset",
            p && -f === a.translate || !p && f === a.translate ? (a.updateActiveIndex(n),
            o.autoHeight && a.updateAutoHeight(),
            a.updateSlidesClasses(),
            "slide" !== o.effect && a.setTranslate(f),
            "reset" !== h && (a.transitionStart(i, h),
            a.transitionEnd(i, h)),
            !1) : (0 !== t && te.transition ? (a.setTransition(t),
            a.setTranslate(f),
            a.updateActiveIndex(n),
            a.updateSlidesClasses(),
            a.emit("beforeTransitionStart", t, s),
            a.transitionStart(i, h),
            a.animating || (a.animating = !0,
            a.onSlideToWrapperTransitionEnd || (a.onSlideToWrapperTransitionEnd = function(e) {
                a && !a.destroyed && e.target === this && (a.$wrapperEl[0].removeEventListener("transitionend", a.onSlideToWrapperTransitionEnd),
                a.$wrapperEl[0].removeEventListener("webkitTransitionEnd", a.onSlideToWrapperTransitionEnd),
                a.onSlideToWrapperTransitionEnd = null,
                delete a.onSlideToWrapperTransitionEnd,
                a.transitionEnd(i, h))
            }
            ),
            a.$wrapperEl[0].addEventListener("transitionend", a.onSlideToWrapperTransitionEnd),
            a.$wrapperEl[0].addEventListener("webkitTransitionEnd", a.onSlideToWrapperTransitionEnd))) : (a.setTransition(0),
            a.setTranslate(f),
            a.updateActiveIndex(n),
            a.updateSlidesClasses(),
            a.emit("beforeTransitionStart", t, s),
            a.transitionStart(i, h),
            a.transitionEnd(i, h)),
            !0)
        },
        slideToLoop: function(e, t, i, s) {
            void 0 === e && (e = 0),
            void 0 === t && (t = this.params.speed),
            void 0 === i && (i = !0);
            var a = e;
            return this.params.loop && (a += this.loopedSlides),
            this.slideTo(a, t, i, s)
        },
        slideNext: function(e, t, i) {
            void 0 === e && (e = this.params.speed),
            void 0 === t && (t = !0);
            var s = this
              , a = s.params
              , n = s.animating;
            return a.loop ? !n && (s.loopFix(),
            s._clientLeft = s.$wrapperEl[0].clientLeft,
            s.slideTo(s.activeIndex + a.slidesPerGroup, e, t, i)) : s.slideTo(s.activeIndex + a.slidesPerGroup, e, t, i)
        },
        slidePrev: function(e, t, i) {
            function s(e) {
                return e < 0 ? -Math.floor(Math.abs(e)) : Math.floor(e)
            }
            void 0 === e && (e = this.params.speed),
            void 0 === t && (t = !0);
            var a = this
              , n = a.params
              , o = a.animating
              , r = a.snapGrid
              , l = a.slidesGrid
              , d = a.rtlTranslate;
            if (n.loop) {
                if (o)
                    return !1;
                a.loopFix(),
                a._clientLeft = a.$wrapperEl[0].clientLeft
            }
            var c, p = s(d ? a.translate : -a.translate), u = r.map(function(e) {
                return s(e)
            }), h = (l.map(function(e) {
                return s(e)
            }),
            r[u.indexOf(p)],
            r[u.indexOf(p) - 1]);
            return void 0 !== h && (c = l.indexOf(h)) < 0 && (c = a.activeIndex - 1),
            a.slideTo(c, e, t, i)
        },
        slideReset: function(e, t, i) {
            return void 0 === e && (e = this.params.speed),
            void 0 === t && (t = !0),
            this.slideTo(this.activeIndex, e, t, i)
        },
        slideToClosest: function(e, t, i) {
            void 0 === e && (e = this.params.speed),
            void 0 === t && (t = !0);
            var s = this
              , a = s.activeIndex
              , n = Math.floor(a / s.params.slidesPerGroup);
            if (n < s.snapGrid.length - 1) {
                var o = s.rtlTranslate ? s.translate : -s.translate
                  , r = s.snapGrid[n];
                (s.snapGrid[n + 1] - r) / 2 < o - r && (a = s.params.slidesPerGroup)
            }
            return s.slideTo(a, e, t, i)
        },
        slideToClickedSlide: function() {
            var e, t = this, i = t.params, s = t.$wrapperEl, a = "auto" === i.slidesPerView ? t.slidesPerViewDynamic() : i.slidesPerView, n = t.clickedIndex;
            if (i.loop) {
                if (t.animating)
                    return;
                e = parseInt(L(t.clickedSlide).attr("data-swiper-slide-index"), 10),
                i.centeredSlides ? n < t.loopedSlides - a / 2 || n > t.slides.length - t.loopedSlides + a / 2 ? (t.loopFix(),
                n = s.children("." + i.slideClass + '[data-swiper-slide-index="' + e + '"]:not(.' + i.slideDuplicateClass + ")").eq(0).index(),
                ee.nextTick(function() {
                    t.slideTo(n)
                })) : t.slideTo(n) : n > t.slides.length - a ? (t.loopFix(),
                n = s.children("." + i.slideClass + '[data-swiper-slide-index="' + e + '"]:not(.' + i.slideDuplicateClass + ")").eq(0).index(),
                ee.nextTick(function() {
                    t.slideTo(n)
                })) : t.slideTo(n)
            } else
                t.slideTo(n)
        }
    }
      , f = {
        loopCreate: function() {
            var s = this
              , e = s.params
              , t = s.$wrapperEl;
            t.children("." + e.slideClass + "." + e.slideDuplicateClass).remove();
            var a = t.children("." + e.slideClass);
            if (e.loopFillGroupWithBlank) {
                var i = e.slidesPerGroup - a.length % e.slidesPerGroup;
                if (i !== e.slidesPerGroup) {
                    for (var n = 0; n < i; n += 1) {
                        var o = L(v.createElement("div")).addClass(e.slideClass + " " + e.slideBlankClass);
                        t.append(o)
                    }
                    a = t.children("." + e.slideClass)
                }
            }
            "auto" !== e.slidesPerView || e.loopedSlides || (e.loopedSlides = a.length),
            s.loopedSlides = parseInt(e.loopedSlides || e.slidesPerView, 10),
            s.loopedSlides += e.loopAdditionalSlides,
            s.loopedSlides > a.length && (s.loopedSlides = a.length);
            var r = []
              , l = [];
            a.each(function(e, t) {
                var i = L(t);
                e < s.loopedSlides && l.push(t),
                e < a.length && e >= a.length - s.loopedSlides && r.push(t),
                i.attr("data-swiper-slide-index", e)
            });
            for (var d = 0; d < l.length; d += 1)
                t.append(L(l[d].cloneNode(!0)).addClass(e.slideDuplicateClass));
            for (var c = r.length - 1; 0 <= c; c -= 1)
                t.prepend(L(r[c].cloneNode(!0)).addClass(e.slideDuplicateClass))
        },
        loopFix: function() {
            var e, t = this, i = t.params, s = t.activeIndex, a = t.slides, n = t.loopedSlides, o = t.allowSlidePrev, r = t.allowSlideNext, l = t.snapGrid, d = t.rtlTranslate;
            t.allowSlidePrev = !0,
            t.allowSlideNext = !0;
            var c = -l[s] - t.getTranslate();
            s < n ? (e = a.length - 3 * n + s,
            e += n,
            t.slideTo(e, 0, !1, !0) && 0 !== c && t.setTranslate((d ? -t.translate : t.translate) - c)) : ("auto" === i.slidesPerView && 2 * n <= s || s >= a.length - n) && (e = -a.length + s + n,
            e += n,
            t.slideTo(e, 0, !1, !0) && 0 !== c && t.setTranslate((d ? -t.translate : t.translate) - c));
            t.allowSlidePrev = o,
            t.allowSlideNext = r
        },
        loopDestroy: function() {
            var e = this.$wrapperEl
              , t = this.params
              , i = this.slides;
            e.children("." + t.slideClass + "." + t.slideDuplicateClass + ",." + t.slideClass + "." + t.slideBlankClass).remove(),
            i.removeAttr("data-swiper-slide-index")
        }
    }
      , g = {
        setGrabCursor: function(e) {
            if (!(te.touch || !this.params.simulateTouch || this.params.watchOverflow && this.isLocked)) {
                var t = this.el;
                t.style.cursor = "move",
                t.style.cursor = e ? "-webkit-grabbing" : "-webkit-grab",
                t.style.cursor = e ? "-moz-grabbin" : "-moz-grab",
                t.style.cursor = e ? "grabbing" : "grab"
            }
        },
        unsetGrabCursor: function() {
            te.touch || this.params.watchOverflow && this.isLocked || (this.el.style.cursor = "")
        }
    }
      , m = {
        appendSlide: function(e) {
            var t = this
              , i = t.$wrapperEl
              , s = t.params;
            if (s.loop && t.loopDestroy(),
            "object" == typeof e && "length"in e)
                for (var a = 0; a < e.length; a += 1)
                    e[a] && i.append(e[a]);
            else
                i.append(e);
            s.loop && t.loopCreate(),
            s.observer && te.observer || t.update()
        },
        prependSlide: function(e) {
            var t = this
              , i = t.params
              , s = t.$wrapperEl
              , a = t.activeIndex;
            i.loop && t.loopDestroy();
            var n = a + 1;
            if ("object" == typeof e && "length"in e) {
                for (var o = 0; o < e.length; o += 1)
                    e[o] && s.prepend(e[o]);
                n = a + e.length
            } else
                s.prepend(e);
            i.loop && t.loopCreate(),
            i.observer && te.observer || t.update(),
            t.slideTo(n, 0, !1)
        },
        addSlide: function(e, t) {
            var i = this
              , s = i.$wrapperEl
              , a = i.params
              , n = i.activeIndex;
            a.loop && (n -= i.loopedSlides,
            i.loopDestroy(),
            i.slides = s.children("." + a.slideClass));
            var o = i.slides.length;
            if (e <= 0)
                i.prependSlide(t);
            else if (o <= e)
                i.appendSlide(t);
            else {
                for (var r = e < n ? n + 1 : n, l = [], d = o - 1; e <= d; d -= 1) {
                    var c = i.slides.eq(d);
                    c.remove(),
                    l.unshift(c)
                }
                if ("object" == typeof t && "length"in t) {
                    for (var p = 0; p < t.length; p += 1)
                        t[p] && s.append(t[p]);
                    r = e < n ? n + t.length : n
                } else
                    s.append(t);
                for (var u = 0; u < l.length; u += 1)
                    s.append(l[u]);
                a.loop && i.loopCreate(),
                a.observer && te.observer || i.update(),
                a.loop ? i.slideTo(r + i.loopedSlides, 0, !1) : i.slideTo(r, 0, !1)
            }
        },
        removeSlide: function(e) {
            var t = this
              , i = t.params
              , s = t.$wrapperEl
              , a = t.activeIndex;
            i.loop && (a -= t.loopedSlides,
            t.loopDestroy(),
            t.slides = s.children("." + i.slideClass));
            var n, o = a;
            if ("object" == typeof e && "length"in e) {
                for (var r = 0; r < e.length; r += 1)
                    n = e[r],
                    t.slides[n] && t.slides.eq(n).remove(),
                    n < o && (o -= 1);
                o = Math.max(o, 0)
            } else
                n = e,
                t.slides[n] && t.slides.eq(n).remove(),
                n < o && (o -= 1),
                o = Math.max(o, 0);
            i.loop && t.loopCreate(),
            i.observer && te.observer || t.update(),
            i.loop ? t.slideTo(o + t.loopedSlides, 0, !1) : t.slideTo(o, 0, !1)
        },
        removeAllSlides: function() {
            for (var e = [], t = 0; t < this.slides.length; t += 1)
                e.push(t);
            this.removeSlide(e)
        }
    }
      , b = function() {
        var e = J.navigator.userAgent
          , t = {
            ios: !1,
            android: !1,
            androidChrome: !1,
            desktop: !1,
            windows: !1,
            iphone: !1,
            ipod: !1,
            ipad: !1,
            cordova: J.cordova || J.phonegap,
            phonegap: J.cordova || J.phonegap
        }
          , i = e.match(/(Windows Phone);?[\s\/]+([\d.]+)?/)
          , s = e.match(/(Android);?[\s\/]+([\d.]+)?/)
          , a = e.match(/(iPad).*OS\s([\d_]+)/)
          , n = e.match(/(iPod)(.*OS\s([\d_]+))?/)
          , o = !a && e.match(/(iPhone\sOS|iOS)\s([\d_]+)/);
        if (i && (t.os = "windows",
        t.osVersion = i[2],
        t.windows = !0),
        s && !i && (t.os = "android",
        t.osVersion = s[2],
        t.android = !0,
        t.androidChrome = 0 <= e.toLowerCase().indexOf("chrome")),
        (a || o || n) && (t.os = "ios",
        t.ios = !0),
        o && !n && (t.osVersion = o[2].replace(/_/g, "."),
        t.iphone = !0),
        a && (t.osVersion = a[2].replace(/_/g, "."),
        t.ipad = !0),
        n && (t.osVersion = n[3] ? n[3].replace(/_/g, ".") : null,
        t.iphone = !0),
        t.ios && t.osVersion && 0 <= e.indexOf("Version/") && "10" === t.osVersion.split(".")[0] && (t.osVersion = e.toLowerCase().split("version/")[1].split(" ")[0]),
        t.desktop = !(t.os || t.android || t.webView),
        t.webView = (o || a || n) && e.match(/.*AppleWebKit(?!.*Safari)/i),
        t.os && "ios" === t.os) {
            var r = t.osVersion.split(".")
              , l = v.querySelector('meta[name="viewport"]');
            t.minimalUi = !t.webView && (n || o) && (1 * r[0] == 7 ? 1 <= 1 * r[1] : 7 < 1 * r[0]) && l && 0 <= l.getAttribute("content").indexOf("minimal-ui")
        }
        return t.pixelRatio = J.devicePixelRatio || 1,
        t
    }()
      , y = {
        init: !0,
        direction: "horizontal",
        touchEventsTarget: "container",
        initialSlide: 0,
        speed: 300,
        preventInteractionOnTransition: !1,
        edgeSwipeDetection: !1,
        edgeSwipeThreshold: 20,
        freeMode: !1,
        freeModeMomentum: !0,
        freeModeMomentumRatio: 1,
        freeModeMomentumBounce: !0,
        freeModeMomentumBounceRatio: 1,
        freeModeMomentumVelocityRatio: 1,
        freeModeSticky: !1,
        freeModeMinimumVelocity: .02,
        autoHeight: !1,
        setWrapperSize: !1,
        virtualTranslate: !1,
        effect: "slide",
        breakpoints: void 0,
        breakpointsInverse: !1,
        spaceBetween: 0,
        slidesPerView: 1,
        slidesPerColumn: 1,
        slidesPerColumnFill: "column",
        slidesPerGroup: 1,
        centeredSlides: !1,
        slidesOffsetBefore: 0,
        slidesOffsetAfter: 0,
        normalizeSlideIndex: !0,
        centerInsufficientSlides: !1,
        watchOverflow: !1,
        roundLengths: !1,
        touchRatio: 1,
        touchAngle: 45,
        simulateTouch: !0,
        shortSwipes: !0,
        longSwipes: !0,
        longSwipesRatio: .5,
        longSwipesMs: 300,
        followFinger: !0,
        allowTouchMove: !0,
        threshold: 0,
        touchMoveStopPropagation: !0,
        touchStartPreventDefault: !0,
        touchStartForcePreventDefault: !1,
        touchReleaseOnEdges: !1,
        uniqueNavElements: !0,
        resistance: !0,
        resistanceRatio: .85,
        watchSlidesProgress: !1,
        watchSlidesVisibility: !1,
        grabCursor: !1,
        preventClicks: !0,
        preventClicksPropagation: !0,
        slideToClickedSlide: !1,
        preloadImages: !0,
        updateOnImagesReady: !0,
        loop: !1,
        loopAdditionalSlides: 0,
        loopedSlides: null,
        loopFillGroupWithBlank: !1,
        allowSlidePrev: !0,
        allowSlideNext: !0,
        swipeHandler: null,
        noSwiping: !0,
        noSwipingClass: "swiper-no-swiping",
        noSwipingSelector: null,
        passiveListeners: !0,
        containerModifierClass: "swiper-container-",
        slideClass: "swiper-slide",
        slideBlankClass: "swiper-slide-invisible-blank",
        slideActiveClass: "swiper-slide-active",
        slideDuplicateActiveClass: "swiper-slide-duplicate-active",
        slideVisibleClass: "swiper-slide-visible",
        slideDuplicateClass: "swiper-slide-duplicate",
        slideNextClass: "swiper-slide-next",
        slideDuplicateNextClass: "swiper-slide-duplicate-next",
        slidePrevClass: "swiper-slide-prev",
        slideDuplicatePrevClass: "swiper-slide-duplicate-prev",
        wrapperClass: "swiper-wrapper",
        runCallbacksOnInit: !0
    }
      , w = {
        update: c,
        translate: p,
        transition: u,
        slide: h,
        loop: f,
        grabCursor: g,
        manipulation: m,
        events: {
            attachEvents: function() {
                var e = this
                  , t = e.params
                  , i = e.touchEvents
                  , s = e.el
                  , a = e.wrapperEl;
                e.onTouchStart = function(e) {
                    var t = this
                      , i = t.touchEventsData
                      , s = t.params
                      , a = t.touches;
                    if (!t.animating || !s.preventInteractionOnTransition) {
                        var n = e;
                        if (n.originalEvent && (n = n.originalEvent),
                        i.isTouchEvent = "touchstart" === n.type,
                        (i.isTouchEvent || !("which"in n) || 3 !== n.which) && !(!i.isTouchEvent && "button"in n && 0 < n.button || i.isTouched && i.isMoved))
                            if (s.noSwiping && L(n.target).closest(s.noSwipingSelector ? s.noSwipingSelector : "." + s.noSwipingClass)[0])
                                t.allowClick = !0;
                            else if (!s.swipeHandler || L(n).closest(s.swipeHandler)[0]) {
                                a.currentX = "touchstart" === n.type ? n.targetTouches[0].pageX : n.pageX,
                                a.currentY = "touchstart" === n.type ? n.targetTouches[0].pageY : n.pageY;
                                var o = a.currentX
                                  , r = a.currentY
                                  , l = s.edgeSwipeDetection || s.iOSEdgeSwipeDetection
                                  , d = s.edgeSwipeThreshold || s.iOSEdgeSwipeThreshold;
                                if (!l || !(o <= d || o >= J.screen.width - d)) {
                                    if (ee.extend(i, {
                                        isTouched: !0,
                                        isMoved: !1,
                                        allowTouchCallbacks: !0,
                                        isScrolling: void 0,
                                        startMoving: void 0
                                    }),
                                    a.startX = o,
                                    a.startY = r,
                                    i.touchStartTime = ee.now(),
                                    t.allowClick = !0,
                                    t.updateSize(),
                                    t.swipeDirection = void 0,
                                    0 < s.threshold && (i.allowThresholdMove = !1),
                                    "touchstart" !== n.type) {
                                        var c = !0;
                                        L(n.target).is(i.formElements) && (c = !1),
                                        v.activeElement && L(v.activeElement).is(i.formElements) && v.activeElement !== n.target && v.activeElement.blur();
                                        var p = c && t.allowTouchMove && s.touchStartPreventDefault;
                                        (s.touchStartForcePreventDefault || p) && n.preventDefault()
                                    }
                                    t.emit("touchStart", n)
                                }
                            }
                    }
                }
                .bind(e),
                e.onTouchMove = function(e) {
                    var t = this
                      , i = t.touchEventsData
                      , s = t.params
                      , a = t.touches
                      , n = t.rtlTranslate
                      , o = e;
                    if (o.originalEvent && (o = o.originalEvent),
                    i.isTouched) {
                        if (!i.isTouchEvent || "mousemove" !== o.type) {
                            var r = "touchmove" === o.type ? o.targetTouches[0].pageX : o.pageX
                              , l = "touchmove" === o.type ? o.targetTouches[0].pageY : o.pageY;
                            if (o.preventedByNestedSwiper)
                                return a.startX = r,
                                void (a.startY = l);
                            if (!t.allowTouchMove)
                                return t.allowClick = !1,
                                void (i.isTouched && (ee.extend(a, {
                                    startX: r,
                                    startY: l,
                                    currentX: r,
                                    currentY: l
                                }),
                                i.touchStartTime = ee.now()));
                            if (i.isTouchEvent && s.touchReleaseOnEdges && !s.loop)
                                if (t.isVertical()) {
                                    if (l < a.startY && t.translate <= t.maxTranslate() || l > a.startY && t.translate >= t.minTranslate())
                                        return i.isTouched = !1,
                                        void (i.isMoved = !1)
                                } else if (r < a.startX && t.translate <= t.maxTranslate() || r > a.startX && t.translate >= t.minTranslate())
                                    return;
                            if (i.isTouchEvent && v.activeElement && o.target === v.activeElement && L(o.target).is(i.formElements))
                                return i.isMoved = !0,
                                void (t.allowClick = !1);
                            if (i.allowTouchCallbacks && t.emit("touchMove", o),
                            !(o.targetTouches && 1 < o.targetTouches.length)) {
                                a.currentX = r,
                                a.currentY = l;
                                var d, c = a.currentX - a.startX, p = a.currentY - a.startY;
                                if (!(t.params.threshold && Math.sqrt(Math.pow(c, 2) + Math.pow(p, 2)) < t.params.threshold))
                                    if (void 0 === i.isScrolling && (t.isHorizontal() && a.currentY === a.startY || t.isVertical() && a.currentX === a.startX ? i.isScrolling = !1 : 25 <= c * c + p * p && (d = 180 * Math.atan2(Math.abs(p), Math.abs(c)) / Math.PI,
                                    i.isScrolling = t.isHorizontal() ? d > s.touchAngle : 90 - d > s.touchAngle)),
                                    i.isScrolling && t.emit("touchMoveOpposite", o),
                                    void 0 === i.startMoving && (a.currentX === a.startX && a.currentY === a.startY || (i.startMoving = !0)),
                                    i.isScrolling)
                                        i.isTouched = !1;
                                    else if (i.startMoving) {
                                        t.allowClick = !1,
                                        o.preventDefault(),
                                        s.touchMoveStopPropagation && !s.nested && o.stopPropagation(),
                                        i.isMoved || (s.loop && t.loopFix(),
                                        i.startTranslate = t.getTranslate(),
                                        t.setTransition(0),
                                        t.animating && t.$wrapperEl.trigger("webkitTransitionEnd transitionend"),
                                        i.allowMomentumBounce = !1,
                                        !s.grabCursor || !0 !== t.allowSlideNext && !0 !== t.allowSlidePrev || t.setGrabCursor(!0),
                                        t.emit("sliderFirstMove", o)),
                                        t.emit("sliderMove", o),
                                        i.isMoved = !0;
                                        var u = t.isHorizontal() ? c : p;
                                        a.diff = u,
                                        u *= s.touchRatio,
                                        n && (u = -u),
                                        t.swipeDirection = 0 < u ? "prev" : "next",
                                        i.currentTranslate = u + i.startTranslate;
                                        var h = !0
                                          , f = s.resistanceRatio;
                                        if (s.touchReleaseOnEdges && (f = 0),
                                        0 < u && i.currentTranslate > t.minTranslate() ? (h = !1,
                                        s.resistance && (i.currentTranslate = t.minTranslate() - 1 + Math.pow(-t.minTranslate() + i.startTranslate + u, f))) : u < 0 && i.currentTranslate < t.maxTranslate() && (h = !1,
                                        s.resistance && (i.currentTranslate = t.maxTranslate() + 1 - Math.pow(t.maxTranslate() - i.startTranslate - u, f))),
                                        h && (o.preventedByNestedSwiper = !0),
                                        !t.allowSlideNext && "next" === t.swipeDirection && i.currentTranslate < i.startTranslate && (i.currentTranslate = i.startTranslate),
                                        !t.allowSlidePrev && "prev" === t.swipeDirection && i.currentTranslate > i.startTranslate && (i.currentTranslate = i.startTranslate),
                                        0 < s.threshold) {
                                            if (!(Math.abs(u) > s.threshold || i.allowThresholdMove))
                                                return void (i.currentTranslate = i.startTranslate);
                                            if (!i.allowThresholdMove)
                                                return i.allowThresholdMove = !0,
                                                a.startX = a.currentX,
                                                a.startY = a.currentY,
                                                i.currentTranslate = i.startTranslate,
                                                void (a.diff = t.isHorizontal() ? a.currentX - a.startX : a.currentY - a.startY)
                                        }
                                        s.followFinger && ((s.freeMode || s.watchSlidesProgress || s.watchSlidesVisibility) && (t.updateActiveIndex(),
                                        t.updateSlidesClasses()),
                                        s.freeMode && (0 === i.velocities.length && i.velocities.push({
                                            position: a[t.isHorizontal() ? "startX" : "startY"],
                                            time: i.touchStartTime
                                        }),
                                        i.velocities.push({
                                            position: a[t.isHorizontal() ? "currentX" : "currentY"],
                                            time: ee.now()
                                        })),
                                        t.updateProgress(i.currentTranslate),
                                        t.setTranslate(i.currentTranslate))
                                    }
                            }
                        }
                    } else
                        i.startMoving && i.isScrolling && t.emit("touchMoveOpposite", o)
                }
                .bind(e),
                e.onTouchEnd = function(e) {
                    var t = this
                      , i = t.touchEventsData
                      , s = t.params
                      , a = t.touches
                      , n = t.rtlTranslate
                      , o = t.$wrapperEl
                      , r = t.slidesGrid
                      , l = t.snapGrid
                      , d = e;
                    if (d.originalEvent && (d = d.originalEvent),
                    i.allowTouchCallbacks && t.emit("touchEnd", d),
                    i.allowTouchCallbacks = !1,
                    !i.isTouched)
                        return i.isMoved && s.grabCursor && t.setGrabCursor(!1),
                        i.isMoved = !1,
                        void (i.startMoving = !1);
                    s.grabCursor && i.isMoved && i.isTouched && (!0 === t.allowSlideNext || !0 === t.allowSlidePrev) && t.setGrabCursor(!1);
                    var c, p = ee.now(), u = p - i.touchStartTime;
                    if (t.allowClick && (t.updateClickedSlide(d),
                    t.emit("tap", d),
                    u < 300 && 300 < p - i.lastClickTime && (i.clickTimeout && clearTimeout(i.clickTimeout),
                    i.clickTimeout = ee.nextTick(function() {
                        t && !t.destroyed && t.emit("click", d)
                    }, 300)),
                    u < 300 && p - i.lastClickTime < 300 && (i.clickTimeout && clearTimeout(i.clickTimeout),
                    t.emit("doubleTap", d))),
                    i.lastClickTime = ee.now(),
                    ee.nextTick(function() {
                        t.destroyed || (t.allowClick = !0)
                    }),
                    !i.isTouched || !i.isMoved || !t.swipeDirection || 0 === a.diff || i.currentTranslate === i.startTranslate)
                        return i.isTouched = !1,
                        i.isMoved = !1,
                        void (i.startMoving = !1);
                    if (i.isTouched = !1,
                    i.isMoved = !1,
                    i.startMoving = !1,
                    c = s.followFinger ? n ? t.translate : -t.translate : -i.currentTranslate,
                    s.freeMode) {
                        if (c < -t.minTranslate())
                            return void t.slideTo(t.activeIndex);
                        if (c > -t.maxTranslate())
                            return void (t.slides.length < l.length ? t.slideTo(l.length - 1) : t.slideTo(t.slides.length - 1));
                        if (s.freeModeMomentum) {
                            if (1 < i.velocities.length) {
                                var h = i.velocities.pop()
                                  , f = i.velocities.pop()
                                  , v = h.position - f.position
                                  , g = h.time - f.time;
                                t.velocity = v / g,
                                t.velocity /= 2,
                                Math.abs(t.velocity) < s.freeModeMinimumVelocity && (t.velocity = 0),
                                (150 < g || 300 < ee.now() - h.time) && (t.velocity = 0)
                            } else
                                t.velocity = 0;
                            t.velocity *= s.freeModeMomentumVelocityRatio,
                            i.velocities.length = 0;
                            var m = 1e3 * s.freeModeMomentumRatio
                              , b = t.velocity * m
                              , y = t.translate + b;
                            n && (y = -y);
                            var w, x, T = !1, S = 20 * Math.abs(t.velocity) * s.freeModeMomentumBounceRatio;
                            if (y < t.maxTranslate())
                                s.freeModeMomentumBounce ? (y + t.maxTranslate() < -S && (y = t.maxTranslate() - S),
                                w = t.maxTranslate(),
                                T = !0,
                                i.allowMomentumBounce = !0) : y = t.maxTranslate(),
                                s.loop && s.centeredSlides && (x = !0);
                            else if (y > t.minTranslate())
                                s.freeModeMomentumBounce ? (y - t.minTranslate() > S && (y = t.minTranslate() + S),
                                w = t.minTranslate(),
                                T = !0,
                                i.allowMomentumBounce = !0) : y = t.minTranslate(),
                                s.loop && s.centeredSlides && (x = !0);
                            else if (s.freeModeSticky) {
                                for (var C, $ = 0; $ < l.length; $ += 1)
                                    if (l[$] > -y) {
                                        C = $;
                                        break
                                    }
                                y = -(y = Math.abs(l[C] - y) < Math.abs(l[C - 1] - y) || "next" === t.swipeDirection ? l[C] : l[C - 1])
                            }
                            if (x && t.once("transitionEnd", function() {
                                t.loopFix()
                            }),
                            0 !== t.velocity)
                                m = n ? Math.abs((-y - t.translate) / t.velocity) : Math.abs((y - t.translate) / t.velocity);
                            else if (s.freeModeSticky)
                                return void t.slideToClosest();
                            s.freeModeMomentumBounce && T ? (t.updateProgress(w),
                            t.setTransition(m),
                            t.setTranslate(y),
                            t.transitionStart(!0, t.swipeDirection),
                            t.animating = !0,
                            o.transitionEnd(function() {
                                t && !t.destroyed && i.allowMomentumBounce && (t.emit("momentumBounce"),
                                t.setTransition(s.speed),
                                t.setTranslate(w),
                                o.transitionEnd(function() {
                                    t && !t.destroyed && t.transitionEnd()
                                }))
                            })) : t.velocity ? (t.updateProgress(y),
                            t.setTransition(m),
                            t.setTranslate(y),
                            t.transitionStart(!0, t.swipeDirection),
                            t.animating || (t.animating = !0,
                            o.transitionEnd(function() {
                                t && !t.destroyed && t.transitionEnd()
                            }))) : t.updateProgress(y),
                            t.updateActiveIndex(),
                            t.updateSlidesClasses()
                        } else if (s.freeModeSticky)
                            return void t.slideToClosest();
                        (!s.freeModeMomentum || u >= s.longSwipesMs) && (t.updateProgress(),
                        t.updateActiveIndex(),
                        t.updateSlidesClasses())
                    } else {
                        for (var E = 0, k = t.slidesSizesGrid[0], P = 0; P < r.length; P += s.slidesPerGroup)
                            void 0 !== r[P + s.slidesPerGroup] ? c >= r[P] && c < r[P + s.slidesPerGroup] && (k = r[(E = P) + s.slidesPerGroup] - r[P]) : c >= r[P] && (E = P,
                            k = r[r.length - 1] - r[r.length - 2]);
                        var M = (c - r[E]) / k;
                        if (u > s.longSwipesMs) {
                            if (!s.longSwipes)
                                return void t.slideTo(t.activeIndex);
                            "next" === t.swipeDirection && (M >= s.longSwipesRatio ? t.slideTo(E + s.slidesPerGroup) : t.slideTo(E)),
                            "prev" === t.swipeDirection && (M > 1 - s.longSwipesRatio ? t.slideTo(E + s.slidesPerGroup) : t.slideTo(E))
                        } else {
                            if (!s.shortSwipes)
                                return void t.slideTo(t.activeIndex);
                            "next" === t.swipeDirection && t.slideTo(E + s.slidesPerGroup),
                            "prev" === t.swipeDirection && t.slideTo(E)
                        }
                    }
                }
                .bind(e),
                e.onClick = function(e) {
                    this.allowClick || (this.params.preventClicks && e.preventDefault(),
                    this.params.preventClicksPropagation && this.animating && (e.stopPropagation(),
                    e.stopImmediatePropagation()))
                }
                .bind(e);
                var n = "container" === t.touchEventsTarget ? s : a
                  , o = !!t.nested;
                if (te.touch || !te.pointerEvents && !te.prefixedPointerEvents) {
                    if (te.touch) {
                        var r = !("touchstart" !== i.start || !te.passiveListener || !t.passiveListeners) && {
                            passive: !0,
                            capture: !1
                        };
                        n.addEventListener(i.start, e.onTouchStart, r),
                        n.addEventListener(i.move, e.onTouchMove, te.passiveListener ? {
                            passive: !1,
                            capture: o
                        } : o),
                        n.addEventListener(i.end, e.onTouchEnd, r)
                    }
                    (t.simulateTouch && !b.ios && !b.android || t.simulateTouch && !te.touch && b.ios) && (n.addEventListener("mousedown", e.onTouchStart, !1),
                    v.addEventListener("mousemove", e.onTouchMove, o),
                    v.addEventListener("mouseup", e.onTouchEnd, !1))
                } else
                    n.addEventListener(i.start, e.onTouchStart, !1),
                    v.addEventListener(i.move, e.onTouchMove, o),
                    v.addEventListener(i.end, e.onTouchEnd, !1);
                (t.preventClicks || t.preventClicksPropagation) && n.addEventListener("click", e.onClick, !0),
                e.on(b.ios || b.android ? "resize orientationchange observerUpdate" : "resize observerUpdate", l, !0)
            },
            detachEvents: function() {
                var e = this
                  , t = e.params
                  , i = e.touchEvents
                  , s = e.el
                  , a = e.wrapperEl
                  , n = "container" === t.touchEventsTarget ? s : a
                  , o = !!t.nested;
                if (te.touch || !te.pointerEvents && !te.prefixedPointerEvents) {
                    if (te.touch) {
                        var r = !("onTouchStart" !== i.start || !te.passiveListener || !t.passiveListeners) && {
                            passive: !0,
                            capture: !1
                        };
                        n.removeEventListener(i.start, e.onTouchStart, r),
                        n.removeEventListener(i.move, e.onTouchMove, o),
                        n.removeEventListener(i.end, e.onTouchEnd, r)
                    }
                    (t.simulateTouch && !b.ios && !b.android || t.simulateTouch && !te.touch && b.ios) && (n.removeEventListener("mousedown", e.onTouchStart, !1),
                    v.removeEventListener("mousemove", e.onTouchMove, o),
                    v.removeEventListener("mouseup", e.onTouchEnd, !1))
                } else
                    n.removeEventListener(i.start, e.onTouchStart, !1),
                    v.removeEventListener(i.move, e.onTouchMove, o),
                    v.removeEventListener(i.end, e.onTouchEnd, !1);
                (t.preventClicks || t.preventClicksPropagation) && n.removeEventListener("click", e.onClick, !0),
                e.off(b.ios || b.android ? "resize orientationchange observerUpdate" : "resize observerUpdate", l)
            }
        },
        breakpoints: {
            setBreakpoint: function() {
                var e = this
                  , t = e.activeIndex
                  , i = e.initialized
                  , s = e.loopedSlides;
                void 0 === s && (s = 0);
                var a = e.params
                  , n = a.breakpoints;
                if (n && (!n || 0 !== Object.keys(n).length)) {
                    var o = e.getBreakpoint(n);
                    if (o && e.currentBreakpoint !== o) {
                        var r = o in n ? n[o] : void 0;
                        r && ["slidesPerView", "spaceBetween", "slidesPerGroup"].forEach(function(e) {
                            var t = r[e];
                            void 0 !== t && (r[e] = "slidesPerView" !== e || "AUTO" !== t && "auto" !== t ? "slidesPerView" === e ? parseFloat(t) : parseInt(t, 10) : "auto")
                        });
                        var l = r || e.originalParams
                          , d = l.direction && l.direction !== a.direction
                          , c = a.loop && (l.slidesPerView !== a.slidesPerView || d);
                        d && i && e.changeDirection(),
                        ee.extend(e.params, l),
                        ee.extend(e, {
                            allowTouchMove: e.params.allowTouchMove,
                            allowSlideNext: e.params.allowSlideNext,
                            allowSlidePrev: e.params.allowSlidePrev
                        }),
                        e.currentBreakpoint = o,
                        c && i && (e.loopDestroy(),
                        e.loopCreate(),
                        e.updateSlides(),
                        e.slideTo(t - s + e.loopedSlides, 0, !1)),
                        e.emit("breakpoint", l)
                    }
                }
            },
            getBreakpoint: function(e) {
                if (e) {
                    var t = !1
                      , i = [];
                    Object.keys(e).forEach(function(e) {
                        i.push(e)
                    }),
                    i.sort(function(e, t) {
                        return parseInt(e, 10) - parseInt(t, 10)
                    });
                    for (var s = 0; s < i.length; s += 1) {
                        var a = i[s];
                        this.params.breakpointsInverse ? a <= J.innerWidth && (t = a) : a >= J.innerWidth && !t && (t = a)
                    }
                    return t || "max"
                }
            }
        },
        checkOverflow: {
            checkOverflow: function() {
                var e = this
                  , t = e.isLocked;
                e.isLocked = 1 === e.snapGrid.length,
                e.allowSlideNext = !e.isLocked,
                e.allowSlidePrev = !e.isLocked,
                t !== e.isLocked && e.emit(e.isLocked ? "lock" : "unlock"),
                t && t !== e.isLocked && (e.isEnd = !1,
                e.navigation.update())
            }
        },
        classes: {
            addClasses: function() {
                var t = this.classNames
                  , i = this.params
                  , e = this.rtl
                  , s = this.$el
                  , a = [];
                a.push("initialized"),
                a.push(i.direction),
                i.freeMode && a.push("free-mode"),
                te.flexbox || a.push("no-flexbox"),
                i.autoHeight && a.push("autoheight"),
                e && a.push("rtl"),
                1 < i.slidesPerColumn && a.push("multirow"),
                b.android && a.push("android"),
                b.ios && a.push("ios"),
                (I.isIE || I.isEdge) && (te.pointerEvents || te.prefixedPointerEvents) && a.push("wp8-" + i.direction),
                a.forEach(function(e) {
                    t.push(i.containerModifierClass + e)
                }),
                s.addClass(t.join(" "))
            },
            removeClasses: function() {
                var e = this.$el
                  , t = this.classNames;
                e.removeClass(t.join(" "))
            }
        },
        images: {
            loadImage: function(e, t, i, s, a, n) {
                function o() {
                    n && n()
                }
                var r;
                e.complete && a ? o() : t ? ((r = new J.Image).onload = o,
                r.onerror = o,
                s && (r.sizes = s),
                i && (r.srcset = i),
                t && (r.src = t)) : o()
            },
            preloadImages: function() {
                function e() {
                    null != t && t && !t.destroyed && (void 0 !== t.imagesLoaded && (t.imagesLoaded += 1),
                    t.imagesLoaded === t.imagesToLoad.length && (t.params.updateOnImagesReady && t.update(),
                    t.emit("imagesReady")))
                }
                var t = this;
                t.imagesToLoad = t.$el.find("img");
                for (var i = 0; i < t.imagesToLoad.length; i += 1) {
                    var s = t.imagesToLoad[i];
                    t.loadImage(s, s.currentSrc || s.getAttribute("src"), s.srcset || s.getAttribute("srcset"), s.sizes || s.getAttribute("sizes"), !0, e)
                }
            }
        }
    }
      , x = {}
      , T = function(u) {
        function h() {
            for (var e, t, a, i = [], s = arguments.length; s--; )
                i[s] = arguments[s];
            1 === i.length && i[0].constructor && i[0].constructor === Object ? a = i[0] : (t = (e = i)[0],
            a = e[1]),
            a || (a = {}),
            a = ee.extend({}, a),
            t && !a.el && (a.el = t),
            u.call(this, a),
            Object.keys(w).forEach(function(t) {
                Object.keys(w[t]).forEach(function(e) {
                    h.prototype[e] || (h.prototype[e] = w[t][e])
                })
            });
            var n = this;
            void 0 === n.modules && (n.modules = {}),
            Object.keys(n.modules).forEach(function(e) {
                var t = n.modules[e];
                if (t.params) {
                    var i = Object.keys(t.params)[0]
                      , s = t.params[i];
                    if ("object" != typeof s || null === s)
                        return;
                    if (!(i in a && "enabled"in s))
                        return;
                    !0 === a[i] && (a[i] = {
                        enabled: !0
                    }),
                    "object" != typeof a[i] || "enabled"in a[i] || (a[i].enabled = !0),
                    a[i] || (a[i] = {
                        enabled: !1
                    })
                }
            });
            var o = ee.extend({}, y);
            n.useModulesParams(o),
            n.params = ee.extend({}, o, x, a),
            n.originalParams = ee.extend({}, n.params),
            n.passedParams = ee.extend({}, a);
            var r = (n.$ = L)(n.params.el);
            if (t = r[0]) {
                if (1 < r.length) {
                    var l = [];
                    return r.each(function(e, t) {
                        var i = ee.extend({}, a, {
                            el: t
                        });
                        l.push(new h(i))
                    }),
                    l
                }
                t.swiper = n,
                r.data("swiper", n);
                var d, c, p = r.children("." + n.params.wrapperClass);
                return ee.extend(n, {
                    $el: r,
                    el: t,
                    $wrapperEl: p,
                    wrapperEl: p[0],
                    classNames: [],
                    slides: L(),
                    slidesGrid: [],
                    snapGrid: [],
                    slidesSizesGrid: [],
                    isHorizontal: function() {
                        return "horizontal" === n.params.direction
                    },
                    isVertical: function() {
                        return "vertical" === n.params.direction
                    },
                    rtl: "rtl" === t.dir.toLowerCase() || "rtl" === r.css("direction"),
                    rtlTranslate: "horizontal" === n.params.direction && ("rtl" === t.dir.toLowerCase() || "rtl" === r.css("direction")),
                    wrongRTL: "-webkit-box" === p.css("display"),
                    activeIndex: 0,
                    realIndex: 0,
                    isBeginning: !0,
                    isEnd: !1,
                    translate: 0,
                    previousTranslate: 0,
                    progress: 0,
                    velocity: 0,
                    animating: !1,
                    allowSlideNext: n.params.allowSlideNext,
                    allowSlidePrev: n.params.allowSlidePrev,
                    touchEvents: (d = ["touchstart", "touchmove", "touchend"],
                    c = ["mousedown", "mousemove", "mouseup"],
                    te.pointerEvents ? c = ["pointerdown", "pointermove", "pointerup"] : te.prefixedPointerEvents && (c = ["MSPointerDown", "MSPointerMove", "MSPointerUp"]),
                    n.touchEventsTouch = {
                        start: d[0],
                        move: d[1],
                        end: d[2]
                    },
                    n.touchEventsDesktop = {
                        start: c[0],
                        move: c[1],
                        end: c[2]
                    },
                    te.touch || !n.params.simulateTouch ? n.touchEventsTouch : n.touchEventsDesktop),
                    touchEventsData: {
                        isTouched: void 0,
                        isMoved: void 0,
                        allowTouchCallbacks: void 0,
                        touchStartTime: void 0,
                        isScrolling: void 0,
                        currentTranslate: void 0,
                        startTranslate: void 0,
                        allowThresholdMove: void 0,
                        formElements: "input, select, option, textarea, button, video",
                        lastClickTime: ee.now(),
                        clickTimeout: void 0,
                        velocities: [],
                        allowMomentumBounce: void 0,
                        isTouchEvent: void 0,
                        startMoving: void 0
                    },
                    allowClick: !0,
                    allowTouchMove: n.params.allowTouchMove,
                    touches: {
                        startX: 0,
                        startY: 0,
                        currentX: 0,
                        currentY: 0,
                        diff: 0
                    },
                    imagesToLoad: [],
                    imagesLoaded: 0
                }),
                n.useModules(),
                n.params.init && n.init(),
                n
            }
        }
        u && (h.__proto__ = u),
        h.prototype = Object.create(u && u.prototype);
        var e = {
            extendedDefaults: {
                configurable: !0
            },
            defaults: {
                configurable: !0
            },
            Class: {
                configurable: !0
            },
            $: {
                configurable: !0
            }
        };
        return (h.prototype.constructor = h).prototype.slidesPerViewDynamic = function() {
            var e = this
              , t = e.params
              , i = e.slides
              , s = e.slidesGrid
              , a = e.size
              , n = e.activeIndex
              , o = 1;
            if (t.centeredSlides) {
                for (var r, l = i[n].swiperSlideSize, d = n + 1; d < i.length; d += 1)
                    i[d] && !r && (o += 1,
                    a < (l += i[d].swiperSlideSize) && (r = !0));
                for (var c = n - 1; 0 <= c; c -= 1)
                    i[c] && !r && (o += 1,
                    a < (l += i[c].swiperSlideSize) && (r = !0))
            } else
                for (var p = n + 1; p < i.length; p += 1)
                    s[p] - s[n] < a && (o += 1);
            return o
        }
        ,
        h.prototype.update = function() {
            function e() {
                var e = i.rtlTranslate ? -1 * i.translate : i.translate
                  , t = Math.min(Math.max(e, i.maxTranslate()), i.minTranslate());
                i.setTranslate(t),
                i.updateActiveIndex(),
                i.updateSlidesClasses()
            }
            var i = this;
            if (i && !i.destroyed) {
                var t = i.snapGrid
                  , s = i.params;
                s.breakpoints && i.setBreakpoint(),
                i.updateSize(),
                i.updateSlides(),
                i.updateProgress(),
                i.updateSlidesClasses(),
                i.params.freeMode ? (e(),
                i.params.autoHeight && i.updateAutoHeight()) : (("auto" === i.params.slidesPerView || 1 < i.params.slidesPerView) && i.isEnd && !i.params.centeredSlides ? i.slideTo(i.slides.length - 1, 0, !1, !0) : i.slideTo(i.activeIndex, 0, !1, !0)) || e(),
                s.watchOverflow && t !== i.snapGrid && i.checkOverflow(),
                i.emit("update")
            }
        }
        ,
        h.prototype.changeDirection = function(i, e) {
            void 0 === e && (e = !0);
            var t = this
              , s = t.params.direction;
            return i || (i = "horizontal" === s ? "vertical" : "horizontal"),
            i === s || "horizontal" !== i && "vertical" !== i || ("vertical" === s && (t.$el.removeClass(t.params.containerModifierClass + "vertical wp8-vertical").addClass("" + t.params.containerModifierClass + i),
            (I.isIE || I.isEdge) && (te.pointerEvents || te.prefixedPointerEvents) && t.$el.addClass(t.params.containerModifierClass + "wp8-" + i)),
            "horizontal" === s && (t.$el.removeClass(t.params.containerModifierClass + "horizontal wp8-horizontal").addClass("" + t.params.containerModifierClass + i),
            (I.isIE || I.isEdge) && (te.pointerEvents || te.prefixedPointerEvents) && t.$el.addClass(t.params.containerModifierClass + "wp8-" + i)),
            t.params.direction = i,
            t.slides.each(function(e, t) {
                "vertical" === i ? t.style.width = "" : t.style.height = ""
            }),
            t.emit("changeDirection"),
            e && t.update()),
            t
        }
        ,
        h.prototype.init = function() {
            var e = this;
            e.initialized || (e.emit("beforeInit"),
            e.params.breakpoints && e.setBreakpoint(),
            e.addClasses(),
            e.params.loop && e.loopCreate(),
            e.updateSize(),
            e.updateSlides(),
            e.params.watchOverflow && e.checkOverflow(),
            e.params.grabCursor && e.setGrabCursor(),
            e.params.preloadImages && e.preloadImages(),
            e.params.loop ? e.slideTo(e.params.initialSlide + e.loopedSlides, 0, e.params.runCallbacksOnInit) : e.slideTo(e.params.initialSlide, 0, e.params.runCallbacksOnInit),
            e.attachEvents(),
            e.initialized = !0,
            e.emit("init"))
        }
        ,
        h.prototype.destroy = function(e, t) {
            void 0 === e && (e = !0),
            void 0 === t && (t = !0);
            var i = this
              , s = i.params
              , a = i.$el
              , n = i.$wrapperEl
              , o = i.slides;
            return void 0 === i.params || i.destroyed || (i.emit("beforeDestroy"),
            i.initialized = !1,
            i.detachEvents(),
            s.loop && i.loopDestroy(),
            t && (i.removeClasses(),
            a.removeAttr("style"),
            n.removeAttr("style"),
            o && o.length && o.removeClass([s.slideVisibleClass, s.slideActiveClass, s.slideNextClass, s.slidePrevClass].join(" ")).removeAttr("style").removeAttr("data-swiper-slide-index").removeAttr("data-swiper-column").removeAttr("data-swiper-row")),
            i.emit("destroy"),
            Object.keys(i.eventsListeners).forEach(function(e) {
                i.off(e)
            }),
            !1 !== e && (i.$el[0].swiper = null,
            i.$el.data("swiper", null),
            ee.deleteProps(i)),
            i.destroyed = !0),
            null
        }
        ,
        h.extendDefaults = function(e) {
            ee.extend(x, e)
        }
        ,
        e.extendedDefaults.get = function() {
            return x
        }
        ,
        e.defaults.get = function() {
            return y
        }
        ,
        e.Class.get = function() {
            return u
        }
        ,
        e.$.get = function() {
            return L
        }
        ,
        Object.defineProperties(h, e),
        h
    }(o)
      , S = {
        name: "device",
        proto: {
            device: b
        },
        static: {
            device: b
        }
    }
      , C = {
        name: "support",
        proto: {
            support: te
        },
        static: {
            support: te
        }
    }
      , $ = {
        name: "browser",
        proto: {
            browser: I
        },
        static: {
            browser: I
        }
    }
      , E = {
        name: "resize",
        create: function() {
            var e = this;
            ee.extend(e, {
                resize: {
                    resizeHandler: function() {
                        e && !e.destroyed && e.initialized && (e.emit("beforeResize"),
                        e.emit("resize"))
                    },
                    orientationChangeHandler: function() {
                        e && !e.destroyed && e.initialized && e.emit("orientationchange")
                    }
                }
            })
        },
        on: {
            init: function() {
                J.addEventListener("resize", this.resize.resizeHandler),
                J.addEventListener("orientationchange", this.resize.orientationChangeHandler)
            },
            destroy: function() {
                J.removeEventListener("resize", this.resize.resizeHandler),
                J.removeEventListener("orientationchange", this.resize.orientationChangeHandler)
            }
        }
    }
      , k = {
        func: J.MutationObserver || J.WebkitMutationObserver,
        attach: function(e, t) {
            void 0 === t && (t = {});
            var i = this
              , s = new (0,
            k.func)(function(e) {
                if (1 !== e.length) {
                    var t = function() {
                        i.emit("observerUpdate", e[0])
                    };
                    J.requestAnimationFrame ? J.requestAnimationFrame(t) : J.setTimeout(t, 0)
                } else
                    i.emit("observerUpdate", e[0])
            }
            );
            s.observe(e, {
                attributes: void 0 === t.attributes || t.attributes,
                childList: void 0 === t.childList || t.childList,
                characterData: void 0 === t.characterData || t.characterData
            }),
            i.observer.observers.push(s)
        },
        init: function() {
            var e = this;
            if (te.observer && e.params.observer) {
                if (e.params.observeParents)
                    for (var t = e.$el.parents(), i = 0; i < t.length; i += 1)
                        e.observer.attach(t[i]);
                e.observer.attach(e.$el[0], {
                    childList: e.params.observeSlideChildren
                }),
                e.observer.attach(e.$wrapperEl[0], {
                    attributes: !1
                })
            }
        },
        destroy: function() {
            this.observer.observers.forEach(function(e) {
                e.disconnect()
            }),
            this.observer.observers = []
        }
    }
      , P = {
        name: "observer",
        params: {
            observer: !1,
            observeParents: !1,
            observeSlideChildren: !1
        },
        create: function() {
            ee.extend(this, {
                observer: {
                    init: k.init.bind(this),
                    attach: k.attach.bind(this),
                    destroy: k.destroy.bind(this),
                    observers: []
                }
            })
        },
        on: {
            init: function() {
                this.observer.init()
            },
            destroy: function() {
                this.observer.destroy()
            }
        }
    }
      , M = {
        update: function(e) {
            function t() {
                i.updateSlides(),
                i.updateProgress(),
                i.updateSlidesClasses(),
                i.lazy && i.params.lazy.enabled && i.lazy.load()
            }
            var i = this
              , s = i.params
              , a = s.slidesPerView
              , n = s.slidesPerGroup
              , o = s.centeredSlides
              , r = i.params.virtual
              , l = r.addSlidesBefore
              , d = r.addSlidesAfter
              , c = i.virtual
              , p = c.from
              , u = c.to
              , h = c.slides
              , f = c.slidesGrid
              , v = c.renderSlide
              , g = c.offset;
            i.updateActiveIndex();
            var m, b, y, w = i.activeIndex || 0;
            m = i.rtlTranslate ? "right" : i.isHorizontal() ? "left" : "top",
            o ? (b = Math.floor(a / 2) + n + l,
            y = Math.floor(a / 2) + n + d) : (b = a + (n - 1) + l,
            y = n + d);
            var x = Math.max((w || 0) - y, 0)
              , T = Math.min((w || 0) + b, h.length - 1)
              , S = (i.slidesGrid[x] || 0) - (i.slidesGrid[0] || 0);
            if (ee.extend(i.virtual, {
                from: x,
                to: T,
                offset: S,
                slidesGrid: i.slidesGrid
            }),
            p === x && u === T && !e)
                return i.slidesGrid !== f && S !== g && i.slides.css(m, S + "px"),
                void i.updateProgress();
            if (i.params.virtual.renderExternal)
                return i.params.virtual.renderExternal.call(i, {
                    offset: S,
                    from: x,
                    to: T,
                    slides: function() {
                        for (var e = [], t = x; t <= T; t += 1)
                            e.push(h[t]);
                        return e
                    }()
                }),
                void t();
            var C = []
              , $ = [];
            if (e)
                i.$wrapperEl.find("." + i.params.slideClass).remove();
            else
                for (var E = p; E <= u; E += 1)
                    (E < x || T < E) && i.$wrapperEl.find("." + i.params.slideClass + '[data-swiper-slide-index="' + E + '"]').remove();
            for (var k = 0; k < h.length; k += 1)
                x <= k && k <= T && (void 0 === u || e ? $.push(k) : (u < k && $.push(k),
                k < p && C.push(k)));
            $.forEach(function(e) {
                i.$wrapperEl.append(v(h[e], e))
            }),
            C.sort(function(e, t) {
                return t - e
            }).forEach(function(e) {
                i.$wrapperEl.prepend(v(h[e], e))
            }),
            i.$wrapperEl.children(".swiper-slide").css(m, S + "px"),
            t()
        },
        renderSlide: function(e, t) {
            var i = this
              , s = i.params.virtual;
            if (s.cache && i.virtual.cache[t])
                return i.virtual.cache[t];
            var a = s.renderSlide ? L(s.renderSlide.call(i, e, t)) : L('<div class="' + i.params.slideClass + '" data-swiper-slide-index="' + t + '">' + e + "</div>");
            return a.attr("data-swiper-slide-index") || a.attr("data-swiper-slide-index", t),
            s.cache && (i.virtual.cache[t] = a),
            a
        },
        appendSlide: function(e) {
            if ("object" == typeof e && "length"in e)
                for (var t = 0; t < e.length; t += 1)
                    e[t] && this.virtual.slides.push(e[t]);
            else
                this.virtual.slides.push(e);
            this.virtual.update(!0)
        },
        prependSlide: function(e) {
            var t = this
              , i = t.activeIndex
              , s = i + 1
              , a = 1;
            if (Array.isArray(e)) {
                for (var n = 0; n < e.length; n += 1)
                    e[n] && t.virtual.slides.unshift(e[n]);
                s = i + e.length,
                a = e.length
            } else
                t.virtual.slides.unshift(e);
            if (t.params.virtual.cache) {
                var o = t.virtual.cache
                  , r = {};
                Object.keys(o).forEach(function(e) {
                    r[parseInt(e, 10) + a] = o[e]
                }),
                t.virtual.cache = r
            }
            t.virtual.update(!0),
            t.slideTo(s, 0)
        },
        removeSlide: function(e) {
            var t = this;
            if (null != e) {
                var i = t.activeIndex;
                if (Array.isArray(e))
                    for (var s = e.length - 1; 0 <= s; s -= 1)
                        t.virtual.slides.splice(e[s], 1),
                        t.params.virtual.cache && delete t.virtual.cache[e[s]],
                        e[s] < i && (i -= 1),
                        i = Math.max(i, 0);
                else
                    t.virtual.slides.splice(e, 1),
                    t.params.virtual.cache && delete t.virtual.cache[e],
                    e < i && (i -= 1),
                    i = Math.max(i, 0);
                t.virtual.update(!0),
                t.slideTo(i, 0)
            }
        },
        removeAllSlides: function() {
            var e = this;
            e.virtual.slides = [],
            e.params.virtual.cache && (e.virtual.cache = {}),
            e.virtual.update(!0),
            e.slideTo(0, 0)
        }
    }
      , z = {
        name: "virtual",
        params: {
            virtual: {
                enabled: !1,
                slides: [],
                cache: !0,
                renderSlide: null,
                renderExternal: null,
                addSlidesBefore: 0,
                addSlidesAfter: 0
            }
        },
        create: function() {
            var e = this;
            ee.extend(e, {
                virtual: {
                    update: M.update.bind(e),
                    appendSlide: M.appendSlide.bind(e),
                    prependSlide: M.prependSlide.bind(e),
                    removeSlide: M.removeSlide.bind(e),
                    removeAllSlides: M.removeAllSlides.bind(e),
                    renderSlide: M.renderSlide.bind(e),
                    slides: e.params.virtual.slides,
                    cache: {}
                }
            })
        },
        on: {
            beforeInit: function() {
                var e = this;
                if (e.params.virtual.enabled) {
                    e.classNames.push(e.params.containerModifierClass + "virtual");
                    var t = {
                        watchSlidesProgress: !0
                    };
                    ee.extend(e.params, t),
                    ee.extend(e.originalParams, t),
                    e.params.initialSlide || e.virtual.update()
                }
            },
            setTranslate: function() {
                this.params.virtual.enabled && this.virtual.update()
            }
        }
    }
      , A = {
        handle: function(e) {
            var t = this
              , i = t.rtlTranslate
              , s = e;
            s.originalEvent && (s = s.originalEvent);
            var a = s.keyCode || s.charCode;
            if (!t.allowSlideNext && (t.isHorizontal() && 39 === a || t.isVertical() && 40 === a))
                return !1;
            if (!t.allowSlidePrev && (t.isHorizontal() && 37 === a || t.isVertical() && 38 === a))
                return !1;
            if (!(s.shiftKey || s.altKey || s.ctrlKey || s.metaKey || v.activeElement && v.activeElement.nodeName && ("input" === v.activeElement.nodeName.toLowerCase() || "textarea" === v.activeElement.nodeName.toLowerCase()))) {
                if (t.params.keyboard.onlyInViewport && (37 === a || 39 === a || 38 === a || 40 === a)) {
                    var n = !1;
                    if (0 < t.$el.parents("." + t.params.slideClass).length && 0 === t.$el.parents("." + t.params.slideActiveClass).length)
                        return;
                    var o = J.innerWidth
                      , r = J.innerHeight
                      , l = t.$el.offset();
                    i && (l.left -= t.$el[0].scrollLeft);
                    for (var d = [[l.left, l.top], [l.left + t.width, l.top], [l.left, l.top + t.height], [l.left + t.width, l.top + t.height]], c = 0; c < d.length; c += 1) {
                        var p = d[c];
                        0 <= p[0] && p[0] <= o && 0 <= p[1] && p[1] <= r && (n = !0)
                    }
                    if (!n)
                        return
                }
                t.isHorizontal() ? (37 !== a && 39 !== a || (s.preventDefault ? s.preventDefault() : s.returnValue = !1),
                (39 === a && !i || 37 === a && i) && t.slideNext(),
                (37 === a && !i || 39 === a && i) && t.slidePrev()) : (38 !== a && 40 !== a || (s.preventDefault ? s.preventDefault() : s.returnValue = !1),
                40 === a && t.slideNext(),
                38 === a && t.slidePrev()),
                t.emit("keyPress", a)
            }
        },
        enable: function() {
            this.keyboard.enabled || (L(v).on("keydown", this.keyboard.handle),
            this.keyboard.enabled = !0)
        },
        disable: function() {
            this.keyboard.enabled && (L(v).off("keydown", this.keyboard.handle),
            this.keyboard.enabled = !1)
        }
    }
      , O = {
        name: "keyboard",
        params: {
            keyboard: {
                enabled: !1,
                onlyInViewport: !0
            }
        },
        create: function() {
            ee.extend(this, {
                keyboard: {
                    enabled: !1,
                    enable: A.enable.bind(this),
                    disable: A.disable.bind(this),
                    handle: A.handle.bind(this)
                }
            })
        },
        on: {
            init: function() {
                this.params.keyboard.enabled && this.keyboard.enable()
            },
            destroy: function() {
                this.keyboard.enabled && this.keyboard.disable()
            }
        }
    }
      , D = {
        lastScrollTime: ee.now(),
        event: -1 < J.navigator.userAgent.indexOf("firefox") ? "DOMMouseScroll" : function() {
            var e = "onwheel"
              , t = e in v;
            if (!t) {
                var i = v.createElement("div");
                i.setAttribute(e, "return;"),
                t = "function" == typeof i[e]
            }
            return !t && v.implementation && v.implementation.hasFeature && !0 !== v.implementation.hasFeature("", "") && (t = v.implementation.hasFeature("Events.wheel", "3.0")),
            t
        }() ? "wheel" : "mousewheel",
        normalize: function(e) {
            var t = 0
              , i = 0
              , s = 0
              , a = 0;
            return "detail"in e && (i = e.detail),
            "wheelDelta"in e && (i = -e.wheelDelta / 120),
            "wheelDeltaY"in e && (i = -e.wheelDeltaY / 120),
            "wheelDeltaX"in e && (t = -e.wheelDeltaX / 120),
            "axis"in e && e.axis === e.HORIZONTAL_AXIS && (t = i,
            i = 0),
            s = 10 * t,
            a = 10 * i,
            "deltaY"in e && (a = e.deltaY),
            "deltaX"in e && (s = e.deltaX),
            (s || a) && e.deltaMode && (1 === e.deltaMode ? (s *= 40,
            a *= 40) : (s *= 800,
            a *= 800)),
            s && !t && (t = s < 1 ? -1 : 1),
            a && !i && (i = a < 1 ? -1 : 1),
            {
                spinX: t,
                spinY: i,
                pixelX: s,
                pixelY: a
            }
        },
        handleMouseEnter: function() {
            this.mouseEntered = !0
        },
        handleMouseLeave: function() {
            this.mouseEntered = !1
        },
        handle: function(e) {
            var t = e
              , i = this
              , s = i.params.mousewheel;
            if (!i.mouseEntered && !s.releaseOnEdges)
                return !0;
            t.originalEvent && (t = t.originalEvent);
            var a = 0
              , n = i.rtlTranslate ? -1 : 1
              , o = D.normalize(t);
            if (s.forceToAxis)
                if (i.isHorizontal()) {
                    if (!(Math.abs(o.pixelX) > Math.abs(o.pixelY)))
                        return !0;
                    a = o.pixelX * n
                } else {
                    if (!(Math.abs(o.pixelY) > Math.abs(o.pixelX)))
                        return !0;
                    a = o.pixelY
                }
            else
                a = Math.abs(o.pixelX) > Math.abs(o.pixelY) ? -o.pixelX * n : -o.pixelY;
            if (0 === a)
                return !0;
            if (s.invert && (a = -a),
            i.params.freeMode) {
                i.params.loop && i.loopFix();
                var r = i.getTranslate() + a * s.sensitivity
                  , l = i.isBeginning
                  , d = i.isEnd;
                if (r >= i.minTranslate() && (r = i.minTranslate()),
                r <= i.maxTranslate() && (r = i.maxTranslate()),
                i.setTransition(0),
                i.setTranslate(r),
                i.updateProgress(),
                i.updateActiveIndex(),
                i.updateSlidesClasses(),
                (!l && i.isBeginning || !d && i.isEnd) && i.updateSlidesClasses(),
                i.params.freeModeSticky && (clearTimeout(i.mousewheel.timeout),
                i.mousewheel.timeout = ee.nextTick(function() {
                    i.slideToClosest()
                }, 300)),
                i.emit("scroll", t),
                i.params.autoplay && i.params.autoplayDisableOnInteraction && i.autoplay.stop(),
                r === i.minTranslate() || r === i.maxTranslate())
                    return !0
            } else {
                if (60 < ee.now() - i.mousewheel.lastScrollTime)
                    if (a < 0)
                        if (i.isEnd && !i.params.loop || i.animating) {
                            if (s.releaseOnEdges)
                                return !0
                        } else
                            i.slideNext(),
                            i.emit("scroll", t);
                    else if (i.isBeginning && !i.params.loop || i.animating) {
                        if (s.releaseOnEdges)
                            return !0
                    } else
                        i.slidePrev(),
                        i.emit("scroll", t);
                i.mousewheel.lastScrollTime = (new J.Date).getTime()
            }
            return t.preventDefault ? t.preventDefault() : t.returnValue = !1,
            !1
        },
        enable: function() {
            var e = this;
            if (!D.event)
                return !1;
            if (e.mousewheel.enabled)
                return !1;
            var t = e.$el;
            return "container" !== e.params.mousewheel.eventsTarged && (t = L(e.params.mousewheel.eventsTarged)),
            t.on("mouseenter", e.mousewheel.handleMouseEnter),
            t.on("mouseleave", e.mousewheel.handleMouseLeave),
            t.on(D.event, e.mousewheel.handle),
            e.mousewheel.enabled = !0
        },
        disable: function() {
            var e = this;
            if (!D.event)
                return !1;
            if (!e.mousewheel.enabled)
                return !1;
            var t = e.$el;
            return "container" !== e.params.mousewheel.eventsTarged && (t = L(e.params.mousewheel.eventsTarged)),
            t.off(D.event, e.mousewheel.handle),
            !(e.mousewheel.enabled = !1)
        }
    }
      , H = {
        update: function() {
            var e = this
              , t = e.params.navigation;
            if (!e.params.loop) {
                var i = e.navigation
                  , s = i.$nextEl
                  , a = i.$prevEl;
                a && 0 < a.length && (e.isBeginning ? a.addClass(t.disabledClass) : a.removeClass(t.disabledClass),
                a[e.params.watchOverflow && e.isLocked ? "addClass" : "removeClass"](t.lockClass)),
                s && 0 < s.length && (e.isEnd ? s.addClass(t.disabledClass) : s.removeClass(t.disabledClass),
                s[e.params.watchOverflow && e.isLocked ? "addClass" : "removeClass"](t.lockClass))
            }
        },
        onPrevClick: function(e) {
            e.preventDefault(),
            this.isBeginning && !this.params.loop || this.slidePrev()
        },
        onNextClick: function(e) {
            e.preventDefault(),
            this.isEnd && !this.params.loop || this.slideNext()
        },
        init: function() {
            var e, t, i = this, s = i.params.navigation;
            (s.nextEl || s.prevEl) && (s.nextEl && (e = L(s.nextEl),
            i.params.uniqueNavElements && "string" == typeof s.nextEl && 1 < e.length && 1 === i.$el.find(s.nextEl).length && (e = i.$el.find(s.nextEl))),
            s.prevEl && (t = L(s.prevEl),
            i.params.uniqueNavElements && "string" == typeof s.prevEl && 1 < t.length && 1 === i.$el.find(s.prevEl).length && (t = i.$el.find(s.prevEl))),
            e && 0 < e.length && e.on("click", i.navigation.onNextClick),
            t && 0 < t.length && t.on("click", i.navigation.onPrevClick),
            ee.extend(i.navigation, {
                $nextEl: e,
                nextEl: e && e[0],
                $prevEl: t,
                prevEl: t && t[0]
            }))
        },
        destroy: function() {
            var e = this
              , t = e.navigation
              , i = t.$nextEl
              , s = t.$prevEl;
            i && i.length && (i.off("click", e.navigation.onNextClick),
            i.removeClass(e.params.navigation.disabledClass)),
            s && s.length && (s.off("click", e.navigation.onPrevClick),
            s.removeClass(e.params.navigation.disabledClass))
        }
    }
      , F = {
        update: function() {
            var e = this
              , t = e.rtl
              , a = e.params.pagination;
            if (a.el && e.pagination.el && e.pagination.$el && 0 !== e.pagination.$el.length) {
                var n, i = e.virtual && e.params.virtual.enabled ? e.virtual.slides.length : e.slides.length, s = e.pagination.$el, o = e.params.loop ? Math.ceil((i - 2 * e.loopedSlides) / e.params.slidesPerGroup) : e.snapGrid.length;
                if (e.params.loop ? ((n = Math.ceil((e.activeIndex - e.loopedSlides) / e.params.slidesPerGroup)) > i - 1 - 2 * e.loopedSlides && (n -= i - 2 * e.loopedSlides),
                o - 1 < n && (n -= o),
                n < 0 && "bullets" !== e.params.paginationType && (n = o + n)) : n = void 0 !== e.snapIndex ? e.snapIndex : e.activeIndex || 0,
                "bullets" === a.type && e.pagination.bullets && 0 < e.pagination.bullets.length) {
                    var r, l, d, c = e.pagination.bullets;
                    if (a.dynamicBullets && (e.pagination.bulletSize = c.eq(0)[e.isHorizontal() ? "outerWidth" : "outerHeight"](!0),
                    s.css(e.isHorizontal() ? "width" : "height", e.pagination.bulletSize * (a.dynamicMainBullets + 4) + "px"),
                    1 < a.dynamicMainBullets && void 0 !== e.previousIndex && (e.pagination.dynamicBulletIndex += n - e.previousIndex,
                    e.pagination.dynamicBulletIndex > a.dynamicMainBullets - 1 ? e.pagination.dynamicBulletIndex = a.dynamicMainBullets - 1 : e.pagination.dynamicBulletIndex < 0 && (e.pagination.dynamicBulletIndex = 0)),
                    r = n - e.pagination.dynamicBulletIndex,
                    d = ((l = r + (Math.min(c.length, a.dynamicMainBullets) - 1)) + r) / 2),
                    c.removeClass(a.bulletActiveClass + " " + a.bulletActiveClass + "-next " + a.bulletActiveClass + "-next-next " + a.bulletActiveClass + "-prev " + a.bulletActiveClass + "-prev-prev " + a.bulletActiveClass + "-main"),
                    1 < s.length)
                        c.each(function(e, t) {
                            var i = L(t)
                              , s = i.index();
                            s === n && i.addClass(a.bulletActiveClass),
                            a.dynamicBullets && (r <= s && s <= l && i.addClass(a.bulletActiveClass + "-main"),
                            s === r && i.prev().addClass(a.bulletActiveClass + "-prev").prev().addClass(a.bulletActiveClass + "-prev-prev"),
                            s === l && i.next().addClass(a.bulletActiveClass + "-next").next().addClass(a.bulletActiveClass + "-next-next"))
                        });
                    else if (c.eq(n).addClass(a.bulletActiveClass),
                    a.dynamicBullets) {
                        for (var p = c.eq(r), u = c.eq(l), h = r; h <= l; h += 1)
                            c.eq(h).addClass(a.bulletActiveClass + "-main");
                        p.prev().addClass(a.bulletActiveClass + "-prev").prev().addClass(a.bulletActiveClass + "-prev-prev"),
                        u.next().addClass(a.bulletActiveClass + "-next").next().addClass(a.bulletActiveClass + "-next-next")
                    }
                    if (a.dynamicBullets) {
                        var f = Math.min(c.length, a.dynamicMainBullets + 4)
                          , v = (e.pagination.bulletSize * f - e.pagination.bulletSize) / 2 - d * e.pagination.bulletSize
                          , g = t ? "right" : "left";
                        c.css(e.isHorizontal() ? g : "top", v + "px")
                    }
                }
                if ("fraction" === a.type && (s.find("." + a.currentClass).text(a.formatFractionCurrent(n + 1)),
                s.find("." + a.totalClass).text(a.formatFractionTotal(o))),
                "progressbar" === a.type) {
                    var m;
                    m = a.progressbarOpposite ? e.isHorizontal() ? "vertical" : "horizontal" : e.isHorizontal() ? "horizontal" : "vertical";
                    var b = (n + 1) / o
                      , y = 1
                      , w = 1;
                    "horizontal" === m ? y = b : w = b,
                    s.find("." + a.progressbarFillClass).transform("translate3d(0,0,0) scaleX(" + y + ") scaleY(" + w + ")").transition(e.params.speed)
                }
                "custom" === a.type && a.renderCustom ? (s.html(a.renderCustom(e, n + 1, o)),
                e.emit("paginationRender", e, s[0])) : e.emit("paginationUpdate", e, s[0]),
                s[e.params.watchOverflow && e.isLocked ? "addClass" : "removeClass"](a.lockClass)
            }
        },
        render: function() {
            var e = this
              , t = e.params.pagination;
            if (t.el && e.pagination.el && e.pagination.$el && 0 !== e.pagination.$el.length) {
                var i = e.virtual && e.params.virtual.enabled ? e.virtual.slides.length : e.slides.length
                  , s = e.pagination.$el
                  , a = "";
                if ("bullets" === t.type) {
                    for (var n = e.params.loop ? Math.ceil((i - 2 * e.loopedSlides) / e.params.slidesPerGroup) : e.snapGrid.length, o = 0; o < n; o += 1)
                        t.renderBullet ? a += t.renderBullet.call(e, o, t.bulletClass) : a += "<" + t.bulletElement + ' class="' + t.bulletClass + '"></' + t.bulletElement + ">";
                    s.html(a),
                    e.pagination.bullets = s.find("." + t.bulletClass)
                }
                "fraction" === t.type && (a = t.renderFraction ? t.renderFraction.call(e, t.currentClass, t.totalClass) : '<span class="' + t.currentClass + '"></span> / <span class="' + t.totalClass + '"></span>',
                s.html(a)),
                "progressbar" === t.type && (a = t.renderProgressbar ? t.renderProgressbar.call(e, t.progressbarFillClass) : '<span class="' + t.progressbarFillClass + '"></span>',
                s.html(a)),
                "custom" !== t.type && e.emit("paginationRender", e.pagination.$el[0])
            }
        },
        init: function() {
            var i = this
              , e = i.params.pagination;
            if (e.el) {
                var t = L(e.el);
                0 !== t.length && (i.params.uniqueNavElements && "string" == typeof e.el && 1 < t.length && 1 === i.$el.find(e.el).length && (t = i.$el.find(e.el)),
                "bullets" === e.type && e.clickable && t.addClass(e.clickableClass),
                t.addClass(e.modifierClass + e.type),
                "bullets" === e.type && e.dynamicBullets && (t.addClass("" + e.modifierClass + e.type + "-dynamic"),
                i.pagination.dynamicBulletIndex = 0,
                e.dynamicMainBullets < 1 && (e.dynamicMainBullets = 1)),
                "progressbar" === e.type && e.progressbarOpposite && t.addClass(e.progressbarOppositeClass),
                e.clickable && t.on("click", "." + e.bulletClass, function(e) {
                    e.preventDefault();
                    var t = L(this).index() * i.params.slidesPerGroup;
                    i.params.loop && (t += i.loopedSlides),
                    i.slideTo(t)
                }),
                ee.extend(i.pagination, {
                    $el: t,
                    el: t[0]
                }))
            }
        },
        destroy: function() {
            var e = this
              , t = e.params.pagination;
            if (t.el && e.pagination.el && e.pagination.$el && 0 !== e.pagination.$el.length) {
                var i = e.pagination.$el;
                i.removeClass(t.hiddenClass),
                i.removeClass(t.modifierClass + t.type),
                e.pagination.bullets && e.pagination.bullets.removeClass(t.bulletActiveClass),
                t.clickable && i.off("click", "." + t.bulletClass)
            }
        }
    }
      , B = {
        setTranslate: function() {
            var e = this;
            if (e.params.scrollbar.el && e.scrollbar.el) {
                var t = e.scrollbar
                  , i = e.rtlTranslate
                  , s = e.progress
                  , a = t.dragSize
                  , n = t.trackSize
                  , o = t.$dragEl
                  , r = t.$el
                  , l = e.params.scrollbar
                  , d = a
                  , c = (n - a) * s;
                i ? 0 < (c = -c) ? (d = a - c,
                c = 0) : n < -c + a && (d = n + c) : c < 0 ? (d = a + c,
                c = 0) : n < c + a && (d = n - c),
                e.isHorizontal() ? (te.transforms3d ? o.transform("translate3d(" + c + "px, 0, 0)") : o.transform("translateX(" + c + "px)"),
                o[0].style.width = d + "px") : (te.transforms3d ? o.transform("translate3d(0px, " + c + "px, 0)") : o.transform("translateY(" + c + "px)"),
                o[0].style.height = d + "px"),
                l.hide && (clearTimeout(e.scrollbar.timeout),
                r[0].style.opacity = 1,
                e.scrollbar.timeout = setTimeout(function() {
                    r[0].style.opacity = 0,
                    r.transition(400)
                }, 1e3))
            }
        },
        setTransition: function(e) {
            this.params.scrollbar.el && this.scrollbar.el && this.scrollbar.$dragEl.transition(e)
        },
        updateSize: function() {
            var e = this;
            if (e.params.scrollbar.el && e.scrollbar.el) {
                var t = e.scrollbar
                  , i = t.$dragEl
                  , s = t.$el;
                i[0].style.width = "",
                i[0].style.height = "";
                var a, n = e.isHorizontal() ? s[0].offsetWidth : s[0].offsetHeight, o = e.size / e.virtualSize, r = o * (n / e.size);
                a = "auto" === e.params.scrollbar.dragSize ? n * o : parseInt(e.params.scrollbar.dragSize, 10),
                e.isHorizontal() ? i[0].style.width = a + "px" : i[0].style.height = a + "px",
                s[0].style.display = 1 <= o ? "none" : "",
                e.params.scrollbar.hide && (s[0].style.opacity = 0),
                ee.extend(t, {
                    trackSize: n,
                    divider: o,
                    moveDivider: r,
                    dragSize: a
                }),
                t.$el[e.params.watchOverflow && e.isLocked ? "addClass" : "removeClass"](e.params.scrollbar.lockClass)
            }
        },
        setDragPosition: function(e) {
            var t, i = this, s = i.scrollbar, a = i.rtlTranslate, n = s.$el, o = s.dragSize, r = s.trackSize;
            t = ((i.isHorizontal() ? "touchstart" === e.type || "touchmove" === e.type ? e.targetTouches[0].pageX : e.pageX || e.clientX : "touchstart" === e.type || "touchmove" === e.type ? e.targetTouches[0].pageY : e.pageY || e.clientY) - n.offset()[i.isHorizontal() ? "left" : "top"] - o / 2) / (r - o),
            t = Math.max(Math.min(t, 1), 0),
            a && (t = 1 - t);
            var l = i.minTranslate() + (i.maxTranslate() - i.minTranslate()) * t;
            i.updateProgress(l),
            i.setTranslate(l),
            i.updateActiveIndex(),
            i.updateSlidesClasses()
        },
        onDragStart: function(e) {
            var t = this
              , i = t.params.scrollbar
              , s = t.scrollbar
              , a = t.$wrapperEl
              , n = s.$el
              , o = s.$dragEl;
            t.scrollbar.isTouched = !0,
            e.preventDefault(),
            e.stopPropagation(),
            a.transition(100),
            o.transition(100),
            s.setDragPosition(e),
            clearTimeout(t.scrollbar.dragTimeout),
            n.transition(0),
            i.hide && n.css("opacity", 1),
            t.emit("scrollbarDragStart", e)
        },
        onDragMove: function(e) {
            var t = this.scrollbar
              , i = this.$wrapperEl
              , s = t.$el
              , a = t.$dragEl;
            this.scrollbar.isTouched && (e.preventDefault ? e.preventDefault() : e.returnValue = !1,
            t.setDragPosition(e),
            i.transition(0),
            s.transition(0),
            a.transition(0),
            this.emit("scrollbarDragMove", e))
        },
        onDragEnd: function(e) {
            var t = this
              , i = t.params.scrollbar
              , s = t.scrollbar.$el;
            t.scrollbar.isTouched && (t.scrollbar.isTouched = !1,
            i.hide && (clearTimeout(t.scrollbar.dragTimeout),
            t.scrollbar.dragTimeout = ee.nextTick(function() {
                s.css("opacity", 0),
                s.transition(400)
            }, 1e3)),
            t.emit("scrollbarDragEnd", e),
            i.snapOnRelease && t.slideToClosest())
        },
        enableDraggable: function() {
            var e = this;
            if (e.params.scrollbar.el) {
                var t = e.scrollbar
                  , i = e.touchEventsTouch
                  , s = e.touchEventsDesktop
                  , a = e.params
                  , n = t.$el[0]
                  , o = !(!te.passiveListener || !a.passiveListeners) && {
                    passive: !1,
                    capture: !1
                }
                  , r = !(!te.passiveListener || !a.passiveListeners) && {
                    passive: !0,
                    capture: !1
                };
                te.touch ? (n.addEventListener(i.start, e.scrollbar.onDragStart, o),
                n.addEventListener(i.move, e.scrollbar.onDragMove, o),
                n.addEventListener(i.end, e.scrollbar.onDragEnd, r)) : (n.addEventListener(s.start, e.scrollbar.onDragStart, o),
                v.addEventListener(s.move, e.scrollbar.onDragMove, o),
                v.addEventListener(s.end, e.scrollbar.onDragEnd, r))
            }
        },
        disableDraggable: function() {
            var e = this;
            if (e.params.scrollbar.el) {
                var t = e.scrollbar
                  , i = e.touchEventsTouch
                  , s = e.touchEventsDesktop
                  , a = e.params
                  , n = t.$el[0]
                  , o = !(!te.passiveListener || !a.passiveListeners) && {
                    passive: !1,
                    capture: !1
                }
                  , r = !(!te.passiveListener || !a.passiveListeners) && {
                    passive: !0,
                    capture: !1
                };
                te.touch ? (n.removeEventListener(i.start, e.scrollbar.onDragStart, o),
                n.removeEventListener(i.move, e.scrollbar.onDragMove, o),
                n.removeEventListener(i.end, e.scrollbar.onDragEnd, r)) : (n.removeEventListener(s.start, e.scrollbar.onDragStart, o),
                v.removeEventListener(s.move, e.scrollbar.onDragMove, o),
                v.removeEventListener(s.end, e.scrollbar.onDragEnd, r))
            }
        },
        init: function() {
            var e = this;
            if (e.params.scrollbar.el) {
                var t = e.scrollbar
                  , i = e.$el
                  , s = e.params.scrollbar
                  , a = L(s.el);
                e.params.uniqueNavElements && "string" == typeof s.el && 1 < a.length && 1 === i.find(s.el).length && (a = i.find(s.el));
                var n = a.find("." + e.params.scrollbar.dragClass);
                0 === n.length && (n = L('<div class="' + e.params.scrollbar.dragClass + '"></div>'),
                a.append(n)),
                ee.extend(t, {
                    $el: a,
                    el: a[0],
                    $dragEl: n,
                    dragEl: n[0]
                }),
                s.draggable && t.enableDraggable()
            }
        },
        destroy: function() {
            this.scrollbar.disableDraggable()
        }
    }
      , X = {
        setTransform: function(e, t) {
            var i = this.rtl
              , s = L(e)
              , a = i ? -1 : 1
              , n = s.attr("data-swiper-parallax") || "0"
              , o = s.attr("data-swiper-parallax-x")
              , r = s.attr("data-swiper-parallax-y")
              , l = s.attr("data-swiper-parallax-scale")
              , d = s.attr("data-swiper-parallax-opacity");
            if (o || r ? (o = o || "0",
            r = r || "0") : this.isHorizontal() ? (o = n,
            r = "0") : (r = n,
            o = "0"),
            o = 0 <= o.indexOf("%") ? parseInt(o, 10) * t * a + "%" : o * t * a + "px",
            r = 0 <= r.indexOf("%") ? parseInt(r, 10) * t + "%" : r * t + "px",
            null != d) {
                var c = d - (d - 1) * (1 - Math.abs(t));
                s[0].style.opacity = c
            }
            if (null == l)
                s.transform("translate3d(" + o + ", " + r + ", 0px)");
            else {
                var p = l - (l - 1) * (1 - Math.abs(t));
                s.transform("translate3d(" + o + ", " + r + ", 0px) scale(" + p + ")")
            }
        },
        setTranslate: function() {
            var s = this
              , e = s.$el
              , t = s.slides
              , a = s.progress
              , n = s.snapGrid;
            e.children("[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y]").each(function(e, t) {
                s.parallax.setTransform(t, a)
            }),
            t.each(function(e, t) {
                var i = t.progress;
                1 < s.params.slidesPerGroup && "auto" !== s.params.slidesPerView && (i += Math.ceil(e / 2) - a * (n.length - 1)),
                i = Math.min(Math.max(i, -1), 1),
                L(t).find("[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y]").each(function(e, t) {
                    s.parallax.setTransform(t, i)
                })
            })
        },
        setTransition: function(a) {
            void 0 === a && (a = this.params.speed);
            this.$el.find("[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y]").each(function(e, t) {
                var i = L(t)
                  , s = parseInt(i.attr("data-swiper-parallax-duration"), 10) || a;
                0 === a && (s = 0),
                i.transition(s)
            })
        }
    }
      , Y = {
        getDistanceBetweenTouches: function(e) {
            if (e.targetTouches.length < 2)
                return 1;
            var t = e.targetTouches[0].pageX
              , i = e.targetTouches[0].pageY
              , s = e.targetTouches[1].pageX
              , a = e.targetTouches[1].pageY;
            return Math.sqrt(Math.pow(s - t, 2) + Math.pow(a - i, 2))
        },
        onGestureStart: function(e) {
            var t = this
              , i = t.params.zoom
              , s = t.zoom
              , a = s.gesture;
            if (s.fakeGestureTouched = !1,
            s.fakeGestureMoved = !1,
            !te.gestures) {
                if ("touchstart" !== e.type || "touchstart" === e.type && e.targetTouches.length < 2)
                    return;
                s.fakeGestureTouched = !0,
                a.scaleStart = Y.getDistanceBetweenTouches(e)
            }
            a.$slideEl && a.$slideEl.length || (a.$slideEl = L(e.target).closest(".swiper-slide"),
            0 === a.$slideEl.length && (a.$slideEl = t.slides.eq(t.activeIndex)),
            a.$imageEl = a.$slideEl.find("img, svg, canvas"),
            a.$imageWrapEl = a.$imageEl.parent("." + i.containerClass),
            a.maxRatio = a.$imageWrapEl.attr("data-swiper-zoom") || i.maxRatio,
            0 !== a.$imageWrapEl.length) ? (a.$imageEl.transition(0),
            t.zoom.isScaling = !0) : a.$imageEl = void 0
        },
        onGestureChange: function(e) {
            var t = this.params.zoom
              , i = this.zoom
              , s = i.gesture;
            if (!te.gestures) {
                if ("touchmove" !== e.type || "touchmove" === e.type && e.targetTouches.length < 2)
                    return;
                i.fakeGestureMoved = !0,
                s.scaleMove = Y.getDistanceBetweenTouches(e)
            }
            s.$imageEl && 0 !== s.$imageEl.length && (te.gestures ? i.scale = e.scale * i.currentScale : i.scale = s.scaleMove / s.scaleStart * i.currentScale,
            i.scale > s.maxRatio && (i.scale = s.maxRatio - 1 + Math.pow(i.scale - s.maxRatio + 1, .5)),
            i.scale < t.minRatio && (i.scale = t.minRatio + 1 - Math.pow(t.minRatio - i.scale + 1, .5)),
            s.$imageEl.transform("translate3d(0,0,0) scale(" + i.scale + ")"))
        },
        onGestureEnd: function(e) {
            var t = this.params.zoom
              , i = this.zoom
              , s = i.gesture;
            if (!te.gestures) {
                if (!i.fakeGestureTouched || !i.fakeGestureMoved)
                    return;
                if ("touchend" !== e.type || "touchend" === e.type && e.changedTouches.length < 2 && !b.android)
                    return;
                i.fakeGestureTouched = !1,
                i.fakeGestureMoved = !1
            }
            s.$imageEl && 0 !== s.$imageEl.length && (i.scale = Math.max(Math.min(i.scale, s.maxRatio), t.minRatio),
            s.$imageEl.transition(this.params.speed).transform("translate3d(0,0,0) scale(" + i.scale + ")"),
            i.currentScale = i.scale,
            i.isScaling = !1,
            1 === i.scale && (s.$slideEl = void 0))
        },
        onTouchStart: function(e) {
            var t = this.zoom
              , i = t.gesture
              , s = t.image;
            i.$imageEl && 0 !== i.$imageEl.length && (s.isTouched || (b.android && e.preventDefault(),
            s.isTouched = !0,
            s.touchesStart.x = "touchstart" === e.type ? e.targetTouches[0].pageX : e.pageX,
            s.touchesStart.y = "touchstart" === e.type ? e.targetTouches[0].pageY : e.pageY))
        },
        onTouchMove: function(e) {
            var t = this
              , i = t.zoom
              , s = i.gesture
              , a = i.image
              , n = i.velocity;
            if (s.$imageEl && 0 !== s.$imageEl.length && (t.allowClick = !1,
            a.isTouched && s.$slideEl)) {
                a.isMoved || (a.width = s.$imageEl[0].offsetWidth,
                a.height = s.$imageEl[0].offsetHeight,
                a.startX = ee.getTranslate(s.$imageWrapEl[0], "x") || 0,
                a.startY = ee.getTranslate(s.$imageWrapEl[0], "y") || 0,
                s.slideWidth = s.$slideEl[0].offsetWidth,
                s.slideHeight = s.$slideEl[0].offsetHeight,
                s.$imageWrapEl.transition(0),
                t.rtl && (a.startX = -a.startX,
                a.startY = -a.startY));
                var o = a.width * i.scale
                  , r = a.height * i.scale;
                if (!(o < s.slideWidth && r < s.slideHeight)) {
                    if (a.minX = Math.min(s.slideWidth / 2 - o / 2, 0),
                    a.maxX = -a.minX,
                    a.minY = Math.min(s.slideHeight / 2 - r / 2, 0),
                    a.maxY = -a.minY,
                    a.touchesCurrent.x = "touchmove" === e.type ? e.targetTouches[0].pageX : e.pageX,
                    a.touchesCurrent.y = "touchmove" === e.type ? e.targetTouches[0].pageY : e.pageY,
                    !a.isMoved && !i.isScaling) {
                        if (t.isHorizontal() && (Math.floor(a.minX) === Math.floor(a.startX) && a.touchesCurrent.x < a.touchesStart.x || Math.floor(a.maxX) === Math.floor(a.startX) && a.touchesCurrent.x > a.touchesStart.x))
                            return void (a.isTouched = !1);
                        if (!t.isHorizontal() && (Math.floor(a.minY) === Math.floor(a.startY) && a.touchesCurrent.y < a.touchesStart.y || Math.floor(a.maxY) === Math.floor(a.startY) && a.touchesCurrent.y > a.touchesStart.y))
                            return void (a.isTouched = !1)
                    }
                    e.preventDefault(),
                    e.stopPropagation(),
                    a.isMoved = !0,
                    a.currentX = a.touchesCurrent.x - a.touchesStart.x + a.startX,
                    a.currentY = a.touchesCurrent.y - a.touchesStart.y + a.startY,
                    a.currentX < a.minX && (a.currentX = a.minX + 1 - Math.pow(a.minX - a.currentX + 1, .8)),
                    a.currentX > a.maxX && (a.currentX = a.maxX - 1 + Math.pow(a.currentX - a.maxX + 1, .8)),
                    a.currentY < a.minY && (a.currentY = a.minY + 1 - Math.pow(a.minY - a.currentY + 1, .8)),
                    a.currentY > a.maxY && (a.currentY = a.maxY - 1 + Math.pow(a.currentY - a.maxY + 1, .8)),
                    n.prevPositionX || (n.prevPositionX = a.touchesCurrent.x),
                    n.prevPositionY || (n.prevPositionY = a.touchesCurrent.y),
                    n.prevTime || (n.prevTime = Date.now()),
                    n.x = (a.touchesCurrent.x - n.prevPositionX) / (Date.now() - n.prevTime) / 2,
                    n.y = (a.touchesCurrent.y - n.prevPositionY) / (Date.now() - n.prevTime) / 2,
                    Math.abs(a.touchesCurrent.x - n.prevPositionX) < 2 && (n.x = 0),
                    Math.abs(a.touchesCurrent.y - n.prevPositionY) < 2 && (n.y = 0),
                    n.prevPositionX = a.touchesCurrent.x,
                    n.prevPositionY = a.touchesCurrent.y,
                    n.prevTime = Date.now(),
                    s.$imageWrapEl.transform("translate3d(" + a.currentX + "px, " + a.currentY + "px,0)")
                }
            }
        },
        onTouchEnd: function() {
            var e = this.zoom
              , t = e.gesture
              , i = e.image
              , s = e.velocity;
            if (t.$imageEl && 0 !== t.$imageEl.length) {
                if (!i.isTouched || !i.isMoved)
                    return i.isTouched = !1,
                    void (i.isMoved = !1);
                i.isTouched = !1,
                i.isMoved = !1;
                var a = 300
                  , n = 300
                  , o = s.x * a
                  , r = i.currentX + o
                  , l = s.y * n
                  , d = i.currentY + l;
                0 !== s.x && (a = Math.abs((r - i.currentX) / s.x)),
                0 !== s.y && (n = Math.abs((d - i.currentY) / s.y));
                var c = Math.max(a, n);
                i.currentX = r,
                i.currentY = d;
                var p = i.width * e.scale
                  , u = i.height * e.scale;
                i.minX = Math.min(t.slideWidth / 2 - p / 2, 0),
                i.maxX = -i.minX,
                i.minY = Math.min(t.slideHeight / 2 - u / 2, 0),
                i.maxY = -i.minY,
                i.currentX = Math.max(Math.min(i.currentX, i.maxX), i.minX),
                i.currentY = Math.max(Math.min(i.currentY, i.maxY), i.minY),
                t.$imageWrapEl.transition(c).transform("translate3d(" + i.currentX + "px, " + i.currentY + "px,0)")
            }
        },
        onTransitionEnd: function() {
            var e = this.zoom
              , t = e.gesture;
            t.$slideEl && this.previousIndex !== this.activeIndex && (t.$imageEl.transform("translate3d(0,0,0) scale(1)"),
            t.$imageWrapEl.transform("translate3d(0,0,0)"),
            e.scale = 1,
            e.currentScale = 1,
            t.$slideEl = void 0,
            t.$imageEl = void 0,
            t.$imageWrapEl = void 0)
        },
        toggle: function(e) {
            var t = this.zoom;
            t.scale && 1 !== t.scale ? t.out() : t.in(e)
        },
        in: function(e) {
            var t, i, s, a, n, o, r, l, d, c, p, u, h, f, v, g, m = this, b = m.zoom, y = m.params.zoom, w = b.gesture, x = b.image;
            (w.$slideEl || (w.$slideEl = m.clickedSlide ? L(m.clickedSlide) : m.slides.eq(m.activeIndex),
            w.$imageEl = w.$slideEl.find("img, svg, canvas"),
            w.$imageWrapEl = w.$imageEl.parent("." + y.containerClass)),
            w.$imageEl && 0 !== w.$imageEl.length) && (w.$slideEl.addClass("" + y.zoomedSlideClass),
            void 0 === x.touchesStart.x && e ? (t = "touchend" === e.type ? e.changedTouches[0].pageX : e.pageX,
            i = "touchend" === e.type ? e.changedTouches[0].pageY : e.pageY) : (t = x.touchesStart.x,
            i = x.touchesStart.y),
            b.scale = w.$imageWrapEl.attr("data-swiper-zoom") || y.maxRatio,
            b.currentScale = w.$imageWrapEl.attr("data-swiper-zoom") || y.maxRatio,
            e ? (v = w.$slideEl[0].offsetWidth,
            g = w.$slideEl[0].offsetHeight,
            s = w.$slideEl.offset().left + v / 2 - t,
            a = w.$slideEl.offset().top + g / 2 - i,
            r = w.$imageEl[0].offsetWidth,
            l = w.$imageEl[0].offsetHeight,
            d = r * b.scale,
            c = l * b.scale,
            h = -(p = Math.min(v / 2 - d / 2, 0)),
            f = -(u = Math.min(g / 2 - c / 2, 0)),
            (n = s * b.scale) < p && (n = p),
            h < n && (n = h),
            (o = a * b.scale) < u && (o = u),
            f < o && (o = f)) : o = n = 0,
            w.$imageWrapEl.transition(300).transform("translate3d(" + n + "px, " + o + "px,0)"),
            w.$imageEl.transition(300).transform("translate3d(0,0,0) scale(" + b.scale + ")"))
        },
        out: function() {
            var e = this
              , t = e.zoom
              , i = e.params.zoom
              , s = t.gesture;
            s.$slideEl || (s.$slideEl = e.clickedSlide ? L(e.clickedSlide) : e.slides.eq(e.activeIndex),
            s.$imageEl = s.$slideEl.find("img, svg, canvas"),
            s.$imageWrapEl = s.$imageEl.parent("." + i.containerClass)),
            s.$imageEl && 0 !== s.$imageEl.length && (t.scale = 1,
            t.currentScale = 1,
            s.$imageWrapEl.transition(300).transform("translate3d(0,0,0)"),
            s.$imageEl.transition(300).transform("translate3d(0,0,0) scale(1)"),
            s.$slideEl.removeClass("" + i.zoomedSlideClass),
            s.$slideEl = void 0)
        },
        enable: function() {
            var e = this
              , t = e.zoom;
            if (!t.enabled) {
                t.enabled = !0;
                var i = !("touchstart" !== e.touchEvents.start || !te.passiveListener || !e.params.passiveListeners) && {
                    passive: !0,
                    capture: !1
                };
                te.gestures ? (e.$wrapperEl.on("gesturestart", ".swiper-slide", t.onGestureStart, i),
                e.$wrapperEl.on("gesturechange", ".swiper-slide", t.onGestureChange, i),
                e.$wrapperEl.on("gestureend", ".swiper-slide", t.onGestureEnd, i)) : "touchstart" === e.touchEvents.start && (e.$wrapperEl.on(e.touchEvents.start, ".swiper-slide", t.onGestureStart, i),
                e.$wrapperEl.on(e.touchEvents.move, ".swiper-slide", t.onGestureChange, i),
                e.$wrapperEl.on(e.touchEvents.end, ".swiper-slide", t.onGestureEnd, i)),
                e.$wrapperEl.on(e.touchEvents.move, "." + e.params.zoom.containerClass, t.onTouchMove)
            }
        },
        disable: function() {
            var e = this
              , t = e.zoom;
            if (t.enabled) {
                e.zoom.enabled = !1;
                var i = !("touchstart" !== e.touchEvents.start || !te.passiveListener || !e.params.passiveListeners) && {
                    passive: !0,
                    capture: !1
                };
                te.gestures ? (e.$wrapperEl.off("gesturestart", ".swiper-slide", t.onGestureStart, i),
                e.$wrapperEl.off("gesturechange", ".swiper-slide", t.onGestureChange, i),
                e.$wrapperEl.off("gestureend", ".swiper-slide", t.onGestureEnd, i)) : "touchstart" === e.touchEvents.start && (e.$wrapperEl.off(e.touchEvents.start, ".swiper-slide", t.onGestureStart, i),
                e.$wrapperEl.off(e.touchEvents.move, ".swiper-slide", t.onGestureChange, i),
                e.$wrapperEl.off(e.touchEvents.end, ".swiper-slide", t.onGestureEnd, i)),
                e.$wrapperEl.off(e.touchEvents.move, "." + e.params.zoom.containerClass, t.onTouchMove)
            }
        }
    }
      , N = {
        loadInSlide: function(e, l) {
            void 0 === l && (l = !0);
            var d = this
              , c = d.params.lazy;
            if (void 0 !== e && 0 !== d.slides.length) {
                var p = d.virtual && d.params.virtual.enabled ? d.$wrapperEl.children("." + d.params.slideClass + '[data-swiper-slide-index="' + e + '"]') : d.slides.eq(e)
                  , t = p.find("." + c.elementClass + ":not(." + c.loadedClass + "):not(." + c.loadingClass + ")");
                !p.hasClass(c.elementClass) || p.hasClass(c.loadedClass) || p.hasClass(c.loadingClass) || (t = t.add(p[0])),
                0 !== t.length && t.each(function(e, t) {
                    var s = L(t);
                    s.addClass(c.loadingClass);
                    var a = s.attr("data-background")
                      , n = s.attr("data-src")
                      , o = s.attr("data-srcset")
                      , r = s.attr("data-sizes");
                    d.loadImage(s[0], n || a, o, r, !1, function() {
                        if (null != d && d && (!d || d.params) && !d.destroyed) {
                            if (a ? (s.css("background-image", 'url("' + a + '")'),
                            s.removeAttr("data-background")) : (o && (s.attr("srcset", o),
                            s.removeAttr("data-srcset")),
                            r && (s.attr("sizes", r),
                            s.removeAttr("data-sizes")),
                            n && (s.attr("src", n),
                            s.removeAttr("data-src"))),
                            s.addClass(c.loadedClass).removeClass(c.loadingClass),
                            p.find("." + c.preloaderClass).remove(),
                            d.params.loop && l) {
                                var e = p.attr("data-swiper-slide-index");
                                if (p.hasClass(d.params.slideDuplicateClass)) {
                                    var t = d.$wrapperEl.children('[data-swiper-slide-index="' + e + '"]:not(.' + d.params.slideDuplicateClass + ")");
                                    d.lazy.loadInSlide(t.index(), !1)
                                } else {
                                    var i = d.$wrapperEl.children("." + d.params.slideDuplicateClass + '[data-swiper-slide-index="' + e + '"]');
                                    d.lazy.loadInSlide(i.index(), !1)
                                }
                            }
                            d.emit("lazyImageReady", p[0], s[0])
                        }
                    }),
                    d.emit("lazyImageLoad", p[0], s[0])
                })
            }
        },
        load: function() {
            function e(e) {
                if (r) {
                    if (i.children("." + a.slideClass + '[data-swiper-slide-index="' + e + '"]').length)
                        return !0
                } else if (n[e])
                    return !0;
                return !1
            }
            function t(e) {
                return r ? L(e).attr("data-swiper-slide-index") : L(e).index()
            }
            var s = this
              , i = s.$wrapperEl
              , a = s.params
              , n = s.slides
              , o = s.activeIndex
              , r = s.virtual && a.virtual.enabled
              , l = a.lazy
              , d = a.slidesPerView;
            if ("auto" === d && (d = 0),
            s.lazy.initialImageLoaded || (s.lazy.initialImageLoaded = !0),
            s.params.watchSlidesVisibility)
                i.children("." + a.slideVisibleClass).each(function(e, t) {
                    var i = r ? L(t).attr("data-swiper-slide-index") : L(t).index();
                    s.lazy.loadInSlide(i)
                });
            else if (1 < d)
                for (var c = o; c < o + d; c += 1)
                    e(c) && s.lazy.loadInSlide(c);
            else
                s.lazy.loadInSlide(o);
            if (l.loadPrevNext)
                if (1 < d || l.loadPrevNextAmount && 1 < l.loadPrevNextAmount) {
                    for (var p = l.loadPrevNextAmount, u = d, h = Math.min(o + u + Math.max(p, u), n.length), f = Math.max(o - Math.max(u, p), 0), v = o + d; v < h; v += 1)
                        e(v) && s.lazy.loadInSlide(v);
                    for (var g = f; g < o; g += 1)
                        e(g) && s.lazy.loadInSlide(g)
                } else {
                    var m = i.children("." + a.slideNextClass);
                    0 < m.length && s.lazy.loadInSlide(t(m));
                    var b = i.children("." + a.slidePrevClass);
                    0 < b.length && s.lazy.loadInSlide(t(b))
                }
        }
    }
      , R = {
        LinearSpline: function(e, t) {
            var i, s, a, n, o, r = function(e, t) {
                for (s = -1,
                i = e.length; 1 < i - s; )
                    e[a = i + s >> 1] <= t ? s = a : i = a;
                return i
            };
            return this.x = e,
            this.y = t,
            this.lastIndex = e.length - 1,
            this.interpolate = function(e) {
                return e ? (o = r(this.x, e),
                n = o - 1,
                (e - this.x[n]) * (this.y[o] - this.y[n]) / (this.x[o] - this.x[n]) + this.y[n]) : 0
            }
            ,
            this
        },
        getInterpolateFunction: function(e) {
            var t = this;
            t.controller.spline || (t.controller.spline = t.params.loop ? new R.LinearSpline(t.slidesGrid,e.slidesGrid) : new R.LinearSpline(t.snapGrid,e.snapGrid))
        },
        setTranslate: function(e, t) {
            function i(e) {
                var t = n.rtlTranslate ? -n.translate : n.translate;
                "slide" === n.params.controller.by && (n.controller.getInterpolateFunction(e),
                a = -n.controller.spline.interpolate(-t)),
                a && "container" !== n.params.controller.by || (s = (e.maxTranslate() - e.minTranslate()) / (n.maxTranslate() - n.minTranslate()),
                a = (t - n.minTranslate()) * s + e.minTranslate()),
                n.params.controller.inverse && (a = e.maxTranslate() - a),
                e.updateProgress(a),
                e.setTranslate(a, n),
                e.updateActiveIndex(),
                e.updateSlidesClasses()
            }
            var s, a, n = this, o = n.controller.control;
            if (Array.isArray(o))
                for (var r = 0; r < o.length; r += 1)
                    o[r] !== t && o[r]instanceof T && i(o[r]);
            else
                o instanceof T && t !== o && i(o)
        },
        setTransition: function(t, e) {
            function i(e) {
                e.setTransition(t, a),
                0 !== t && (e.transitionStart(),
                e.params.autoHeight && ee.nextTick(function() {
                    e.updateAutoHeight()
                }),
                e.$wrapperEl.transitionEnd(function() {
                    n && (e.params.loop && "slide" === a.params.controller.by && e.loopFix(),
                    e.transitionEnd())
                }))
            }
            var s, a = this, n = a.controller.control;
            if (Array.isArray(n))
                for (s = 0; s < n.length; s += 1)
                    n[s] !== e && n[s]instanceof T && i(n[s]);
            else
                n instanceof T && e !== n && i(n)
        }
    }
      , j = {
        makeElFocusable: function(e) {
            return e.attr("tabIndex", "0"),
            e
        },
        addElRole: function(e, t) {
            return e.attr("role", t),
            e
        },
        addElLabel: function(e, t) {
            return e.attr("aria-label", t),
            e
        },
        disableEl: function(e) {
            return e.attr("aria-disabled", !0),
            e
        },
        enableEl: function(e) {
            return e.attr("aria-disabled", !1),
            e
        },
        onEnterKey: function(e) {
            var t = this
              , i = t.params.a11y;
            if (13 === e.keyCode) {
                var s = L(e.target);
                t.navigation && t.navigation.$nextEl && s.is(t.navigation.$nextEl) && (t.isEnd && !t.params.loop || t.slideNext(),
                t.isEnd ? t.a11y.notify(i.lastSlideMessage) : t.a11y.notify(i.nextSlideMessage)),
                t.navigation && t.navigation.$prevEl && s.is(t.navigation.$prevEl) && (t.isBeginning && !t.params.loop || t.slidePrev(),
                t.isBeginning ? t.a11y.notify(i.firstSlideMessage) : t.a11y.notify(i.prevSlideMessage)),
                t.pagination && s.is("." + t.params.pagination.bulletClass) && s[0].click()
            }
        },
        notify: function(e) {
            var t = this.a11y.liveRegion;
            0 !== t.length && (t.html(""),
            t.html(e))
        },
        updateNavigation: function() {
            var e = this;
            if (!e.params.loop) {
                var t = e.navigation
                  , i = t.$nextEl
                  , s = t.$prevEl;
                s && 0 < s.length && (e.isBeginning ? e.a11y.disableEl(s) : e.a11y.enableEl(s)),
                i && 0 < i.length && (e.isEnd ? e.a11y.disableEl(i) : e.a11y.enableEl(i))
            }
        },
        updatePagination: function() {
            var s = this
              , a = s.params.a11y;
            s.pagination && s.params.pagination.clickable && s.pagination.bullets && s.pagination.bullets.length && s.pagination.bullets.each(function(e, t) {
                var i = L(t);
                s.a11y.makeElFocusable(i),
                s.a11y.addElRole(i, "button"),
                s.a11y.addElLabel(i, a.paginationBulletMessage.replace(/{{index}}/, i.index() + 1))
            })
        },
        init: function() {
            var e = this;
            e.$el.append(e.a11y.liveRegion);
            var t, i, s = e.params.a11y;
            e.navigation && e.navigation.$nextEl && (t = e.navigation.$nextEl),
            e.navigation && e.navigation.$prevEl && (i = e.navigation.$prevEl),
            t && (e.a11y.makeElFocusable(t),
            e.a11y.addElRole(t, "button"),
            e.a11y.addElLabel(t, s.nextSlideMessage),
            t.on("keydown", e.a11y.onEnterKey)),
            i && (e.a11y.makeElFocusable(i),
            e.a11y.addElRole(i, "button"),
            e.a11y.addElLabel(i, s.prevSlideMessage),
            i.on("keydown", e.a11y.onEnterKey)),
            e.pagination && e.params.pagination.clickable && e.pagination.bullets && e.pagination.bullets.length && e.pagination.$el.on("keydown", "." + e.params.pagination.bulletClass, e.a11y.onEnterKey)
        },
        destroy: function() {
            var e, t, i = this;
            i.a11y.liveRegion && 0 < i.a11y.liveRegion.length && i.a11y.liveRegion.remove(),
            i.navigation && i.navigation.$nextEl && (e = i.navigation.$nextEl),
            i.navigation && i.navigation.$prevEl && (t = i.navigation.$prevEl),
            e && e.off("keydown", i.a11y.onEnterKey),
            t && t.off("keydown", i.a11y.onEnterKey),
            i.pagination && i.params.pagination.clickable && i.pagination.bullets && i.pagination.bullets.length && i.pagination.$el.off("keydown", "." + i.params.pagination.bulletClass, i.a11y.onEnterKey)
        }
    }
      , q = {
        init: function() {
            var e = this;
            if (e.params.history) {
                if (!J.history || !J.history.pushState)
                    return e.params.history.enabled = !1,
                    void (e.params.hashNavigation.enabled = !0);
                var t = e.history;
                t.initialized = !0,
                t.paths = q.getPathValues(),
                (t.paths.key || t.paths.value) && (t.scrollToSlide(0, t.paths.value, e.params.runCallbacksOnInit),
                e.params.history.replaceState || J.addEventListener("popstate", e.history.setHistoryPopState))
            }
        },
        destroy: function() {
            this.params.history.replaceState || J.removeEventListener("popstate", this.history.setHistoryPopState)
        },
        setHistoryPopState: function() {
            this.history.paths = q.getPathValues(),
            this.history.scrollToSlide(this.params.speed, this.history.paths.value, !1)
        },
        getPathValues: function() {
            var e = J.location.pathname.slice(1).split("/").filter(function(e) {
                return "" !== e
            })
              , t = e.length;
            return {
                key: e[t - 2],
                value: e[t - 1]
            }
        },
        setHistory: function(e, t) {
            if (this.history.initialized && this.params.history.enabled) {
                var i = this.slides.eq(t)
                  , s = q.slugify(i.attr("data-history"));
                J.location.pathname.includes(e) || (s = e + "/" + s);
                var a = J.history.state;
                a && a.value === s || (this.params.history.replaceState ? J.history.replaceState({
                    value: s
                }, null, s) : J.history.pushState({
                    value: s
                }, null, s))
            }
        },
        slugify: function(e) {
            return e.toString().replace(/\s+/g, "-").replace(/[^\w-]+/g, "").replace(/--+/g, "-").replace(/^-+/, "").replace(/-+$/, "")
        },
        scrollToSlide: function(e, t, i) {
            var s = this;
            if (t)
                for (var a = 0, n = s.slides.length; a < n; a += 1) {
                    var o = s.slides.eq(a);
                    if (q.slugify(o.attr("data-history")) === t && !o.hasClass(s.params.slideDuplicateClass)) {
                        var r = o.index();
                        s.slideTo(r, e, i)
                    }
                }
            else
                s.slideTo(0, e, i)
        }
    }
      , V = {
        onHashCange: function() {
            var e = this
              , t = v.location.hash.replace("#", "");
            if (t !== e.slides.eq(e.activeIndex).attr("data-hash")) {
                var i = e.$wrapperEl.children("." + e.params.slideClass + '[data-hash="' + t + '"]').index();
                if (void 0 === i)
                    return;
                e.slideTo(i)
            }
        },
        setHash: function() {
            var e = this;
            if (e.hashNavigation.initialized && e.params.hashNavigation.enabled)
                if (e.params.hashNavigation.replaceState && J.history && J.history.replaceState)
                    J.history.replaceState(null, null, "#" + e.slides.eq(e.activeIndex).attr("data-hash") || "");
                else {
                    var t = e.slides.eq(e.activeIndex)
                      , i = t.attr("data-hash") || t.attr("data-history");
                    v.location.hash = i || ""
                }
        },
        init: function() {
            var e = this;
            if (!(!e.params.hashNavigation.enabled || e.params.history && e.params.history.enabled)) {
                e.hashNavigation.initialized = !0;
                var t = v.location.hash.replace("#", "");
                if (t)
                    for (var i = 0, s = e.slides.length; i < s; i += 1) {
                        var a = e.slides.eq(i);
                        if ((a.attr("data-hash") || a.attr("data-history")) === t && !a.hasClass(e.params.slideDuplicateClass)) {
                            var n = a.index();
                            e.slideTo(n, 0, e.params.runCallbacksOnInit, !0)
                        }
                    }
                e.params.hashNavigation.watchState && L(J).on("hashchange", e.hashNavigation.onHashCange)
            }
        },
        destroy: function() {
            this.params.hashNavigation.watchState && L(J).off("hashchange", this.hashNavigation.onHashCange)
        }
    }
      , W = {
        run: function() {
            var e = this
              , t = e.slides.eq(e.activeIndex)
              , i = e.params.autoplay.delay;
            t.attr("data-swiper-autoplay") && (i = t.attr("data-swiper-autoplay") || e.params.autoplay.delay),
            e.autoplay.timeout = ee.nextTick(function() {
                e.params.autoplay.reverseDirection ? e.params.loop ? (e.loopFix(),
                e.slidePrev(e.params.speed, !0, !0),
                e.emit("autoplay")) : e.isBeginning ? e.params.autoplay.stopOnLastSlide ? e.autoplay.stop() : (e.slideTo(e.slides.length - 1, e.params.speed, !0, !0),
                e.emit("autoplay")) : (e.slidePrev(e.params.speed, !0, !0),
                e.emit("autoplay")) : e.params.loop ? (e.loopFix(),
                e.slideNext(e.params.speed, !0, !0),
                e.emit("autoplay")) : e.isEnd ? e.params.autoplay.stopOnLastSlide ? e.autoplay.stop() : (e.slideTo(0, e.params.speed, !0, !0),
                e.emit("autoplay")) : (e.slideNext(e.params.speed, !0, !0),
                e.emit("autoplay"))
            }, i)
        },
        start: function() {
            var e = this;
            return void 0 === e.autoplay.timeout && (!e.autoplay.running && (e.autoplay.running = !0,
            e.emit("autoplayStart"),
            e.autoplay.run(),
            !0))
        },
        stop: function() {
            var e = this;
            return !!e.autoplay.running && (void 0 !== e.autoplay.timeout && (e.autoplay.timeout && (clearTimeout(e.autoplay.timeout),
            e.autoplay.timeout = void 0),
            e.autoplay.running = !1,
            e.emit("autoplayStop"),
            !0))
        },
        pause: function(e) {
            var t = this;
            t.autoplay.running && (t.autoplay.paused || (t.autoplay.timeout && clearTimeout(t.autoplay.timeout),
            t.autoplay.paused = !0,
            0 !== e && t.params.autoplay.waitForTransition ? (t.$wrapperEl[0].addEventListener("transitionend", t.autoplay.onTransitionEnd),
            t.$wrapperEl[0].addEventListener("webkitTransitionEnd", t.autoplay.onTransitionEnd)) : (t.autoplay.paused = !1,
            t.autoplay.run())))
        }
    }
      , G = {
        setTranslate: function() {
            for (var e = this, t = e.slides, i = 0; i < t.length; i += 1) {
                var s = e.slides.eq(i)
                  , a = -s[0].swiperSlideOffset;
                e.params.virtualTranslate || (a -= e.translate);
                var n = 0;
                e.isHorizontal() || (n = a,
                a = 0);
                var o = e.params.fadeEffect.crossFade ? Math.max(1 - Math.abs(s[0].progress), 0) : 1 + Math.min(Math.max(s[0].progress, -1), 0);
                s.css({
                    opacity: o
                }).transform("translate3d(" + a + "px, " + n + "px, 0px)")
            }
        },
        setTransition: function(e) {
            var i = this
              , t = i.slides
              , s = i.$wrapperEl;
            if (t.transition(e),
            i.params.virtualTranslate && 0 !== e) {
                var a = !1;
                t.transitionEnd(function() {
                    if (!a && i && !i.destroyed) {
                        a = !0,
                        i.animating = !1;
                        for (var e = ["webkitTransitionEnd", "transitionend"], t = 0; t < e.length; t += 1)
                            s.trigger(e[t])
                    }
                })
            }
        }
    }
      , _ = {
        setTranslate: function() {
            var e, t = this, i = t.$el, s = t.$wrapperEl, a = t.slides, n = t.width, o = t.height, r = t.rtlTranslate, l = t.size, d = t.params.cubeEffect, c = t.isHorizontal(), p = t.virtual && t.params.virtual.enabled, u = 0;
            d.shadow && (c ? (0 === (e = s.find(".swiper-cube-shadow")).length && (e = L('<div class="swiper-cube-shadow"></div>'),
            s.append(e)),
            e.css({
                height: n + "px"
            })) : 0 === (e = i.find(".swiper-cube-shadow")).length && (e = L('<div class="swiper-cube-shadow"></div>'),
            i.append(e)));
            for (var h = 0; h < a.length; h += 1) {
                var f = a.eq(h)
                  , v = h;
                p && (v = parseInt(f.attr("data-swiper-slide-index"), 10));
                var g = 90 * v
                  , m = Math.floor(g / 360);
                r && (g = -g,
                m = Math.floor(-g / 360));
                var b = Math.max(Math.min(f[0].progress, 1), -1)
                  , y = 0
                  , w = 0
                  , x = 0;
                v % 4 == 0 ? (y = 4 * -m * l,
                x = 0) : (v - 1) % 4 == 0 ? (y = 0,
                x = 4 * -m * l) : (v - 2) % 4 == 0 ? (y = l + 4 * m * l,
                x = l) : (v - 3) % 4 == 0 && (y = -l,
                x = 3 * l + 4 * l * m),
                r && (y = -y),
                c || (w = y,
                y = 0);
                var T = "rotateX(" + (c ? 0 : -g) + "deg) rotateY(" + (c ? g : 0) + "deg) translate3d(" + y + "px, " + w + "px, " + x + "px)";
                if (b <= 1 && -1 < b && (u = 90 * v + 90 * b,
                r && (u = 90 * -v - 90 * b)),
                f.transform(T),
                d.slideShadows) {
                    var S = c ? f.find(".swiper-slide-shadow-left") : f.find(".swiper-slide-shadow-top")
                      , C = c ? f.find(".swiper-slide-shadow-right") : f.find(".swiper-slide-shadow-bottom");
                    0 === S.length && (S = L('<div class="swiper-slide-shadow-' + (c ? "left" : "top") + '"></div>'),
                    f.append(S)),
                    0 === C.length && (C = L('<div class="swiper-slide-shadow-' + (c ? "right" : "bottom") + '"></div>'),
                    f.append(C)),
                    S.length && (S[0].style.opacity = Math.max(-b, 0)),
                    C.length && (C[0].style.opacity = Math.max(b, 0))
                }
            }
            if (s.css({
                "-webkit-transform-origin": "50% 50% -" + l / 2 + "px",
                "-moz-transform-origin": "50% 50% -" + l / 2 + "px",
                "-ms-transform-origin": "50% 50% -" + l / 2 + "px",
                "transform-origin": "50% 50% -" + l / 2 + "px"
            }),
            d.shadow)
                if (c)
                    e.transform("translate3d(0px, " + (n / 2 + d.shadowOffset) + "px, " + -n / 2 + "px) rotateX(90deg) rotateZ(0deg) scale(" + d.shadowScale + ")");
                else {
                    var $ = Math.abs(u) - 90 * Math.floor(Math.abs(u) / 90)
                      , E = 1.5 - (Math.sin(2 * $ * Math.PI / 360) / 2 + Math.cos(2 * $ * Math.PI / 360) / 2)
                      , k = d.shadowScale
                      , P = d.shadowScale / E
                      , M = d.shadowOffset;
                    e.transform("scale3d(" + k + ", 1, " + P + ") translate3d(0px, " + (o / 2 + M) + "px, " + -o / 2 / P + "px) rotateX(-90deg)")
                }
            var z = I.isSafari || I.isUiWebView ? -l / 2 : 0;
            s.transform("translate3d(0px,0," + z + "px) rotateX(" + (t.isHorizontal() ? 0 : u) + "deg) rotateY(" + (t.isHorizontal() ? -u : 0) + "deg)")
        },
        setTransition: function(e) {
            var t = this.$el;
            this.slides.transition(e).find(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").transition(e),
            this.params.cubeEffect.shadow && !this.isHorizontal() && t.find(".swiper-cube-shadow").transition(e)
        }
    }
      , U = {
        setTranslate: function() {
            for (var e = this, t = e.slides, i = e.rtlTranslate, s = 0; s < t.length; s += 1) {
                var a = t.eq(s)
                  , n = a[0].progress;
                e.params.flipEffect.limitRotation && (n = Math.max(Math.min(a[0].progress, 1), -1));
                var o = -180 * n
                  , r = 0
                  , l = -a[0].swiperSlideOffset
                  , d = 0;
                if (e.isHorizontal() ? i && (o = -o) : (d = l,
                r = -o,
                o = l = 0),
                a[0].style.zIndex = -Math.abs(Math.round(n)) + t.length,
                e.params.flipEffect.slideShadows) {
                    var c = e.isHorizontal() ? a.find(".swiper-slide-shadow-left") : a.find(".swiper-slide-shadow-top")
                      , p = e.isHorizontal() ? a.find(".swiper-slide-shadow-right") : a.find(".swiper-slide-shadow-bottom");
                    0 === c.length && (c = L('<div class="swiper-slide-shadow-' + (e.isHorizontal() ? "left" : "top") + '"></div>'),
                    a.append(c)),
                    0 === p.length && (p = L('<div class="swiper-slide-shadow-' + (e.isHorizontal() ? "right" : "bottom") + '"></div>'),
                    a.append(p)),
                    c.length && (c[0].style.opacity = Math.max(-n, 0)),
                    p.length && (p[0].style.opacity = Math.max(n, 0))
                }
                a.transform("translate3d(" + l + "px, " + d + "px, 0px) rotateX(" + r + "deg) rotateY(" + o + "deg)")
            }
        },
        setTransition: function(e) {
            var i = this
              , t = i.slides
              , s = i.activeIndex
              , a = i.$wrapperEl;
            if (t.transition(e).find(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").transition(e),
            i.params.virtualTranslate && 0 !== e) {
                var n = !1;
                t.eq(s).transitionEnd(function() {
                    if (!n && i && !i.destroyed) {
                        n = !0,
                        i.animating = !1;
                        for (var e = ["webkitTransitionEnd", "transitionend"], t = 0; t < e.length; t += 1)
                            a.trigger(e[t])
                    }
                })
            }
        }
    }
      , K = {
        setTranslate: function() {
            for (var e = this, t = e.width, i = e.height, s = e.slides, a = e.$wrapperEl, n = e.slidesSizesGrid, o = e.params.coverflowEffect, r = e.isHorizontal(), l = e.translate, d = r ? t / 2 - l : i / 2 - l, c = r ? o.rotate : -o.rotate, p = o.depth, u = 0, h = s.length; u < h; u += 1) {
                var f = s.eq(u)
                  , v = n[u]
                  , g = (d - f[0].swiperSlideOffset - v / 2) / v * o.modifier
                  , m = r ? c * g : 0
                  , b = r ? 0 : c * g
                  , y = -p * Math.abs(g)
                  , w = r ? 0 : o.stretch * g
                  , x = r ? o.stretch * g : 0;
                Math.abs(x) < .001 && (x = 0),
                Math.abs(w) < .001 && (w = 0),
                Math.abs(y) < .001 && (y = 0),
                Math.abs(m) < .001 && (m = 0),
                Math.abs(b) < .001 && (b = 0);
                var T = "translate3d(" + x + "px," + w + "px," + y + "px)  rotateX(" + b + "deg) rotateY(" + m + "deg)";
                if (f.transform(T),
                f[0].style.zIndex = 1 - Math.abs(Math.round(g)),
                o.slideShadows) {
                    var S = r ? f.find(".swiper-slide-shadow-left") : f.find(".swiper-slide-shadow-top")
                      , C = r ? f.find(".swiper-slide-shadow-right") : f.find(".swiper-slide-shadow-bottom");
                    0 === S.length && (S = L('<div class="swiper-slide-shadow-' + (r ? "left" : "top") + '"></div>'),
                    f.append(S)),
                    0 === C.length && (C = L('<div class="swiper-slide-shadow-' + (r ? "right" : "bottom") + '"></div>'),
                    f.append(C)),
                    S.length && (S[0].style.opacity = 0 < g ? g : 0),
                    C.length && (C[0].style.opacity = 0 < -g ? -g : 0)
                }
            }
            (te.pointerEvents || te.prefixedPointerEvents) && (a[0].style.perspectiveOrigin = d + "px 50%")
        },
        setTransition: function(e) {
            this.slides.transition(e).find(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").transition(e)
        }
    }
      , Z = {
        init: function() {
            var e = this
              , t = e.params.thumbs
              , i = e.constructor;
            t.swiper instanceof i ? (e.thumbs.swiper = t.swiper,
            ee.extend(e.thumbs.swiper.originalParams, {
                watchSlidesProgress: !0,
                slideToClickedSlide: !1
            }),
            ee.extend(e.thumbs.swiper.params, {
                watchSlidesProgress: !0,
                slideToClickedSlide: !1
            })) : ee.isObject(t.swiper) && (e.thumbs.swiper = new i(ee.extend({}, t.swiper, {
                watchSlidesVisibility: !0,
                watchSlidesProgress: !0,
                slideToClickedSlide: !1
            })),
            e.thumbs.swiperCreated = !0),
            e.thumbs.swiper.$el.addClass(e.params.thumbs.thumbsContainerClass),
            e.thumbs.swiper.on("tap", e.thumbs.onThumbClick)
        },
        onThumbClick: function() {
            var e = this
              , t = e.thumbs.swiper;
            if (t) {
                var i = t.clickedIndex
                  , s = t.clickedSlide;
                if (!(s && L(s).hasClass(e.params.thumbs.slideThumbActiveClass) || null == i)) {
                    var a;
                    if (a = t.params.loop ? parseInt(L(t.clickedSlide).attr("data-swiper-slide-index"), 10) : i,
                    e.params.loop) {
                        var n = e.activeIndex;
                        e.slides.eq(n).hasClass(e.params.slideDuplicateClass) && (e.loopFix(),
                        e._clientLeft = e.$wrapperEl[0].clientLeft,
                        n = e.activeIndex);
                        var o = e.slides.eq(n).prevAll('[data-swiper-slide-index="' + a + '"]').eq(0).index()
                          , r = e.slides.eq(n).nextAll('[data-swiper-slide-index="' + a + '"]').eq(0).index();
                        a = void 0 === o ? r : void 0 === r ? o : r - n < n - o ? r : o
                    }
                    e.slideTo(a)
                }
            }
        },
        update: function(e) {
            var t = this
              , i = t.thumbs.swiper;
            if (i) {
                var s = "auto" === i.params.slidesPerView ? i.slidesPerViewDynamic() : i.params.slidesPerView;
                if (t.realIndex !== i.realIndex) {
                    var a, n = i.activeIndex;
                    if (i.params.loop) {
                        i.slides.eq(n).hasClass(i.params.slideDuplicateClass) && (i.loopFix(),
                        i._clientLeft = i.$wrapperEl[0].clientLeft,
                        n = i.activeIndex);
                        var o = i.slides.eq(n).prevAll('[data-swiper-slide-index="' + t.realIndex + '"]').eq(0).index()
                          , r = i.slides.eq(n).nextAll('[data-swiper-slide-index="' + t.realIndex + '"]').eq(0).index();
                        a = void 0 === o ? r : void 0 === r ? o : r - n == n - o ? n : r - n < n - o ? r : o
                    } else
                        a = t.realIndex;
                    i.visibleSlidesIndexes.indexOf(a) < 0 && (i.params.centeredSlides ? a = n < a ? a - Math.floor(s / 2) + 1 : a + Math.floor(s / 2) - 1 : n < a && (a = a - s + 1),
                    i.slideTo(a, e ? 0 : void 0))
                }
                var l = 1
                  , d = t.params.thumbs.slideThumbActiveClass;
                if (1 < t.params.slidesPerView && !t.params.centeredSlides && (l = t.params.slidesPerView),
                i.slides.removeClass(d),
                i.params.loop)
                    for (var c = 0; c < l; c += 1)
                        i.$wrapperEl.children('[data-swiper-slide-index="' + (t.realIndex + c) + '"]').addClass(d);
                else
                    for (var p = 0; p < l; p += 1)
                        i.slides.eq(t.realIndex + p).addClass(d)
            }
        }
    }
      , Q = [S, C, $, E, P, z, O, {
        name: "mousewheel",
        params: {
            mousewheel: {
                enabled: !1,
                releaseOnEdges: !1,
                invert: !1,
                forceToAxis: !1,
                sensitivity: 1,
                eventsTarged: "container"
            }
        },
        create: function() {
            var e = this;
            ee.extend(e, {
                mousewheel: {
                    enabled: !1,
                    enable: D.enable.bind(e),
                    disable: D.disable.bind(e),
                    handle: D.handle.bind(e),
                    handleMouseEnter: D.handleMouseEnter.bind(e),
                    handleMouseLeave: D.handleMouseLeave.bind(e),
                    lastScrollTime: ee.now()
                }
            })
        },
        on: {
            init: function() {
                this.params.mousewheel.enabled && this.mousewheel.enable()
            },
            destroy: function() {
                this.mousewheel.enabled && this.mousewheel.disable()
            }
        }
    }, {
        name: "navigation",
        params: {
            navigation: {
                nextEl: null,
                prevEl: null,
                hideOnClick: !1,
                disabledClass: "swiper-button-disabled",
                hiddenClass: "swiper-button-hidden",
                lockClass: "swiper-button-lock"
            }
        },
        create: function() {
            var e = this;
            ee.extend(e, {
                navigation: {
                    init: H.init.bind(e),
                    update: H.update.bind(e),
                    destroy: H.destroy.bind(e),
                    onNextClick: H.onNextClick.bind(e),
                    onPrevClick: H.onPrevClick.bind(e)
                }
            })
        },
        on: {
            init: function() {
                this.navigation.init(),
                this.navigation.update()
            },
            toEdge: function() {
                this.navigation.update()
            },
            fromEdge: function() {
                this.navigation.update()
            },
            destroy: function() {
                this.navigation.destroy()
            },
            click: function(e) {
                var t, i = this, s = i.navigation, a = s.$nextEl, n = s.$prevEl;
                !i.params.navigation.hideOnClick || L(e.target).is(n) || L(e.target).is(a) || (a ? t = a.hasClass(i.params.navigation.hiddenClass) : n && (t = n.hasClass(i.params.navigation.hiddenClass)),
                !0 === t ? i.emit("navigationShow", i) : i.emit("navigationHide", i),
                a && a.toggleClass(i.params.navigation.hiddenClass),
                n && n.toggleClass(i.params.navigation.hiddenClass))
            }
        }
    }, {
        name: "pagination",
        params: {
            pagination: {
                el: null,
                bulletElement: "span",
                clickable: !1,
                hideOnClick: !1,
                renderBullet: null,
                renderProgressbar: null,
                renderFraction: null,
                renderCustom: null,
                progressbarOpposite: !1,
                type: "bullets",
                dynamicBullets: !1,
                dynamicMainBullets: 1,
                formatFractionCurrent: function(e) {
                    return e
                },
                formatFractionTotal: function(e) {
                    return e
                },
                bulletClass: "swiper-pagination-bullet",
                bulletActiveClass: "swiper-pagination-bullet-active",
                modifierClass: "swiper-pagination-",
                currentClass: "swiper-pagination-current",
                totalClass: "swiper-pagination-total",
                hiddenClass: "swiper-pagination-hidden",
                progressbarFillClass: "swiper-pagination-progressbar-fill",
                progressbarOppositeClass: "swiper-pagination-progressbar-opposite",
                clickableClass: "swiper-pagination-clickable",
                lockClass: "swiper-pagination-lock"
            }
        },
        create: function() {
            var e = this;
            ee.extend(e, {
                pagination: {
                    init: F.init.bind(e),
                    render: F.render.bind(e),
                    update: F.update.bind(e),
                    destroy: F.destroy.bind(e),
                    dynamicBulletIndex: 0
                }
            })
        },
        on: {
            init: function() {
                this.pagination.init(),
                this.pagination.render(),
                this.pagination.update()
            },
            activeIndexChange: function() {
                this.params.loop ? this.pagination.update() : void 0 === this.snapIndex && this.pagination.update()
            },
            snapIndexChange: function() {
                this.params.loop || this.pagination.update()
            },
            slidesLengthChange: function() {
                this.params.loop && (this.pagination.render(),
                this.pagination.update())
            },
            snapGridLengthChange: function() {
                this.params.loop || (this.pagination.render(),
                this.pagination.update())
            },
            destroy: function() {
                this.pagination.destroy()
            },
            click: function(e) {
                var t = this;
                t.params.pagination.el && t.params.pagination.hideOnClick && 0 < t.pagination.$el.length && !L(e.target).hasClass(t.params.pagination.bulletClass) && (!0 === t.pagination.$el.hasClass(t.params.pagination.hiddenClass) ? t.emit("paginationShow", t) : t.emit("paginationHide", t),
                t.pagination.$el.toggleClass(t.params.pagination.hiddenClass))
            }
        }
    }, {
        name: "scrollbar",
        params: {
            scrollbar: {
                el: null,
                dragSize: "auto",
                hide: !1,
                draggable: !1,
                snapOnRelease: !0,
                lockClass: "swiper-scrollbar-lock",
                dragClass: "swiper-scrollbar-drag"
            }
        },
        create: function() {
            var e = this;
            ee.extend(e, {
                scrollbar: {
                    init: B.init.bind(e),
                    destroy: B.destroy.bind(e),
                    updateSize: B.updateSize.bind(e),
                    setTranslate: B.setTranslate.bind(e),
                    setTransition: B.setTransition.bind(e),
                    enableDraggable: B.enableDraggable.bind(e),
                    disableDraggable: B.disableDraggable.bind(e),
                    setDragPosition: B.setDragPosition.bind(e),
                    onDragStart: B.onDragStart.bind(e),
                    onDragMove: B.onDragMove.bind(e),
                    onDragEnd: B.onDragEnd.bind(e),
                    isTouched: !1,
                    timeout: null,
                    dragTimeout: null
                }
            })
        },
        on: {
            init: function() {
                this.scrollbar.init(),
                this.scrollbar.updateSize(),
                this.scrollbar.setTranslate()
            },
            update: function() {
                this.scrollbar.updateSize()
            },
            resize: function() {
                this.scrollbar.updateSize()
            },
            observerUpdate: function() {
                this.scrollbar.updateSize()
            },
            setTranslate: function() {
                this.scrollbar.setTranslate()
            },
            setTransition: function(e) {
                this.scrollbar.setTransition(e)
            },
            destroy: function() {
                this.scrollbar.destroy()
            }
        }
    }, {
        name: "parallax",
        params: {
            parallax: {
                enabled: !1
            }
        },
        create: function() {
            ee.extend(this, {
                parallax: {
                    setTransform: X.setTransform.bind(this),
                    setTranslate: X.setTranslate.bind(this),
                    setTransition: X.setTransition.bind(this)
                }
            })
        },
        on: {
            beforeInit: function() {
                this.params.parallax.enabled && (this.params.watchSlidesProgress = !0,
                this.originalParams.watchSlidesProgress = !0)
            },
            init: function() {
                this.params.parallax.enabled && this.parallax.setTranslate()
            },
            setTranslate: function() {
                this.params.parallax.enabled && this.parallax.setTranslate()
            },
            setTransition: function(e) {
                this.params.parallax.enabled && this.parallax.setTransition(e)
            }
        }
    }, {
        name: "zoom",
        params: {
            zoom: {
                enabled: !1,
                maxRatio: 3,
                minRatio: 1,
                toggle: !0,
                containerClass: "swiper-zoom-container",
                zoomedSlideClass: "swiper-slide-zoomed"
            }
        },
        create: function() {
            var s = this
              , t = {
                enabled: !1,
                scale: 1,
                currentScale: 1,
                isScaling: !1,
                gesture: {
                    $slideEl: void 0,
                    slideWidth: void 0,
                    slideHeight: void 0,
                    $imageEl: void 0,
                    $imageWrapEl: void 0,
                    maxRatio: 3
                },
                image: {
                    isTouched: void 0,
                    isMoved: void 0,
                    currentX: void 0,
                    currentY: void 0,
                    minX: void 0,
                    minY: void 0,
                    maxX: void 0,
                    maxY: void 0,
                    width: void 0,
                    height: void 0,
                    startX: void 0,
                    startY: void 0,
                    touchesStart: {},
                    touchesCurrent: {}
                },
                velocity: {
                    x: void 0,
                    y: void 0,
                    prevPositionX: void 0,
                    prevPositionY: void 0,
                    prevTime: void 0
                }
            };
            "onGestureStart onGestureChange onGestureEnd onTouchStart onTouchMove onTouchEnd onTransitionEnd toggle enable disable in out".split(" ").forEach(function(e) {
                t[e] = Y[e].bind(s)
            }),
            ee.extend(s, {
                zoom: t
            });
            var a = 1;
            Object.defineProperty(s.zoom, "scale", {
                get: function() {
                    return a
                },
                set: function(e) {
                    if (a !== e) {
                        var t = s.zoom.gesture.$imageEl ? s.zoom.gesture.$imageEl[0] : void 0
                          , i = s.zoom.gesture.$slideEl ? s.zoom.gesture.$slideEl[0] : void 0;
                        s.emit("zoomChange", e, t, i)
                    }
                    a = e
                }
            })
        },
        on: {
            init: function() {
                this.params.zoom.enabled && this.zoom.enable()
            },
            destroy: function() {
                this.zoom.disable()
            },
            touchStart: function(e) {
                this.zoom.enabled && this.zoom.onTouchStart(e)
            },
            touchEnd: function(e) {
                this.zoom.enabled && this.zoom.onTouchEnd(e)
            },
            doubleTap: function(e) {
                this.params.zoom.enabled && this.zoom.enabled && this.params.zoom.toggle && this.zoom.toggle(e)
            },
            transitionEnd: function() {
                this.zoom.enabled && this.params.zoom.enabled && this.zoom.onTransitionEnd()
            }
        }
    }, {
        name: "lazy",
        params: {
            lazy: {
                enabled: !1,
                loadPrevNext: !1,
                loadPrevNextAmount: 1,
                loadOnTransitionStart: !1,
                elementClass: "swiper-lazy",
                loadingClass: "swiper-lazy-loading",
                loadedClass: "swiper-lazy-loaded",
                preloaderClass: "swiper-lazy-preloader"
            }
        },
        create: function() {
            ee.extend(this, {
                lazy: {
                    initialImageLoaded: !1,
                    load: N.load.bind(this),
                    loadInSlide: N.loadInSlide.bind(this)
                }
            })
        },
        on: {
            beforeInit: function() {
                this.params.lazy.enabled && this.params.preloadImages && (this.params.preloadImages = !1)
            },
            init: function() {
                this.params.lazy.enabled && !this.params.loop && 0 === this.params.initialSlide && this.lazy.load()
            },
            scroll: function() {
                this.params.freeMode && !this.params.freeModeSticky && this.lazy.load()
            },
            resize: function() {
                this.params.lazy.enabled && this.lazy.load()
            },
            scrollbarDragMove: function() {
                this.params.lazy.enabled && this.lazy.load()
            },
            transitionStart: function() {
                var e = this;
                e.params.lazy.enabled && (e.params.lazy.loadOnTransitionStart || !e.params.lazy.loadOnTransitionStart && !e.lazy.initialImageLoaded) && e.lazy.load()
            },
            transitionEnd: function() {
                this.params.lazy.enabled && !this.params.lazy.loadOnTransitionStart && this.lazy.load()
            }
        }
    }, {
        name: "controller",
        params: {
            controller: {
                control: void 0,
                inverse: !1,
                by: "slide"
            }
        },
        create: function() {
            var e = this;
            ee.extend(e, {
                controller: {
                    control: e.params.controller.control,
                    getInterpolateFunction: R.getInterpolateFunction.bind(e),
                    setTranslate: R.setTranslate.bind(e),
                    setTransition: R.setTransition.bind(e)
                }
            })
        },
        on: {
            update: function() {
                this.controller.control && this.controller.spline && (this.controller.spline = void 0,
                delete this.controller.spline)
            },
            resize: function() {
                this.controller.control && this.controller.spline && (this.controller.spline = void 0,
                delete this.controller.spline)
            },
            observerUpdate: function() {
                this.controller.control && this.controller.spline && (this.controller.spline = void 0,
                delete this.controller.spline)
            },
            setTranslate: function(e, t) {
                this.controller.control && this.controller.setTranslate(e, t)
            },
            setTransition: function(e, t) {
                this.controller.control && this.controller.setTransition(e, t)
            }
        }
    }, {
        name: "a11y",
        params: {
            a11y: {
                enabled: !0,
                notificationClass: "swiper-notification",
                prevSlideMessage: "Previous slide",
                nextSlideMessage: "Next slide",
                firstSlideMessage: "This is the first slide",
                lastSlideMessage: "This is the last slide",
                paginationBulletMessage: "Go to slide {{index}}"
            }
        },
        create: function() {
            var t = this;
            ee.extend(t, {
                a11y: {
                    liveRegion: L('<span class="' + t.params.a11y.notificationClass + '" aria-live="assertive" aria-atomic="true"></span>')
                }
            }),
            Object.keys(j).forEach(function(e) {
                t.a11y[e] = j[e].bind(t)
            })
        },
        on: {
            init: function() {
                this.params.a11y.enabled && (this.a11y.init(),
                this.a11y.updateNavigation())
            },
            toEdge: function() {
                this.params.a11y.enabled && this.a11y.updateNavigation()
            },
            fromEdge: function() {
                this.params.a11y.enabled && this.a11y.updateNavigation()
            },
            paginationUpdate: function() {
                this.params.a11y.enabled && this.a11y.updatePagination()
            },
            destroy: function() {
                this.params.a11y.enabled && this.a11y.destroy()
            }
        }
    }, {
        name: "history",
        params: {
            history: {
                enabled: !1,
                replaceState: !1,
                key: "slides"
            }
        },
        create: function() {
            var e = this;
            ee.extend(e, {
                history: {
                    init: q.init.bind(e),
                    setHistory: q.setHistory.bind(e),
                    setHistoryPopState: q.setHistoryPopState.bind(e),
                    scrollToSlide: q.scrollToSlide.bind(e),
                    destroy: q.destroy.bind(e)
                }
            })
        },
        on: {
            init: function() {
                this.params.history.enabled && this.history.init()
            },
            destroy: function() {
                this.params.history.enabled && this.history.destroy()
            },
            transitionEnd: function() {
                this.history.initialized && this.history.setHistory(this.params.history.key, this.activeIndex)
            }
        }
    }, {
        name: "hash-navigation",
        params: {
            hashNavigation: {
                enabled: !1,
                replaceState: !1,
                watchState: !1
            }
        },
        create: function() {
            var e = this;
            ee.extend(e, {
                hashNavigation: {
                    initialized: !1,
                    init: V.init.bind(e),
                    destroy: V.destroy.bind(e),
                    setHash: V.setHash.bind(e),
                    onHashCange: V.onHashCange.bind(e)
                }
            })
        },
        on: {
            init: function() {
                this.params.hashNavigation.enabled && this.hashNavigation.init()
            },
            destroy: function() {
                this.params.hashNavigation.enabled && this.hashNavigation.destroy()
            },
            transitionEnd: function() {
                this.hashNavigation.initialized && this.hashNavigation.setHash()
            }
        }
    }, {
        name: "autoplay",
        params: {
            autoplay: {
                enabled: !1,
                delay: 3e3,
                waitForTransition: !0,
                disableOnInteraction: !0,
                stopOnLastSlide: !1,
                reverseDirection: !1
            }
        },
        create: function() {
            var t = this;
            ee.extend(t, {
                autoplay: {
                    running: !1,
                    paused: !1,
                    run: W.run.bind(t),
                    start: W.start.bind(t),
                    stop: W.stop.bind(t),
                    pause: W.pause.bind(t),
                    onTransitionEnd: function(e) {
                        t && !t.destroyed && t.$wrapperEl && e.target === this && (t.$wrapperEl[0].removeEventListener("transitionend", t.autoplay.onTransitionEnd),
                        t.$wrapperEl[0].removeEventListener("webkitTransitionEnd", t.autoplay.onTransitionEnd),
                        t.autoplay.paused = !1,
                        t.autoplay.running ? t.autoplay.run() : t.autoplay.stop())
                    }
                }
            })
        },
        on: {
            init: function() {
                this.params.autoplay.enabled && this.autoplay.start()
            },
            beforeTransitionStart: function(e, t) {
                this.autoplay.running && (t || !this.params.autoplay.disableOnInteraction ? this.autoplay.pause(e) : this.autoplay.stop())
            },
            sliderFirstMove: function() {
                this.autoplay.running && (this.params.autoplay.disableOnInteraction ? this.autoplay.stop() : this.autoplay.pause())
            },
            destroy: function() {
                this.autoplay.running && this.autoplay.stop()
            }
        }
    }, {
        name: "effect-fade",
        params: {
            fadeEffect: {
                crossFade: !1
            }
        },
        create: function() {
            ee.extend(this, {
                fadeEffect: {
                    setTranslate: G.setTranslate.bind(this),
                    setTransition: G.setTransition.bind(this)
                }
            })
        },
        on: {
            beforeInit: function() {
                var e = this;
                if ("fade" === e.params.effect) {
                    e.classNames.push(e.params.containerModifierClass + "fade");
                    var t = {
                        slidesPerView: 1,
                        slidesPerColumn: 1,
                        slidesPerGroup: 1,
                        watchSlidesProgress: !0,
                        spaceBetween: 0,
                        virtualTranslate: !0
                    };
                    ee.extend(e.params, t),
                    ee.extend(e.originalParams, t)
                }
            },
            setTranslate: function() {
                "fade" === this.params.effect && this.fadeEffect.setTranslate()
            },
            setTransition: function(e) {
                "fade" === this.params.effect && this.fadeEffect.setTransition(e)
            }
        }
    }, {
        name: "effect-cube",
        params: {
            cubeEffect: {
                slideShadows: !0,
                shadow: !0,
                shadowOffset: 20,
                shadowScale: .94
            }
        },
        create: function() {
            ee.extend(this, {
                cubeEffect: {
                    setTranslate: _.setTranslate.bind(this),
                    setTransition: _.setTransition.bind(this)
                }
            })
        },
        on: {
            beforeInit: function() {
                var e = this;
                if ("cube" === e.params.effect) {
                    e.classNames.push(e.params.containerModifierClass + "cube"),
                    e.classNames.push(e.params.containerModifierClass + "3d");
                    var t = {
                        slidesPerView: 1,
                        slidesPerColumn: 1,
                        slidesPerGroup: 1,
                        watchSlidesProgress: !0,
                        resistanceRatio: 0,
                        spaceBetween: 0,
                        centeredSlides: !1,
                        virtualTranslate: !0
                    };
                    ee.extend(e.params, t),
                    ee.extend(e.originalParams, t)
                }
            },
            setTranslate: function() {
                "cube" === this.params.effect && this.cubeEffect.setTranslate()
            },
            setTransition: function(e) {
                "cube" === this.params.effect && this.cubeEffect.setTransition(e)
            }
        }
    }, {
        name: "effect-flip",
        params: {
            flipEffect: {
                slideShadows: !0,
                limitRotation: !0
            }
        },
        create: function() {
            ee.extend(this, {
                flipEffect: {
                    setTranslate: U.setTranslate.bind(this),
                    setTransition: U.setTransition.bind(this)
                }
            })
        },
        on: {
            beforeInit: function() {
                var e = this;
                if ("flip" === e.params.effect) {
                    e.classNames.push(e.params.containerModifierClass + "flip"),
                    e.classNames.push(e.params.containerModifierClass + "3d");
                    var t = {
                        slidesPerView: 1,
                        slidesPerColumn: 1,
                        slidesPerGroup: 1,
                        watchSlidesProgress: !0,
                        spaceBetween: 0,
                        virtualTranslate: !0
                    };
                    ee.extend(e.params, t),
                    ee.extend(e.originalParams, t)
                }
            },
            setTranslate: function() {
                "flip" === this.params.effect && this.flipEffect.setTranslate()
            },
            setTransition: function(e) {
                "flip" === this.params.effect && this.flipEffect.setTransition(e)
            }
        }
    }, {
        name: "effect-coverflow",
        params: {
            coverflowEffect: {
                rotate: 50,
                stretch: 0,
                depth: 100,
                modifier: 1,
                slideShadows: !0
            }
        },
        create: function() {
            ee.extend(this, {
                coverflowEffect: {
                    setTranslate: K.setTranslate.bind(this),
                    setTransition: K.setTransition.bind(this)
                }
            })
        },
        on: {
            beforeInit: function() {
                var e = this;
                "coverflow" === e.params.effect && (e.classNames.push(e.params.containerModifierClass + "coverflow"),
                e.classNames.push(e.params.containerModifierClass + "3d"),
                e.params.watchSlidesProgress = !0,
                e.originalParams.watchSlidesProgress = !0)
            },
            setTranslate: function() {
                "coverflow" === this.params.effect && this.coverflowEffect.setTranslate()
            },
            setTransition: function(e) {
                "coverflow" === this.params.effect && this.coverflowEffect.setTransition(e)
            }
        }
    }, {
        name: "thumbs",
        params: {
            thumbs: {
                swiper: null,
                slideThumbActiveClass: "swiper-slide-thumb-active",
                thumbsContainerClass: "swiper-container-thumbs"
            }
        },
        create: function() {
            ee.extend(this, {
                thumbs: {
                    swiper: null,
                    init: Z.init.bind(this),
                    update: Z.update.bind(this),
                    onThumbClick: Z.onThumbClick.bind(this)
                }
            })
        },
        on: {
            beforeInit: function() {
                var e = this.params.thumbs;
                e && e.swiper && (this.thumbs.init(),
                this.thumbs.update(!0))
            },
            slideChange: function() {
                this.thumbs.swiper && this.thumbs.update()
            },
            update: function() {
                this.thumbs.swiper && this.thumbs.update()
            },
            resize: function() {
                this.thumbs.swiper && this.thumbs.update()
            },
            observerUpdate: function() {
                this.thumbs.swiper && this.thumbs.update()
            },
            setTransition: function(e) {
                var t = this.thumbs.swiper;
                t && t.setTransition(e)
            },
            beforeDestroy: function() {
                var e = this.thumbs.swiper;
                e && this.thumbs.swiperCreated && e && e.destroy()
            }
        }
    }];
    return void 0 === T.use && (T.use = T.Class.use,
    T.installModule = T.Class.installModule),
    T.use(Q),
    T
}),
function(l, p, v, g) {
    "use strict";
    function i(e, t) {
        var i, s, a, n = [], o = 0;
        e && e.isDefaultPrevented() || (e.preventDefault(),
        t = t || {},
        e && e.data && (t = m(e.data.options, t)),
        i = t.$target || v(e.currentTarget).trigger("blur"),
        (a = v.fancybox.getInstance()) && a.$trigger && a.$trigger.is(i) || (n = t.selector ? v(t.selector) : (s = i.attr("data-fancybox") || "") ? (n = e.data ? e.data.items : []).length ? n.filter('[data-fancybox="' + s + '"]') : v('[data-fancybox="' + s + '"]') : [i],
        (o = v(n).index(i)) < 0 && (o = 0),
        (a = v.fancybox.open(n, t, o)).$trigger = i))
    }
    if (l.console = l.console || {
        info: function(e) {}
    },
    v)
        if (v.fn.fancybox)
            console.info("fancyBox already initialized");
        else {
            var e, t, s, a, n = {
                closeExisting: !1,
                loop: !1,
                gutter: 50,
                keyboard: !0,
                preventCaptionOverlap: !0,
                arrows: !0,
                infobar: !0,
                smallBtn: "auto",
                toolbar: "auto",
                buttons: ["zoom", "slideShow", "thumbs", "close"],
                idleTime: 3,
                protect: !1,
                modal: !1,
                image: {
                    preload: !1
                },
                ajax: {
                    settings: {
                        data: {
                            fancybox: !0
                        }
                    }
                },
                iframe: {
                    tpl: '<iframe id="fancybox-frame{rnd}" name="fancybox-frame{rnd}" class="fancybox-iframe" allowfullscreen="allowfullscreen" allow="autoplay; fullscreen" src=""></iframe>',
                    preload: !0,
                    css: {},
                    attr: {
                        scrolling: "auto"
                    }
                },
                video: {
                    tpl: '<video class="fancybox-video" controls controlsList="nodownload" poster="{{poster}}"><source src="{{src}}" type="{{format}}" />Sorry, your browser doesn\'t support embedded videos, <a href="{{src}}">download</a> and watch with your favorite video player!</video>',
                    format: "",
                    autoStart: !0
                },
                defaultType: "image",
                animationEffect: "zoom",
                animationDuration: 366,
                zoomOpacity: "auto",
                transitionEffect: "fade",
                transitionDuration: 366,
                slideClass: "",
                baseClass: "",
                baseTpl: '<div class="fancybox-container" role="dialog" tabindex="-1"><div class="fancybox-bg"></div><div class="fancybox-inner"><div class="fancybox-infobar"><span data-fancybox-index></span>&nbsp;/&nbsp;<span data-fancybox-count></span></div><div class="fancybox-toolbar">{{buttons}}</div><div class="fancybox-navigation">{{arrows}}</div><div class="fancybox-stage"></div><div class="fancybox-caption"><div class="fancybox-caption__body"></div></div></div></div>',
                spinnerTpl: '<div class="fancybox-loading"></div>',
                errorTpl: '<div class="fancybox-error"><p>{{ERROR}}</p></div>',
                btnTpl: {
                    download: '<a download data-fancybox-download class="fancybox-button fancybox-button--download" title="{{DOWNLOAD}}" href="javascript:;"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M18.62 17.09V19H5.38v-1.91zm-2.97-6.96L17 11.45l-5 4.87-5-4.87 1.36-1.32 2.68 2.64V5h1.92v7.77z"/></svg></a>',
                    zoom: '<button data-fancybox-zoom class="fancybox-button fancybox-button--zoom" title="{{ZOOM}}"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M18.7 17.3l-3-3a5.9 5.9 0 0 0-.6-7.6 5.9 5.9 0 0 0-8.4 0 5.9 5.9 0 0 0 0 8.4 5.9 5.9 0 0 0 7.7.7l3 3a1 1 0 0 0 1.3 0c.4-.5.4-1 0-1.5zM8.1 13.8a4 4 0 0 1 0-5.7 4 4 0 0 1 5.7 0 4 4 0 0 1 0 5.7 4 4 0 0 1-5.7 0z"/></svg></button>',
                    close: '<button data-fancybox-close class="fancybox-button fancybox-button--close" title="{{CLOSE}}"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 10.6L6.6 5.2 5.2 6.6l5.4 5.4-5.4 5.4 1.4 1.4 5.4-5.4 5.4 5.4 1.4-1.4-5.4-5.4 5.4-5.4-1.4-1.4-5.4 5.4z"/></svg></button>',
                    arrowLeft: '<button data-fancybox-prev class="fancybox-button fancybox-button--arrow_left" title="{{PREV}}"><div><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M11.28 15.7l-1.34 1.37L5 12l4.94-5.07 1.34 1.38-2.68 2.72H19v1.94H8.6z"/></svg></div></button>',
                    arrowRight: '<button data-fancybox-next class="fancybox-button fancybox-button--arrow_right" title="{{NEXT}}"><div><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M15.4 12.97l-2.68 2.72 1.34 1.38L19 12l-4.94-5.07-1.34 1.38 2.68 2.72H5v1.94z"/></svg></div></button>',
                    smallBtn: '<button type="button" data-fancybox-close class="fancybox-button fancybox-close-small" title="{{CLOSE}}"><svg xmlns="http://www.w3.org/2000/svg" version="1" viewBox="0 0 24 24"><path d="M13 12l5-5-1-1-5 5-5-5-1 1 5 5-5 5 1 1 5-5 5 5 1-1z"/></svg></button>'
                },
                parentEl: "body",
                hideScrollbar: !0,
                autoFocus: !0,
                backFocus: !0,
                trapFocus: !0,
                fullScreen: {
                    autoStart: !1
                },
                touch: {
                    vertical: !0,
                    momentum: !0
                },
                hash: null,
                media: {},
                slideShow: {
                    autoStart: !1,
                    speed: 3e3
                },
                thumbs: {
                    autoStart: !1,
                    hideOnClose: !0,
                    parentEl: ".fancybox-container",
                    axis: "y"
                },
                wheel: "auto",
                onInit: v.noop,
                beforeLoad: v.noop,
                afterLoad: v.noop,
                beforeShow: v.noop,
                afterShow: v.noop,
                beforeClose: v.noop,
                afterClose: v.noop,
                onActivate: v.noop,
                onDeactivate: v.noop,
                clickContent: function(e, t) {
                    return "image" === e.type && "zoom"
                },
                clickSlide: "close",
                clickOutside: "close",
                dblclickContent: !1,
                dblclickSlide: !1,
                dblclickOutside: !1,
                mobile: {
                    preventCaptionOverlap: !1,
                    idleTime: !1,
                    clickContent: function(e, t) {
                        return "image" === e.type && "toggleControls"
                    },
                    clickSlide: function(e, t) {
                        return "image" === e.type ? "toggleControls" : "close"
                    },
                    dblclickContent: function(e, t) {
                        return "image" === e.type && "zoom"
                    },
                    dblclickSlide: function(e, t) {
                        return "image" === e.type && "zoom"
                    }
                },
                lang: "en",
                i18n: {
                    en: {
                        CLOSE: "Close",
                        NEXT: "Next",
                        PREV: "Previous",
                        ERROR: "The requested content cannot be loaded. <br/> Please try again later.",
                        PLAY_START: "Start slideshow",
                        PLAY_STOP: "Pause slideshow",
                        FULL_SCREEN: "Full screen",
                        THUMBS: "Thumbnails",
                        DOWNLOAD: "Download",
                        SHARE: "Share",
                        ZOOM: "Zoom"
                    },
                    de: {
                        CLOSE: "Schlie&szlig;en",
                        NEXT: "Weiter",
                        PREV: "Zur&uuml;ck",
                        ERROR: "Die angeforderten Daten konnten nicht geladen werden. <br/> Bitte versuchen Sie es sp&auml;ter nochmal.",
                        PLAY_START: "Diaschau starten",
                        PLAY_STOP: "Diaschau beenden",
                        FULL_SCREEN: "Vollbild",
                        THUMBS: "Vorschaubilder",
                        DOWNLOAD: "Herunterladen",
                        SHARE: "Teilen",
                        ZOOM: "Vergr&ouml;&szlig;ern"
                    }
                }
            }, o = v(l), r = v(p), d = 0, u = l.requestAnimationFrame || l.webkitRequestAnimationFrame || l.mozRequestAnimationFrame || l.oRequestAnimationFrame || function(e) {
                return l.setTimeout(e, 1e3 / 60)
            }
            , c = l.cancelAnimationFrame || l.webkitCancelAnimationFrame || l.mozCancelAnimationFrame || l.oCancelAnimationFrame || function(e) {
                l.clearTimeout(e)
            }
            , h = function() {
                var e, t = p.createElement("fakeelement"), i = {
                    transition: "transitionend",
                    OTransition: "oTransitionEnd",
                    MozTransition: "transitionend",
                    WebkitTransition: "webkitTransitionEnd"
                };
                for (e in i)
                    if (t.style[e] !== g)
                        return i[e];
                return "transitionend"
            }(), f = function(e) {
                return e && e.length && e[0].offsetHeight
            }, m = function(e, t) {
                var i = v.extend(!0, {}, e, t);
                return v.each(t, function(e, t) {
                    v.isArray(t) && (i[e] = t)
                }),
                i
            }, b = function(e, t, i) {
                var s = this;
                s.opts = m({
                    index: i
                }, v.fancybox.defaults),
                v.isPlainObject(t) && (s.opts = m(s.opts, t)),
                v.fancybox.isMobile && (s.opts = m(s.opts, s.opts.mobile)),
                s.id = s.opts.id || ++d,
                s.currIndex = parseInt(s.opts.index, 10) || 0,
                s.prevIndex = null,
                s.prevPos = null,
                s.currPos = 0,
                s.firstRun = !0,
                s.group = [],
                s.slides = {},
                s.addContent(e),
                s.group.length && s.init()
            };
            v.extend(b.prototype, {
                init: function() {
                    var t, i, s = this, a = s.group[s.currIndex].opts;
                    a.closeExisting && v.fancybox.close(!0),
                    v("body").addClass("fancybox-active"),
                    !v.fancybox.getInstance() && !1 !== a.hideScrollbar && !v.fancybox.isMobile && p.body.scrollHeight > l.innerHeight && (v("head").append('<style id="fancybox-style-noscroll" type="text/css">.compensate-for-scrollbar{margin-right:' + (l.innerWidth - p.documentElement.clientWidth) + "px;}</style>"),
                    v("body").addClass("compensate-for-scrollbar")),
                    i = "",
                    v.each(a.buttons, function(e, t) {
                        i += a.btnTpl[t] || ""
                    }),
                    t = v(s.translate(s, a.baseTpl.replace("{{buttons}}", i).replace("{{arrows}}", a.btnTpl.arrowLeft + a.btnTpl.arrowRight))).attr("id", "fancybox-container-" + s.id).addClass(a.baseClass).data("FancyBox", s).appendTo(a.parentEl),
                    s.$refs = {
                        container: t
                    },
                    ["bg", "inner", "infobar", "toolbar", "stage", "caption", "navigation"].forEach(function(e) {
                        s.$refs[e] = t.find(".fancybox-" + e)
                    }),
                    s.trigger("onInit"),
                    s.activate(),
                    s.jumpTo(s.currIndex)
                },
                translate: function(e, t) {
                    var i = e.opts.i18n[e.opts.lang] || e.opts.i18n.en;
                    return t.replace(/\{\{(\w+)\}\}/g, function(e, t) {
                        return i[t] === g ? e : i[t]
                    })
                },
                addContent: function(e) {
                    var t, d = this, i = v.makeArray(e);
                    v.each(i, function(e, t) {
                        var i, s, a, n, o, r = {}, l = {};
                        v.isPlainObject(t) ? l = (r = t).opts || t : "object" === v.type(t) && v(t).length ? (l = (i = v(t)).data() || {},
                        (l = v.extend(!0, {}, l, l.options)).$orig = i,
                        r.src = d.opts.src || l.src || i.attr("href"),
                        r.type || r.src || (r.type = "inline",
                        r.src = t)) : r = {
                            type: "html",
                            src: t + ""
                        },
                        r.opts = v.extend(!0, {}, d.opts, l),
                        v.isArray(l.buttons) && (r.opts.buttons = l.buttons),
                        v.fancybox.isMobile && r.opts.mobile && (r.opts = m(r.opts, r.opts.mobile)),
                        s = r.type || r.opts.type,
                        n = r.src || "",
                        !s && n && ((a = n.match(/\.(mp4|mov|ogv|webm)((\?|#).*)?$/i)) ? (s = "video",
                        r.opts.video.format || (r.opts.video.format = "video/" + ("ogv" === a[1] ? "ogg" : a[1]))) : n.match(/(^data:image\/[a-z0-9+\/=]*,)|(\.(jp(e|g|eg)|gif|png|bmp|webp|svg|ico)((\?|#).*)?$)/i) ? s = "image" : n.match(/\.(pdf)((\?|#).*)?$/i) ? (s = "iframe",
                        r = v.extend(!0, r, {
                            contentType: "pdf",
                            opts: {
                                iframe: {
                                    preload: !1
                                }
                            }
                        })) : "#" === n.charAt(0) && (s = "inline")),
                        s ? r.type = s : d.trigger("objectNeedsType", r),
                        r.contentType || (r.contentType = -1 < v.inArray(r.type, ["html", "inline", "ajax"]) ? "html" : r.type),
                        r.index = d.group.length,
                        "auto" == r.opts.smallBtn && (r.opts.smallBtn = -1 < v.inArray(r.type, ["html", "inline", "ajax"])),
                        "auto" === r.opts.toolbar && (r.opts.toolbar = !r.opts.smallBtn),
                        r.$thumb = r.opts.$thumb || null,
                        r.opts.$trigger && r.index === d.opts.index && (r.$thumb = r.opts.$trigger.find("img:first"),
                        r.$thumb.length && (r.opts.$orig = r.opts.$trigger)),
                        r.$thumb && r.$thumb.length || !r.opts.$orig || (r.$thumb = r.opts.$orig.find("img:first")),
                        r.$thumb && !r.$thumb.length && (r.$thumb = null),
                        r.thumb = r.opts.thumb || (r.$thumb ? r.$thumb[0].src : null),
                        "function" === v.type(r.opts.caption) && (r.opts.caption = r.opts.caption.apply(t, [d, r])),
                        "function" === v.type(d.opts.caption) && (r.opts.caption = d.opts.caption.apply(t, [d, r])),
                        r.opts.caption instanceof v || (r.opts.caption = r.opts.caption === g ? "" : r.opts.caption + ""),
                        "ajax" === r.type && 1 < (o = n.split(/\s+/, 2)).length && (r.src = o.shift(),
                        r.opts.filter = o.shift()),
                        r.opts.modal && (r.opts = v.extend(!0, r.opts, {
                            trapFocus: !0,
                            infobar: 0,
                            toolbar: 0,
                            smallBtn: 0,
                            keyboard: 0,
                            slideShow: 0,
                            fullScreen: 0,
                            thumbs: 0,
                            touch: 0,
                            clickContent: !1,
                            clickSlide: !1,
                            clickOutside: !1,
                            dblclickContent: !1,
                            dblclickSlide: !1,
                            dblclickOutside: !1
                        })),
                        d.group.push(r)
                    }),
                    Object.keys(d.slides).length && (d.updateControls(),
                    (t = d.Thumbs) && t.isActive && (t.create(),
                    t.focus()))
                },
                addEvents: function() {
                    var s = this;
                    s.removeEvents(),
                    s.$refs.container.on("click.fb-close", "[data-fancybox-close]", function(e) {
                        e.stopPropagation(),
                        e.preventDefault(),
                        s.close(e)
                    }).on("touchstart.fb-prev click.fb-prev", "[data-fancybox-prev]", function(e) {
                        e.stopPropagation(),
                        e.preventDefault(),
                        s.previous()
                    }).on("touchstart.fb-next click.fb-next", "[data-fancybox-next]", function(e) {
                        e.stopPropagation(),
                        e.preventDefault(),
                        s.next()
                    }).on("click.fb", "[data-fancybox-zoom]", function(e) {
                        s[s.isScaledDown() ? "scaleToActual" : "scaleToFit"]()
                    }),
                    o.on("orientationchange.fb resize.fb", function(e) {
                        e && e.originalEvent && "resize" === e.originalEvent.type ? (s.requestId && c(s.requestId),
                        s.requestId = u(function() {
                            s.update(e)
                        })) : (s.current && "iframe" === s.current.type && s.$refs.stage.hide(),
                        setTimeout(function() {
                            s.$refs.stage.show(),
                            s.update(e)
                        }, v.fancybox.isMobile ? 600 : 250))
                    }),
                    r.on("keydown.fb", function(e) {
                        var t = (v.fancybox ? v.fancybox.getInstance() : null).current
                          , i = e.keyCode || e.which;
                        if (9 != i) {
                            if (!(!t.opts.keyboard || e.ctrlKey || e.altKey || e.shiftKey || v(e.target).is("input,textarea,video,audio,select")))
                                return 8 === i || 27 === i ? (e.preventDefault(),
                                void s.close(e)) : 37 === i || 38 === i ? (e.preventDefault(),
                                void s.previous()) : 39 === i || 40 === i ? (e.preventDefault(),
                                void s.next()) : void s.trigger("afterKeydown", e, i)
                        } else
                            t.opts.trapFocus && s.focus(e)
                    }),
                    s.group[s.currIndex].opts.idleTime && (s.idleSecondsCounter = 0,
                    r.on("mousemove.fb-idle mouseleave.fb-idle mousedown.fb-idle touchstart.fb-idle touchmove.fb-idle scroll.fb-idle keydown.fb-idle", function(e) {
                        s.idleSecondsCounter = 0,
                        s.isIdle && s.showControls(),
                        s.isIdle = !1
                    }),
                    s.idleInterval = l.setInterval(function() {
                        s.idleSecondsCounter++,
                        s.idleSecondsCounter >= s.group[s.currIndex].opts.idleTime && !s.isDragging && (s.isIdle = !0,
                        s.idleSecondsCounter = 0,
                        s.hideControls())
                    }, 1e3))
                },
                removeEvents: function() {
                    o.off("orientationchange.fb resize.fb"),
                    r.off("keydown.fb .fb-idle"),
                    this.$refs.container.off(".fb-close .fb-prev .fb-next"),
                    this.idleInterval && (l.clearInterval(this.idleInterval),
                    this.idleInterval = null)
                },
                previous: function(e) {
                    return this.jumpTo(this.currPos - 1, e)
                },
                next: function(e) {
                    return this.jumpTo(this.currPos + 1, e)
                },
                jumpTo: function(e, s) {
                    var t, i, a, n, o, r, l, d, c, p = this, u = p.group.length;
                    if (!(p.isDragging || p.isClosing || p.isAnimating && p.firstRun)) {
                        if (e = parseInt(e, 10),
                        !(a = p.current ? p.current.opts.loop : p.opts.loop) && (e < 0 || u <= e))
                            return !1;
                        if (t = p.firstRun = !Object.keys(p.slides).length,
                        o = p.current,
                        p.prevIndex = p.currIndex,
                        p.prevPos = p.currPos,
                        n = p.createSlide(e),
                        1 < u && ((a || n.index < u - 1) && p.createSlide(e + 1),
                        (a || 0 < n.index) && p.createSlide(e - 1)),
                        p.current = n,
                        p.currIndex = n.index,
                        p.currPos = n.pos,
                        p.trigger("beforeShow", t),
                        p.updateControls(),
                        n.forcedDuration = g,
                        v.isNumeric(s) ? n.forcedDuration = s : s = n.opts[t ? "animationDuration" : "transitionDuration"],
                        s = parseInt(s, 10),
                        i = p.isMoved(n),
                        n.$slide.addClass("fancybox-slide--current"),
                        t)
                            return n.opts.animationEffect && s && p.$refs.container.css("transition-duration", s + "ms"),
                            p.$refs.container.addClass("fancybox-is-open").trigger("focus"),
                            p.loadSlide(n),
                            void p.preload("image");
                        r = v.fancybox.getTranslate(o.$slide),
                        l = v.fancybox.getTranslate(p.$refs.stage),
                        v.each(p.slides, function(e, t) {
                            v.fancybox.stop(t.$slide, !0)
                        }),
                        o.pos !== n.pos && (o.isComplete = !1),
                        o.$slide.removeClass("fancybox-slide--complete fancybox-slide--current"),
                        i ? (c = r.left - (o.pos * r.width + o.pos * o.opts.gutter),
                        v.each(p.slides, function(e, t) {
                            t.$slide.removeClass("fancybox-animated").removeClass(function(e, t) {
                                return (t.match(/(^|\s)fancybox-fx-\S+/g) || []).join(" ")
                            });
                            var i = t.pos * r.width + t.pos * t.opts.gutter;
                            v.fancybox.setTranslate(t.$slide, {
                                top: 0,
                                left: i - l.left + c
                            }),
                            t.pos !== n.pos && t.$slide.addClass("fancybox-slide--" + (t.pos > n.pos ? "next" : "previous")),
                            f(t.$slide),
                            v.fancybox.animate(t.$slide, {
                                top: 0,
                                left: (t.pos - n.pos) * r.width + (t.pos - n.pos) * t.opts.gutter
                            }, s, function() {
                                t.$slide.css({
                                    transform: "",
                                    opacity: ""
                                }).removeClass("fancybox-slide--next fancybox-slide--previous"),
                                t.pos === p.currPos && p.complete()
                            })
                        })) : s && n.opts.transitionEffect && (d = "fancybox-animated fancybox-fx-" + n.opts.transitionEffect,
                        o.$slide.addClass("fancybox-slide--" + (o.pos > n.pos ? "next" : "previous")),
                        v.fancybox.animate(o.$slide, d, s, function() {
                            o.$slide.removeClass(d).removeClass("fancybox-slide--next fancybox-slide--previous")
                        }, !1)),
                        n.isLoaded ? p.revealContent(n) : p.loadSlide(n),
                        p.preload("image")
                    }
                },
                createSlide: function(e) {
                    var t, i, s = this;
                    return i = (i = e % s.group.length) < 0 ? s.group.length + i : i,
                    !s.slides[e] && s.group[i] && (t = v('<div class="fancybox-slide"></div>').appendTo(s.$refs.stage),
                    s.slides[e] = v.extend(!0, {}, s.group[i], {
                        pos: e,
                        $slide: t,
                        isLoaded: !1
                    }),
                    s.updateSlide(s.slides[e])),
                    s.slides[e]
                },
                scaleToActual: function(e, t, i) {
                    var s, a, n, o, r, l = this, d = l.current, c = d.$content, p = v.fancybox.getTranslate(d.$slide).width, u = v.fancybox.getTranslate(d.$slide).height, h = d.width, f = d.height;
                    l.isAnimating || l.isMoved() || !c || "image" != d.type || !d.isLoaded || d.hasError || (l.isAnimating = !0,
                    v.fancybox.stop(c),
                    e = e === g ? .5 * p : e,
                    t = t === g ? .5 * u : t,
                    (s = v.fancybox.getTranslate(c)).top -= v.fancybox.getTranslate(d.$slide).top,
                    s.left -= v.fancybox.getTranslate(d.$slide).left,
                    o = h / s.width,
                    r = f / s.height,
                    a = .5 * p - .5 * h,
                    n = .5 * u - .5 * f,
                    p < h && (0 < (a = s.left * o - (e * o - e)) && (a = 0),
                    a < p - h && (a = p - h)),
                    u < f && (0 < (n = s.top * r - (t * r - t)) && (n = 0),
                    n < u - f && (n = u - f)),
                    l.updateCursor(h, f),
                    v.fancybox.animate(c, {
                        top: n,
                        left: a,
                        scaleX: o,
                        scaleY: r
                    }, i || 366, function() {
                        l.isAnimating = !1
                    }),
                    l.SlideShow && l.SlideShow.isActive && l.SlideShow.stop())
                },
                scaleToFit: function(e) {
                    var t, i = this, s = i.current, a = s.$content;
                    i.isAnimating || i.isMoved() || !a || "image" != s.type || !s.isLoaded || s.hasError || (i.isAnimating = !0,
                    v.fancybox.stop(a),
                    t = i.getFitPos(s),
                    i.updateCursor(t.width, t.height),
                    v.fancybox.animate(a, {
                        top: t.top,
                        left: t.left,
                        scaleX: t.width / a.width(),
                        scaleY: t.height / a.height()
                    }, e || 366, function() {
                        i.isAnimating = !1
                    }))
                },
                getFitPos: function(e) {
                    var t, i, s, a, n = e.$content, o = e.$slide, r = e.width || e.opts.width, l = e.height || e.opts.height, d = {};
                    return !!(e.isLoaded && n && n.length) && (t = v.fancybox.getTranslate(this.$refs.stage).width,
                    i = v.fancybox.getTranslate(this.$refs.stage).height,
                    t -= parseFloat(o.css("paddingLeft")) + parseFloat(o.css("paddingRight")) + parseFloat(n.css("marginLeft")) + parseFloat(n.css("marginRight")),
                    i -= parseFloat(o.css("paddingTop")) + parseFloat(o.css("paddingBottom")) + parseFloat(n.css("marginTop")) + parseFloat(n.css("marginBottom")),
                    r && l || (r = t,
                    l = i),
                    t - .5 < (r *= s = Math.min(1, t / r, i / l)) && (r = t),
                    i - .5 < (l *= s) && (l = i),
                    "image" === e.type ? (d.top = Math.floor(.5 * (i - l)) + parseFloat(o.css("paddingTop")),
                    d.left = Math.floor(.5 * (t - r)) + parseFloat(o.css("paddingLeft"))) : "video" === e.contentType && (r / (a = e.opts.width && e.opts.height ? r / l : e.opts.ratio || 16 / 9) < l ? l = r / a : l * a < r && (r = l * a)),
                    d.width = r,
                    d.height = l,
                    d)
                },
                update: function(i) {
                    var s = this;
                    v.each(s.slides, function(e, t) {
                        s.updateSlide(t, i)
                    })
                },
                updateSlide: function(e, t) {
                    var i = this
                      , s = e && e.$content
                      , a = e.width || e.opts.width
                      , n = e.height || e.opts.height
                      , o = e.$slide;
                    i.adjustCaption(e),
                    s && (a || n || "video" === e.contentType) && !e.hasError && (v.fancybox.stop(s),
                    v.fancybox.setTranslate(s, i.getFitPos(e)),
                    e.pos === i.currPos && (i.isAnimating = !1,
                    i.updateCursor())),
                    i.adjustLayout(e),
                    o.length && (o.trigger("refresh"),
                    e.pos === i.currPos && i.$refs.toolbar.add(i.$refs.navigation.find(".fancybox-button--arrow_right")).toggleClass("compensate-for-scrollbar", o.get(0).scrollHeight > o.get(0).clientHeight)),
                    i.trigger("onUpdate", e, t)
                },
                centerSlide: function(e) {
                    var t = this
                      , i = t.current
                      , s = i.$slide;
                    !t.isClosing && i && (s.siblings().css({
                        transform: "",
                        opacity: ""
                    }),
                    s.parent().children().removeClass("fancybox-slide--previous fancybox-slide--next"),
                    v.fancybox.animate(s, {
                        top: 0,
                        left: 0,
                        opacity: 1
                    }, e === g ? 0 : e, function() {
                        s.css({
                            transform: "",
                            opacity: ""
                        }),
                        i.isComplete || t.complete()
                    }, !1))
                },
                isMoved: function(e) {
                    var t, i, s = e || this.current;
                    return !!s && (i = v.fancybox.getTranslate(this.$refs.stage),
                    t = v.fancybox.getTranslate(s.$slide),
                    !s.$slide.hasClass("fancybox-animated") && (.5 < Math.abs(t.top - i.top) || .5 < Math.abs(t.left - i.left)))
                },
                updateCursor: function(e, t) {
                    var i, s, a = this, n = a.current, o = a.$refs.container;
                    n && !a.isClosing && a.Guestures && (o.removeClass("fancybox-is-zoomable fancybox-can-zoomIn fancybox-can-zoomOut fancybox-can-swipe fancybox-can-pan"),
                    s = !!(i = a.canPan(e, t)) || a.isZoomable(),
                    o.toggleClass("fancybox-is-zoomable", s),
                    v("[data-fancybox-zoom]").prop("disabled", !s),
                    i ? o.addClass("fancybox-can-pan") : s && ("zoom" === n.opts.clickContent || v.isFunction(n.opts.clickContent) && "zoom" == n.opts.clickContent(n)) ? o.addClass("fancybox-can-zoomIn") : n.opts.touch && (n.opts.touch.vertical || 1 < a.group.length) && "video" !== n.contentType && o.addClass("fancybox-can-swipe"))
                },
                isZoomable: function() {
                    var e, t = this.current;
                    if (t && !this.isClosing && "image" === t.type && !t.hasError) {
                        if (!t.isLoaded)
                            return !0;
                        if ((e = this.getFitPos(t)) && (t.width > e.width || t.height > e.height))
                            return !0
                    }
                    return !1
                },
                isScaledDown: function(e, t) {
                    var i = !1
                      , s = this.current
                      , a = s.$content;
                    return e !== g && t !== g ? i = e < s.width && t < s.height : a && (i = (i = v.fancybox.getTranslate(a)).width < s.width && i.height < s.height),
                    i
                },
                canPan: function(e, t) {
                    var i = this.current
                      , s = null
                      , a = !1;
                    return "image" === i.type && (i.isComplete || e && t) && !i.hasError && (a = this.getFitPos(i),
                    e !== g && t !== g ? s = {
                        width: e,
                        height: t
                    } : i.isComplete && (s = v.fancybox.getTranslate(i.$content)),
                    s && a && (a = 1.5 < Math.abs(s.width - a.width) || 1.5 < Math.abs(s.height - a.height))),
                    a
                },
                loadSlide: function(i) {
                    var e, t, s, a = this;
                    if (!i.isLoading && !i.isLoaded) {
                        if (!(i.isLoading = !0) === a.trigger("beforeLoad", i))
                            return i.isLoading = !1;
                        switch (e = i.type,
                        (t = i.$slide).off("refresh").trigger("onReset").addClass(i.opts.slideClass),
                        e) {
                        case "image":
                            a.setImage(i);
                            break;
                        case "iframe":
                            a.setIframe(i);
                            break;
                        case "html":
                            a.setContent(i, i.src || i.content);
                            break;
                        case "video":
                            a.setContent(i, i.opts.video.tpl.replace(/\{\{src\}\}/gi, i.src).replace("{{format}}", i.opts.videoFormat || i.opts.video.format || "").replace("{{poster}}", i.thumb || ""));
                            break;
                        case "inline":
                            v(i.src).length ? a.setContent(i, v(i.src)) : a.setError(i);
                            break;
                        case "ajax":
                            a.showLoading(i),
                            s = v.ajax(v.extend({}, i.opts.ajax.settings, {
                                url: i.src,
                                success: function(e, t) {
                                    "success" === t && a.setContent(i, e)
                                },
                                error: function(e, t) {
                                    e && "abort" !== t && a.setError(i)
                                }
                            })),
                            t.one("onReset", function() {
                                s.abort()
                            });
                            break;
                        default:
                            a.setError(i)
                        }
                        return !0
                    }
                },
                setImage: function(t) {
                    var e, i = this;
                    setTimeout(function() {
                        var e = t.$image;
                        i.isClosing || !t.isLoading || e && e.length && e[0].complete || t.hasError || i.showLoading(t)
                    }, 50),
                    i.checkSrcset(t),
                    t.$content = v('<div class="fancybox-content"></div>').addClass("fancybox-is-hidden").appendTo(t.$slide.addClass("fancybox-slide--image")),
                    !1 !== t.opts.preload && t.opts.width && t.opts.height && t.thumb && (t.width = t.opts.width,
                    t.height = t.opts.height,
                    (e = p.createElement("img")).onerror = function() {
                        v(this).remove(),
                        t.$ghost = null
                    }
                    ,
                    e.onload = function() {
                        i.afterLoad(t)
                    }
                    ,
                    t.$ghost = v(e).addClass("fancybox-image").appendTo(t.$content).attr("src", t.thumb)),
                    i.setBigImage(t)
                },
                checkSrcset: function(e) {
                    var t, i, s, a, n = e.opts.srcset || e.opts.image.srcset;
                    if (n) {
                        s = l.devicePixelRatio || 1,
                        a = l.innerWidth * s,
                        (i = n.split(",").map(function(e) {
                            var s = {};
                            return e.trim().split(/\s+/).forEach(function(e, t) {
                                var i = parseInt(e.substring(0, e.length - 1), 10);
                                if (0 === t)
                                    return s.url = e;
                                i && (s.value = i,
                                s.postfix = e[e.length - 1])
                            }),
                            s
                        })).sort(function(e, t) {
                            return e.value - t.value
                        });
                        for (var o = 0; o < i.length; o++) {
                            var r = i[o];
                            if ("w" === r.postfix && r.value >= a || "x" === r.postfix && r.value >= s) {
                                t = r;
                                break
                            }
                        }
                        !t && i.length && (t = i[i.length - 1]),
                        t && (e.src = t.url,
                        e.width && e.height && "w" == t.postfix && (e.height = e.width / e.height * t.value,
                        e.width = t.value),
                        e.opts.srcset = n)
                    }
                },
                setBigImage: function(t) {
                    var i = this
                      , e = p.createElement("img")
                      , s = v(e);
                    t.$image = s.one("error", function() {
                        i.setError(t)
                    }).one("load", function() {
                        var e;
                        t.$ghost || (i.resolveImageSlideSize(t, this.naturalWidth, this.naturalHeight),
                        i.afterLoad(t)),
                        i.isClosing || (t.opts.srcset && ((e = t.opts.sizes) && "auto" !== e || (e = (1 < t.width / t.height && 1 < o.width() / o.height() ? "100" : Math.round(t.width / t.height * 100)) + "vw"),
                        s.attr("sizes", e).attr("srcset", t.opts.srcset)),
                        t.$ghost && setTimeout(function() {
                            t.$ghost && !i.isClosing && t.$ghost.hide()
                        }, Math.min(300, Math.max(1e3, t.height / 1600))),
                        i.hideLoading(t))
                    }).addClass("fancybox-image").attr("src", t.src).appendTo(t.$content),
                    (e.complete || "complete" == e.readyState) && s.naturalWidth && s.naturalHeight ? s.trigger("load") : e.error && s.trigger("error")
                },
                resolveImageSlideSize: function(e, t, i) {
                    var s = parseInt(e.opts.width, 10)
                      , a = parseInt(e.opts.height, 10);
                    e.width = t,
                    e.height = i,
                    0 < s && (e.width = s,
                    e.height = Math.floor(s * i / t)),
                    0 < a && (e.width = Math.floor(a * t / i),
                    e.height = a)
                },
                setIframe: function(a) {
                    var n, t = this, o = a.opts.iframe, r = a.$slide;
                    a.$content = v('<div class="fancybox-content' + (o.preload ? " fancybox-is-hidden" : "") + '"></div>').css(o.css).appendTo(r),
                    r.addClass("fancybox-slide--" + a.contentType),
                    a.$iframe = n = v(o.tpl.replace(/\{rnd\}/g, (new Date).getTime())).attr(o.attr).appendTo(a.$content),
                    o.preload ? (t.showLoading(a),
                    n.on("load.fb error.fb", function(e) {
                        this.isReady = 1,
                        a.$slide.trigger("refresh"),
                        t.afterLoad(a)
                    }),
                    r.on("refresh.fb", function() {
                        var e, t = a.$content, i = o.css.width, s = o.css.height;
                        if (1 === n[0].isReady) {
                            try {
                                e = n.contents().find("body")
                            } catch (e) {}
                            e && e.length && e.children().length && (r.css("overflow", "visible"),
                            t.css({
                                width: "100%",
                                "max-width": "100%",
                                height: "9999px"
                            }),
                            i === g && (i = Math.ceil(Math.max(e[0].clientWidth, e.outerWidth(!0)))),
                            t.css("width", i || "").css("max-width", ""),
                            s === g && (s = Math.ceil(Math.max(e[0].clientHeight, e.outerHeight(!0)))),
                            t.css("height", s || ""),
                            r.css("overflow", "auto")),
                            t.removeClass("fancybox-is-hidden")
                        }
                    })) : t.afterLoad(a),
                    n.attr("src", a.src),
                    r.one("onReset", function() {
                        try {
                            v(this).find("iframe").hide().unbind().attr("src", "//about:blank")
                        } catch (e) {}
                        v(this).off("refresh.fb").empty(),
                        a.isLoaded = !1,
                        a.isRevealed = !1
                    })
                },
                setContent: function(e, t) {
                    var i;
                    this.isClosing || (this.hideLoading(e),
                    e.$content && v.fancybox.stop(e.$content),
                    e.$slide.empty(),
                    (i = t) && i.hasOwnProperty && i instanceof v && t.parent().length ? ((t.hasClass("fancybox-content") || t.parent().hasClass("fancybox-content")) && t.parents(".fancybox-slide").trigger("onReset"),
                    e.$placeholder = v("<div>").hide().insertAfter(t),
                    t.css("display", "inline-block")) : e.hasError || ("string" === v.type(t) && (t = v("<div>").append(v.trim(t)).contents()),
                    e.opts.filter && (t = v("<div>").html(t).find(e.opts.filter))),
                    e.$slide.one("onReset", function() {
                        v(this).find("video,audio").trigger("pause"),
                        e.$placeholder && (e.$placeholder.after(t.removeClass("fancybox-content").hide()).remove(),
                        e.$placeholder = null),
                        e.$smallBtn && (e.$smallBtn.remove(),
                        e.$smallBtn = null),
                        e.hasError || (v(this).empty(),
                        e.isLoaded = !1,
                        e.isRevealed = !1)
                    }),
                    v(t).appendTo(e.$slide),
                    v(t).is("video,audio") && (v(t).addClass("fancybox-video"),
                    v(t).wrap("<div></div>"),
                    e.contentType = "video",
                    e.opts.width = e.opts.width || v(t).attr("width"),
                    e.opts.height = e.opts.height || v(t).attr("height")),
                    e.$content = e.$slide.children().filter("div,form,main,video,audio,article,.fancybox-content").first(),
                    e.$content.siblings().hide(),
                    e.$content.length || (e.$content = e.$slide.wrapInner("<div></div>").children().first()),
                    e.$content.addClass("fancybox-content"),
                    e.$slide.addClass("fancybox-slide--" + e.contentType),
                    this.afterLoad(e))
                },
                setError: function(e) {
                    e.hasError = !0,
                    e.$slide.trigger("onReset").removeClass("fancybox-slide--" + e.contentType).addClass("fancybox-slide--error"),
                    e.contentType = "html",
                    this.setContent(e, this.translate(e, e.opts.errorTpl)),
                    e.pos === this.currPos && (this.isAnimating = !1)
                },
                showLoading: function(e) {
                    (e = e || this.current) && !e.$spinner && (e.$spinner = v(this.translate(this, this.opts.spinnerTpl)).appendTo(e.$slide).hide().fadeIn("fast"))
                },
                hideLoading: function(e) {
                    (e = e || this.current) && e.$spinner && (e.$spinner.stop().remove(),
                    delete e.$spinner)
                },
                afterLoad: function(e) {
                    var t = this;
                    t.isClosing || (e.isLoading = !1,
                    e.isLoaded = !0,
                    t.trigger("afterLoad", e),
                    t.hideLoading(e),
                    !e.opts.smallBtn || e.$smallBtn && e.$smallBtn.length || (e.$smallBtn = v(t.translate(e, e.opts.btnTpl.smallBtn)).appendTo(e.$content)),
                    e.opts.protect && e.$content && !e.hasError && (e.$content.on("contextmenu.fb", function(e) {
                        return 2 == e.button && e.preventDefault(),
                        !0
                    }),
                    "image" === e.type && v('<div class="fancybox-spaceball"></div>').appendTo(e.$content)),
                    t.adjustCaption(e),
                    t.adjustLayout(e),
                    e.pos === t.currPos && t.updateCursor(),
                    t.revealContent(e))
                },
                adjustCaption: function(e) {
                    var t, i = this, s = e || i.current, a = s.opts.caption, n = s.opts.preventCaptionOverlap, o = i.$refs.caption, r = !1;
                    o.toggleClass("fancybox-caption--separate", n),
                    n && a && a.length && (s.pos !== i.currPos ? ((t = o.clone().appendTo(o.parent())).children().eq(0).empty().html(a),
                    r = t.outerHeight(!0),
                    t.empty().remove()) : i.$caption && (r = i.$caption.outerHeight(!0)),
                    s.$slide.css("padding-bottom", r || ""))
                },
                adjustLayout: function(e) {
                    var t, i, s, a, n = e || this.current;
                    n.isLoaded && !0 !== n.opts.disableLayoutFix && (n.$content.css("margin-bottom", ""),
                    n.$content.outerHeight() > n.$slide.height() + .5 && (s = n.$slide[0].style["padding-bottom"],
                    a = n.$slide.css("padding-bottom"),
                    0 < parseFloat(a) && (t = n.$slide[0].scrollHeight,
                    n.$slide.css("padding-bottom", 0),
                    Math.abs(t - n.$slide[0].scrollHeight) < 1 && (i = a),
                    n.$slide.css("padding-bottom", s))),
                    n.$content.css("margin-bottom", i))
                },
                revealContent: function(e) {
                    var t, i, s, a, n = this, o = e.$slide, r = !1, l = !1, d = n.isMoved(e), c = e.isRevealed;
                    return e.isRevealed = !0,
                    t = e.opts[n.firstRun ? "animationEffect" : "transitionEffect"],
                    s = e.opts[n.firstRun ? "animationDuration" : "transitionDuration"],
                    s = parseInt(e.forcedDuration === g ? s : e.forcedDuration, 10),
                    !d && e.pos === n.currPos && s || (t = !1),
                    "zoom" === t && (e.pos === n.currPos && s && "image" === e.type && !e.hasError && (l = n.getThumbPos(e)) ? r = n.getFitPos(e) : t = "fade"),
                    "zoom" === t ? (n.isAnimating = !0,
                    r.scaleX = r.width / l.width,
                    r.scaleY = r.height / l.height,
                    "auto" == (a = e.opts.zoomOpacity) && (a = .1 < Math.abs(e.width / e.height - l.width / l.height)),
                    a && (l.opacity = .1,
                    r.opacity = 1),
                    v.fancybox.setTranslate(e.$content.removeClass("fancybox-is-hidden"), l),
                    f(e.$content),
                    void v.fancybox.animate(e.$content, r, s, function() {
                        n.isAnimating = !1,
                        n.complete()
                    })) : (n.updateSlide(e),
                    t ? (v.fancybox.stop(o),
                    i = "fancybox-slide--" + (e.pos >= n.prevPos ? "next" : "previous") + " fancybox-animated fancybox-fx-" + t,
                    o.addClass(i).removeClass("fancybox-slide--current"),
                    e.$content.removeClass("fancybox-is-hidden"),
                    f(o),
                    "image" !== e.type && e.$content.hide().show(0),
                    void v.fancybox.animate(o, "fancybox-slide--current", s, function() {
                        o.removeClass(i).css({
                            transform: "",
                            opacity: ""
                        }),
                        e.pos === n.currPos && n.complete()
                    }, !0)) : (e.$content.removeClass("fancybox-is-hidden"),
                    c || !d || "image" !== e.type || e.hasError || e.$content.hide().fadeIn("fast"),
                    void (e.pos === n.currPos && n.complete())))
                },
                getThumbPos: function(e) {
                    var t, i, s, a, n, o, r, l, d, c = e.$thumb;
                    return !!(c && (r = c[0]) && r.ownerDocument === p && (v(".fancybox-container").css("pointer-events", "none"),
                    l = {
                        x: r.getBoundingClientRect().left + r.offsetWidth / 2,
                        y: r.getBoundingClientRect().top + r.offsetHeight / 2
                    },
                    d = p.elementFromPoint(l.x, l.y) === r,
                    v(".fancybox-container").css("pointer-events", ""),
                    d)) && (i = v.fancybox.getTranslate(c),
                    s = parseFloat(c.css("border-top-width") || 0),
                    a = parseFloat(c.css("border-right-width") || 0),
                    n = parseFloat(c.css("border-bottom-width") || 0),
                    o = parseFloat(c.css("border-left-width") || 0),
                    t = {
                        top: i.top + s,
                        left: i.left + o,
                        width: i.width - a - o,
                        height: i.height - s - n,
                        scaleX: 1,
                        scaleY: 1
                    },
                    0 < i.width && 0 < i.height && t)
                },
                complete: function() {
                    var e, i = this, t = i.current, s = {};
                    !i.isMoved() && t.isLoaded && (t.isComplete || (t.isComplete = !0,
                    t.$slide.siblings().trigger("onReset"),
                    i.preload("inline"),
                    f(t.$slide),
                    t.$slide.addClass("fancybox-slide--complete"),
                    v.each(i.slides, function(e, t) {
                        t.pos >= i.currPos - 1 && t.pos <= i.currPos + 1 ? s[t.pos] = t : t && (v.fancybox.stop(t.$slide),
                        t.$slide.off().remove())
                    }),
                    i.slides = s),
                    i.isAnimating = !1,
                    i.updateCursor(),
                    i.trigger("afterShow"),
                    t.opts.video.autoStart && t.$slide.find("video,audio").filter(":visible:first").trigger("play").one("ended", function() {
                        Document.exitFullscreen ? Document.exitFullscreen() : this.webkitExitFullscreen && this.webkitExitFullscreen(),
                        i.next()
                    }),
                    t.opts.autoFocus && "html" === t.contentType && ((e = t.$content.find("input[autofocus]:enabled:visible:first")).length ? e.trigger("focus") : i.focus(null, !0)),
                    t.$slide.scrollTop(0).scrollLeft(0))
                },
                preload: function(e) {
                    var t, i, s = this;
                    s.group.length < 2 || (i = s.slides[s.currPos + 1],
                    (t = s.slides[s.currPos - 1]) && t.type === e && s.loadSlide(t),
                    i && i.type === e && s.loadSlide(i))
                },
                focus: function(e, t) {
                    var i, s, a = this, n = ["a[href]", "area[href]", 'input:not([disabled]):not([type="hidden"]):not([aria-hidden])', "select:not([disabled]):not([aria-hidden])", "textarea:not([disabled]):not([aria-hidden])", "button:not([disabled]):not([aria-hidden])", "iframe", "object", "embed", "video", "audio", "[contenteditable]", '[tabindex]:not([tabindex^="-"])'].join(",");
                    a.isClosing || ((i = (i = !e && a.current && a.current.isComplete ? a.current.$slide.find("*:visible" + (t ? ":not(.fancybox-close-small)" : "")) : a.$refs.container.find("*:visible")).filter(n).filter(function() {
                        return "hidden" !== v(this).css("visibility") && !v(this).hasClass("disabled")
                    })).length ? (s = i.index(p.activeElement),
                    e && e.shiftKey ? (s < 0 || 0 == s) && (e.preventDefault(),
                    i.eq(i.length - 1).trigger("focus")) : (s < 0 || s == i.length - 1) && (e && e.preventDefault(),
                    i.eq(0).trigger("focus"))) : a.$refs.container.trigger("focus"))
                },
                activate: function() {
                    var t = this;
                    v(".fancybox-container").each(function() {
                        var e = v(this).data("FancyBox");
                        e && e.id !== t.id && !e.isClosing && (e.trigger("onDeactivate"),
                        e.removeEvents(),
                        e.isVisible = !1)
                    }),
                    t.isVisible = !0,
                    (t.current || t.isIdle) && (t.update(),
                    t.updateControls()),
                    t.trigger("onActivate"),
                    t.addEvents()
                },
                close: function(e, t) {
                    var i, s, a, n, o, r, l, d = this, c = d.current, p = function() {
                        d.cleanUp(e)
                    };
                    return !d.isClosing && (!(d.isClosing = !0) === d.trigger("beforeClose", e) ? (d.isClosing = !1,
                    u(function() {
                        d.update()
                    }),
                    !1) : (d.removeEvents(),
                    a = c.$content,
                    i = c.opts.animationEffect,
                    s = v.isNumeric(t) ? t : i ? c.opts.animationDuration : 0,
                    c.$slide.removeClass("fancybox-slide--complete fancybox-slide--next fancybox-slide--previous fancybox-animated"),
                    !0 !== e ? v.fancybox.stop(c.$slide) : i = !1,
                    c.$slide.siblings().trigger("onReset").remove(),
                    s && d.$refs.container.removeClass("fancybox-is-open").addClass("fancybox-is-closing").css("transition-duration", s + "ms"),
                    d.hideLoading(c),
                    d.hideControls(!0),
                    d.updateCursor(),
                    "zoom" !== i || a && s && "image" === c.type && !d.isMoved() && !c.hasError && (l = d.getThumbPos(c)) || (i = "fade"),
                    "zoom" === i ? (v.fancybox.stop(a),
                    r = {
                        top: (n = v.fancybox.getTranslate(a)).top,
                        left: n.left,
                        scaleX: n.width / l.width,
                        scaleY: n.height / l.height,
                        width: l.width,
                        height: l.height
                    },
                    "auto" == (o = c.opts.zoomOpacity) && (o = .1 < Math.abs(c.width / c.height - l.width / l.height)),
                    o && (l.opacity = 0),
                    v.fancybox.setTranslate(a, r),
                    f(a),
                    v.fancybox.animate(a, l, s, p)) : i && s ? v.fancybox.animate(c.$slide.addClass("fancybox-slide--previous").removeClass("fancybox-slide--current"), "fancybox-animated fancybox-fx-" + i, s, p) : !0 === e ? setTimeout(p, s) : p(),
                    !0))
                },
                cleanUp: function(e) {
                    var t, i, s, a = this, n = a.current.opts.$orig;
                    a.current.$slide.trigger("onReset"),
                    a.$refs.container.empty().remove(),
                    a.trigger("afterClose", e),
                    a.current.opts.backFocus && (n && n.length && n.is(":visible") || (n = a.$trigger),
                    n && n.length && (i = l.scrollX,
                    s = l.scrollY,
                    n.trigger("focus"),
                    v("html, body").scrollTop(s).scrollLeft(i))),
                    a.current = null,
                    (t = v.fancybox.getInstance()) ? t.activate() : (v("body").removeClass("fancybox-active compensate-for-scrollbar"),
                    v("#fancybox-style-noscroll").remove())
                },
                trigger: function(e, t) {
                    var i, s = Array.prototype.slice.call(arguments, 1), a = this, n = t && t.opts ? t : a.current;
                    if (n ? s.unshift(n) : n = a,
                    s.unshift(a),
                    v.isFunction(n.opts[e]) && (i = n.opts[e].apply(n, s)),
                    !1 === i)
                        return i;
                    "afterClose" !== e && a.$refs ? a.$refs.container.trigger(e + ".fb", s) : r.trigger(e + ".fb", s)
                },
                updateControls: function() {
                    var e = this
                      , t = e.current
                      , i = t.index
                      , s = e.$refs.container
                      , a = e.$refs.caption
                      , n = t.opts.caption;
                    t.$slide.trigger("refresh"),
                    n && n.length ? (e.$caption = a).children().eq(0).html(n) : e.$caption = null,
                    e.hasHiddenControls || e.isIdle || e.showControls(),
                    s.find("[data-fancybox-count]").html(e.group.length),
                    s.find("[data-fancybox-index]").html(i + 1),
                    s.find("[data-fancybox-prev]").prop("disabled", !t.opts.loop && i <= 0),
                    s.find("[data-fancybox-next]").prop("disabled", !t.opts.loop && i >= e.group.length - 1),
                    "image" === t.type ? s.find("[data-fancybox-zoom]").show().end().find("[data-fancybox-download]").attr("href", t.opts.image.src || t.src).show() : t.opts.toolbar && s.find("[data-fancybox-download],[data-fancybox-zoom]").hide(),
                    v(p.activeElement).is(":hidden,[disabled]") && e.$refs.container.trigger("focus")
                },
                hideControls: function(e) {
                    var t = ["infobar", "toolbar", "nav"];
                    !e && this.current.opts.preventCaptionOverlap || t.push("caption"),
                    this.$refs.container.removeClass(t.map(function(e) {
                        return "fancybox-show-" + e
                    }).join(" ")),
                    this.hasHiddenControls = !0
                },
                showControls: function() {
                    var e = this
                      , t = e.current ? e.current.opts : e.opts
                      , i = e.$refs.container;
                    e.hasHiddenControls = !1,
                    e.idleSecondsCounter = 0,
                    i.toggleClass("fancybox-show-toolbar", !(!t.toolbar || !t.buttons)).toggleClass("fancybox-show-infobar", !!(t.infobar && 1 < e.group.length)).toggleClass("fancybox-show-caption", !!e.$caption).toggleClass("fancybox-show-nav", !!(t.arrows && 1 < e.group.length)).toggleClass("fancybox-is-modal", !!t.modal)
                },
                toggleControls: function() {
                    this.hasHiddenControls ? this.showControls() : this.hideControls()
                }
            }),
            v.fancybox = {
                version: "3.5.7",
                defaults: n,
                getInstance: function(e) {
                    var t = v('.fancybox-container:not(".fancybox-is-closing"):last').data("FancyBox")
                      , i = Array.prototype.slice.call(arguments, 1);
                    return t instanceof b && ("string" === v.type(e) ? t[e].apply(t, i) : "function" === v.type(e) && e.apply(t, i),
                    t)
                },
                open: function(e, t, i) {
                    return new b(e,t,i)
                },
                close: function(e) {
                    var t = this.getInstance();
                    t && (t.close(),
                    !0 === e && this.close(e))
                },
                destroy: function() {
                    this.close(!0),
                    r.add("body").off("click.fb-start", "**")
                },
                isMobile: /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),
                use3d: (e = p.createElement("div"),
                l.getComputedStyle && l.getComputedStyle(e) && l.getComputedStyle(e).getPropertyValue("transform") && !(p.documentMode && p.documentMode < 11)),
                getTranslate: function(e) {
                    var t;
                    return !(!e || !e.length) && {
                        top: (t = e[0].getBoundingClientRect()).top || 0,
                        left: t.left || 0,
                        width: t.width,
                        height: t.height,
                        opacity: parseFloat(e.css("opacity"))
                    }
                },
                setTranslate: function(e, t) {
                    var i = ""
                      , s = {};
                    if (e && t)
                        return t.left === g && t.top === g || (i = (t.left === g ? e.position().left : t.left) + "px, " + (t.top === g ? e.position().top : t.top) + "px",
                        i = this.use3d ? "translate3d(" + i + ", 0px)" : "translate(" + i + ")"),
                        t.scaleX !== g && t.scaleY !== g ? i += " scale(" + t.scaleX + ", " + t.scaleY + ")" : t.scaleX !== g && (i += " scaleX(" + t.scaleX + ")"),
                        i.length && (s.transform = i),
                        t.opacity !== g && (s.opacity = t.opacity),
                        t.width !== g && (s.width = t.width),
                        t.height !== g && (s.height = t.height),
                        e.css(s)
                },
                animate: function(t, i, s, a, n) {
                    var o, r = this;
                    v.isFunction(s) && (a = s,
                    s = null),
                    r.stop(t),
                    o = r.getTranslate(t),
                    t.on(h, function(e) {
                        (!e || !e.originalEvent || t.is(e.originalEvent.target) && "z-index" != e.originalEvent.propertyName) && (r.stop(t),
                        v.isNumeric(s) && t.css("transition-duration", ""),
                        v.isPlainObject(i) ? i.scaleX !== g && i.scaleY !== g && r.setTranslate(t, {
                            top: i.top,
                            left: i.left,
                            width: o.width * i.scaleX,
                            height: o.height * i.scaleY,
                            scaleX: 1,
                            scaleY: 1
                        }) : !0 !== n && t.removeClass(i),
                        v.isFunction(a) && a(e))
                    }),
                    v.isNumeric(s) && t.css("transition-duration", s + "ms"),
                    v.isPlainObject(i) ? (i.scaleX !== g && i.scaleY !== g && (delete i.width,
                    delete i.height,
                    t.parent().hasClass("fancybox-slide--image") && t.parent().addClass("fancybox-is-scaling")),
                    v.fancybox.setTranslate(t, i)) : t.addClass(i),
                    t.data("timer", setTimeout(function() {
                        t.trigger(h)
                    }, s + 33))
                },
                stop: function(e, t) {
                    e && e.length && (clearTimeout(e.data("timer")),
                    t && e.trigger(h),
                    e.off(h).css("transition-duration", ""),
                    e.parent().removeClass("fancybox-is-scaling"))
                }
            },
            v.fn.fancybox = function(e) {
                var t;
                return (t = (e = e || {}).selector || !1) ? v("body").off("click.fb-start", t).on("click.fb-start", t, {
                    options: e
                }, i) : this.off("click.fb-start").on("click.fb-start", {
                    items: this,
                    options: e
                }, i),
                this
            }
            ,
            r.on("click.fb-start", "[data-fancybox]", i),
            r.on("click.fb-start", "[data-fancybox-trigger]", function(e) {
                v('[data-fancybox="' + v(this).attr("data-fancybox-trigger") + '"]').eq(v(this).attr("data-fancybox-index") || 0).trigger("click.fb-start", {
                    $trigger: v(this)
                })
            }),
            t = ".fancybox-button",
            s = "fancybox-focus",
            a = null,
            r.on("mousedown mouseup focus blur", t, function(e) {
                switch (e.type) {
                case "mousedown":
                    a = v(this);
                    break;
                case "mouseup":
                    a = null;
                    break;
                case "focusin":
                    v(t).removeClass(s),
                    v(this).is(a) || v(this).is("[disabled]") || v(this).addClass(s);
                    break;
                case "focusout":
                    v(t).removeClass(s)
                }
            })
        }
}(window, document, jQuery),
function(h) {
    "use strict";
    var s = {
        youtube: {
            matcher: /(youtube\.com|youtu\.be|youtube\-nocookie\.com)\/(watch\?(.*&)?v=|v\/|u\/|embed\/?)?(videoseries\?list=(.*)|[\w-]{11}|\?listType=(.*)&list=(.*))(.*)/i,
            params: {
                autoplay: 1,
                autohide: 1,
                fs: 1,
                rel: 0,
                hd: 1,
                wmode: "transparent",
                enablejsapi: 1,
                html5: 1
            },
            paramPlace: 8,
            type: "iframe",
            url: "https://www.youtube-nocookie.com/embed/$4",
            thumb: "https://img.youtube.com/vi/$4/hqdefault.jpg"
        },
        vimeo: {
            matcher: /^.+vimeo.com\/(.*\/)?([\d]+)(.*)?/,
            params: {
                autoplay: 1,
                hd: 1,
                show_title: 1,
                show_byline: 1,
                show_portrait: 0,
                fullscreen: 1
            },
            paramPlace: 3,
            type: "iframe",
            url: "//player.vimeo.com/video/$2"
        },
        instagram: {
            matcher: /(instagr\.am|instagram\.com)\/p\/([a-zA-Z0-9_\-]+)\/?/i,
            type: "image",
            url: "//$1/p/$2/media/?size=l"
        },
        gmap_place: {
            matcher: /(maps\.)?google\.([a-z]{2,3}(\.[a-z]{2})?)\/(((maps\/(place\/(.*)\/)?\@(.*),(\d+.?\d+?)z))|(\?ll=))(.*)?/i,
            type: "iframe",
            url: function(e) {
                return "//maps.google." + e[2] + "/?ll=" + (e[9] ? e[9] + "&z=" + Math.floor(e[10]) + (e[12] ? e[12].replace(/^\//, "&") : "") : e[12] + "").replace(/\?/, "&") + "&output=" + (e[12] && 0 < e[12].indexOf("layer=c") ? "svembed" : "embed")
            }
        },
        gmap_search: {
            matcher: /(maps\.)?google\.([a-z]{2,3}(\.[a-z]{2})?)\/(maps\/search\/)(.*)/i,
            type: "iframe",
            url: function(e) {
                return "//maps.google." + e[2] + "/maps?q=" + e[5].replace("query=", "q=").replace("api=1", "") + "&output=embed"
            }
        }
    }
      , f = function(i, e, t) {
        if (i)
            return t = t || "",
            "object" === h.type(t) && (t = h.param(t, !0)),
            h.each(e, function(e, t) {
                i = i.replace("$" + e, t || "")
            }),
            t.length && (i += (0 < i.indexOf("?") ? "&" : "?") + t),
            i
    };
    h(document).on("objectNeedsType.fb", function(e, t, a) {
        var i, n, o, r, l, d, c, p = a.src || "", u = !1;
        i = h.extend(!0, {}, s, a.opts.media),
        h.each(i, function(e, t) {
            if (o = p.match(t.matcher)) {
                if (u = t.type,
                c = e,
                d = {},
                t.paramPlace && o[t.paramPlace]) {
                    "?" == (l = o[t.paramPlace])[0] && (l = l.substring(1)),
                    l = l.split("&");
                    for (var i = 0; i < l.length; ++i) {
                        var s = l[i].split("=", 2);
                        2 == s.length && (d[s[0]] = decodeURIComponent(s[1].replace(/\+/g, " ")))
                    }
                }
                return r = h.extend(!0, {}, t.params, a.opts[e], d),
                p = "function" === h.type(t.url) ? t.url.call(this, o, r, a) : f(t.url, o, r),
                n = "function" === h.type(t.thumb) ? t.thumb.call(this, o, r, a) : f(t.thumb, o),
                "youtube" === e ? p = p.replace(/&t=((\d+)m)?(\d+)s/, function(e, t, i, s) {
                    return "&start=" + ((i ? 60 * parseInt(i, 10) : 0) + parseInt(s, 10))
                }) : "vimeo" === e && (p = p.replace("&%23", "#")),
                !1
            }
        }),
        u ? (a.opts.thumb || a.opts.$thumb && a.opts.$thumb.length || (a.opts.thumb = n),
        "iframe" === u && (a.opts = h.extend(!0, a.opts, {
            iframe: {
                preload: !1,
                attr: {
                    scrolling: "no"
                }
            }
        })),
        h.extend(a, {
            type: u,
            src: p,
            origSrc: a.src,
            contentSource: c,
            contentType: "image" === u ? "image" : "gmap_place" == c || "gmap_search" == c ? "map" : "video"
        })) : p && (a.type = a.opts.defaultType)
    });
    var a = {
        youtube: {
            src: "https://www.youtube.com/iframe_api",
            class: "YT",
            loading: !1,
            loaded: !1
        },
        vimeo: {
            src: "https://player.vimeo.com/api/player.js",
            class: "Vimeo",
            loading: !1,
            loaded: !1
        },
        load: function(e) {
            var t, i = this;
            this[e].loaded ? setTimeout(function() {
                i.done(e)
            }) : this[e].loading || (this[e].loading = !0,
            (t = document.createElement("script")).type = "text/javascript",
            t.src = this[e].src,
            "youtube" === e ? window.onYouTubeIframeAPIReady = function() {
                i[e].loaded = !0,
                i.done(e)
            }
            : t.onload = function() {
                i[e].loaded = !0,
                i.done(e)
            }
            ,
            document.body.appendChild(t))
        },
        done: function(e) {
            var t, i;
            "youtube" === e && delete window.onYouTubeIframeAPIReady,
            (t = h.fancybox.getInstance()) && (i = t.current.$content.find("iframe"),
            "youtube" === e && void 0 !== YT && YT ? new YT.Player(i.attr("id"),{
                events: {
                    onStateChange: function(e) {
                        0 == e.data && t.next()
                    }
                }
            }) : "vimeo" === e && void 0 !== Vimeo && Vimeo && new Vimeo.Player(i).on("ended", function() {
                t.next()
            }))
        }
    };
    h(document).on({
        "afterShow.fb": function(e, t, i) {
            1 < t.group.length && ("youtube" === i.contentSource || "vimeo" === i.contentSource) && a.load(i.contentSource)
        }
    })
}(jQuery),
function(v, l, g) {
    "use strict";
    var m = v.requestAnimationFrame || v.webkitRequestAnimationFrame || v.mozRequestAnimationFrame || v.oRequestAnimationFrame || function(e) {
        return v.setTimeout(e, 1e3 / 60)
    }
      , b = v.cancelAnimationFrame || v.webkitCancelAnimationFrame || v.mozCancelAnimationFrame || v.oCancelAnimationFrame || function(e) {
        v.clearTimeout(e)
    }
      , c = function(e) {
        var t = [];
        for (var i in e = (e = e.originalEvent || e || v.e).touches && e.touches.length ? e.touches : e.changedTouches && e.changedTouches.length ? e.changedTouches : [e])
            e[i].pageX ? t.push({
                x: e[i].pageX,
                y: e[i].pageY
            }) : e[i].clientX && t.push({
                x: e[i].clientX,
                y: e[i].clientY
            });
        return t
    }
      , y = function(e, t, i) {
        return t && e ? "x" === i ? e.x - t.x : "y" === i ? e.y - t.y : Math.sqrt(Math.pow(e.x - t.x, 2) + Math.pow(e.y - t.y, 2)) : 0
    }
      , d = function(e) {
        if (e.is('a,area,button,[role="button"],input,label,select,summary,textarea,video,audio,iframe') || g.isFunction(e.get(0).onclick) || e.data("selectable"))
            return !0;
        for (var t = 0, i = e[0].attributes, s = i.length; t < s; t++)
            if ("data-fancybox-" === i[t].nodeName.substr(0, 14))
                return !0;
        return !1
    }
      , p = function(e) {
        for (var t, i, s, a, n, o = !1; t = e.get(0),
        void 0,
        i = v.getComputedStyle(t)["overflow-y"],
        s = v.getComputedStyle(t)["overflow-x"],
        a = ("scroll" === i || "auto" === i) && t.scrollHeight > t.clientHeight,
        n = ("scroll" === s || "auto" === s) && t.scrollWidth > t.clientWidth,
        !(o = a || n) && (e = e.parent()).length && !e.hasClass("fancybox-stage") && !e.is("body"); )
            ;
        return o
    }
      , i = function(e) {
        var t = this;
        t.instance = e,
        t.$bg = e.$refs.bg,
        t.$stage = e.$refs.stage,
        t.$container = e.$refs.container,
        t.destroy(),
        t.$container.on("touchstart.fb.touch mousedown.fb.touch", g.proxy(t, "ontouchstart"))
    };
    i.prototype.destroy = function() {
        var e = this;
        e.$container.off(".fb.touch"),
        g(l).off(".fb.touch"),
        e.requestId && (b(e.requestId),
        e.requestId = null),
        e.tapped && (clearTimeout(e.tapped),
        e.tapped = null)
    }
    ,
    i.prototype.ontouchstart = function(e) {
        var t = this
          , i = g(e.target)
          , s = t.instance
          , a = s.current
          , n = a.$slide
          , o = a.$content
          , r = "touchstart" == e.type;
        if (r && t.$container.off("mousedown.fb.touch"),
        (!e.originalEvent || 2 != e.originalEvent.button) && n.length && i.length && !d(i) && !d(i.parent()) && (i.is("img") || !(e.originalEvent.clientX > i[0].clientWidth + i.offset().left))) {
            if (!a || s.isAnimating || a.$slide.hasClass("fancybox-animated"))
                return e.stopPropagation(),
                void e.preventDefault();
            t.realPoints = t.startPoints = c(e),
            t.startPoints.length && (a.touch && e.stopPropagation(),
            t.startEvent = e,
            t.canTap = !0,
            t.$target = i,
            t.$content = o,
            t.opts = a.opts.touch,
            t.isPanning = !1,
            t.isSwiping = !1,
            t.isZooming = !1,
            t.isScrolling = !1,
            t.canPan = s.canPan(),
            t.startTime = (new Date).getTime(),
            t.distanceX = t.distanceY = t.distance = 0,
            t.canvasWidth = Math.round(n[0].clientWidth),
            t.canvasHeight = Math.round(n[0].clientHeight),
            t.contentLastPos = null,
            t.contentStartPos = g.fancybox.getTranslate(t.$content) || {
                top: 0,
                left: 0
            },
            t.sliderStartPos = g.fancybox.getTranslate(n),
            t.stagePos = g.fancybox.getTranslate(s.$refs.stage),
            t.sliderStartPos.top -= t.stagePos.top,
            t.sliderStartPos.left -= t.stagePos.left,
            t.contentStartPos.top -= t.stagePos.top,
            t.contentStartPos.left -= t.stagePos.left,
            g(l).off(".fb.touch").on(r ? "touchend.fb.touch touchcancel.fb.touch" : "mouseup.fb.touch mouseleave.fb.touch", g.proxy(t, "ontouchend")).on(r ? "touchmove.fb.touch" : "mousemove.fb.touch", g.proxy(t, "ontouchmove")),
            g.fancybox.isMobile && l.addEventListener("scroll", t.onscroll, !0),
            ((t.opts || t.canPan) && (i.is(t.$stage) || t.$stage.find(i).length) || (i.is(".fancybox-image") && e.preventDefault(),
            g.fancybox.isMobile && i.parents(".fancybox-caption").length)) && (t.isScrollable = p(i) || p(i.parent()),
            g.fancybox.isMobile && t.isScrollable || e.preventDefault(),
            (1 === t.startPoints.length || a.hasError) && (t.canPan ? (g.fancybox.stop(t.$content),
            t.isPanning = !0) : t.isSwiping = !0,
            t.$container.addClass("fancybox-is-grabbing")),
            2 === t.startPoints.length && "image" === a.type && (a.isLoaded || a.$ghost) && (t.canTap = !1,
            t.isSwiping = !1,
            t.isPanning = !1,
            t.isZooming = !0,
            g.fancybox.stop(t.$content),
            t.centerPointStartX = .5 * (t.startPoints[0].x + t.startPoints[1].x) - g(v).scrollLeft(),
            t.centerPointStartY = .5 * (t.startPoints[0].y + t.startPoints[1].y) - g(v).scrollTop(),
            t.percentageOfImageAtPinchPointX = (t.centerPointStartX - t.contentStartPos.left) / t.contentStartPos.width,
            t.percentageOfImageAtPinchPointY = (t.centerPointStartY - t.contentStartPos.top) / t.contentStartPos.height,
            t.startDistanceBetweenFingers = y(t.startPoints[0], t.startPoints[1]))))
        }
    }
    ,
    i.prototype.onscroll = function(e) {
        this.isScrolling = !0,
        l.removeEventListener("scroll", this.onscroll, !0)
    }
    ,
    i.prototype.ontouchmove = function(e) {
        var t = this;
        void 0 === e.originalEvent.buttons || 0 !== e.originalEvent.buttons ? t.isScrolling ? t.canTap = !1 : (t.newPoints = c(e),
        (t.opts || t.canPan) && t.newPoints.length && t.newPoints.length && (t.isSwiping && !0 === t.isSwiping || e.preventDefault(),
        t.distanceX = y(t.newPoints[0], t.startPoints[0], "x"),
        t.distanceY = y(t.newPoints[0], t.startPoints[0], "y"),
        t.distance = y(t.newPoints[0], t.startPoints[0]),
        0 < t.distance && (t.isSwiping ? t.onSwipe(e) : t.isPanning ? t.onPan() : t.isZooming && t.onZoom()))) : t.ontouchend(e)
    }
    ,
    i.prototype.onSwipe = function(e) {
        var t, a = this, n = a.instance, i = a.isSwiping, s = a.sliderStartPos.left || 0;
        if (!0 !== i)
            "x" == i && (0 < a.distanceX && (a.instance.group.length < 2 || 0 === a.instance.current.index && !a.instance.current.opts.loop) ? s += Math.pow(a.distanceX, .8) : a.distanceX < 0 && (a.instance.group.length < 2 || a.instance.current.index === a.instance.group.length - 1 && !a.instance.current.opts.loop) ? s -= Math.pow(-a.distanceX, .8) : s += a.distanceX),
            a.sliderLastPos = {
                top: "x" == i ? 0 : a.sliderStartPos.top + a.distanceY,
                left: s
            },
            a.requestId && (b(a.requestId),
            a.requestId = null),
            a.requestId = m(function() {
                a.sliderLastPos && (g.each(a.instance.slides, function(e, t) {
                    var i = t.pos - a.instance.currPos;
                    g.fancybox.setTranslate(t.$slide, {
                        top: a.sliderLastPos.top,
                        left: a.sliderLastPos.left + i * a.canvasWidth + i * t.opts.gutter
                    })
                }),
                a.$container.addClass("fancybox-is-sliding"))
            });
        else if (10 < Math.abs(a.distance)) {
            if (a.canTap = !1,
            n.group.length < 2 && a.opts.vertical ? a.isSwiping = "y" : n.isDragging || !1 === a.opts.vertical || "auto" === a.opts.vertical && 800 < g(v).width() ? a.isSwiping = "x" : (t = Math.abs(180 * Math.atan2(a.distanceY, a.distanceX) / Math.PI),
            a.isSwiping = 45 < t && t < 135 ? "y" : "x"),
            "y" === a.isSwiping && g.fancybox.isMobile && a.isScrollable)
                return void (a.isScrolling = !0);
            n.isDragging = a.isSwiping,
            a.startPoints = a.newPoints,
            g.each(n.slides, function(e, t) {
                var i, s;
                g.fancybox.stop(t.$slide),
                i = g.fancybox.getTranslate(t.$slide),
                s = g.fancybox.getTranslate(n.$refs.stage),
                t.$slide.css({
                    transform: "",
                    opacity: "",
                    "transition-duration": ""
                }).removeClass("fancybox-animated").removeClass(function(e, t) {
                    return (t.match(/(^|\s)fancybox-fx-\S+/g) || []).join(" ")
                }),
                t.pos === n.current.pos && (a.sliderStartPos.top = i.top - s.top,
                a.sliderStartPos.left = i.left - s.left),
                g.fancybox.setTranslate(t.$slide, {
                    top: i.top - s.top,
                    left: i.left - s.left
                })
            }),
            n.SlideShow && n.SlideShow.isActive && n.SlideShow.stop()
        }
    }
    ,
    i.prototype.onPan = function() {
        var e = this;
        y(e.newPoints[0], e.realPoints[0]) < (g.fancybox.isMobile ? 10 : 5) ? e.startPoints = e.newPoints : (e.canTap = !1,
        e.contentLastPos = e.limitMovement(),
        e.requestId && b(e.requestId),
        e.requestId = m(function() {
            g.fancybox.setTranslate(e.$content, e.contentLastPos)
        }))
    }
    ,
    i.prototype.limitMovement = function() {
        var e, t, i, s, a, n, o = this, r = o.canvasWidth, l = o.canvasHeight, d = o.distanceX, c = o.distanceY, p = o.contentStartPos, u = p.left, h = p.top, f = p.width, v = p.height;
        return a = r < f ? u + d : u,
        n = h + c,
        e = Math.max(0, .5 * r - .5 * f),
        t = Math.max(0, .5 * l - .5 * v),
        i = Math.min(r - f, .5 * r - .5 * f),
        s = Math.min(l - v, .5 * l - .5 * v),
        0 < d && e < a && (a = e - 1 + Math.pow(-e + u + d, .8) || 0),
        d < 0 && a < i && (a = i + 1 - Math.pow(i - u - d, .8) || 0),
        0 < c && t < n && (n = t - 1 + Math.pow(-t + h + c, .8) || 0),
        c < 0 && n < s && (n = s + 1 - Math.pow(s - h - c, .8) || 0),
        {
            top: n,
            left: a
        }
    }
    ,
    i.prototype.limitPosition = function(e, t, i, s) {
        var a = this.canvasWidth
          , n = this.canvasHeight;
        return e = a < i ? (e = 0 < e ? 0 : e) < a - i ? a - i : e : Math.max(0, a / 2 - i / 2),
        {
            top: t = n < s ? (t = 0 < t ? 0 : t) < n - s ? n - s : t : Math.max(0, n / 2 - s / 2),
            left: e
        }
    }
    ,
    i.prototype.onZoom = function() {
        var e = this
          , t = e.contentStartPos
          , i = t.width
          , s = t.height
          , a = t.left
          , n = t.top
          , o = y(e.newPoints[0], e.newPoints[1]) / e.startDistanceBetweenFingers
          , r = Math.floor(i * o)
          , l = Math.floor(s * o)
          , d = (i - r) * e.percentageOfImageAtPinchPointX
          , c = (s - l) * e.percentageOfImageAtPinchPointY
          , p = (e.newPoints[0].x + e.newPoints[1].x) / 2 - g(v).scrollLeft()
          , u = (e.newPoints[0].y + e.newPoints[1].y) / 2 - g(v).scrollTop()
          , h = p - e.centerPointStartX
          , f = {
            top: n + (c + (u - e.centerPointStartY)),
            left: a + (d + h),
            scaleX: o,
            scaleY: o
        };
        e.canTap = !1,
        e.newWidth = r,
        e.newHeight = l,
        e.contentLastPos = f,
        e.requestId && b(e.requestId),
        e.requestId = m(function() {
            g.fancybox.setTranslate(e.$content, e.contentLastPos)
        })
    }
    ,
    i.prototype.ontouchend = function(e) {
        var t = this
          , i = t.isSwiping
          , s = t.isPanning
          , a = t.isZooming
          , n = t.isScrolling;
        if (t.endPoints = c(e),
        t.dMs = Math.max((new Date).getTime() - t.startTime, 1),
        t.$container.removeClass("fancybox-is-grabbing"),
        g(l).off(".fb.touch"),
        l.removeEventListener("scroll", t.onscroll, !0),
        t.requestId && (b(t.requestId),
        t.requestId = null),
        t.isSwiping = !1,
        t.isPanning = !1,
        t.isZooming = !1,
        t.isScrolling = !1,
        t.instance.isDragging = !1,
        t.canTap)
            return t.onTap(e);
        t.speed = 100,
        t.velocityX = t.distanceX / t.dMs * .5,
        t.velocityY = t.distanceY / t.dMs * .5,
        s ? t.endPanning() : a ? t.endZooming() : t.endSwiping(i, n)
    }
    ,
    i.prototype.endSwiping = function(e, t) {
        var i = this
          , s = !1
          , a = i.instance.group.length
          , n = Math.abs(i.distanceX)
          , o = "x" == e && 1 < a && (130 < i.dMs && 10 < n || 50 < n);
        i.sliderLastPos = null,
        "y" == e && !t && 50 < Math.abs(i.distanceY) ? (g.fancybox.animate(i.instance.current.$slide, {
            top: i.sliderStartPos.top + i.distanceY + 150 * i.velocityY,
            opacity: 0
        }, 200),
        s = i.instance.close(!0, 250)) : o && 0 < i.distanceX ? s = i.instance.previous(300) : o && i.distanceX < 0 && (s = i.instance.next(300)),
        !1 !== s || "x" != e && "y" != e || i.instance.centerSlide(200),
        i.$container.removeClass("fancybox-is-sliding")
    }
    ,
    i.prototype.endPanning = function() {
        var e, t, i, s = this;
        s.contentLastPos && (!1 === s.opts.momentum || 350 < s.dMs ? (e = s.contentLastPos.left,
        t = s.contentLastPos.top) : (e = s.contentLastPos.left + 500 * s.velocityX,
        t = s.contentLastPos.top + 500 * s.velocityY),
        (i = s.limitPosition(e, t, s.contentStartPos.width, s.contentStartPos.height)).width = s.contentStartPos.width,
        i.height = s.contentStartPos.height,
        g.fancybox.animate(s.$content, i, 366))
    }
    ,
    i.prototype.endZooming = function() {
        var e, t, i, s, a = this, n = a.instance.current, o = a.newWidth, r = a.newHeight;
        a.contentLastPos && (e = a.contentLastPos.left,
        s = {
            top: t = a.contentLastPos.top,
            left: e,
            width: o,
            height: r,
            scaleX: 1,
            scaleY: 1
        },
        g.fancybox.setTranslate(a.$content, s),
        o < a.canvasWidth && r < a.canvasHeight ? a.instance.scaleToFit(150) : o > n.width || r > n.height ? a.instance.scaleToActual(a.centerPointStartX, a.centerPointStartY, 150) : (i = a.limitPosition(e, t, o, r),
        g.fancybox.animate(a.$content, i, 150)))
    }
    ,
    i.prototype.onTap = function(i) {
        var e, s = this, t = g(i.target), a = s.instance, n = a.current, o = i && c(i) || s.startPoints, r = o[0] ? o[0].x - g(v).scrollLeft() - s.stagePos.left : 0, l = o[0] ? o[0].y - g(v).scrollTop() - s.stagePos.top : 0, d = function(e) {
            var t = n.opts[e];
            if (g.isFunction(t) && (t = t.apply(a, [n, i])),
            t)
                switch (t) {
                case "close":
                    a.close(s.startEvent);
                    break;
                case "toggleControls":
                    a.toggleControls();
                    break;
                case "next":
                    a.next();
                    break;
                case "nextOrClose":
                    1 < a.group.length ? a.next() : a.close(s.startEvent);
                    break;
                case "zoom":
                    "image" == n.type && (n.isLoaded || n.$ghost) && (a.canPan() ? a.scaleToFit() : a.isScaledDown() ? a.scaleToActual(r, l) : a.group.length < 2 && a.close(s.startEvent))
                }
        };
        if ((!i.originalEvent || 2 != i.originalEvent.button) && (t.is("img") || !(r > t[0].clientWidth + t.offset().left))) {
            if (t.is(".fancybox-bg,.fancybox-inner,.fancybox-outer,.fancybox-container"))
                e = "Outside";
            else if (t.is(".fancybox-slide"))
                e = "Slide";
            else {
                if (!a.current.$content || !a.current.$content.find(t).addBack().filter(t).length)
                    return;
                e = "Content"
            }
            if (s.tapped) {
                if (clearTimeout(s.tapped),
                s.tapped = null,
                50 < Math.abs(r - s.tapX) || 50 < Math.abs(l - s.tapY))
                    return this;
                d("dblclick" + e)
            } else
                s.tapX = r,
                s.tapY = l,
                n.opts["dblclick" + e] && n.opts["dblclick" + e] !== n.opts["click" + e] ? s.tapped = setTimeout(function() {
                    s.tapped = null,
                    a.isAnimating || d("click" + e)
                }, 500) : d("click" + e);
            return this
        }
    }
    ,
    g(l).on("onActivate.fb", function(e, t) {
        t && !t.Guestures && (t.Guestures = new i(t))
    }).on("beforeClose.fb", function(e, t) {
        t && t.Guestures && t.Guestures.destroy()
    })
}(window, document, jQuery),
function(o, r) {
    "use strict";
    r.extend(!0, r.fancybox.defaults, {
        btnTpl: {
            slideShow: '<button data-fancybox-play class="fancybox-button fancybox-button--play" title="{{PLAY_START}}"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M6.5 5.4v13.2l11-6.6z"/></svg><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M8.33 5.75h2.2v12.5h-2.2V5.75zm5.15 0h2.2v12.5h-2.2V5.75z"/></svg></button>'
        },
        slideShow: {
            autoStart: !1,
            speed: 3e3,
            progress: !0
        }
    });
    var i = function(e) {
        this.instance = e,
        this.init()
    };
    r.extend(i.prototype, {
        timer: null,
        isActive: !1,
        $button: null,
        init: function() {
            var e = this
              , t = e.instance
              , i = t.group[t.currIndex].opts.slideShow;
            e.$button = t.$refs.toolbar.find("[data-fancybox-play]").on("click", function() {
                e.toggle()
            }),
            t.group.length < 2 || !i ? e.$button.hide() : i.progress && (e.$progress = r('<div class="fancybox-progress"></div>').appendTo(t.$refs.inner))
        },
        set: function(e) {
            var t = this
              , i = t.instance
              , s = i.current;
            s && (!0 === e || s.opts.loop || i.currIndex < i.group.length - 1) ? t.isActive && "video" !== s.contentType && (t.$progress && r.fancybox.animate(t.$progress.show(), {
                scaleX: 1
            }, s.opts.slideShow.speed),
            t.timer = setTimeout(function() {
                i.current.opts.loop || i.current.index != i.group.length - 1 ? i.next() : i.jumpTo(0)
            }, s.opts.slideShow.speed)) : (t.stop(),
            i.idleSecondsCounter = 0,
            i.showControls())
        },
        clear: function() {
            clearTimeout(this.timer),
            this.timer = null,
            this.$progress && this.$progress.removeAttr("style").hide()
        },
        start: function() {
            var e = this
              , t = e.instance.current;
            t && (e.$button.attr("title", (t.opts.i18n[t.opts.lang] || t.opts.i18n.en).PLAY_STOP).removeClass("fancybox-button--play").addClass("fancybox-button--pause"),
            e.isActive = !0,
            t.isComplete && e.set(!0),
            e.instance.trigger("onSlideShowChange", !0))
        },
        stop: function() {
            var e = this
              , t = e.instance.current;
            e.clear(),
            e.$button.attr("title", (t.opts.i18n[t.opts.lang] || t.opts.i18n.en).PLAY_START).removeClass("fancybox-button--pause").addClass("fancybox-button--play"),
            e.isActive = !1,
            e.instance.trigger("onSlideShowChange", !1),
            e.$progress && e.$progress.removeAttr("style").hide()
        },
        toggle: function() {
            this.isActive ? this.stop() : this.start()
        }
    }),
    r(o).on({
        "onInit.fb": function(e, t) {
            t && !t.SlideShow && (t.SlideShow = new i(t))
        },
        "beforeShow.fb": function(e, t, i, s) {
            var a = t && t.SlideShow;
            s ? a && i.opts.slideShow.autoStart && a.start() : a && a.isActive && a.clear()
        },
        "afterShow.fb": function(e, t, i) {
            var s = t && t.SlideShow;
            s && s.isActive && s.set()
        },
        "afterKeydown.fb": function(e, t, i, s, a) {
            var n = t && t.SlideShow;
            !n || !i.opts.slideShow || 80 !== a && 32 !== a || r(o.activeElement).is("button,a,input") || (s.preventDefault(),
            n.toggle())
        },
        "beforeClose.fb onDeactivate.fb": function(e, t) {
            var i = t && t.SlideShow;
            i && i.stop()
        }
    }),
    r(o).on("visibilitychange", function() {
        var e = r.fancybox.getInstance()
          , t = e && e.SlideShow;
        t && t.isActive && (o.hidden ? t.clear() : t.set())
    })
}(document, jQuery),
function(n, i) {
    "use strict";
    var s = function() {
        for (var e = [["requestFullscreen", "exitFullscreen", "fullscreenElement", "fullscreenEnabled", "fullscreenchange", "fullscreenerror"], ["webkitRequestFullscreen", "webkitExitFullscreen", "webkitFullscreenElement", "webkitFullscreenEnabled", "webkitfullscreenchange", "webkitfullscreenerror"], ["webkitRequestFullScreen", "webkitCancelFullScreen", "webkitCurrentFullScreenElement", "webkitCancelFullScreen", "webkitfullscreenchange", "webkitfullscreenerror"], ["mozRequestFullScreen", "mozCancelFullScreen", "mozFullScreenElement", "mozFullScreenEnabled", "mozfullscreenchange", "mozfullscreenerror"], ["msRequestFullscreen", "msExitFullscreen", "msFullscreenElement", "msFullscreenEnabled", "MSFullscreenChange", "MSFullscreenError"]], t = {}, i = 0; i < e.length; i++) {
            var s = e[i];
            if (s && s[1]in n) {
                for (var a = 0; a < s.length; a++)
                    t[e[0][a]] = s[a];
                return t
            }
        }
        return !1
    }();
    if (s) {
        var a = {
            request: function(e) {
                (e = e || n.documentElement)[s.requestFullscreen](e.ALLOW_KEYBOARD_INPUT)
            },
            exit: function() {
                n[s.exitFullscreen]()
            },
            toggle: function(e) {
                e = e || n.documentElement,
                this.isFullscreen() ? this.exit() : this.request(e)
            },
            isFullscreen: function() {
                return Boolean(n[s.fullscreenElement])
            },
            enabled: function() {
                return Boolean(n[s.fullscreenEnabled])
            }
        };
        i.extend(!0, i.fancybox.defaults, {
            btnTpl: {
                fullScreen: '<button data-fancybox-fullscreen class="fancybox-button fancybox-button--fsenter" title="{{FULL_SCREEN}}"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z"/></svg><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M5 16h3v3h2v-5H5zm3-8H5v2h5V5H8zm6 11h2v-3h3v-2h-5zm2-11V5h-2v5h5V8z"/></svg></button>'
            },
            fullScreen: {
                autoStart: !1
            }
        }),
        i(n).on(s.fullscreenchange, function() {
            var e = a.isFullscreen()
              , t = i.fancybox.getInstance();
            t && (t.current && "image" === t.current.type && t.isAnimating && (t.isAnimating = !1,
            t.update(!0, !0, 0),
            t.isComplete || t.complete()),
            t.trigger("onFullscreenChange", e),
            t.$refs.container.toggleClass("fancybox-is-fullscreen", e),
            t.$refs.toolbar.find("[data-fancybox-fullscreen]").toggleClass("fancybox-button--fsenter", !e).toggleClass("fancybox-button--fsexit", e))
        })
    }
    i(n).on({
        "onInit.fb": function(e, t) {
            s ? t && t.group[t.currIndex].opts.fullScreen ? (t.$refs.container.on("click.fb-fullscreen", "[data-fancybox-fullscreen]", function(e) {
                e.stopPropagation(),
                e.preventDefault(),
                a.toggle()
            }),
            t.opts.fullScreen && !0 === t.opts.fullScreen.autoStart && a.request(),
            t.FullScreen = a) : t && t.$refs.toolbar.find("[data-fancybox-fullscreen]").hide() : t.$refs.toolbar.find("[data-fancybox-fullscreen]").remove()
        },
        "afterKeydown.fb": function(e, t, i, s, a) {
            t && t.FullScreen && 70 === a && (s.preventDefault(),
            t.FullScreen.toggle())
        },
        "beforeClose.fb": function(e, t) {
            t && t.FullScreen && t.$refs.container.hasClass("fancybox-is-fullscreen") && a.exit()
        }
    })
}(document, jQuery),
function(e, n) {
    "use strict";
    var o = "fancybox-thumbs"
      , r = o + "-active";
    n.fancybox.defaults = n.extend(!0, {
        btnTpl: {
            thumbs: '<button data-fancybox-thumbs class="fancybox-button fancybox-button--thumbs" title="{{THUMBS}}"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M14.59 14.59h3.76v3.76h-3.76v-3.76zm-4.47 0h3.76v3.76h-3.76v-3.76zm-4.47 0h3.76v3.76H5.65v-3.76zm8.94-4.47h3.76v3.76h-3.76v-3.76zm-4.47 0h3.76v3.76h-3.76v-3.76zm-4.47 0h3.76v3.76H5.65v-3.76zm8.94-4.47h3.76v3.76h-3.76V5.65zm-4.47 0h3.76v3.76h-3.76V5.65zm-4.47 0h3.76v3.76H5.65V5.65z"/></svg></button>'
        },
        thumbs: {
            autoStart: !1,
            hideOnClose: !0,
            parentEl: ".fancybox-container",
            axis: "y"
        }
    }, n.fancybox.defaults);
    var s = function(e) {
        this.init(e)
    };
    n.extend(s.prototype, {
        $button: null,
        $grid: null,
        $list: null,
        isVisible: !1,
        isActive: !1,
        init: function(e) {
            var t = this
              , i = e.group
              , s = 0;
            t.instance = e,
            t.opts = i[e.currIndex].opts.thumbs,
            (e.Thumbs = t).$button = e.$refs.toolbar.find("[data-fancybox-thumbs]");
            for (var a = 0, n = i.length; a < n && (i[a].thumb && s++,
            !(1 < s)); a++)
                ;
            1 < s && t.opts ? (t.$button.removeAttr("style").on("click", function() {
                t.toggle()
            }),
            t.isActive = !0) : t.$button.hide()
        },
        create: function() {
            var i, e = this, t = e.instance, s = e.opts.parentEl, a = [];
            e.$grid || (e.$grid = n('<div class="' + o + " " + o + "-" + e.opts.axis + '"></div>').appendTo(t.$refs.container.find(s).addBack().filter(s)),
            e.$grid.on("click", "a", function() {
                t.jumpTo(n(this).attr("data-index"))
            })),
            e.$list || (e.$list = n('<div class="' + o + '__list">').appendTo(e.$grid)),
            n.each(t.group, function(e, t) {
                (i = t.thumb) || "image" !== t.type || (i = t.src),
                a.push('<a href="javascript:;" tabindex="0" data-index="' + e + '"' + (i && i.length ? ' style="background-image:url(' + i + ')"' : 'class="fancybox-thumbs-missing"') + "></a>")
            }),
            e.$list[0].innerHTML = a.join(""),
            "x" === e.opts.axis && e.$list.width(parseInt(e.$grid.css("padding-right"), 10) + t.group.length * e.$list.children().eq(0).outerWidth(!0))
        },
        focus: function(e) {
            var t, i, s = this, a = s.$list, n = s.$grid;
            s.instance.current && (i = (t = a.children().removeClass(r).filter('[data-index="' + s.instance.current.index + '"]').addClass(r)).position(),
            "y" === s.opts.axis && (i.top < 0 || i.top > a.height() - t.outerHeight()) ? a.stop().animate({
                scrollTop: a.scrollTop() + i.top
            }, e) : "x" === s.opts.axis && (i.left < n.scrollLeft() || i.left > n.scrollLeft() + (n.width() - t.outerWidth())) && a.parent().stop().animate({
                scrollLeft: i.left
            }, e))
        },
        update: function() {
            var e = this;
            e.instance.$refs.container.toggleClass("fancybox-show-thumbs", this.isVisible),
            e.isVisible ? (e.$grid || e.create(),
            e.instance.trigger("onThumbsShow"),
            e.focus(0)) : e.$grid && e.instance.trigger("onThumbsHide"),
            e.instance.update()
        },
        hide: function() {
            this.isVisible = !1,
            this.update()
        },
        show: function() {
            this.isVisible = !0,
            this.update()
        },
        toggle: function() {
            this.isVisible = !this.isVisible,
            this.update()
        }
    }),
    n(e).on({
        "onInit.fb": function(e, t) {
            var i;
            t && !t.Thumbs && (i = new s(t)).isActive && !0 === i.opts.autoStart && i.show()
        },
        "beforeShow.fb": function(e, t, i, s) {
            var a = t && t.Thumbs;
            a && a.isVisible && a.focus(s ? 0 : 250)
        },
        "afterKeydown.fb": function(e, t, i, s, a) {
            var n = t && t.Thumbs;
            n && n.isActive && 71 === a && (s.preventDefault(),
            n.toggle())
        },
        "beforeClose.fb": function(e, t) {
            var i = t && t.Thumbs;
            i && i.isVisible && !1 !== i.opts.hideOnClose && i.$grid.hide()
        }
    })
}(document, jQuery),
function(e, o) {
    "use strict";
    o.extend(!0, o.fancybox.defaults, {
        btnTpl: {
            share: '<button data-fancybox-share class="fancybox-button fancybox-button--share" title="{{SHARE}}"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M2.55 19c1.4-8.4 9.1-9.8 11.9-9.8V5l7 7-7 6.3v-3.5c-2.8 0-10.5 2.1-11.9 4.2z"/></svg></button>'
        },
        share: {
            url: function(e, t) {
                return !e.currentHash && "inline" !== t.type && "html" !== t.type && (t.origSrc || t.src) || window.location
            },
            tpl: '<div class="fancybox-share"><h1>{{SHARE}}</h1><p><a class="fancybox-share__button fancybox-share__button--fb" href="https://www.facebook.com/sharer/sharer.php?u={{url}}"><svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path d="m287 456v-299c0-21 6-35 35-35h38v-63c-7-1-29-3-55-3-54 0-91 33-91 94v306m143-254h-205v72h196" /></svg><span>Facebook</span></a><a class="fancybox-share__button fancybox-share__button--tw" href="https://twitter.com/intent/tweet?url={{url}}&text={{descr}}"><svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path d="m456 133c-14 7-31 11-47 13 17-10 30-27 37-46-15 10-34 16-52 20-61-62-157-7-141 75-68-3-129-35-169-85-22 37-11 86 26 109-13 0-26-4-37-9 0 39 28 72 65 80-12 3-25 4-37 2 10 33 41 57 77 57-42 30-77 38-122 34 170 111 378-32 359-208 16-11 30-25 41-42z" /></svg><span>Twitter</span></a><a class="fancybox-share__button fancybox-share__button--pt" href="https://www.pinterest.com/pin/create/button/?url={{url}}&description={{descr}}&media={{media}}"><svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path d="m265 56c-109 0-164 78-164 144 0 39 15 74 47 87 5 2 10 0 12-5l4-19c2-6 1-8-3-13-9-11-15-25-15-45 0-58 43-110 113-110 62 0 96 38 96 88 0 67-30 122-73 122-24 0-42-19-36-44 6-29 20-60 20-81 0-19-10-35-31-35-25 0-44 26-44 60 0 21 7 36 7 36l-30 125c-8 37-1 83 0 87 0 3 4 4 5 2 2-3 32-39 42-75l16-64c8 16 31 29 56 29 74 0 124-67 124-157 0-69-58-132-146-132z" fill="#fff"/></svg><span>Pinterest</span></a></p><p><input class="fancybox-share__input" type="text" value="{{url_raw}}" onclick="select()" /></p></div>'
        }
    }),
    o(e).on("click", "[data-fancybox-share]", function() {
        var e, t, i, s, a = o.fancybox.getInstance(), n = a.current || null;
        n && ("function" === o.type(n.opts.share.url) && (e = n.opts.share.url.apply(n, [a, n])),
        t = n.opts.share.tpl.replace(/\{\{media\}\}/g, "image" === n.type ? encodeURIComponent(n.src) : "").replace(/\{\{url\}\}/g, encodeURIComponent(e)).replace(/\{\{url_raw\}\}/g, (i = e,
        s = {
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#39;",
            "/": "&#x2F;",
            "`": "&#x60;",
            "=": "&#x3D;"
        },
        String(i).replace(/[&<>"'`=\/]/g, function(e) {
            return s[e]
        }))).replace(/\{\{descr\}\}/g, a.$caption ? encodeURIComponent(a.$caption.text()) : ""),
        o.fancybox.open({
            src: a.translate(a, t),
            type: "html",
            opts: {
                touch: !1,
                animationEffect: !1,
                afterLoad: function(e, t) {
                    a.$refs.container.one("beforeClose.fb", function() {
                        e.close(null, 0)
                    }),
                    t.$content.find(".fancybox-share__button").click(function() {
                        return window.open(this.href, "Share", "width=550, height=450"),
                        !1
                    })
                },
                mobile: {
                    autoFocus: !1
                }
            }
        }))
    })
}(document, jQuery),
function(n, o, a) {
    "use strict";
    function r() {
        var e = n.location.hash.substr(1)
          , t = e.split("-")
          , i = 1 < t.length && /^\+?\d+$/.test(t[t.length - 1]) && parseInt(t.pop(-1), 10) || 1;
        return {
            hash: e,
            index: i < 1 ? 1 : i,
            gallery: t.join("-")
        }
    }
    function t(e) {
        "" !== e.gallery && a("[data-fancybox='" + a.escapeSelector(e.gallery) + "']").eq(e.index - 1).focus().trigger("click.fb-start")
    }
    function l(e) {
        var t, i;
        return !!e && ("" !== (i = (t = e.current ? e.current.opts : e.opts).hash || (t.$orig ? t.$orig.data("fancybox") || t.$orig.data("fancybox-trigger") : "")) && i)
    }
    a.escapeSelector || (a.escapeSelector = function(e) {
        return (e + "").replace(/([\0-\x1f\x7f]|^-?\d)|^-$|[^\x80-\uFFFF\w-]/g, function(e, t) {
            return t ? "\0" === e ? "�" : e.slice(0, -1) + "\\" + e.charCodeAt(e.length - 1).toString(16) + " " : "\\" + e
        })
    }
    ),
    a(function() {
        !1 !== a.fancybox.defaults.hash && (a(o).on({
            "onInit.fb": function(e, t) {
                var i, s;
                !1 !== t.group[t.currIndex].opts.hash && (i = r(),
                (s = l(t)) && i.gallery && s == i.gallery && (t.currIndex = i.index - 1))
            },
            "beforeShow.fb": function(e, t, i, s) {
                var a;
                i && !1 !== i.opts.hash && (a = l(t)) && (t.currentHash = a + (1 < t.group.length ? "-" + (i.index + 1) : ""),
                n.location.hash !== "#" + t.currentHash && (s && !t.origHash && (t.origHash = n.location.hash),
                t.hashTimer && clearTimeout(t.hashTimer),
                t.hashTimer = setTimeout(function() {
                    "replaceState"in n.history ? (n.history[s ? "pushState" : "replaceState"]({}, o.title, n.location.pathname + n.location.search + "#" + t.currentHash),
                    s && (t.hasCreatedHistory = !0)) : n.location.hash = t.currentHash,
                    t.hashTimer = null
                }, 300)))
            },
            "beforeClose.fb": function(e, t, i) {
                i && !1 !== i.opts.hash && (clearTimeout(t.hashTimer),
                t.currentHash && t.hasCreatedHistory ? n.history.back() : t.currentHash && ("replaceState"in n.history ? n.history.replaceState({}, o.title, n.location.pathname + n.location.search + (t.origHash || "")) : n.location.hash = t.origHash),
                t.currentHash = null)
            }
        }),
        a(n).on("hashchange.fb", function() {
            var e = r()
              , s = null;
            a.each(a(".fancybox-container").get().reverse(), function(e, t) {
                var i = a(t).data("FancyBox");
                if (i && i.currentHash)
                    return s = i,
                    !1
            }),
            s ? s.currentHash === e.gallery + "-" + e.index || 1 === e.index && s.currentHash == e.gallery || (s.currentHash = null,
            s.close()) : "" !== e.gallery && t(e)
        }),
        setTimeout(function() {
            a.fancybox.getInstance() || t(r())
        }, 50))
    })
}(window, document, jQuery),
function(e, t) {
    "use strict";
    var a = (new Date).getTime();
    t(e).on({
        "onInit.fb": function(e, s, t) {
            s.$refs.stage.on("mousewheel DOMMouseScroll wheel MozMousePixelScroll", function(e) {
                var t = s.current
                  , i = (new Date).getTime();
                s.group.length < 2 || !1 === t.opts.wheel || "auto" === t.opts.wheel && "image" !== t.type || (e.preventDefault(),
                e.stopPropagation(),
                t.$slide.hasClass("fancybox-animated") || (e = e.originalEvent || e,
                i - a < 250 || (a = i,
                s[(-e.deltaY || -e.deltaX || e.wheelDelta || -e.detail) < 0 ? "next" : "previous"]())))
            })
        }
    })
}(document, jQuery);
