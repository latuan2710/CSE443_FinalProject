$(window).load(function () {
    $(".ttloader").hide();
}),
    $(window).scroll(function () {
        $(this).scrollTop() > 500
            ? $(".top_button").fadeIn(500)
            : $(".top_button").fadeOut(500);
    }),
    $(".top_button").click(function (event2) {
        event2.preventDefault(), $("html, body").animate({ scrollTop: 0 }, 800);
    }),
    $(document).ready(function () {
        $(".btn-group").each(function () {
            var active,
                content,
                links = $(this).find("a");
            (active = links.first().addClass("active")),
                (content = $(active.attr("href"))),
                links.not(":first").each(function () {
                    $($(this).attr("href")).hide();
                }),
                $(this)
                    .find("a")
                    .click(function (e) {
                        return (
                            active.removeClass("active"),
                            content.hide(),
                            (active = $(this)),
                            (content = $($(this).attr("href"))),
                            active.addClass("active"),
                            content.show(),
                            !1
                        );
                    });
        });
    }),
    $(document).ready(function () {
        $("#col_1").click(function (event2) {
            event2.preventDefault(),
                $("#products .item").removeClass(
                    "grid--2-col-desktop grid--3-col-desktop grid--4-col-desktop grid--5-col-desktop"
                ),
                $("#products .item").addClass("list-group-item");
        }),
            $("#col_2").click(function (event2) {
                event2.preventDefault(),
                    $("#products .item").removeClass(
                        "list-group-item grid--3-col-desktop grid--4-col-desktop grid--5-col-desktop"
                    ),
                    $("#products .item").addClass("grid--2-col-desktop");
            }),
            $("#col_3").click(function (event2) {
                event2.preventDefault(),
                    $("#products .item").removeClass(
                        "list-group-item grid--2-col-desktop grid--4-col-desktop grid--5-col-desktop"
                    ),
                    $("#products .item").addClass("grid--3-col-desktop");
            }),
            $("#col_4").click(function (event2) {
                event2.preventDefault(),
                    $("#products .item").removeClass(
                        "list-group-item grid--2-col-desktop grid--3-col-desktop grid--5-col-desktop"
                    ),
                    $("#products .item").addClass("grid--4-col-desktop");
            });
    });
