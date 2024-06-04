const LOCAL_STORAGE_WISHLIST_KEY = "shopify-wishlist",
  LOCAL_STORAGE_DELIMITER = ",",
  BUTTON_ACTIVE_CLASS = "active",
  GRID_LOADED_CLASS = "loaded",
  selectors = {
    button: "[button-wishlist]",
    grid: "[grid-wishlist]",
    productCard: ".product-card",
  };
document.addEventListener("DOMContentLoaded", () => {
  var text = document.getElementsByClassName("product-recommendations"),
    len = text.length;
  len || initButtons(), initGrid();
}),
  document.addEventListener("shopify-wishlist:updated", (event) => {
    console.log(
      "[Shopify Wishlist] Wishlist Updated \u2705",
      event.detail.wishlist
    ),
      initGrid();
  }),
  document.addEventListener("shopify-wishlist:init-product-grid", (event) => {
    console.log(
      "[Shopify Wishlist] Wishlist Product List Loaded \u2705",
      event.detail.wishlist
    );
  }),
  document.addEventListener("shopify-wishlist:init-buttons", (event) => {
    console.log(
      "[Shopify Wishlist] Wishlist Buttons Loaded \u2705",
      event.detail.wishlist
    );
  });
const fetchProductCardHTML = (handle) => {
    const productTileTemplateUrl = `/products/${handle}?view=card`;
    return fetch(productTileTemplateUrl)
      .then((res) => res.text())
      .then((res) => {
        const text = res;
        return new DOMParser()
          .parseFromString(text, "text/html")
          .documentElement.querySelector(selectors.productCard).outerHTML;
      })
      .catch((err) =>
        console.error(
          `[Shopify Wishlist] Failed to load content for handle: ${handle}`,
          err
        )
      );
  },
  setupGrid = async (grid) => {
    const wishlist = getWishlist(),
      requests = wishlist.map(fetchProductCardHTML),
      wishlistProductCards = (await Promise.all(requests)).join(" ");
    (grid.innerHTML = wishlistProductCards),
      grid.classList.add(GRID_LOADED_CLASS),
      initButtons();
    const event = new CustomEvent("shopify-wishlist:init-product-grid", {
      detail: { wishlist },
    });
    document.dispatchEvent(event);
  },
  setupButtons = (buttons) => {
    buttons.forEach((button) => {
      const productHandle = button.dataset.productHandle || !1;
      if (!productHandle)
        return console.error(
          "[Shopify Wishlist] Missing `data-product-handle` attribute. Failed to update the wishlist."
        );
      wishlistContains(productHandle) &&
        button.classList.add(BUTTON_ACTIVE_CLASS),
        button.addEventListener("click", () => {
          updateWishlist(productHandle),
            button.classList.toggle(BUTTON_ACTIVE_CLASS);
        });
    });
  },
  initGrid = () => {
    const grid = document.querySelector(selectors.grid) || !1;
    grid && setupGrid(grid);
  },
  initButtons = () => {
    const buttons = document.querySelectorAll(selectors.button) || [];
    if (buttons.length) setupButtons(buttons);
    else return;
    const event = new CustomEvent("shopify-wishlist:init-buttons", {
      detail: { wishlist: getWishlist() },
    });
    document.dispatchEvent(event);
  },
  getWishlist = () => {
    const wishlist = localStorage.getItem(LOCAL_STORAGE_WISHLIST_KEY) || !1;
    return wishlist ? wishlist.split(LOCAL_STORAGE_DELIMITER) : [];
  },
  setWishlist = (array) => {
    const wishlist = array.join(LOCAL_STORAGE_DELIMITER);
    array.length
      ? localStorage.setItem(LOCAL_STORAGE_WISHLIST_KEY, wishlist)
      : localStorage.removeItem(LOCAL_STORAGE_WISHLIST_KEY);
    const event = new CustomEvent("shopify-wishlist:updated", {
      detail: { wishlist: array },
    });
    return updateWishlistCount(), document.dispatchEvent(event), wishlist;
  },
  updateWishlist = (handle) => {
    const wishlist = getWishlist(),
      indexInWishlist = wishlist.indexOf(handle);
    return (
      indexInWishlist === -1
        ? wishlist.push(handle)
        : wishlist.splice(indexInWishlist, 1),
      setWishlist(wishlist)
    );
  },
  wishlistContains = (handle) => getWishlist().includes(handle),
  resetWishlist = () => setWishlist([]),
  updateWishlistCount = () => {
    const wishlist = getWishlist();
    $("[data-js-wishlist-count]")
      .attr("data-js-wishlist-count", wishlist.length)
      .html(wishlist.length),
      wishlist.length == 0
        ? $(".wish-info").css("display", "block")
        : $(".wish-info").css("display", "none");
  };
$(document).ready(function () {
  updateWishlistCount();
});
//# sourceMappingURL=/cdn/shop/t/2/assets/wishlist.js.map?v=78514634236923147211666256843
