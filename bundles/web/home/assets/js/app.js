jQuery(document).ready(function() {
    $(".slide-new").slick({
        autoplay: !0,
        pauseOnDotsHover: !0,
        cssEase: "ease-out",
        dots: !0,
        prevArrow: !1,
        nextArrow: !1,
        speed: 600
    }),
    $(".slide-new-pc").slick({
        autoplay: !0,
        pauseOnDotsHover: !0,
        cssEase: "ease-out",
        dots: !0,
        prevArrow: !1,
        nextArrow: !1,
        speed: 600
    }),
    $(".slide-dacsac").slick({
        dots: !0,
        cssEase: "ease-out",
        speed: 600
    });
    new Swiper(".swiper-container",{
        init: !0,
        loop: !0,
        speed: 1e3,
        slidesPerView: 2,
        spaceBetween: -800,
        centeredSlides: !0,
        effect: "coverflow",
        coverflowEffect: {
            rotate: 100,
            stretch: 0,
            depth: 200,
            modifier: 10,
            slideShadows: !0
        },
        slideToClickedSlide: !0,
        grabCursor: !0,
        parallax: !0,
        pagination: {
            el: null,
            type: "bullets",
            clickable: !0
        },
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev"
        },
        on: {
            imagesReady: function() {
                this.el.classList.remove("loading")
            }
        }
    });
    $("ul.tab-news li").click(function() {
        var e = $(this).attr("data-tab-news");
        $("ul.tab-news li").removeClass("current"),
        $(".tab-detail-news").removeClass("current"),
        $(this).addClass("current"),
        $("#" + e).addClass("current");
        var s = $(this).attr("data-view-news");
        $(".tab-view-more-news").removeClass("current"),
        $(this).addClass("current"),
        $("#" + s).addClass("current")
    }),
    $("ul.tab-icon-tuong li.i-tuong").click(function() {
        var e = $(this).attr("data-tab-tuong");
        $("ul.tab-icon-tuong li.i-tuong").removeClass("current"),
        $(".tab-tuong-detail").removeClass("current"),
        $(this).addClass("current"),
        $("#" + e).addClass("current")
    });
    var e = $(".anchor")
      , s = $(".scroll-top");
    $(window).scroll(function() {
        $(this).scrollTop() < 800 ? e.removeClass("run") : e.addClass("run")
    }),
    s.click(function() {
        $("html,body").stop().animate({
            scrollTop: 0
        }, 800)
    })
});
