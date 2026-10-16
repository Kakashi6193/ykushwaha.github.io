/* The Yarn Nest storefront
 * Orders are prepared for WhatsApp; this demo does not store orders or process payments.
 * IMPORTANT: Set WHATSAPP_NUMBER before launch. Use country code and digits only, e.g. 919876543210.
 */
(() => {
  "use strict";
  const WHATSAPP_NUMBER = ""; // TODO: Add the seller's WhatsApp number, including country code.
  const products = window.YARN_NEST_PRODUCTS || [];
  const cart = new Map();
  const $ = (selector) => document.querySelector(selector);
  const money = (amount) => new Intl.NumberFormat("en-IN", {style:"currency",currency:"INR",maximumFractionDigits:0}).format(amount);
  const escapeHTML = (value) => String(value ?? "").replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
  const productById = (id) => products.find(p => p.id === id);
  const cartEntries = () => [...cart.entries()].map(([id,quantity]) => ({product:productById(id),quantity})).filter(x => x.product && x.quantity > 0);
  const totals = () => cartEntries().reduce((sum,item) => sum + item.product.price * item.quantity,0);
  let toastTimer;

  function toast(message) {
    const el = $("#toast");
    el.textContent = message;
    el.classList.add("visible");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => el.classList.remove("visible"), 2400);
  }
  function openDialog(id) {
    const dialog = document.getElementById(id);
    if (dialog && !dialog.open) dialog.showModal();
  }
  function closeDialog(id) {
    const dialog = document.getElementById(id);
    if (dialog?.open) dialog.close();
  }
  function whatsappUrl(message) {
    const digits = WHATSAPP_NUMBER.replace(/\D/g,"");
    return digits ? `https://wa.me/${digits}?text=${encodeURIComponent(message)}` : `https://wa.me/?text=${encodeURIComponent(message)}`;
  }
  function sendWhatsApp(message) {
    if (!WHATSAPP_NUMBER) toast("Add the seller's WhatsApp number in app.js before launch.");
    window.open(whatsappUrl(message),"_blank","noopener,noreferrer");
  }
  function renderProducts(category = $("#category-filter").value) {
    const filtered = products.filter(p => category === "All" || p.category === category);
    $("#product-grid").innerHTML = filtered.map(p => `
      <article class="product-card">
        <div class="product-image ${escapeHTML(p.theme)}" role="img" aria-label="${escapeHTML(p.name)} illustration"><span>${escapeHTML(p.emoji)}</span></div>
        <div class="product-category">${escapeHTML(p.category)}</div>
        <h3 class="product-name">${escapeHTML(p.name)}</h3>
        <p class="product-description">${escapeHTML(p.description)}</p>
        <div class="product-bottom"><span class="product-price">${money(p.price)}</span>
          <button class="add-button" type="button" data-add="${escapeHTML(p.id)}">Add to bag +</button></div>
      </article>`).join("");
    document.querySelectorAll("[data-filter]").forEach(button => button.classList.toggle("active",button.dataset.filter === category));
    $("#shop-title").textContent = category === "All" ? "Made for you" : category;
  }
  function renderCart() {
    const entries = cartEntries();
    const count = entries.reduce((sum,item) => sum + item.quantity,0);
    const total = totals();
    $("#cart-count").textContent = count;
    $("#sticky-count").textContent = `${count} item${count === 1 ? "" : "s"}`;
    $("#sticky-total").textContent = money(total);
    $("#cart-items").innerHTML = entries.length ? entries.map(({product:p,quantity:q}) => `
      <div class="cart-item">
        <div><div class="cart-item-name">${escapeHTML(p.name)}</div><small>${money(p.price)} each</small>
          <div class="quantity-control"><button type="button" aria-label="Decrease ${escapeHTML(p.name)} quantity" data-minus="${escapeHTML(p.id)}">−</button><span>${q}</span><button type="button" aria-label="Increase ${escapeHTML(p.name)} quantity" data-plus="${escapeHTML(p.id)}">+</button></div>
        </div><div class="cart-line-total">${money(p.price*q)}<br><button class="remove-button" type="button" data-remove="${escapeHTML(p.id)}">Remove</button></div>
      </div>`).join("") : `<div class="empty-cart">Your bag is waiting for something lovely. ♡<br><br><button class="button button-outline" type="button" data-close="cart-dialog">Keep exploring</button></div>`;
    $("#cart-summary").innerHTML = entries.length ? `<div class="cart-totals"><div class="total-line"><span>Product subtotal</span><strong>${money(total)}</strong></div><div class="total-line muted"><span>Shipping</span><span>To be confirmed</span></div><div class="total-line grand"><span>Product total</span><span>${money(total)}</span></div></div>` : "";
    $("#checkout-button").disabled = !entries.length;
    $("#checkout-button").style.opacity = entries.length ? "1" : ".5";
    $("#whatsapp-cart").disabled = !entries.length;
  }
  function cartMessage() {
    const lines = cartEntries().map(({product,quantity}) => `${product.name} x ${quantity} — ${money(product.price*quantity)}`).join("\n");
    return `Hello The Yarn Nest! I'd like to enquire about these items:\n${lines}\nProduct total: ${money(totals())}\nPlease confirm availability, shipping and payment instructions.`;
  }
  function orderMessage(form) {
    const lines = cartEntries().map(({product,quantity}) => `${product.name} x ${quantity} — ${money(product.price*quantity)}`).join("\n");
    return `Hello The Yarn Nest! I'd like to place an order request.\n\n${lines}\nProduct total: ${money(totals())}\nShipping: please confirm\n\nName: ${form.name}\nPhone: ${form.phone}\nEmail: ${form.email || "Not provided"}\nAddress: ${form.address}, ${form.city}, ${form.pin}\nPayment preference: ${form.payment}\nNotes: ${form.notes || "None"}\n\nPlease confirm availability, shipping and payment instructions. I understand this is an order request, not a confirmed or paid order.`;
  }
  document.addEventListener("click", event => {
    const button = event.target.closest("button");
    if (!button) return;
    if (button.dataset.add) {
      const id = button.dataset.add;
      cart.set(id,(cart.get(id)||0)+1);
      renderCart(); toast("Added to your bag ♡");
    }
    if (button.dataset.plus) { const id=button.dataset.plus;cart.set(id,(cart.get(id)||0)+1);renderCart(); }
    if (button.dataset.minus) { const id=button.dataset.minus;const next=(cart.get(id)||0)-1;if(next>0)cart.set(id,next);else cart.delete(id);renderCart(); }
    if (button.dataset.remove) { cart.delete(button.dataset.remove);renderCart(); }
    if (button.dataset.filter) { $("#category-filter").value=button.dataset.filter;renderProducts();$("#shop").scrollIntoView({behavior:"smooth"}); }
    if (button.dataset.close) closeDialog(button.dataset.close);
  });
  $("#category-filter").addEventListener("change",() => renderProducts());
  $("#open-cart").addEventListener("click",() => {renderCart();openDialog("cart-dialog");});
  $("#sticky-open-cart").addEventListener("click",() => {renderCart();openDialog("cart-dialog");});
  $("#checkout-button").addEventListener("click",() => {
    if (!cartEntries().length) return;
    $("#checkout-summary").textContent = `Items: ${cartEntries().map(({product,quantity})=>`${product.name} × ${quantity}`).join(", ")}. Product total ${money(totals())}; shipping to be confirmed.`;
    closeDialog("cart-dialog");openDialog("checkout-dialog");
  });
  $("#whatsapp-cart").addEventListener("click",() => sendWhatsApp(cartMessage()));
  $("#open-custom").addEventListener("click",() => openDialog("custom-dialog"));
  $("#footer-contact").addEventListener("click",() => sendWhatsApp("Hello The Yarn Nest! I'd like to know more about your crochet products."));
  $("#checkout-form").addEventListener("submit",event => {
    event.preventDefault();
    if (!cartEntries().length) { closeDialog("checkout-dialog");toast("Your bag is empty.");return; }
    const form=Object.fromEntries(new FormData(event.currentTarget).entries());
    const message=orderMessage(form);
    closeDialog("checkout-dialog");
    sendWhatsApp(message);
  });
  $("#custom-form").addEventListener("submit",event => {
    event.preventDefault();
    const f=Object.fromEntries(new FormData(event.currentTarget).entries());
    const message=`Hello The Yarn Nest! I'd like a custom crochet order enquiry.\nName: ${f.name}\nPhone: ${f.phone}\nProduct: ${f.type}\nIdea: ${f.idea}\nBudget: ${f.budget ? money(Number(f.budget)) : "Open to suggestions"}\nPlease let me know the estimated price and making time.`;
    closeDialog("custom-dialog");
    sendWhatsApp(message);
  });
  document.querySelectorAll("dialog").forEach(dialog => dialog.addEventListener("click",event => {
    if (event.target === dialog) dialog.close();
  }));
  renderProducts();
  renderCart();
})();