function getFocusableElements(container) {
    return Array.from(
        container.querySelectorAll(
            "summary, a[href], button:enabled, [tabindex]:not([tabindex^='-']), [draggable], area, input:not([type=hidden]):enabled, select:enabled, textarea:enabled, object, iframe"
        )
    );
}
const trapFocusHandlers = {};
function trapFocus(container, elementToFocus = container) {
    var elements = getFocusableElements(container),
        first = elements[0],
        last = elements[elements.length - 1];
    removeTrapFocus(),
        (trapFocusHandlers.focusin = (event2) => {
            (event2.target !== container &&
                event2.target !== last &&
                event2.target !== first) ||
                document.addEventListener("keydown", trapFocusHandlers.keydown);
        }),
        (trapFocusHandlers.focusout = function () {
            document.removeEventListener("keydown", trapFocusHandlers.keydown);
        }),
        (trapFocusHandlers.keydown = function (event2) {
            event2.code.toUpperCase() === "TAB" &&
                (event2.target === last &&
                    !event2.shiftKey &&
                    (event2.preventDefault(), first.focus()),
                    (event2.target === container || event2.target === first) &&
                    event2.shiftKey &&
                    (event2.preventDefault(), last.focus()));
        }),
        document.addEventListener("focusout", trapFocusHandlers.focusout),
        document.addEventListener("focusin", trapFocusHandlers.focusin),
        elementToFocus.focus();
}
function pauseAllMedia() {
    document.querySelectorAll(".js-youtube").forEach((video) => {
        video.contentWindow.postMessage(
            '{"event":"command","func":"pauseVideo","args":""}',
            "*"
        );
    }),
        document.querySelectorAll(".js-vimeo").forEach((video) => {
            video.contentWindow.postMessage('{"method":"pause"}', "*");
        }),
        document.querySelectorAll("video").forEach((video) => video.pause()),
        document
            .querySelectorAll("product-model")
            .forEach((model) => model.modelViewerUI?.pause());
}
function removeTrapFocus(elementToFocus = null) {
    document.removeEventListener("focusin", trapFocusHandlers.focusin),
        document.removeEventListener("focusout", trapFocusHandlers.focusout),
        document.removeEventListener("keydown", trapFocusHandlers.keydown),
        elementToFocus && elementToFocus.focus();
}
class QuantityInput extends HTMLElement {
    constructor() {
        super(),
            (this.input = this.querySelector("input")),
            (this.changeEvent = new Event("change", { bubbles: !0 })),
            this.querySelectorAll("button").forEach((button) =>
                button.addEventListener("click", this.onButtonClick.bind(this))
            );
    }
    onButtonClick(event2) {
        event2.preventDefault();
        const previousValue = +this.input.value;
        const max = +event2.target.dataset.max;
        try {
            if (event2.target.name === "plus" && previousValue < max) {
                document.querySelector("#quantityDetail").value = previousValue + 1;
            } else if (event2.target.name === "minus" && previousValue > 0) {
                document.querySelector("#quantityDetail").value = previousValue - 1;
            }
        } catch {

        }
        if (event2.target.name === "plus" && previousValue < max) {
            this.input.value = previousValue + 1
        } else if (event2.target.name === "minus" && previousValue > 0) {
            this.input.value = previousValue - 1
        }
        previousValue !== this.input.value &&
            this.input.dispatchEvent(this.changeEvent);
    }
}
customElements.define("quantity-input", QuantityInput);
function debounce(fn, wait) {
    let t;
    return (...args) => {
        clearTimeout(t), (t = setTimeout(() => fn.apply(this, args), wait));
    };
}
const serializeForm = (form) => {
    const obj = {},
        formData = new FormData(form);
    for (const key of formData.keys()) obj[key] = formData.get(key);
    return JSON.stringify(obj);
};
function fetchConfig(type = "json") {
    return {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Accept: `application/${type}`,
        },
    };
}
typeof window.Shopify > "u" && (window.Shopify = {}),
    (Shopify.bind = function (fn, scope) {
        return function () {
            return fn.apply(scope, arguments);
        };
    }),
    (Shopify.setSelectorByValue = function (selector, value) {
        for (var i = 0, count = selector.options.length; i < count; i++) {
            var option = selector.options[i];
            if (value == option.value || value == option.innerHTML)
                return (selector.selectedIndex = i), i;
        }
    }),
    (Shopify.addListener = function (target, eventName, callback) {
        target.addEventListener
            ? target.addEventListener(eventName, callback, !1)
            : target.attachEvent("on" + eventName, callback);
    }),
    (Shopify.postLink = function (path, options) {
        options = options || {};
        var method = options.method || "post",
            params = options.parameters || {},
            form = document.createElement("form");
        form.setAttribute("method", method), form.setAttribute("action", path);
        for (var key in params) {
            var hiddenField = document.createElement("input");
            hiddenField.setAttribute("type", "hidden"),
                hiddenField.setAttribute("name", key),
                hiddenField.setAttribute("value", params[key]),
                form.appendChild(hiddenField);
        }
        document.body.appendChild(form),
            form.submit(),
            document.body.removeChild(form);
    }),
    (Shopify.CountryProvinceSelector = function (
        country_domid,
        province_domid,
        options
    ) {
        (this.countryEl = document.getElementById(country_domid)),
            (this.provinceEl = document.getElementById(province_domid)),
            (this.provinceContainer = document.getElementById(
                options.hideElement || province_domid
            )),
            Shopify.addListener(
                this.countryEl,
                "change",
                Shopify.bind(this.countryHandler, this)
            ),
            this.initCountry(),
            this.initProvince();
    }),
    (Shopify.CountryProvinceSelector.prototype = {
        initCountry: function () {
            var value = this.countryEl.getAttribute("data-default");
            Shopify.setSelectorByValue(this.countryEl, value), this.countryHandler();
        },
        initProvince: function () {
            var value = this.provinceEl.getAttribute("data-default");
            value &&
                this.provinceEl.options.length > 0 &&
                Shopify.setSelectorByValue(this.provinceEl, value);
        },
        countryHandler: function (e) {
            var opt = this.countryEl.options[this.countryEl.selectedIndex],
                raw = opt.getAttribute("data-provinces"),
                provinces = JSON.parse(raw);
            if (
                (this.clearOptions(this.provinceEl), provinces && provinces.length == 0)
            )
                this.provinceContainer.style.display = "none";
            else {
                for (var i = 0; i < provinces.length; i++) {
                    var opt = document.createElement("option");
                    (opt.value = provinces[i][0]),
                        (opt.innerHTML = provinces[i][1]),
                        this.provinceEl.appendChild(opt);
                }
                this.provinceContainer.style.display = "";
            }
        },
        clearOptions: function (selector) {
            for (; selector.firstChild;) selector.removeChild(selector.firstChild);
        },
        setOptions: function (selector, values) {
            for (var i = 0, count = values.length; i < values.length; i++) {
                var opt = document.createElement("option");
                (opt.value = values[i]),
                    (opt.innerHTML = values[i]),
                    selector.appendChild(opt);
            }
        },
    });
