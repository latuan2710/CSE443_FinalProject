class VariantSelects extends HTMLElement {
  constructor() {
    super(), this.addEventListener("change", this.onVariantChange);
  }
  onVariantChange() {
    this.updateOptions(),
      this.updateMasterId(),
      this.toggleAddButton(!0, "", !1),
      this.updatePickupAvailability(),
      this.updateSKU(),
      this.updateAvailability(),
      this.currentVariant
        ? (this.updateMedia(),
          this.updateURL(),
          this.updateVariantInput(),
          this.renderProductInfo())
        : (this.toggleAddButton(!0, "", !0), this.setUnavailable());
  }
  updateSKU() {
    this.currentVariant.sku
      ? $(".js-variant-sku").html(this.currentVariant.sku)
      : $(".js-variant-sku").html("N/A");
  }
  updateAvailability() {
    this.currentVariant.available
      ? ($(".js-variant-availability").removeClass("outstock"),
        $(".js-variant-availability").addClass("instock"))
      : ($(".js-variant-availability").removeClass("instock"),
        $(".js-variant-availability").addClass("outstock"));
  }
  updateOptions() {
    this.options = Array.from(
      this.querySelectorAll("select"),
      (select) => select.value
    );
  }
  updateMasterId() {
    this.currentVariant = this.getVariantData().find(
      (variant) =>
        !variant.options
          .map((option, index) => this.options[index] === option)
          .includes(!1)
    );
  }
  updateMedia() {
    if (!this.currentVariant || !this.currentVariant?.featured_media) return;
    const newMedia = document.querySelector(
      `[data-media-id="${this.dataset.section}-${this.currentVariant.featured_media.id}"]`
    );
    if (!newMedia) return;
    const parent = newMedia.parentElement;
    parent.prepend(newMedia),
      window.setTimeout(() => {
        parent.scroll(0, 0);
      });
  }
  updateURL() {
    this.currentVariant &&
      window.history.replaceState(
        {},
        "",
        `${this.dataset.url}?variant=${this.currentVariant.id}`
      );
  }
  updateVariantInput() {
    document
      .querySelectorAll(
        `#product-form-${this.dataset.section}, #product-form-installment`
      )
      .forEach((productForm) => {
        const input = productForm.querySelector('input[name="id"]');
        (input.value = this.currentVariant.id),
          input.dispatchEvent(new Event("change", { bubbles: !0 }));
      });
  }
  updatePickupAvailability() {
    const pickUpAvailability = document.querySelector("pickup-availability");
    pickUpAvailability &&
      (this.currentVariant?.available
        ? pickUpAvailability.fetchAvailability(this.currentVariant.id)
        : (pickUpAvailability.removeAttribute("available"),
          (pickUpAvailability.innerHTML = "")));
  }
  renderProductInfo() {
    fetch(
      `${this.dataset.url}?variant=${this.currentVariant.id}&section_id=${this.dataset.section}`
    )
      .then((response) => response.text())
      .then((responseText) => {
        const id = `price-${this.dataset.section}`,
          html = new DOMParser().parseFromString(responseText, "text/html"),
          destination = document.getElementById(id),
          source = html.getElementById(id);
        source && destination && (destination.innerHTML = source.innerHTML),
          document
            .getElementById(`price-${this.dataset.section}`)
            ?.classList.remove("visibility-hidden"),
          this.toggleAddButton(
            !this.currentVariant.available,
            window.variantStrings.soldOut
          );
      });
  }
  toggleAddButton(disable = !0, text, modifyClass = !0) {
    const addButton = document
      .getElementById(`product-form-${this.dataset.section}`)
      ?.querySelector('[name="add"]');
    addButton &&
      (disable
        ? (addButton.setAttribute("disabled", !0),
          text && (addButton.textContent = text))
        : (addButton.removeAttribute("disabled"),
          (addButton.textContent = window.variantStrings.addToCart)));
  }
  setUnavailable() {
    const addButton = document
      .getElementById(`product-form-${this.dataset.section}`)
      ?.querySelector('[name="add"]');
    addButton &&
      ((addButton.textContent = window.variantStrings.unavailable),
      document
        .getElementById(`price-${this.dataset.section}`)
        ?.classList.add("visibility-hidden"));
  }
  getVariantData() {
    return (
      (this.variantData =
        this.variantData ||
        JSON.parse(
          this.querySelector('[type="application/json"]').textContent
        )),
      this.variantData
    );
  }
}
customElements.define("variant-selects", VariantSelects);
class VariantRadios extends VariantSelects {
  constructor() {
    super();
  }
  updateOptions() {
    const fieldsets = Array.from(this.querySelectorAll("fieldset"));
    this.options = fieldsets.map(
      (fieldset) =>
        Array.from(fieldset.querySelectorAll("input")).find(
          (radio) => radio.checked
        ).value
    );
  }
}
customElements.define("variant-radios", VariantRadios);
//# sourceMappingURL=/cdn/shop/t/2/assets/variants.js.map?v=155594191582822544481691994934
