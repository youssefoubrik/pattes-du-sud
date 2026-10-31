# Donation page: next steps

Use this brief to continue the donation-page work with the project owner. The current layout is a prototype and is not the agreed final design.

## Current state

- The page has separate monthly and one-time PayPal cards, followed by care information and a bank-transfer section.
- PayPal checkout uses two static URLs stored in Admin → Settings. Both PayPal URL fields are currently empty in the local database, so there is no working PayPal checkout.
- Bank details are configured locally with dummy test data. Do not publish or use those details for real transfers.
- The current design breaks the donation decision into too many sections, uses sharp separate cards, and has more wave dividers than the owner wants.
- Amounts are currently chosen at PayPal. There is no on-site amount selector that carries a selection into checkout.

## UI direction to explore

Treat the page as one reassuring donation experience:

1. A short, warm introduction that says what continued support makes possible in Mirleft.
2. One unified giving panel with a clear monthly / one-time choice, amount choices, and a custom amount option if the chosen PayPal flow supports it.
3. PayPal/card and bank transfer presented together as payment methods. On desktop they can sit side by side within the same panel; on mobile they should stack in a clear order.
4. Explain who each method may suit. For example, PayPal/card is a simple online option for supporters abroad; bank transfer may suit local supporters or people who prefer a bank transfer. Make clear that sending or intermediary banks may charge fees and that donors should check with their bank.
5. Put “Where your support goes” and the association’s transparency practices near the donation choices: daily care, veterinary treatment, prevention, records of income and expenses, receipts, veterinary care and animals supported.

Keep the monthly option easy to notice while making one-time giving equally clear. Do not preselect a frequency. Use one friendly, cohesive panel rather than several sharp boxes. Use section colors to help scanning; keep wave dividers restrained and only where they clarify a transition.

Only promise evidence that exists. The association says it keeps receipts and care records; do not claim that visitors can inspect public reports or receipts unless those materials are actually published.

## Make the local impact tangible

Use EUR as the intended display and checkout currency for suggested gifts, subject to confirming that the association's Moroccan PayPal account can receive and withdraw EUR. Help international donors understand that their contribution supports care in Morocco with a line such as **“Your gift can go a long way in Mirleft.”** If showing a MAD equivalent, keep it clearly approximate, update its exchange rate, and explain that PayPal or bank conversion rates and fees may differ. Do not hard-code a rate or promise an exact amount received.

When a donor selects an amount, show a modest, clearly approximate local equivalent and a possible contribution to care, for example: **“About MAD [current equivalent] before any conversion fees — could help toward food and daily care.”** The association must provide or confirm local cost examples before writing specific impact claims. Phrase these as **“could help support”** or **“may contribute toward”**, not as a promise that an exact gift pays for one treatment. For custom amounts, decide whether to show only the MAD estimate or a broad verified impact range.

## PayPal and amount choices

The existing CMS fields accept static PayPal checkout URLs. A PayPal payment link can either set a fixed amount or let donors enter an amount on PayPal. A static link does not automatically carry an arbitrary amount selected on this website into checkout. [PayPal payment links](https://developer.paypal.com/payment-links-buttons/create-payment-link/)

Possible approaches to decide between:

- **Fastest:** Keep PayPal-hosted links and let donors choose or enter the amount on PayPal. The website can explain this, but any amount chips on the site would only be suggestions and would need to be selected again at PayPal.
- **Fixed links:** Create a separate PayPal link for each amount and frequency. This can carry a fixed amount, but becomes cumbersome as choices grow.
- **Integrated checkout:** Add PayPal’s Donate SDK or Checkout integration so the selected amount can be sent to PayPal. The server must validate the selected amount; PayPal advises against trusting an amount sent only by the browser. Monthly donations need a recurring-payment setup, separately from one-time checkout. [PayPal Donate SDK](https://developer.paypal.com/sdk/donate/), [PayPal Checkout integration](https://developer.paypal.com/checkout/integrate), [recurring payments](https://developer.paypal.com/docs/checkout/standard/customize/recurring-payments-module/)

The integrated option best matches an on-site frequency and amount selector. Before implementing it, confirm that the association’s PayPal account is eligible for the Donate SDK or decide to use Checkout, then test with PayPal Sandbox. Keep API credentials in server environment variables, never in CMS fields or browser code.

## Optional processing-fee contribution

Do not hard-code a generic payment-fee amount. PayPal’s published Morocco schedule shows a standard local rate of 4.40% plus a fixed fee, while international and currency-conversion cases can differ. The rate that applies depends on the account, transaction and received currency; confirm it in the association’s own PayPal account before displaying a calculation. [PayPal Morocco fees](https://www.paypal.com/ma/business/paypal-business-fees?locale.x=ar_MA)

If fee coverage is offered, make it an optional, unchecked choice such as **“Add a little to help cover payment fees.”** Show the added amount and total before checkout. Treat it as an additional voluntary gift, not a mandatory surcharge, and do not promise an exact net amount if currency conversion or other fees can change it. Bank transfer fees are separate and controlled by the banks.

## Decisions for the next session

- Use EUR for suggested gifts and checkout after confirming PayPal account and withdrawal support in Morocco.
- Decide whether to show an approximate MAD equivalent and how its rate will be updated.
- Gather real local cost examples so selected amounts can show an honest, approximate care impact.
- Check the PayPal account’s Donate SDK eligibility and actual processing fees.
- Choose between hosted links, fixed-amount links, Donate SDK, or Checkout plus recurring subscriptions.
- Decide whether to offer an optional fee-cover contribution after the real fees are confirmed.
- Gather any real public-facing proof (reports, receipts, dated updates, or photos) before promising visitors they can view it.

## Implementation and review checklist

- [ ] Agree on the single-panel layout and mobile order before polishing visuals.
- [ ] Implement frequency, amount, and payment-method choices for the selected PayPal approach.
- [ ] Show bank-transfer instructions in the same donation area, with an accurate fee/timing note.
- [ ] Keep verified care examples and transparency information beside the giving flow.
- [ ] Show a clearly approximate local equivalent and impact for selected amounts, based on an updateable exchange rate and association-confirmed costs.
- [ ] Remove local dummy bank data before any public deployment.
- [ ] Test one-time, monthly, custom amount, fee-cover opt-in/opt-out, and bank-transfer display on desktop and mobile.
- [ ] Update this brief and `specifications.md` as decisions are made.
