var content =
  '\u003cdiv class="images-column"\u003e\n\u003cdiv class="qv-product-images"\u003e\u003c/div\u003e\n\u003cdiv class="qv-product-images-variant"\u003e\u003c/div\u003e\n\u003c/div\u003e\n\u003cdiv class="qv-content"\u003e\n   \u003cdiv class="holder"\u003e\n      \u003ch1 class="qv-product-title"\u003e\u003c/h1\u003e     \n      \u003cdiv class="qv-price"\u003e\n         \u003cdiv class="price-current"\u003e\n            \u003cdiv class="price-currency"\u003e$\u003c/div\u003e\n            \u003cdiv class="qv-product-price"\u003e\u003c/div\u003e\n         \u003c/div\u003e\n         \u003cdiv class="original-price"\u003e\n            \u003cdiv class="price-currency"\u003e$\u003c/div\u003e\n            \u003cdiv class="qv-product-original-price"\u003e\u003c/div\u003e\n         \u003c/div\u003e\n      \u003c/div\u003e\n      \u003cdiv class="qv-product-description"\u003e\u003c/div\u003e\n      \u003cdiv class="qv-info"\u003e\n         \u003cdiv class="qv-product-type-title"\u003e\n            \u003cspan class="product-type"\u003eProduct Type\u003c/span\u003e:\n            \u003cspan class="qv-product-type"\u003e\u003c/span\u003e\n         \u003c/div\u003e\n         \u003cdiv class="qv-view-vendor-title"\u003e\n            \u003cspan class="product-vendor_name"\u003eVendor:\u003c/span\u003e:\n            \u003cspan class="qv-view-vendor"\u003e\u003c/span\u003e\n         \u003c/div\u003e\n         \u003cdiv class="qv-sku"\u003e\n            \u003cspan class="sku-name"\u003eSku\u003c/span\u003e:\n            \u003cspan class="qv-view-sku"\u003e\u003c/span\u003e\n         \u003c/div\u003e\n      \u003c/div\u003e\n      \u003cdiv class="qv-add-to-cart"\u003e\n         \u003cdiv class="qv-product-options"\u003e\u003c/div\u003e\n         \u003cdiv class="quantity-qv"\u003e\n            \u003cspan\u003eQuantity\u003c/span\u003e\n            \u003cinput type="number" class="qv-quantity" value="1" min="1"\u003e\n         \u003c/div\u003e\n         \u003cinput type="submit" class="qv-add-button button" value="Add to cart"\u003e\n      \u003c/div\u003e\n      \u003ca class="view-product" href=""\u003e\u003cspan\u003eView Full Product Details\u003c/span\u003e\u003c/a\u003e\n   \u003c/div\u003e\n\u003c/div\u003e';

window.performance &&
  window.performance.mark &&
  window.performance.mark("shopify.content_for_header.end");
document.documentElement.className = document.documentElement.className.replace(
  "no-js",
  "js"
);
window.routes = {
  cart_add_url: "/cart/add",
  cart_change_url: "/cart/change",
  cart_update_url: "/cart/update",
  predictive_search_url: "/search/suggest",
};

window.cartStrings = {
  error: `There was an error while updating your cart. Please try again.`,
  quantityError: `You can only add [quantity] of this item to your cart.`,
};

window.variantStrings = {
  addToCart: `Add to cart`,
  soldOut: `Sold out`,
  unavailable: `Unavailable`,
};

