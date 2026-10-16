# The Yarn Nest — website starter

A responsive static storefront starter for a small crochet business. It uses separate HTML, CSS, and JavaScript files and no build tools.

## Files

- `index.html` — page structure and forms
- `styles.css` — responsive layout and styling
- `products.js` — sample product catalogue
- `app.js` — category filters, shopping cart, WhatsApp message creation
- `LAUNCH-CHECKLIST.md` — launch and safety checklist

## Preview locally

Open `index.html` in a modern browser. For the most reliable local preview, use a small static server or VS Code Live Server.

## Before publishing

1. Edit `WHATSAPP_NUMBER` near the top of `app.js`. Use country code and digits only, e.g. `919876543210`; never use someone else's number without permission.
2. Edit product names, prices, categories, and descriptions in `products.js`.
3. Replace the emoji product illustrations with real product photos. Put images in `assets/` and update the product renderer in `app.js` to use those images.
4. Test the cart and all forms on a phone.
5. Publish the files to a static host such as GitHub Pages.

## Important limitations

- This is a front-end starter, not a complete production e-commerce system.
- It does not save orders to a database, manage stock, calculate shipping, send email, or process payments.
- Checkout prepares a message and opens WhatsApp. The customer must send the message and the seller must confirm the order.
- UPI is arranged manually with the seller after confirmation. Verify payment in the bank/UPI app; never rely on a screenshot.
- A public static website cannot safely hold payment secrets or validate payments. Automated payments require a payment provider and a secure server-side integration.
- Do not collect sensitive personal information you do not need. Tell customers how their details will be used and protect order records.

## GitHub Pages quick start

1. Create a GitHub repository, for example `yourusername.github.io`.
2. Upload `index.html`, `styles.css`, `products.js`, `app.js`, and any assets to the repository root.
3. In repository Settings → Pages, choose deploy from the `main` branch and root folder.
4. Wait for the deployment and open the URL shown in Pages settings.
5. Test the public website, especially WhatsApp on a mobile device.

GitHub Pages documentation: https://docs.github.com/en/pages/quickstart
