const LOCAL_STORAGE_COMPARE_KEY = "shopify-compare"
    , LOCAL_COMPARE_STORAGE_DELIMITER = ","
    , BUTTON_COMPARE_ACTIVE_CLASS = "active"
    , GRID_COMPARE_LOADED_CLASS = "loaded"
    , compareSelectors = {
        button: "[button-compare]",
        grid: "[grid-compare]",
        productCard: ".product-card-compare"
    };
document.addEventListener("DOMContentLoaded", () => {
    var text = document.getElementsByClassName("product-recommendations")
        , len = text.length;
    len || initButtonsCompare(),
        initGridCompare()
}
),
    document.addEventListener("shopify-compare:updated", event => {
        console.log("[Shopify Compare] Compare Updated \u2705", event.detail.compare),
            initGridCompare()
    }
    ),
    document.addEventListener("shopify-compare:init-product-grid", event => {
        console.log("[Shopify Compare] Compare Product List Loaded \u2705", event.detail.compare)
    }
    ),
    document.addEventListener("shopify-compare:init-buttons", event => {
        console.log("[Shopify Compare] Compare Buttons Loaded \u2705", event.detail.compare)
    }
    );
const fetchCompareProductCardHTML = handle => {
    const productTileTemplateUrl = `/products/${handle}?view=card`;
    return;
}
    //  , setupGridCompare = async grid=>{
    //    const compare = getCompare()    
    //      , requests = compare.map(fetchCompareProductCardHTML)
    //      , compareProductCards = (await Promise.all(requests)).join("");
    //    grid.innerHTML = compareProductCards,
    //    grid.classList.add(GRID_COMPARE_LOADED_CLASS),
    //    initButtonsCompare();
    //    const event = new CustomEvent("shopify-compare:init-product-grid",{
    //        detail: {
    //            compare
    //        }
    //    });
    //    document.dispatchEvent(event)
    //}
    , setupCompareButtons = buttons => {
        buttons.forEach(button => {
            const productHandle = button.dataset.productHandle || !1;
            if (!productHandle)
                return console.error("[Shopify Compare] Missing `data-product-handle` attribute. Failed to update the compare.");
            compareContains(productHandle) && button.classList.add(BUTTON_COMPARE_ACTIVE_CLASS),
                button.addEventListener("click", (event) => {

                    updateCompare(productHandle);
                    button.classList.toggle(BUTTON_COMPARE_ACTIVE_CLASS);
                    if (button.querySelector('.icon-close')) {
                        location.reload();
                    }
                }
                )
        }
        )
    }
    , initGridCompare = () => {
        const grid = document.querySelector(compareSelectors.grid) || !1;
        //grid && setupGridCompare(grid)
    }
    , initButtonsCompare = () => {
        const buttons = document.querySelectorAll(compareSelectors.button) || [];
        if (buttons.length)
            setupCompareButtons(buttons);
        else
            return;
        const event = new CustomEvent("shopify-compare:init-buttons", {
            detail: {
                compare: getCompare()
            }
        });
        document.dispatchEvent(event)
    }
    , getCompare = () => {
        const compare = localStorage.getItem(LOCAL_STORAGE_COMPARE_KEY) || !1;
        return compare ? compare.split(LOCAL_COMPARE_STORAGE_DELIMITER) : []
    }
    , setCompare = array => {
        const compare = array.join(LOCAL_COMPARE_STORAGE_DELIMITER);
        array.length ? localStorage.setItem(LOCAL_STORAGE_COMPARE_KEY, compare) : localStorage.removeItem(LOCAL_STORAGE_COMPARE_KEY);
        const event = new CustomEvent("shopify-compare:updated", {
            detail: {
                compare: array
            }
        });
        return updateCompareCount(),
            document.dispatchEvent(event),
            compare
    }
    , updateCompare = handle => {
        const compare = getCompare()
            , indexInCompare = compare.indexOf(handle);
        return indexInCompare === -1 ? compare.push(handle) : compare.splice(indexInCompare, 1),
            setCompare(compare)
    }
    , compareContains = handle => getCompare().includes(handle)
    , resetCompare = () => setCompare([])
    , updateCompareCount = () => {
        const compare = getCompare();
        $("[data-js-compare-count]").attr("data-js-compare-count", compare.length).html(compare.length),
            compare.length == 0 ? $(".comp-info").css("display", "block") : $(".comp-info").css("display", "none")
    }
    ;
$(document).ready(function () {
    updateCompareCount()
});
//# sourceMappingURL=/cdn/shop/t/2/assets/compare.js.map?v=105870898912471278291666256837