$(document).ready(function () {
  function mobileToggleMenu2() {
    if ($(window).width() < 750) {
      $("#CategoryBox  ul#header-SiteCat > li.site-cat--has-dropdown").append(
        "<span class='mobile_togglemenu'> </span>"
      );
      $("#CategoryBox  ul#header-SiteCat > li.site-cat--has-dropdown").addClass(
        "toggle"
      );
      $(
        "#CategoryBox  ul#header-SiteCat > li.site-cat--has-dropdown .mobile_togglemenu"
      ).click(function () {
        $(this)
          .parent()
          .toggleClass("active")
          .find(".site-nav__childlist-drop")
          .slideToggle("slow");
      });
    } else {
      $(
        "#CategoryBox  ul#header-SiteCat > li.site-cat--has-dropdown"
      ).removeClass("toggle");
      $(
        "#CategoryBox  ul#header-SiteCat > li.site-cat--has-dropdown"
      ).removeClass("active");
      $(
        "#CategoryBox  ul#header-SiteCat > li.site-cat--has-dropdown .mobile_togglemenu"
      ).remove();
    }
  }
  function mobileToggleMenu3() {
    if ($(window).width() < 750) {
      $(
        " #CategoryBox  ul#header-SiteCat  li.site-cat--has-dropdown .site-nav__childlist-item-dropdown"
      ).append("<span class='mobile_togglemenu'> </span>");
      $(
        " #CategoryBox  ul#header-SiteCat li.site-cat--has-dropdown .site-nav__childlist-item-dropdown"
      ).addClass("toggle");
      $(
        " #CategoryBox  ul#header-SiteCat li.site-cat--has-dropdown .site-nav__childlist-item-dropdown .mobile_togglemenu"
      ).click(function () {
        $(this)
          .parent()
          .toggleClass("active")
          .find(".header-nav__childlist")
          .slideToggle("slow");
      });
    } else {
      $(
        "#CategoryBox  ul#header-SiteCat  li.site-cat--has-dropdown .site-nav__childlist-item-dropdown"
      ).removeClass("toggle");
      $(
        "#CategoryBox  ul#header-SiteCat  li.site-cat--has-dropdown .site-nav__childlist-item-dropdown"
      ).removeClass("active");
      $(
        "#CategoryBox  ul#header-SiteCat  li.site-cat--has-dropdown .site-nav__childlist-item-dropdown .mobile_togglemenu"
      ).remove();
    }
  }
  function responsivecolumn() {
    if ($(document).width() <= 989) {
      $(window).bind("scroll", function () {
        if ($(window).scrollTop() > 210) {
          $(".header-top-menu").addClass("fixed");
        } else {
          $(".header-top-menu").removeClass("fixed");
        }
      });

      $(".site-header__search").insertAfter(".header-right");
    } else if ($(document).width() >= 990) {
      $(window).bind("scroll", function () {
        if ($(window).scrollTop() > 222) {
          $(".header-top-menu").addClass("fixed");
        } else {
          $(".header-top-menu").removeClass("fixed");
        }
      });

      $(".site-header__search").appendTo(".header-right");
    }
  }
  $(window).resize(function () {
    mobileToggleMenu2();
    mobileToggleMenu3();
    responsivecolumn();
  });
  $(".side-categories").click(function () {
    $("#CategoryBox #header-SiteCat, #header-SiteCat").slideToggle(500);
    $(".side-categories").toggleClass("active");
  });
  $("#cart-icon-bubble").click(function () {
    $(".cart-content").addClass("active");
    $(".overlay").addClass("overlay_active");
  });
  $(".close-icon, .overlay").click(function () {
    $(".cart-content").removeClass("active");
    $(".overlay").removeClass("overlay_active");
  });
  $("#cart-icon-bubble").click(function () {
    $("#cart_reload").load("#cart_reload .cart_content > *");
  });
  $(".menu-drawer-container .icon-close").click(function () {
    $(".menu-drawer-container").removeClass("menu-opening");
    // $(".header__icon--menu").attr("aria-expanded","false");
    //  $(".menu-drawer-container").removeAttr("open");
  });
  function more_nav1() {
    if ($(window).width() >= 1270) {
      var max_elem = 8;
      var items = $("#header-nav > li");
      var surplus = items.slice(max_elem, items.length);
      surplus.wrapAll(
        '<li class="more-site-nav hiden_menu"><div class="site-nav__dropdown"><ul>'
      );
      $(".hiden_menu").prepend(
        '<a class="logo--left__link site-nav__link site-nav__link--main" href="#">more</a>'
      );
    } else {
      var max_elem = 5;
      var items = $("#header-nav > li");
      var surplus = items.slice(max_elem, items.length);
      surplus.wrapAll(
        '<li class="more-site-nav hiden_menu"><div class="site-nav__dropdown"><ul class="list-menu list-menu--disclosure">'
      );
      $(".hiden_menu").prepend(
        '<a class="header__menu-item list-menu__item link" href="#">more</a>'
      );
    }
  }
  function more_nav2() {
    if ($(window).width() >= 1270) {
      var max_elem = 10;
      var items = $("#header-SiteCat > li");
      var surplus = items.slice(max_elem, items.length);
      surplus.wrapAll(
        '<li class="more-site-nav hiden_menu"><div class="site-nav__dropdown"><ul>'
      );
      $(".hiden_menu").prepend(
        '<a class="logo--left__link site-nav__link site-nav__link--main" href="#">more</a>'
      );
    } else {
      var max_elem = 10;
      var items = $("#header-SiteCat  > li");
      var surplus = items.slice(max_elem, items.length);
      surplus.wrapAll(
        '<li class="more-site-nav hiden_menu"><div class="site-nav__dropdown"><ul class="list-menu list-menu--disclosure">'
      );
      $(".hiden_menu").prepend(
        '<a class="header__menu-item list-menu__item link" href="#">more</a>'
      );
    }
  }
  more_nav1();
  more_nav2();
  responsivecolumn();
});