class MenuDrawer extends HTMLElement {
    constructor() {
        super(), (this.mainDetailsToggle = this.querySelector("details"));
        const summaryElements = this.querySelectorAll("summary");
        this.addAccessibilityAttributes(summaryElements),
            navigator.platform === "iPhone" &&
            document.documentElement.style.setProperty(
                "--viewport-height",
                `${window.innerHeight}px`
            ),
            this.addEventListener("keyup", this.onKeyUp.bind(this)),
            this.addEventListener("focusout", this.onFocusOut.bind(this)),
            this.bindEvents();
    }
    bindEvents() {
        this.querySelectorAll("summary").forEach((summary) =>
            summary.addEventListener("click", this.onSummaryClick.bind(this))
        ),
            this.querySelectorAll("button").forEach((button) =>
                button.addEventListener("click", this.onCloseButtonClick.bind(this))
            );
    }
    addAccessibilityAttributes(summaryElements) {
        summaryElements.forEach((element) => {
            element.setAttribute("role", "button"),
                element.setAttribute("aria-expanded", !1),
                element.setAttribute("aria-controls", element.nextElementSibling.id);
        });
    }
    onKeyUp(event2) {
        if (event2.code.toUpperCase() !== "ESCAPE") return;
        const openDetailsElement = event2.target.closest("details[open]");
        openDetailsElement &&
            (openDetailsElement === this.mainDetailsToggle
                ? this.closeMenuDrawer(this.mainDetailsToggle.querySelector("summary"))
                : this.closeSubmenu(openDetailsElement));
    }
    onSummaryClick(event2) {
        const summaryElement = event2.currentTarget,
            detailsElement = summaryElement.parentNode,
            isOpen = detailsElement.hasAttribute("open");
        detailsElement === this.mainDetailsToggle
            ? (isOpen && event2.preventDefault(),
                isOpen
                    ? this.closeMenuDrawer(summaryElement)
                    : this.openMenuDrawer(summaryElement))
            : (trapFocus(
                summaryElement.nextElementSibling,
                detailsElement.querySelector("button")
            ),
                setTimeout(() => {
                    detailsElement.classList.add("menu-opening");
                }));
    }
    openMenuDrawer(summaryElement) {
        setTimeout(() => {
            this.mainDetailsToggle.classList.add("menu-opening");
        }),
            summaryElement.setAttribute("aria-expanded", !0),
            trapFocus(this.mainDetailsToggle, summaryElement),
            document.body.classList.add("overflow-hidden-mobile");
    }
    closeMenuDrawer(event2, elementToFocus = !1) {
        event2 !== void 0 &&
            (this.mainDetailsToggle.classList.remove("menu-opening"),
                this.mainDetailsToggle.querySelectorAll("details").forEach((details) => {
                    details.removeAttribute("open"),
                        details.classList.remove("menu-opening");
                }),
                this.mainDetailsToggle
                    .querySelector("summary")
                    .setAttribute("aria-expanded", !1),
                document.body.classList.remove("overflow-hidden-mobile"),
                removeTrapFocus(elementToFocus),
                this.closeAnimation(this.mainDetailsToggle));
    }
    onFocusOut(event2) {
        setTimeout(() => {
            this.mainDetailsToggle.hasAttribute("open") &&
                !this.mainDetailsToggle.contains(document.activeElement) &&
                this.closeMenuDrawer();
        });
    }
    onCloseButtonClick(event2) {
        const detailsElement = event2.currentTarget.closest("details");
        this.closeSubmenu(detailsElement);
    }
    closeSubmenu(detailsElement) {
        detailsElement.classList.remove("menu-opening"),
            removeTrapFocus(),
            this.closeAnimation(detailsElement);
    }
    closeAnimation(detailsElement) {
        let animationStart;
        const handleAnimation = (time) => {
            animationStart === void 0 && (animationStart = time),
                time - animationStart < 400
                    ? window.requestAnimationFrame(handleAnimation)
                    : (detailsElement.removeAttribute("open"),
                        detailsElement.closest("details[open]") &&
                        trapFocus(
                            detailsElement.closest("details[open]"),
                            detailsElement.querySelector("summary")
                        ));
        };
        window.requestAnimationFrame(handleAnimation);
    }
}
customElements.define("menu-drawer", MenuDrawer);
class HeaderDrawer extends MenuDrawer {
    constructor() {
        super();
    }
    openMenuDrawer(summaryElement) {
        (this.header =
            this.header || document.getElementById("shopify-section-header")),
            (this.borderOffset =
                this.borderOffset ||
                    this.closest(".header-wrapper").classList.contains(
                        "header-wrapper--border-bottom"
                    )
                    ? 1
                    : 0),
            document.documentElement.style.setProperty(
                "--header-bottom-position",
                `${parseInt(
                    this.header.getBoundingClientRect().bottom - this.borderOffset
                )}px`
            ),
            setTimeout(() => {
                this.mainDetailsToggle.classList.add("menu-opening");
            }),
            summaryElement.setAttribute("aria-expanded", !0),
            trapFocus(this.mainDetailsToggle, summaryElement),
            document.body.classList.add("overflow-hidden-mobile");
    }
}
customElements.define("header-drawer", HeaderDrawer);
class ModalDialog extends HTMLElement {
    constructor() {
        super(),
            this.querySelector('[id^="ModalClose-"]').addEventListener(
                "click",
                this.hide.bind(this)
            ),
            this.addEventListener("click", (event2) => {
                event2.target.nodeName === "MODAL-DIALOG" && this.hide();
            }),
            this.addEventListener("keyup", () => {
                event.code.toUpperCase() === "ESCAPE" && this.hide();
            });
    }
    show(opener) {
        (this.openedBy = opener),
            document.body.classList.add("overflow-hidden"),
            this.setAttribute("open", ""),
            this.querySelector(".template-popup")?.loadContent(),
            trapFocus(this, this.querySelector('[role="dialog"]'));
    }
    hide() {
        document.body.classList.remove("overflow-hidden"),
            this.removeAttribute("open"),
            removeTrapFocus(this.openedBy),
            window.pauseAllMedia();
    }
}
customElements.define("modal-dialog", ModalDialog);
class ModalOpener extends HTMLElement {
    constructor() {
        super();
        const button = this.querySelector("button");
        button?.addEventListener("click", () => {
            document.querySelector(this.getAttribute("data-modal"))?.show(button);
        });
    }
}
customElements.define("modal-opener", ModalOpener);
class DeferredMedia extends HTMLElement {
    constructor() {
        super(),
            this.querySelector('[id^="Deferred-Poster-"]')?.addEventListener(
                "click",
                this.loadContent.bind(this)
            );
    }
    loadContent() {
        if (!this.getAttribute("loaded")) {
            const content = document.createElement("div");
            content.appendChild(
                this.querySelector("template").content.firstElementChild.cloneNode(!0)
            ),
                this.setAttribute("loaded", !0),
                window.pauseAllMedia(),
                this.appendChild(
                    content.querySelector("video, model-viewer, iframe")
                ).focus();
        }
    }
}
customElements.define("deferred-media", DeferredMedia);
//# sourceMappingURL=/cdn/shop/t/2/assets/global.js.map?v=96104314594118591911666256839
