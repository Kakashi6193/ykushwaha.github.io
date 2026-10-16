# The Yarn Nest — launch checklist

## Brand and products
- [ ] Confirm the brand name is available and appropriate.
- [ ] Replace sample names, prices, and descriptions with actual products.
- [ ] Use original photos that the maker has permission to publish.
- [ ] Confirm availability, size, colour options, and production time.
- [ ] Explain that crochet is handmade and small variations may occur.

## Orders and WhatsApp
- [ ] Set `WHATSAPP_NUMBER` in `app.js` to the seller's number in international format, digits only.
- [ ] Test from another phone: product enquiry, cart enquiry, checkout order, and custom request.
- [ ] Confirm all fields and item quantities in the outgoing message.
- [ ] Agree on a process to confirm stock, shipping, price, and dispatch estimate.
- [ ] Keep a private order tracker with order ID, date, items, amount, payment status, and delivery status.

## Payments and delivery
- [ ] Share UPI details only after confirming the order.
- [ ] Verify funds in the recipient's bank or UPI app.
- [ ] Define shipping charges, delivery areas, dispatch timelines, and returns/cancellation terms.
- [ ] Do not advertise COD unless the seller can support it.
- [ ] If adding online payments, use an approved provider and server-side verification; never put secret API keys in browser JavaScript.

## Publishing and privacy
- [ ] Test on Android, iPhone if available, and desktop.
- [ ] Check all links, keyboard navigation, form validation, and product prices.
- [ ] Add contact, privacy, shipping, cancellation/return, and terms information appropriate to the business.
- [ ] Publish using a static host and test the live URL.
- [ ] Do not collect more customer data than needed; keep customer addresses and phone numbers private.

## Known prototype limitations
This starter has no database, stock management, shipping calculator, automatic order confirmation, payment processing, or order history. The WhatsApp message must be sent by the customer; an order is not confirmed until the seller confirms it.
