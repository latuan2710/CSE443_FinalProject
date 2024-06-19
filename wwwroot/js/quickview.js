$(document).ready(function () {
    $.getScript("//cdnjs.cloudflare.com/ajax/libs/fancybox/2.1.5/jquery.fancybox.min.js").done(function () {
        quickView()
    })
});
function quickView() {
    $(document.body).on("click", ".quick-view", function () {
        $("#quick-view").length == 0 && $(document.body).append('<div id="quick-view"></div>');
        var product_handle = $(this).data("handle");
        $("#quick-view").addClass(product_handle),
            $.get(`/Coffees/GetProduct?name=${product_handle}`, function (product) {
                console.log(product);
                var title = product.name
                    , vendor = product.vendor
                    , price = 0
                    , sku = product.sku
                    , original_price = 0
                    , desc = product.description
                    , images = product.images
                    , variants = product.variants
                    , options = product.options
                    , url = "/products/" + product_handle;
                $(".qv-product-title").text(title),
                    $(".qv-product-type").text(type),
                    product.type.length == 0 && $(".qv-product-type-title").hide(),
                    $(".qv-view-vendor").text(vendor),
                    product.vendor.length == 0 && $(".qv-view-vendor-title").hide(),
                    $(".qv-product-description").html(desc),
                    $(product.variants).each(function (i, variants2) {
                        variants2.sku != null ? ($(".qv-sku").addClass("show").removeClass("hide"),
                            $(".qv-view-sku").text(product.variants[0].sku)) : $(".qv-sku").addClass("hide").removeClass("show")
                    }),
                    $(".view-product").attr("href", url);
                var imageCount = $(images).length;
                $(images).each(function (i, image) {
                    var image_embed = '<div><img src="' + image + '"></div>';
                    image_embed = image_embed.replace(".jpg", "_1000x.jpg").replace(".png", "_1000x.png"),
                        $(".qv-product-images").append(image_embed);
                    var image_embed = '<div class="images-variant" style="display:inline-block;"><img src="' + image + '" fid="' + i + '"></div>';
                    image_embed = image_embed.replace(".jpg", "_1000x.jpg").replace(".png", "_1000x.png"),
                        $(".qv-product-images-variant").append(image_embed)
                }),
                    $(".qv-product-images").slick({
                        dots: !1,
                        arrows: !0,
                        respondTo: "min"
                    }).css("opacity", "1"),
                    $(".qv-product-images-variant").slick({
                        slidesToShow: 3,
                        slidesToScroll: 1,
                        infinite: !0,
                        dots: !1,
                        arrows: !0
                    }).css("opacity", "1"),
                    $(options).each(function (i, option) {
                        var opt = option.name
                            , selectClass = ".option." + opt.toLowerCase();
                        $(".qv-product-options").append('<div class="option-selection-' + opt.toLowerCase() + '"><span class="option">' + opt + '</span><select class="field__input option-' + i + " option " + opt.toLowerCase() + '"></select></div>'),
                            option.name == "Pack Sizes" ? $(option.values).each(function (i2, value) {
                                $(".field__input.option.pack.sizes").append('<option value="' + value + '">' + value + "</option>")
                            }) : $(option.values).each(function (i2, value) {
                                $(".option." + opt.toLowerCase()).append('<option value="' + value + '">' + value + "</option>")
                            })
                    }),
                    $(document).on("click", "#quick-view .images-variant img", function () {
                        var fimgid = $(this).attr("fid");
                        $.getJSON("/products/" + product_handle + ".json", function (product2) {
                            $(images).each(function (i, image) {
                                i == fimgid && $(".qv-product-images").slick("slickGoTo", i)
                            })
                        })
                    }),
                    $(product.variants).each(function (i, v) {
                        return v.available == !1 ? ($(".qv-add-button").prop("disabled", !0).val(window.variantStrings.soldOut),
                            price = parseFloat(v.price / 100).toFixed(2),
                            original_price = parseFloat(v.compare_at_price / 100).toFixed(2),
                            $(".qv-product-price").text(price),
                            original_price > 0 ? $(".qv-product-original-price").text(original_price).show() : $(".original-price").hide(),
                            !0) : ($(".qv-add-button").prop("disabled", !1).val(window.variantStrings.addToCart),
                                price = parseFloat(v.price / 100).toFixed(2),
                                original_price = parseFloat(v.compare_at_price / 100).toFixed(2),
                                $(".qv-product-price").text(price),
                                original_price > 0 ? $(".qv-product-original-price").text(original_price).show() : $(".original-price").hide(),
                                $("select.option-0").val(v.option1),
                                $("select.option-1").val(v.option2),
                                $("select.option-2").val(v.option3),
                                !1)
                    })
            }),
            $(document).on("change", "#quick-view select", function () {
                var selectedOptions = "";
                $("#quick-view select").each(function (i) {
                    selectedOptions == "" ? selectedOptions = $(this).val() : selectedOptions = selectedOptions + " / " + $(this).val()
                }),
                    $.get(`/Coffees/GetProduct?name=${product_handle}`, function (product) {
                        $(product.variants).each(function (i, v) {
                            if (v.title == selectedOptions) {
                                if (v.featured_image !== null) {
                                    var iSlick = v.featured_image.position - 1;
                                    $(".qv-product-images").slick("slickGoTo", iSlick)
                                }
                                var price = parseFloat(v.price / 100).toFixed(2)
                                    , original_price = parseFloat(v.compare_at_price / 100).toFixed(2)
                                    , v_qty = v.inventory_quantity
                                    , v_inv = v.inventory_management;
                                $(".qv-product-price").text(price),
                                    $(".qv-product-original-price").text(original_price),
                                    v.sku != null ? ($(".qv-sku").addClass("show").removeClass("hide"),
                                        $(".qv-view-sku").text(v.sku)) : $(".qv-sku").addClass("hide").removeClass("show"),
                                    v.available == !1 ? $(".qv-add-button").prop("disabled", !0).val(window.variantStrings.soldOut) : $(".qv-add-button").prop("disabled", !1).val(window.variantStrings.addToCart)
                            }
                        })
                    })
            }),
            $.fancybox({
                href: "#quick-view",
                maxWidth: 1e3,
                maxHeight: 680,
                fitToView: !0,
                width: "80%",
                height: "88%",
                openEffect: "none",
                closeEffect: "none",
                autoSize: !1,
                beforeLoad: function () {
                    var product_handle2 = $("#quick-view").attr("class");
                    $(document).on("click", ".qv-add-button", function () {
                        var qty = $(".qv-quantity").val()
                            , v_title = ""
                            , selectedOptions = ""
                            , var_id = "";
                        $("#quick-view select").each(function (i) {
                            selectedOptions == "" ? selectedOptions = $(this).val() : selectedOptions = selectedOptions + " / " + $(this).val()
                        }),
                            $.get(`/Coffees/GetProduct?name=${product_handle2}`, function (product) {
                                $(product.variants).each(function (i, v) {
                                    v.title == selectedOptions && (var_id = v.id,
                                        v_title = v.title,
                                        processCart())
                                })
                            });
                        function processCart() {
                            $.getJSON("/cart/add.json", function (product) {
                                $(".cart-content").addClass("active"),
                                    $(".overlay").addClass("overlay_active"),
                                    $("#loader").addClass("loader"),
                                    setTimeout(function () {
                                        $("#loader").removeClass("loader")
                                    }, 1e3),
                                    $("#cart_reload").load("#cart_reload .cart_content > *"),
                                    $(".cart-count-bubble").load(" .cart-count-bubble > *"),
                                    $(".qv-add-to-cart-response").removeClass("error"),
                                    $(".qv-add-to-cart-response").addClass("success"),
                                    $(".qv-add-to-cart-response .msg").delay(3e3).fadeTo(1e3, 0),
                                    $(".qv-add-to-cart-response .msg").removeAttr("style"),
                                    $.fancybox.close()
                            });
                            // $.post("/cart/add.js", {
                            //     quantity: qty,
                            //     id: var_id
                            // }, null, "json").done(function() {
                            //     $(".cart-content").addClass("active"),
                            //     $(".overlay").addClass("overlay_active"),
                            //     $("#loader").addClass("loader"),
                            //     setTimeout(function() {
                            //         $("#loader").removeClass("loader")
                            //     }, 1e3),
                            //     $("#cart_reload").load("#cart_reload .cart_content > *"),
                            //     $(".cart-count-bubble").load(" .cart-count-bubble > *"),
                            //     $(".qv-add-to-cart-response").removeClass("error"),
                            //     $(".qv-add-to-cart-response").addClass("success"),
                            //     $(".qv-add-to-cart-response .msg").delay(3e3).fadeTo(1e3, 0),
                            //     $(".qv-add-to-cart-response .msg").removeAttr("style"),
                            //     $.fancybox.close()
                            // })
                        }
                    }),
                        $(".fancybox-wrap").css("overflow", "hidden !important")
                },
                afterShow: function () {
                    $("#quick-view").hide().html(content).css("opacity", "1").fadeIn(function () {
                        $(".qv-product-images").addClass("loaded")
                    })
                },
                afterClose: function () {
                    $("#quick-view").removeClass().empty()
                }
            })
    })
}
$(window).resize(function () {
    $("#quick-view").is(":visible") && $(".qv-product-images").slick("setPosition")
});
//# sourceMappingURL=/cdn/shop/t/2/assets/quickview.js.map?v=62692612479104596221691995153
